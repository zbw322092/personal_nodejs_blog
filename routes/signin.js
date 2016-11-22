var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var UserModel = require('../models/userModel.js');

// var checkNotLogin = require('../middlewares/check.js');

router.post('/', function(req, res, next) {
	var username = req.body.name;
	var password = req.body.password;
	sess = req.session;

	UserModel
		.getUserByName(username)
		.then(
			function(result) {
				if (!result) {
					return res.send('用户不存在');
				}

				if(sha1(password) !== result.password) {
					return res.send('用户名或密码错误');
				}

				delete result.password;
				sess.user = result;
				console.log(req.session);
				res.send('登录成功');
			},
			function(error) {
				console.log(error);
				res.sendStatus(400);
			}
		);
});

module.exports = router;








