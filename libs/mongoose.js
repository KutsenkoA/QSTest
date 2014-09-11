var mongoose = require("mongoose"),
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect("mongodb://localhost/qstest", function(err) {
    if (err) {
	console.log(err);
	process.exit(1);
    } else {
	console.log('Connect to mongodb');
    }
});

autoIncrement.initialize(connection);

module.exports = mongoose;
