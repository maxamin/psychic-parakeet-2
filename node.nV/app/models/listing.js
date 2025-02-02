var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Listing', new Schema({ 
	owner:{id:String,name:String},
	name:String,
	description:String,
	created:Date,
	deadline:Date,
	isPremium:Boolean,
	reviews:[{
		details:String,
		rating:Number,
		created:Date
		}]
}));