const winston = require('winston');
const express = require("express");
const app = express();


// Creates Logger for Logging into files
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'}),
    ],
});

// Transports logs to the console
logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
    logger.log({
        level: 'info',
        message: '"/" requested'
    });
});

app.get('/title', function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
    logger.log({
        level: 'info',
        message: 'title requested'
    });
});
app.get('/routen', function (req, res) {
    res.sendFile(__dirname + '/public/Routen.html');
    logger.log({
        level: 'info',
        message: 'routes requested'
    });
});
app.get('/history', function (req, res) {
    res.sendFile(__dirname + '/public/history.html');
    logger.log({
        level: 'info',
        message: 'history requested'
    });
});
app.get('/messages', function (req, res) {
    res.sendFile(__dirname + '/public/Message.html');
    logger.log({
        level: 'info',
        message: 'messages requested'
    });
});

app.get('/plan', function (req, res) {
    res.sendFile(__dirname + '/public/fahrtenplan.html');
    logger.log({
        level: 'info',
        message: 'plan requested'
    });
});


app.listen(3000, function () {
    console.log('Server läuft auf Port 3000');
    logger.log({
        level: 'info',
        message: 'Server online'
    });
});
