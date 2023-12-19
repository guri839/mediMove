const express = require("express");
const app = express();

app.use(express.static( 'public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/title', function(req, res) {
    res.sendFile(__dirname + '/public/main.html');
});
app.get('/routen', function(req, res) {
    res.sendFile(__dirname + '/public/Routen.html');
});
app.get('/history', function(req, res) {
    res.sendFile(__dirname + '/public/history.html');
});
app.get('/messages', function(req, res) {
    res.sendFile(__dirname + '/public/Message.html');
});
app.get('/plan', function(req, res) {
    res.sendFile(__dirname + '/public/fahrtenplan.html');
});



app.listen(3000, function() {
    console.log('Server läuft auf Port 3000');
});
