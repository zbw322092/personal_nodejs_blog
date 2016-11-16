var express = require('express');
var app = express();

var indexRoute = require('./routes/index.js');

app.get('/', indexRoute.initalPage);
app.get('/author/:name', indexRoute.author);

app.listen(3000);