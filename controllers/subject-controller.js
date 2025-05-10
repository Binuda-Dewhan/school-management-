const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');

// Import Prometheus metrics
const {
  subjectCreateRequests,
  subjectCreateSuccess,
  subjectCreateFailure,
  subjectDuplicateSubCode,
  subjectCreatedTotal, 
  subjectRequestDuration,
  subjectTotalActive,
  subjectAssigned,
  subjectUnassigned,
  subjectDeleteRequests,
  subjectDeleteSuccess,
  subjectDeleteFailures,
  subjectValidationError,
  getAllSubjects,
  getClassSubjects,
  getFreeSubjects,
  getSubjectDetail: getSubjectDetailMetric,
  subjectOperationErrors
} = require('../metrics');

// ========== Create Subject ==========

const subjectCreate = async (req, res) => {
    subjectCreateRequests.inc({ sclassName: req.body.sclassName }); 
    const end = subjectRequestDuration.startTimer({ operation: 'create' });
  
    try {
      const subjects = req.body.subjects.map((subject) => ({
        subName: subject.subName,
        subCode: subject.subCode,
        sessions: subject.sessions,
      }));
  
      const existingSubjectBySubCode = await Subject.findOne({
        'subjects.subCode': subjects[0].subCode,
        school: req.body.adminID,
      });
  
      if (existingSubjectBySubCode) {
        subjectDuplicateSubCode.inc();
        subjectCreateFailure.inc();
        end();
        return res.send({ message: 'Sorry this subcode must be unique as it already exists' });
      }
  
      const newSubjects = subjects.map((subject) => ({
        ...subject,
        sclassName: req.body.sclassName,
        school: req.body.adminID,
      }));
  
      const result = await Subject.insertMany(newSubjects);
  
      subjectCreateSuccess.inc(result.length);
      subjectCreatedTotal.inc(result.length);
      await updateSubjectGauges();
      end();
      res.send(result);
    } catch (err) {
      subjectCreateFailure.inc();
      subjectOperationErrors.inc();
      end();
      res.status(500).json(err);
    }
  };
  

// ========== Get All Subjects ==========
const allSubjects = async (req, res) => {
  getAllSubjects.inc();
  const end = subjectRequestDuration.startTimer({ operation: 'get_all' });

  try {
    let subjects = await Subject.find({ school: req.params.id }).populate("sclassName", "sclassName");
    if (subjects.length > 0) {
      res.send(subjects);
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (err) {
    subjectOperationErrors.inc();
    res.status(500).json(err);
  } finally {
    end();
  }
};

// ========== Get Subjects by Class ==========
const classSubjects = async (req, res) => {
  getClassSubjects.inc();
  try {
    let subjects = await Subject.find({ sclassName: req.params.id });
    if (subjects.length > 0) {
      res.send(subjects);
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (err) {
    subjectOperationErrors.inc();
    res.status(500).json(err);
  }
};

// ========== Get Free Subjects ==========
const freeSubjectList = async (req, res) => {
  getFreeSubjects.inc();
  try {
    let subjects = await Subject.find({ sclassName: req.params.id, teacher: { $exists: false } });
    if (subjects.length > 0) {
      res.send(subjects);
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (err) {
    subjectOperationErrors.inc();
    res.status(500).json(err);
  }
};

// ========== Get Subject Detail ==========
const getSubjectDetail = async (req, res) => {
  getSubjectDetailMetric.inc();
  const end = subjectRequestDuration.startTimer({ operation: 'get_detail' });

  try {
    let subject = await Subject.findById(req.params.id);
    if (subject) {
      subject = await subject.populate("sclassName", "sclassName");
      subject = await subject.populate("teacher", "name");
      res.send(subject);
    } else {
      res.send({ message: "No subject found" });
    }
  } catch (err) {
    subjectOperationErrors.inc();
    res.status(500).json(err);
  } finally {
    end();
  }
};

// ========== Delete a Subject ==========
const deleteSubject = async (req, res) => {
  subjectDeleteRequests.inc();
  const end = subjectRequestDuration.startTimer({ operation: 'delete' });

  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) {
      subjectDeleteFailures.inc();
      end();
      return res.status(404).send({ message: "Subject not found" });
    }

    await Teacher.updateOne(
      { teachSubject: deletedSubject._id },
      { $unset: { teachSubject: "" } }
    );

    await Student.updateMany({}, { $pull: { examResult: { subName: deletedSubject._id } } });
    await Student.updateMany({}, { $pull: { attendance: { subName: deletedSubject._id } } });

    subjectDeleteSuccess.inc();
    await updateSubjectGauges();
    res.send(deletedSubject);
  } catch (error) {
    subjectDeleteFailures.inc();
    subjectOperationErrors.inc();
    res.status(500).json(error);
  } finally {
    end();
  }
};

// ========== Delete All Subjects for a School ==========
const deleteSubjects = async (req, res) => {
  try {
    const deletedSubjects = await Subject.deleteMany({ school: req.params.id });

    await Teacher.updateMany(
      { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
      { $unset: { teachSubject: "" } }
    );

    await Student.updateMany({}, { $set: { examResult: null, attendance: null } });

    await updateSubjectGauges();
    res.send(deletedSubjects);
  } catch (error) {
    subjectOperationErrors.inc();
    res.status(500).json(error);
  }
};

// ========== Delete Subjects by Class ==========
const deleteSubjectsByClass = async (req, res) => {
  try {
    const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });

    await Teacher.updateMany(
      { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
      { $unset: { teachSubject: "" } }
    );

    await Student.updateMany({}, { $set: { examResult: null, attendance: null } });

    await updateSubjectGauges();
    res.send(deletedSubjects);
  } catch (error) {
    subjectOperationErrors.inc();
    res.status(500).json(error);
  }
};

// ========== Update Gauges ==========
const updateSubjectGauges = async () => {
    try {
      const total = await Subject.countDocuments();
      const assigned = await Subject.countDocuments({ teacher: { $type: 'objectId' } });
      const unassigned = total - assigned;
  
      subjectTotalActive.set(total);
      subjectAssigned.set(assigned);
      subjectUnassigned.set(unassigned);
    } catch (err) {
      console.error("Gauge update failed:", err);
    }
  };
  

module.exports = {
  subjectCreate,
  freeSubjectList,
  classSubjects,
  getSubjectDetail,
  deleteSubjectsByClass,
  deleteSubjects,
  deleteSubject,
  allSubjects
};