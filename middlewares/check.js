module.exports = {
	checkLogin: function(req, res, next) {
		if (!req.session.user) {
			res.send('未登录');
		}
		next();
	},

	checkNotLogin: function(req, res, next) {
		if (req.session.user) {
			res.send('已登录');
		}
		next();
	}
}