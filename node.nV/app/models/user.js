var mongoose = require('mongoose');
var Hash = require('password-hash');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// set up a mongoose model
var User = new Schema({ 
	username: String, 
	password: String, 
	email: String,
	answer: String,
	firstname: String,
	cc:[{
		ccn:String,
		fullname:String,
		exp:Date,
		cvc:String
	}],
	balance:Number,
	lastname: String,
	isPremium:Boolean,
	enabled:Boolean,
	accountNonExpired:Boolean,
	credentialsNonExpired:Boolean,
	accountNonLocked:Boolean,
	applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }],
	interviews:[String],
	offers:[String],
	rejected:[String],
	role:Number, //employee-1 | employer-2
	following:[String] //If employee - employers| if employer, memp
	
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
