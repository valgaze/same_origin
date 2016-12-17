var port = process.env.port || 3001;
var express = require('express');
var app = express()
var http = require('http');
var request = require("request");
var path = require("path");

app.use('/', express.static(path.join(__dirname, 'public')))

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
            //Note that this uses the .jsonp response method

            //The client makes a request to this endpoint and specifies the name of a callback
            //(ex ?callback=myCallback)
            //If using a library like jQuery, a SCRIPT tag will be injected into the DOM
            //and upon loading the script will be like a GET request.
            //The server will not return JSON but will generate an actual javascript "file"
            //which invokes myCallback with the data passed in as an argument to the function
            //This is of course means client-side there must be a function named myCallback that is
            //capable of handling the response

            var payload = {
              body: JSON.parse(body),
              msg: "This is JSONP wrapped in a function invocation"
            }
            res.jsonp(payload);

        }
    });
});

app.listen(port, function() {
    console.log('Listening on port', port);
    console.log("Open http://localhost:" + port + "/ in your browser");
});
