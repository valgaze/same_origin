var port = process.env.port || 3001;
var express = require('express');
var app = express()
var http = require('http');
var request = require("request");
var path = require("path");

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, function() {
    console.log('Listening on port', port);
    console.log("Open http://localhost:" + port + "/ in your browser");
});
