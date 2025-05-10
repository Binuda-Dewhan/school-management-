const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });


// Define counters

// Admin

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});
// ==============================
// Admin Metrics
// ==============================

// admin 
const adminLoginCounter = new client.Counter({
  name: 'admin_logins_total',
  help: 'Total number of admin logins',
});

const adminRegisterCounter = new client.Counter({
  name: 'admin_registrations_total',
  help: 'Total number of admin registrations',
});

const adminRegistrationSuccess = new client.Counter({
  name: 'admin_registration_success_total',
  help: 'Total number of successful admin registrations',
});

const adminLoginSuccess = new client.Counter({
  name: 'admin_login_success_total',
  help: 'Total number of successful admin logins',
});

const adminDetailRequests = new client.Counter({
  name: 'admin_detail_requests_total',
  help: 'Total number of admin detail fetch requests',
});


// student
const studentRegisterRequests = new client.Counter({
    name: 'student_register_requests_total',
    help: 'Total number of student registration attempts'
  });
  
  const studentRegisterSuccess = new client.Counter({
    name: 'student_register_success_total',
    help: 'Total number of successful student registrations'
  });
  
  const studentLoginRequests = new client.Counter({
    name: 'student_login_requests_total',
    help: 'Total number of student login attempts'
  });
  
  const studentLoginSuccess = new client.Counter({
    name: 'student_login_success_total',
    help: 'Total number of successful student logins'
  });
  
  const getStudentsRequests = new client.Counter({
    name: 'get_students_requests_total',
    help: 'Total number of requests to fetch students list'
  });

  const getStudentRequests = new client.Counter({
    name: 'get_astudent_requests_total',
    help: 'Total number of requests to fetch a student list'
  });
  
  const deleteStudentRequests = new client.Counter({
    name: 'delete_student_requests_total',
    help: 'Total number of delete student requests'
  });
  
  const studentAttendanceRequests = new client.Counter({
    name: 'student_attendance_requests_total',
    help: 'Total number of requests for student attendance'
  });

  const updateexamresultsRequests = new client.Counter({
    name: 'update_student_examresult_requests_total',
    help: 'Total number of update student exam result requests',
  });
  
  const updateStudentSuccess = new client.Counter({
    name: 'update_student_success_total',
    help: 'Total number of successful student updates',
  });


// classes
const classCreateRequests = new client.Counter({
  name: 'class_create_requests_total',
  help: 'Total number of class creation attempts',
});

const classCreateSuccess = new client.Counter({
  name: 'class_create_success_total',
  help: 'Total number of successful class creations',
});

const classCreateFailures = new client.Counter({
  name: 'class_create_failures_total',
  help: 'Total number of failed class creation attempts',
});

const classListRequests = new client.Counter({
  name: 'class_list_requests_total',
  help: 'Total number of requests to list classes',
});

const classDetailRequests = new client.Counter({
  name: 'class_detail_requests_total',
  help: 'Total number of requests to retrieve class details',
});

const classStudentsRequests = new client.Counter({
  name: 'class_students_requests_total',
  help: 'Total number of requests to retrieve students of a class',
});

const classDeleteRequests = new client.Counter({
  name: 'class_delete_requests_total',
  help: 'Total number of class deletion attempts',
});

const classDeleteSuccess = new client.Counter({
  name: 'class_delete_success_total',
  help: 'Total number of successful class deletions',
});

const classDeleteFailures = new client.Counter({
  name: 'class_delete_failures_total',
  help: 'Total number of failed class deletion attempts',
});

const classesDeleteRequests = new client.Counter({
  name: 'classes_delete_requests_total',
  help: 'Total number of bulk class deletion attempts',
});

const classesDeleteSuccess = new client.Counter({
  name: 'classes_delete_success_total',
  help: 'Total number of successful bulk class deletions',
});

const classesDeleteFailures = new client.Counter({
  name: 'classes_delete_failures_total',
  help: 'Total number of failed bulk class deletion attempts',
});
// Teacher
const teacherRegisterRequests = new client.Counter({
  name: 'teacher_register_requests_total',
  help: 'Total number of teacher registration attempts'
});

const teacherRegisterSuccess = new client.Counter({
  name: 'teacher_register_success_total',
  help: 'Total number of successful teacher registrations'
});

const teacherLoginRequests = new client.Counter({
  name: 'teacher_login_requests_total',
  help: 'Total number of teacher login attempts'
});

const teacherLoginSuccess = new client.Counter({
  name: 'teacher_login_success_total',
  help: 'Total number of successful teacher logins'
});

const getTeachersRequests = new client.Counter({
  name: 'get_teachers_requests_total',
  help: 'Total number of requests to fetch teachers list'
});

const getTeacherDetailRequests = new client.Counter({
  name: 'get_teacher_detail_requests_total',
  help: 'Total number of requests to fetch teacher details'
});

const updateTeacherRequests = new client.Counter({
  name: 'update_teacher_requests_total',
  help: 'Total number of update teacher requests'
});

const deleteTeacherRequests = new client.Counter({
  name: 'delete_teacher_requests_total',
  help: 'Total number of delete teacher requests'
});

const teacherAttendanceRequests = new client.Counter({
  name: 'teacher_attendance_requests_total',
  help: 'Total number of requests for teacher attendance'
});

// Register the metrics

// Admin

//admin

// ==============================
// Student Metrics
// ==============================

// ==============================
// Subject Metrics
// ==============================

const subjectCreateRequests = new client.Counter({
  name: 'subject_create_requests_total',
  help: 'Total number of subject create requests',
  labelNames: ['sclassName'] // For creation by class
});

const subjectCreateSuccess = new client.Counter({
  name: 'subject_create_success_total',
  help: 'Number of successful subject creations'
});

const subjectCreatedTotal = new client.Counter({
  name: 'subject_created_total',
  help: 'Total number of individual subjects created'
});

const subjectCreateFailure = new client.Counter({
  name: 'subject_create_failure_total',
  help: 'Number of failed subject creations'
});

const subjectDuplicateSubCode = new client.Counter({
  name: 'subject_duplicate_subcode_total',
  help: 'Number of subject creation failures due to duplicate subCode'
});

const subjectValidationError = new client.Counter({
  name: 'subject_validation_error_total',
  help: 'Number of subject creation failures due to validation errors'
});

// ✅ Deletion Metrics
const subjectDeleteRequests = new client.Counter({
  name: 'subject_delete_requests_total',
  help: 'Total number of subject delete requests'
});

const subjectDeleteSuccess = new client.Counter({
  name: 'subject_delete_success_total',
  help: 'Total number of successful subject deletions'
});

const subjectDeleteFailures = new client.Counter({
  name: 'subject_delete_failures_total',
  help: 'Total number of failed subject deletions'
});

// ✅ Subject list endpoints
const getAllSubjects = new client.Counter({
  name: 'get_all_subjects_requests_total',
  help: 'Total get all subjects requests'
});

const getClassSubjects = new client.Counter({
  name: 'get_class_subjects_requests_total',
  help: 'Total get class subjects requests'
});

const getFreeSubjects = new client.Counter({
  name: 'get_free_subjects_requests_total',
  help: 'Total get free subjects requests'
});

const getSubjectDetail = new client.Counter({
  name: 'get_subject_detail_requests_total',
  help: 'Total get subject detail requests'
});

const subjectOperationErrors = new client.Counter({
  name: 'subject_operation_errors_total',
  help: 'Total number of subject-related operation errors'
});

const subjectRequestDuration = new client.Histogram({
  name: 'subject_request_duration_seconds',
  help: 'Duration of subject-related requests in seconds',
  labelNames: ['operation'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const subjectTotalActive = new client.Gauge({
  name: 'subject_total_active',
  help: 'Current total number of active subjects'
});

const subjectAssigned = new client.Gauge({
  name: 'subject_assigned_total',
  help: 'Current number of subjects with assigned teachers'
});

const subjectUnassigned = new client.Gauge({
  name: 'subject_unassigned_total',
  help: 'Current number of unassigned subjects'
});

// ==============================
// Register All Metrics
// ==============================

// Admin


register.registerMetric(adminLoginCounter);
register.registerMetric(adminRegisterCounter);
register.registerMetric(adminRegistrationSuccess);
register.registerMetric(adminLoginSuccess);
register.registerMetric(adminDetailRequests);

// Students
register.registerMetric(studentRegisterRequests);
register.registerMetric(studentRegisterSuccess);
register.registerMetric(studentLoginRequests);
register.registerMetric(studentLoginSuccess);
register.registerMetric(getStudentsRequests);
register.registerMetric(getStudentRequests);
register.registerMetric(deleteStudentRequests);
register.registerMetric(studentAttendanceRequests);
register.registerMetric(updateexamresultsRequests);
register.registerMetric(updateStudentSuccess);


//classes
register.registerMetric(classCreateRequests);
register.registerMetric(classCreateSuccess);
register.registerMetric(classCreateFailures);
register.registerMetric(classListRequests);
register.registerMetric(classDetailRequests);
register.registerMetric(classStudentsRequests);
register.registerMetric(classDeleteRequests);
register.registerMetric(classDeleteSuccess);
register.registerMetric(classDeleteFailures);
register.registerMetric(classesDeleteRequests);
register.registerMetric(classesDeleteSuccess);
register.registerMetric(classesDeleteFailures);

// Teachers
register.registerMetric(teacherRegisterRequests);
register.registerMetric(teacherRegisterSuccess);
register.registerMetric(teacherLoginRequests);
register.registerMetric(teacherLoginSuccess);
register.registerMetric(getTeachersRequests);
register.registerMetric(getTeacherDetailRequests);
register.registerMetric(updateTeacherRequests);
register.registerMetric(deleteTeacherRequests);
register.registerMetric(teacherAttendanceRequests);


// Subjects
register.registerMetric(subjectCreateRequests);
register.registerMetric(subjectCreateSuccess);
register.registerMetric(subjectCreatedTotal); 
register.registerMetric(subjectCreateFailure);
register.registerMetric(subjectDuplicateSubCode);
register.registerMetric(subjectValidationError); 
register.registerMetric(subjectDeleteRequests);
register.registerMetric(subjectDeleteSuccess);
register.registerMetric(subjectDeleteFailures);
register.registerMetric(getAllSubjects);
register.registerMetric(getClassSubjects);
register.registerMetric(getFreeSubjects);
register.registerMetric(getSubjectDetail);
register.registerMetric(subjectOperationErrors);
register.registerMetric(subjectRequestDuration);
register.registerMetric(subjectTotalActive);
register.registerMetric(subjectAssigned);
register.registerMetric(subjectUnassigned);
register.registerMetric(httpRequestCounter);

// ==============================
// Exports
// ==============================

module.exports = {
  httpRequestCounter,

  register,
  // Admin
  adminLoginCounter,
  adminRegisterCounter,
  adminRegistrationSuccess,
  adminLoginSuccess,
  adminDetailRequests,

  // Student

  studentRegisterRequests,
  studentRegisterSuccess,
  studentLoginRequests,
  studentLoginSuccess,
  getStudentsRequests,
  getStudentRequests,
  deleteStudentRequests,
  studentAttendanceRequests,
  updateexamresultsRequests,
  updateStudentSuccess,
  
  classCreateRequests,
  classCreateSuccess,
  classCreateFailures,
  classListRequests,
  classDetailRequests,
  classStudentsRequests,
  classDeleteRequests,
  classDeleteSuccess,
  classDeleteFailures,
  classesDeleteRequests,
  classesDeleteSuccess,
  classesDeleteFailures,
  updateStudentSuccess,
  teacherRegisterRequests,
  teacherRegisterSuccess,
  teacherLoginRequests,
  teacherLoginSuccess,
  getTeachersRequests,
  getTeacherDetailRequests,
  updateTeacherRequests,
  deleteTeacherRequests,
  teacherAttendanceRequests,

  // Subject
  subjectCreateRequests,
  subjectCreateSuccess,
  subjectCreatedTotal,
  subjectCreateFailure,
  subjectDuplicateSubCode,
  subjectValidationError,
  subjectDeleteRequests,
  subjectDeleteSuccess,
  subjectDeleteFailures,
  getAllSubjects,
  getClassSubjects,
  getFreeSubjects,
  getSubjectDetail,
  subjectOperationErrors,
  subjectValidationError, 
  subjectRequestDuration,
  subjectTotalActive,
  subjectAssigned,
  subjectUnassigned

};
