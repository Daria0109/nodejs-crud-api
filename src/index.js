"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
// GET api/users is used to get all persons
// Server should answer with status code 200 and all users records
var port = 3000;
var server = http.createServer(function (request, response) {
    var method = request.method, url = request.url;
    console.log('method', method);
    console.log('url', url);
    var body = [];
    request.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        console.log('body', body);
    });
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World');
});
server.listen(port, function () {
    console.log("Server running at localhost");
});
