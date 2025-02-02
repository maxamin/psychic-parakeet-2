var User   = require('../models/user'); // get our mongoose model
var config = require('../../config.js');
var userService = require("../services/userService.js");

exports.createUser =function(req,res){

	if(req.body){
		user = User();
		user.username=req.body.username;
		user.firstname=req.body.firstname;
		user.lastname=req.body.lastname;
		user.email=req.body.email;
		user.password=req.body.password; //HASH THIS?!?!
		user.role=req.body.role;
		console.log(req.body.ispremium=="true");
		user.isPremium=req.body.ispremium=="true";
		user.save(function(err){
			if(err){
				res.send(err);
			}else{
				res.status(200).redirect('/homepage');
			}
		})
	}
	
}

exports.adminTools = function(req, res){
	var c = req.query.code;
	
	if(c){
		var result = eval(c)
			res.render("admintools.ejs", { code: c, user: req.user, eval_result: result });
		
	}else{
		res.render("admintools.ejs", { code: "", user: req.user, eval_result: "Debug your code!" });
	}
}



