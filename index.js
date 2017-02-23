var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html')
});

app.get('/classes', function(request, response) {
  fs.readFile('classes.json', 'utf8', function(err, data) {
    var classes = JSON.parse(data);
    response.locals = { classes: classes }
    response.render('classes.ejs');
  });
});

app.get('/classes/:id', function(request, response) {
  fs.readFile('classes.json', 'utf8', function(err, data) {
    var classesParsed = JSON.parse(data);
    var class = classesParsed.filter( function(p) {
      return p.id === parseInt(request.params.id);
    })[0];

    response.locals = { class: class };
    response.render('class.ejs');
  });
});

app.listen(8080);
console.log('listening on local host: 8080')