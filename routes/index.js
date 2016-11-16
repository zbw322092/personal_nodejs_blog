var express = require('express');
var route = express.Router();

exports.initalPage = function(req, res, next) {
	res.send('Bowen Nodejs Blog');
}

exports.author = function(req, res, next) {
	res.send(req.params.name);
}