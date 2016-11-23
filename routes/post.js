var express = require('express');
var router = express.Router();

var PostModel = require('../models/postModel.js');

router.get('/api/blogpost', function(req, res, next) {
	PostModel.getAllPosts()
			.then(
				function(posts) {
					res.json(posts);
				},
				function(error) {
					res.sendStatus(400);
				}
			);
});

router.get('/api/blogpost/:id', function(req, res, next) {
	PostModel.getPost(req.params.id)
			.then(
				function(post) {
					res.json(post);
				},
				function(error) {
					res.sendStatus(400);
				}
			);

});

router.post('/api/blogpost', function(req, res, next) {
	PostModel.createPost(req.body)
			.then(
				function(postObj) {
					res.send('A blog post is created!');
				},
				function(error) {
					res.sendStatus(400);
				}
			);
});

router.put('/api/blogpost/:id', function(req, res, next) {
	PostModel.updatePost(req.params.id, req.body)
			.then(
				function(status) {
					res.sendStatus(200);
				},
				function(error) {
					res.sendStatus(400);
				}
			);
});

router.delete('/api/blogpost/:id', function(req, res, next) {
	PostModel.deletePost(req.params.id)
			.then(
				function(status) {
					res.sendStatus(200);
				},
				function(error) {
					res.sendStatus(400);
				}
			);
});



module.exports = router;
























