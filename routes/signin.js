var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var UserModel = require('../models/userModel.js');

// var checkNotLogin = require('../middlewares/check.js');

router.post('/', function(req, res, next) {
	var username = req.body.name;
	var password = req.body.password;

	UserModel
		.getUserByName(username)
		.then(
			function(result) {
				console.log('I get an user: ', result);
				if (!result) {
					return res.send('用户不存在');
				}

				if(sha1(password) !== result.password) {
					return res.send('用户名或密码错误');
				}

				delete result.password;
				req.session.user = result;
				res.send('登录成功');
			},
			function(error) {
				console.log(error);
				res.sendStatus(400);
			}
		);
});

module.exports = router;








