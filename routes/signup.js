var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var UserModel = require('../models/userModel.js');

// var checkNotLogin = require('../middlewares/check.js');

router.post('/', function(req, res, next) {
	console.log('I got the data: ', req.body);
	var name = req.body.name;
	var password = req.body.password;
	var repassword = req.body.repassword;
	var gender = req.body.gender;
	var bio = req.body.bio;

	try {
		if (!(name.length >=1 && name.length <=10)) {
			throw new Error('名字请限制在 1-10 个字符');
		}
		if (['Male', 'Female', 'Perfer not to say'].indexOf(gender) === -1) {
			throw new Error('性别只能是 Male, Female 或 Perfer not to say');
		}
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符');
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符');
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致');
    }
	} catch(e) {
		// res.send(e.message);
		console.log(e);
		return res.redirect('/signup');
	}

	password = sha1(password);

	var signupUserInfo = {
		username: name,
		password: password,
		gender: gender,
		bio: bio
	}

	UserModel
		.createAcoount(signupUserInfo)
		.then(
			function(result) {
				console.log('there is a result: ', result);
			},
			function(error) {
				console.log('there is an error: ', error);
			}
		);

});

module.exports = router;








