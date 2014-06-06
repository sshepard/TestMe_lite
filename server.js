var express = require('express'),
    app = express(), //bundle everything
    server = require('http').createServer(app);
var bodyParser = require('body-parser');

// parse application/json and application/x-www-form-urlencoded
app.use(bodyParser())

// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/results', function(req, res) {
    res.sendfile(__dirname + '/results.html');
});

app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));

app.post('/ajax', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

server.listen(8124);