var User   = require('../models/user'); // get our mongoose model
var Listing = require('../models/listing');
var config = require('../../config.js');
var employerService = require("../services/employerService.js");
var userService = require("../services/userService.js");
var listingService = require("../services/listingService.js");
var UIRoutes = require('./UIRoutes.js');

exports.createListing=function(req,res){

	listingService.createListing(req.user,req.body,function(err,result){
		if (err) {
		 	req.flash("error", err.toString());
			res.redirect("/homepage");
		} else {
			req.flash("success", "Listing Successfully Created")
			res.redirect("/homepage");
		}
	});
}

exports.createListingView=function(req,res){
	res.render("ercreateListing.ejs", {user: req.user});
}

exports.updateListing=function(req,res){
	listingService.editListing(req.body,function(err,success){
		if(err){
			res.send(err);
		}else{
			res.redirect(302, '/review?id=' + req.body.id);
		}
	});

}

exports.getListings=function(req,res){
	var id=req.decoded._doc._id;
	employerService.getListingsByOwner(id,function(listings,err){
		if(listings){
			res.json(listings);
		}else if(err){
			res.json({error:err});
		}else{
			res.json({success:false});
		}
	});
}


exports.updateEmployer=function(req,res){
		var id=req.decoded._doc._id;
		console.log(req.body);
		employerService.updateEmployerUsername(id,req.body,function(err,user){
		if(err){
			res.json({error:err});
		}else{
			userService.authenticate(user.username,user.password,function(err,user){
				if(err){
				res.json({"error":err});
				}else{
				res.redirect('/homepage');
				}


			});
			
			
		}
	});
}


exports.acceptForOffer=function(req,res){

	
	var employeeId=req.query.employeeId;
	var listingId = req.query.listingId;
	employerService.acceptForOffer(employeeId,listingId,function(err,result){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});
		
}

exports.acceptForInterview=function(req,res){
	var employeeId=req.query.employeeId;
	var listingId=req.query.listingId;
	employerService.acceptForInterview(employeeId,listingId,function(err,success){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});
}



exports.rejectApplication=function(req,res){
	var employeeId=req.query.employeeId;
	var listingId=req.query.listingId;
	employerService.rejectApplication(employeeId,listingId,function(err,success){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});
}


exports.search = function(req,res){
	var query=req.query.q;
	listingService.search(query,function(listings,err){
		if(listings){
			res.redirect("/search?listings="+listings);
		}else{
			res.json(err);
		}		
		
	});
	
}


exports.editListing=function(req,res){
	id = req.query.id;
	listingService.getListingById(id,function(listing,err){
		if(!listing){
			console.log(err);
			res.send(err);
		}else{
			res.render("eredit.ejs",{user:req.user,listing:listing});
		}

	});
}

//Premium Services ================================================================================================================================
exports.followEmployee=function(req,res){
	var employerId=req.decoded._doc._id;
	var employeeId=req.body.employeeId;
	employerService.followEmployee(employerId,employeeId,function(err,success){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}
	});

}
//Premium Service
exports.getRequestedEmployees=function(req,res){
	var id=req.decoded._doc._id;
	employerService.getRequestedEmployees(id,function(err,requested){
		if(err){
			res.json({error:err});
		}else{
			res.json(requested);
		}

	});
}
//Premium Service
exports.deleteRequestedApplication =function(req,res){
	var employerId=req.decoded._doc._id;
	employerService.deleteRequestedEmployees(employerId,req.body.employeeId,function(err,requested){
		if(err){
			res.json({error:err});
		}else{
			res.json({success:true});
		}

	});
}






