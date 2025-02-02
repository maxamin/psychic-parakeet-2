var roles=require('../roles.js')["roles"];
var listingService = require('../services/listingService.js');
var employeeService= require('../services/employeeService.js');
var userService = require('../services/userService.js');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var config = require('../../config.js');

exports.index = function(req, res){
	employeeService.getListings(function(err,listings){
		res.render("index.ejs", {listings: listings, user: req.user});
	});
}

exports.login = function(req, res){
		res.render("login.ejs", {next_url: req.query.next});
}

exports.register = function(req, res){
	if (!req.body.role || req.body.role === 0) {
	 req.flash('error', 'Please provide a role when registering!')
	 res.redirect("/login")
	} else {
	
		var registered = userService.createUser(req.body,function(data, error){
			
			if(error){
				req.flash('error', error.toString());
			    res.redirect(302, '/login');
			}else if (data) {
				req.login(data, function(err) {
				   if (err) {
				     console.log(err);
				   }
				});
				res.redirect(302, '/homepage')
				//res.render("/homepa", {user: data});
			}
    	
		});
	}
}

exports.homepage = function(req, res){
	if ((req.user.role == 1)) {
		employeeService.getListings(function(err,listings){
			res.render("homepage.ejs", {listings: listings, user: req.user});
		});
	} else if ((req.user.role == 2)) {
		listingService.getListingsByEr(req.user.id, function(error, listings){
			res.render("homepage.ejs", {listings: listings, user: req.user});
		})
	} else {
		employeeService.getListings(function(err,listings){
			res.render("homepage.ejs", {listings: listings, user: req.user});
		});
	}

		
		
}

exports.settings = function(req, res) {
	res.render("settings.ejs", { user: req.user });
}

exports.updateSettings = function(req, res){
	userService.updateUser(req.user.id, req.body, function(err,userInfo) {
		if (err) {
			req.flash("error", err.toString());
			res.redirect(302, "/settings")
		} else {
			req.flash("success", "Your information was successfully updated");
			res.redirect(302, "/login")
		}
	});
}

exports.listings = function(req, res) {
	var uname=req.decoded._doc.username;
	var user=req.decoded._doc;
	var root=roles[req.decoded._doc.role];
	var id = req.decoded._doc._id;
	var isPremium=req.decoded._doc.isPremium;

	if(root=="er"){
		
		listingService.getListingsByEr(id,isPremium,function(err,listings){
		res.render(root+"listings.ejs", { username: uname,listings:listings });
		});

	}else{
		listingService.getListings(isPremium,function(err,listings){
		res.render(root+"listings.ejs", { username: uname,listings:listings });
		});
	}
	
	
}
exports.createListing = function(req, res) {
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render("ercreateListing.ejs", { username: uname });
}


exports.jobs = function(req, res) {
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render(root+"jobs.ejs", { username: uname });
}

exports.search = function(req, res) {
	var uname=req.decoded._doc.username;
	var user= req.decoded._doc;
	var root=roles[req.decoded._doc.role];
	var query = req.query.q;


	if(req.query.q){
		if(root=="er"){

			userService.getEE(query,user.isPremium,function(err,users){
				res.render("ersearch.ejs", { q: query, username: uname, users: users });
			});
			
		}
		else{
			listingService.searchAll(query,user.isPremium,function(err,listings){
			res.render(root+"search.ejs", { q: query, username: uname, listings: listings });
			});
		}
		
	}else{
		if(root=="er"){
			res.render("ersearch.ejs", { q: query, username: uname, users: [] });
		}else{
			res.render(root+"search.ejs", { q:"", username: uname, listings: [] });
		}
		
	}
	
}


exports.funds=function(req,res){
	var uname=req.decoded._doc.username;
	var root=roles[req.decoded._doc.role];
	res.render(root+"funds.ejs",{username:uname});
}


exports.review=function(req,res){
	id = req.query.id;
	listingService.getListingById(id,function(listing,err){
		if(!listing){
			console.log(err);
			res.send(err);
		}else{
			res.render("eeReview.ejs",{user:req.user,listing:listing});
		}

	});
	
	
	
}


//Admin Routes

exports.ee=function(req,res){
		var uname=req.decoded._doc.username;

		userService.getEmployees(function(users,err){

			res.render("adminemployee.ejs",{username:uname,employees:users});

		});
		
}
exports.er=function(req,res){
		var uname=req.decoded._doc.username;
		userService.getEmployers(function(users,err){
			res.render("adminemployer.ejs",{username:uname,employers:users});
		});
		
}

exports.ping=function(req,res){
	var ip = req.query.q;
	
	if(ip){
		exec('ping -c 5 '+ip,function(err,stdout,stderr){
			res.render("adminping.ejs", { q: ip, user: req.user, ping: stdout });
		});
	}else{
		res.render("adminping.ejs", { q: "", user: req.user, ping: "Submit An IP Address To Test Connectivity!" });
	}
	
}

exports.create=function(req,res){
	var uname=req.decoded._doc.username;
	res.render("admincreate.ejs", {username:uname});
}