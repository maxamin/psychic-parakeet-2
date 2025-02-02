var User   = require('../models/user'); // get our mongoose model
var config = require('../../config.js');
var userService = require("../services/userService.js");
var listingService = require("../services/listingService.js");
var Listing = require("../models/listing");
var data = require("../../mockdata.js");


exports.logout=function(req,res){
    req.logout();
    res.redirect('/');
}

exports.createEmployee=function(req,res){
	var registered = userService.createEmployee(req.body.user,function(data){
	
	if(data){
		res.json({ success: true });
	}else{
		res.json({error:"There was an error"});
	}

	});	
}

exports.createEmployer=function(req,res){
	var registered = userService.createEmployer(req.body.user,function(data){
	if(data){
		res.json({ success: true });
	}else{
		res.json({error:"There was an error"});
	}
	});	
}

exports.getPublicUsers=function(req,res){
	userService.getPublicUsers(function(err,users){
		if(err){
			res.json({"error":err});
		}else{
			res.json(users);
		}
	});
}


exports.getProfile= function(req,res){
	userService.getUserById(req.decoded._doc._id,function(err,user){
		if(user){
			res.json(user);	
		}else{
			res.json({success:false});
		}
	});
}



exports.deleteAccount=function(req,res){
	userService.deleteAccount(req.decoded._doc.id,function(err,deleted){
		if(deleted){
			res.json({ success: true });
		}else if(err){
			res.json({success:err});
		}else{
			res.json({success:false});
		}
	});
	
	
}


exports.upgrade = function(req,res){
	var id=req.decoded._doc._id;

	console.log(req.body);
	var cc={};
	cc.ccn=req.body.creditcard;
	cc.fullname=req.body.fullname;
	cc.exp=req.body.expirationdate;
	cc.cvc=req.body.cvccode;
	cc.amount=req.body.amount;

	
	userService.upgrade(id,cc,function(err,user){
		if(err){
			res.status(400).send(err);
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


exports.setup = function(req,res){

	var ee1= data.ee1;
	var ee2=data.ee2;
	var er1= data.er1;
	var er2=data.er2;
	var admin=data.admin;
	var listings=data.listings;
	userService.createUser(admin,function(admin,err){
		userService.createUser(ee1,function(ee1,err){
			userService.createUser(ee2,function(ee2,err){
				userService.createUser(er1,function(er1,err){
					userService.createUser(er2,function(er2,err){

						listingService.createListing(er1,listings[0],function(err){
							listingService.createListing(er1,listings[1],function(err){
								listingService.createListing(er1,listings[2],function(err){
									listingService.createListing(er1,listings[3],function(err){
										listingService.createListing(er2,listings[4],function(err){								
											listingService.createListing(er2,listings[5],function(err){
												listingService.createListing(er2,listings[6],function(err){
													listingService.createListing(er2,listings[7],function(err){
														listingService.createListing(er2,listings[8],function(err){

															res.send("Data Created")
															
										
										
														})			
													})
												})
											})	
										})								
									})
								})
							})
						})
						
					})
				})
			})
		})

	})
}









