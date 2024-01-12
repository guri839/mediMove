const winston = require('winston');
const mysql = require('mysql');
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

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root' ,
    database: 'medimove',
})

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
app.get('/allRouten', function (req, res) {
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

app.get("/fahrgast", (req, res) => {
    const sql = 'SELECT * FROM Fahrer';
    db.query(sql, (err, data) =>{
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/fahrer", (req, res) => {
    const sql = "SELECT * FROM Fahrgast";
    db.query(sql, (err, data) =>{
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/fahrzeuge", (req, res) => {
    const sql = "SELECT * FROM Fahrzeuge";
    db.query(sql, (err, data) =>{
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.get("/fahrzeug/:fahrzeugId", (req, res) => {
    const fahrzeugId = Number(req.params.fahrzeugId);
    console.log(`SELECT * FROM Fahrzeuge where fahrzeugId is '${fahrzeugId}'`);
    res.json({fahrzeugId});
    // const sql = `SELECT * FROM Fahrzeuge where fahrzeugId is '${fahrzeugId}'`;
    // db.query(sql, (err, data) =>{
    //  if (err) return res.json("Error");
    //  return res.json(data);
    // })
})


app.get("/routen", (req, res) => {
    const sql = "SELECT Routen.RouteID, Fahrten.Startpunkt AS Startort, Fahrten.Zielpunkt AS Zielort,Fahrgast.Vorname AS Vorname,Fahrgast.Nachname AS Nachname,Fahrer.Nachname AS FahrerNachname,Fahrzeuge.Marke AS FahrzeugMarke,Fahrzeuge.Kennzeichen AS FahrzeugKennzeichen FROM Routen JOIN RoutenFahrten ON Routen.RouteID = RoutenFahrten.RouteID JOIN Fahrten ON RoutenFahrten.FahrtID = Fahrten.FahrtID JOIN Fahrgast ON Fahrten.FahrgastID = Fahrgast.FahrgastID JOIN Fahrer ON RoutenFahrten.FahrerID = Fahrer.FahrerID JOIN Fahrzeuge ON RoutenFahrten.FahrzeugID = Fahrzeuge.FahrzeugID";
    db.query(sql, (err, data) =>{
        if (err) return res.json("Error Allrouten");
        return res.json(data);
    })
})

app.listen(3000, function () {
    console.log('Server läuft auf Port 3000');
    logger.log({
        level: 'info',
        message: 'Server online'
    });
});