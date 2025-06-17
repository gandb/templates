var express = require('express');
var path = require('path');
var app = express();
var port = process.env["PORT"] || 3000;
app.use(express.static(path.join(__dirname, '../dist/contas/browser')));
app.get('/hello', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () { return console.log("Server listening on port: ".concat(port)); });
