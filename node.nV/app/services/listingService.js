var Listing   = require('../models/listing');

exports.getListings = function(isPremium,callback){
	if(isPremium){
		Listing.find({}, function(err, listings) {
		if(err){ 
			callback(err,listings);
		}
		else{
			callback(err,listings);
		}	
		});

	}else{
		Listing.find({isPremium:false}, function(err, listings) {
		if(err){ 
			callback(err,[]);
		}
		else{
			callback(false,listings);
		}	
		});

	}
		
}

exports.getListingsByEr = function(id,callback){

		Listing.find({"owner.id":id}, function(err, listings) {

		if(err){ 

			callback(err,listings);
		}
		else{

			callback(err,listings);
		}	
		});
		
}


exports.searchAll = function(q,isPremium,callback){

if(isPremium){
	
	Listing.find({description:RegExp(q,'i')}, function(err, doc) {
		if(err){
			callback(err,doc);
		}else{

			callback(err,doc);
		}
	});
}else{
	Listing.find({description:RegExp(q,'i'),isPremium:false}, function(err, doc) {
		if(err){
			callback(err,doc);
		}else{
			callback(err,doc);
		}
	});
}
	
}

exports.searchER = function(id,q,isPremium,callback){

	if(isPremium){
			Listing.find({"owner.id":id}, function(err, doc) {
		if(err){
			
			callback(err,doc);
		}else{

			callback(err,doc);
		}
		});
	}else{
		Listing.find({"owner.id":id,isPremium:false}, function(err, doc) {
		if(err){
			callback(err,doc);
		}else{
			callback(err,doc);
		}
		});

	}

	
}


exports.writeReview = function(id,rev,callback){
	Listing.findById(id,function(listing,err){
		if(err){
			callback(err);
		}else{
			review = {};
		}
	});

}

exports.getListingById=function(id,callback){
	Listing.findById(id,function(err,listing){
		if(err){
			callback(err,[]);
		}else{
			callback(listing);
		}
	});
}

exports.editListing=function(listing,callback){
	var id=listing.id;
	Listing.findById(id,function(err,record){
		if(err){
			callback(false,err);
		}else{
			record.name=listing.name;
			record.description=listing.description;
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

exports.createListing= function(user,listing,callback){

	var newListing= Listing();
	newListing.owner={};
	newListing.owner.id=user._id;
	newListing.owner.name=user.username;
	
	newListing.name=listing.name;
	newListing.description = listing.description;
	newListing.applied=[];
	newListing.interview=[];
	newListing.offer=[];

	
	newListing.save(function(err) {
		if (err) callback(err);
		callback(false,newListing);
	});	
}