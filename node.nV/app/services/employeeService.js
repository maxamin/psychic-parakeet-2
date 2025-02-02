var User   = require('../models/user');
var Listing   = require('../models/listing'); // get our mongoose model
//Employee Stuffs


exports.updateEmployeeUsername=function(id,username,callback){
	User.update({_id:id},{ $set: { username: username }}, callback());
}


exports.applyForJob=function(employeeId,listingId,callback){
	if(employeeId ==null|| listingId==null){
		callback("Must supply valid Params");
	}
	else{
		User.findById(employeeId,function(err,employee){
			if(err){
				callback(err);
			}else{
				if(employee.applications.contains(listingId)){
				callback("Already Applied for Job");
			}else{
				employee.applications.push(listingId);
				employee.save(function(err){
					callback(err);
				});
			}
		}
		});
	}
	
}

exports.listInterviews=function(id,callback){
		User.findById(id, function(err, user) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,user.interviews);
		}	
		});
}

exports.listOffers=function(id,callback){
	if(id==null){
		callback("Must supply valid Params");
	}else{
		User.findById(id, function(err, user) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,user.offers);
		}	
		});
	}
	
}

exports.listSentApplications=function(id,callback){
	if(id==null){
		callback("Must supply valid Params");
	}
	else{
		User.findById(id, function(err, user) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,user.applications);
		}	
		});
	}
}


exports.getListings = function(callback){
		Listing.find({}, function(err, listings) {
		if(err){ 
			callback(err,null);
		}
		else{
			callback(false,listings);
		}	
		});
}







