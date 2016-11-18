var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/api/blogpost', function(req, res) {
	console.log('Hello from create post serve');
	console.log(req.body);
	console.log(typeof req.body); // object
	res.send('A blog post is created!');
});

app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});