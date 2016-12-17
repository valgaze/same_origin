var port = process.env.port || 3000;
var express = require('express');
var app = express()
var http = require('http');
var request = require("request");

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.use('/proxy/:id', function(req, res) {
    var options = {
        host: 'http://www.swapi.co',
        path: '/api/people/',
        port: 80,
        method: 'GET'
    }

    if (!req.params.id) {
        req.params.id = 1;
    }

    request.get({
        url: options["host"] + options["path"] + req.params.id
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Response received!");
            res.send(JSON.parse(body));
        }
    });
});

app.listen(port, function() {
    console.log('Listening on port', port);
    console.log("Try http://localhost:" + port + "/proxy/4");
});
