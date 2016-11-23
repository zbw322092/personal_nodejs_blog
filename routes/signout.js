var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	req.session.user = null;
	res.send('登出成功');
});

module.exports = router;