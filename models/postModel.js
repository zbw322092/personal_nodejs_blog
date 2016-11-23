var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
	title: { type: String, required: true },
	body: String,
	tag: { type: String, enum:['POLITICS', 'ECONOMY', 'EDUCATION'] },
	posted: { type: Date, default: Date.now }
}, { collection: 'post'});

var PostModel = mongoose.model('PostModel', PostSchema);

module.exports = {
	getAllPosts: function() {
		return PostModel
			.find();
	},

	getPost: function(postId) {
		return PostModel
			.findById({_id: postId});
	},

	createPost: function(data) {
		return PostModel
			.create(data);
	},

	updatePost: function(postId, post) {
		return PostModel
			.update({_id: postId}, {
				title: post.title,
				body: post.body
			});
	},

	deletePost: function(postId) {
		return PostModel.remove({_id: postId});
	}
}