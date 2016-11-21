var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var signUpRoute = require('./routes/signup');
var signInRoute = require('./routes/signin');

mongoose.connect('mongodb://localhost/blog');
var PostSchema = mongoose.Schema({
	title: { type: String, required: true },
	body: String,
	tag: { type: String, enum:['POLITICS', 'ECONOMY', 'EDUCATION'] },
	posted: { type: Date, default: Date.now }
}, { collection: 'post'});


var PostModel = mongoose.model('PostModel', PostSchema);

app.use(express.static(__dirname + ''));

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

app.get('/api/blogpost/:id', function(req, res) {
	var postId = req.params.id;
	PostModel
		.findById({_id: postId})
		.then(
			function(post) {
				res.json(post);
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

app.put('/api/blogpost/:id', function(req, res) {
	var postId = req.params.id;
	var post = req.body;
	PostModel
		.update({_id: postId}, {
			title: post.title,
			body: post.body
		})
		.then(
			function(status) {
				res.sendStatus(200);
			},
			function(error) {
				res.sendStatus(400);
			}
		);
});

app.delete('/api/blogpost/:id', function(req, res) {
	var postId = req.params.id;
	PostModel.remove({_id: postId})
		.then(
			function(status) {
				res.sendStatus(200);
			},
			function(error) {
				res.sendStatus(400);
			}
		);
});

app.use(session({
	name: 'BowenPersonalBlog',
	secret: 'personal blog',
	cookie: {
		maxAge: 24 * 3600 * 1000 * 30
	},
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	})
}));


/* -------------------------- */
app.use('/signup', signUpRoute);
app.use('/signin', signInRoute)

app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});






















