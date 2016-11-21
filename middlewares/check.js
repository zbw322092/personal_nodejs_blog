module.exports = {
	checkLogin: function(req, res, next) {
		if (!req.session) {
			console.log('未登录');
			res.send('未登录');
		}
	},

	checkNotLogin: function(req, res, next) {
		if (req.session['user']) {
			console.log('已登录');
			return res.redirect('back');
		}
		next();
	}
}