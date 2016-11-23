var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/blog');


var signUpRoute = require('./routes/signup');
var signInRoute = require('./routes/signin');
var signOutRoute = require('./routes/signout');
var postRoute = require('./routes/post');

var checkLogin = require('./middlewares/check.js').checkLogin;
var checkNotLogin = require('./middlewares/check.js').checkNotLogin;

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

app.use(express.static(__dirname + ''));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

/* ------------- Post ------------- */
app.get('/api/blogpost', postRoute);
app.get('/api/blogpost/:id', checkLogin, postRoute);
app.post('/api/blogpost', checkLogin, postRoute);
app.put('/api/blogpost/:id', checkLogin, postRoute);
app.delete('/api/blogpost/:id', checkLogin, postRoute);


/* -------------- User ------------ */
app.use('/signup', signUpRoute);
app.use('/signin', checkNotLogin, signInRoute);
app.use('/signOut', checkLogin, signOutRoute);

app.use('/sign_redirect', checkLogin, checkNotLogin);

app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});






















