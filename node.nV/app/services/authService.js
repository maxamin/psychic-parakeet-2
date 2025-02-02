var Listing   = require('../models/listing');

exports.isAuthenticated = function(req, res, next) {
	if (req.user) {
		next();
	} else {
		req.flash("error", "You must authenticated to access this page!")
		res.redirect(302, "/")
	}
}

exports.isEmployee = function(req,res,next){
	if (req.user && (req.user.role === 1)) {
		next();
	} else {
		req.flash("error", "You do not have access this page!")
		res.redirect(302, "/homepage")
	}
	
}

exports.isEmployer = function(req,res,next){
	if (req.user && (req.user.role === 2)) {
		next();
	} else {
		req.flash("error", "You do not have access this page!")
		res.redirect(302, "/homepage")
	}
	
}

exports.isAdmin = function(req,res,next){
	if (req.user && (req.user.role === 3)) {
		next();
	} else {
		req.flash("error", "You do not have access this page!")
		res.redirect(302, "/homepage")
	}	
	
}

exports.listingBelongsToUser = function(req, res, next) {
	var id = "";
	if (req.query.id) {
		id = req.query.id
	} else if (req.body.id) {
		id = req.body.id
	}
	
	if (id.length > 0 ) {

		Listing.findOne({"owner.id":req.user.id, "_id": id }, function(err, listing) {

		if(err){ 
			req.flash("error", "You are not authorized to access this listing");
			res.redirect('/homepage');
		}
		else if (listing){
			next();
		}	else {
			req.flash("error", "You are not authorized to access this listing");
			res.redirect('/homepage');	
		}
		});
	}
}


