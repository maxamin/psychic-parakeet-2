var Application  = require('../models/application'); // get our mongoose model

exports.createApplication = function(application, callback){
	var app = new Application({ 
	_creator : application.creator,
	reasonApplied: application.reasonApplied,
	background: application.background,
	_listing : application.listing
	});
}

exports.getApplicationsByEmployee = function(query, callback) {
	Application
	.find(query)
	.populate('_listing')
	.exec(function (err, applications) {
	  if (err) {
	  	callback(err);
	  } else {
	  	callback(false, applications);
	  }
	});
}

exports.getApplicationById = function(id, callback) {
	Application
	.findOne({"_id":id})
	.populate('_listing')
	.populate('_creator')
	.exec(function(err, application){
		
		if (err) {
			callback(err);
		} else {
			callback(false, application);
		}
		
	});
}

exports.editApplication=function(application,callback){
	var id=application.id;
	Application.findById(id,function(err,record){
		if(err){
			callback(false,err);
		}else{
			record.reasonApplied = application.reasonApplied;
			record.background = application.background;
			record.save(function(err){
				if(err){
					callback(err);
				}else{
					callback(false, record);
				}
			})
		}
	});
}