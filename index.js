var express = require('express');
var app = express();

var indexRoute = require('./routes/index.js');

app.all('/api/*', indexRoute.apiRoute)
app.get('/', indexRoute.initalPage);
app.get('/author/:name', indexRoute.author);

app.locals.title = 'my app';

console.log('app.locals: ', app.locals);

app.listen(3000);