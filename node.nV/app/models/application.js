var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Application = new Schema({ 
	_creator : { type: String, ref: 'User' },
	reasonApplied:String,
	background:String,
	created:Date,
	_listing : { type: String, ref: 'Listing' }
});

module.exports = mongoose.model('Application', Application);