var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/blog');
var PostSchema = mongoose.Schema({
	title: { type: String, required: true },
	body: String,
	tag: { type: String, enum:['POLITICS', 'ECONOMY', 'EDUCATION'] },
	posted: { type: Date, default: Date.now }
}, { collection: 'post'});

var PostModel = mongoose.model('PostModel', PostSchema);


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());



app.get('/api/blogpost', function(req, res) {
	PostModel
		.find()
		.then(
			function(posts) {
				res.json(posts);
			},
			function(error) {
				res.sendStatus(400);
			}
		);
});


app.post('/api/blogpost', function(req, res) {
	var post = req.body;
	PostModel
		.create(post)
		.then(
			function(postObj) {
				res.send('A blog post is created!');
			},
			function(error) {
				res.sendStatus(400);
			}
		);
});

app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});