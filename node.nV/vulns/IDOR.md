## Insecure Direct Object References

#### Description

Insecure Direct Object References are a class of vulnerability where users are able to directly access database objects based on their input. This commonly manifests itself in application URLs that end in an object identifier, such as ```/profile?id=<user id>```. 
	
In order for this problem to be an *insecure* direct object reference, it should allow the attacker to bypass normal authentication methods. For example, a system that stores invoices and allows them to be accessed by ID (```/invoice?id=343243```) would have IDOR vulnerabilities if an attacker could bruteforce ID numbers to view other users' private invoices.

#### Problem
Navigate to an edit listings page on the Employer Dashboard.
1. Authenticate to the application as an employer.
2. Navigate to the Listings Tab.
3. Click on the eye in the status tab of any listing to edit that listing.

Example URL: http://localhost:8081/editListing?id=57d707573952354d2802926a


There is no verification that the user submitting the request is attempting to view their own information. It is reasonable to assume that Employers do not want other employers modifying their listings. Yet, if an Employer passes in a document ID that is not one of its own, the application will dutifully reveal that listing's information and allow the user to edit.



#### Walkthrough

1. Navigate to the following URL:

http://localhost:8081/

2. Click on a listing for "OtherAppSecFirm", this should bring you to the `/login?next=/review?id=<some listing id>`:

Example URL: `http://localhost:8081/login?next=/review?id=593e8cdcf6d647e16fc85960`

3. Copy that value for later. Now, authenticate as the *nvisium* user (nvisium/abc123!!).

4. Choose one of your listings from the homepage and click "Edit Listing"

5. Replace the identifier in the url with the value we copied from earlier.

Example, change: 

`http://localhost:8081/edit_listing?id=593e8cdcf6d647e16fc8595c` 

To:

`http://localhost:8081/edit_listing?id=593e8cdcf6d647e16fc85960`. 

6. Note that you have successfully updated OtherAppSecFirm's listing

#### Code Snippet

Both the following routes check that a user is authenticated but do *not* check they own the listing they are asking to interact with:

server.js

```
app.get('/edit_listing', authService.isEmployer, employerRoutes.editListing);
app.post('/update_listing', authService.isEmployer, employerRoutes.updateListing);
```

For example, with the update route, the code takes whatever ID is provided the user and updates its attributes:

```
exports.updateListing=function(req,res){
	listingService.editListing(req.body,function(err,success){
		if(err){
			res.send(err);
		}else{
			res.redirect(302, '/review?id=' + req.body.id);
		}
	});

}
```

services/listingService.js

```
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
```

#### Solution

Implement middleware for authorization of endpoints, note the addition of `authService.listingBelongsToUser` :

```
app.get('/edit_listing', authService.isEmployer, authService.listingBelongsToUser, employerRoutes.editListing);
app.post('/update_listing', authService.isEmployer, authService.listingBelongsToUser, employerRoutes.updateListing);

```

The following function can be used for ensuring that employers can only access their listings:

services/authService.js

```
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
```

This kind of middleware can be adapted based on the parameter that requires validation.


