/* Модель пользователя, для mongodb
 */

var crypto = require('crypto'),
    mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var User = new Schema({
    name: {
	type: String,
	required: true
    },
    login: {
	type: String,
	unique: true,
	required: true
    },
    hashedPassword: {
	type: String,
	required: true
    },
    salt: {
	type: String,
	required: true
    }
});

User.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1
});

User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

User.virtual('password')
    .set(function (password) {
	this.salt = Math.random() + '';
	this.hashedPassword = this.encryptPassword(password);
});


module.exports = mongoose.model('User', User);
