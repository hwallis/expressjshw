var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();
var materialize = require('materialize.min.css');

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html')
});

app.get('/courses', function(request, response) {
  fs.readFile('courses.json', 'utf8', function(err, data) {
    var courses = JSON.parse(data);
    response.locals = { courses: courses }
    response.render('courses.ejs');
  });
});

app.get('/courses/:id', function(request, response) {
  fs.readFile('courses.json', 'utf8', function(err, data) {
    var coursesParsed = JSON.parse(data);
    var course = coursesParsed.filter( function(p) {
      return p.id === parseInt(request.params.id);
    })[0];

    response.locals = { course: course };
    response.render('course.ejs');
  });
});

app.listen(8080);
console.log('listening on local host: 8080')