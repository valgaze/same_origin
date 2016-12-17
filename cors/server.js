var port = process.env.port || 3000;
var express = require('express');
var app = express()
var http = require('http');
var request = require("request");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res) {
  res.send("This is the API server. Turn on the other server and go to http://localhost:3001/");
});
app.use('/req/:id', function(req, res) {
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
            var payload = {
              body: JSON.parse(body),
              msg: "This is a CORS-compliant response"
            }
            res.send(payload);
        }
    });
});

app.listen(port, function() {
    console.log('Listening on port', port);
    console.log("Try http://localhost:" + port + "/req/4");
});
