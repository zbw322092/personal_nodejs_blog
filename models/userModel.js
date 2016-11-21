var mongoose = require('mongoose');

var SignUpSchema = mongoose.Schema({
	username: { type: String, required: true, index: true, unique: true },
	password: { type: String, require: true },
	gender: { type: String, enum: ['Male', 'Female', 'Perfer not to say'] },
	bio: { type: String }
});

var SignUpModel = mongoose.model('SignUpModel', SignUpSchema);

module.exports = {
	createAcoount: function(data) {
		return SignUpModel
			.create(data);
	},

	getUserByName: function(data) {
		return SignUpModel
			.findOne({username: data});
	}
}