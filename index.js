const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")

const { register } = require('./metrics'); // Adjust path if needed
const { httpRequestCounter } = require('./metrics');


const PORT = process.env.PORT || 5000

dotenv.config();

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use(cors())

app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const responseTime = Date.now() - start;

        httpRequestCounter.inc({
        method: req.method,
        route: req.route ? req.route.path : req.originalUrl,
        status: res.statusCode
        });
    });

    next();
});

app.use('/', Routes);

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))



app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

