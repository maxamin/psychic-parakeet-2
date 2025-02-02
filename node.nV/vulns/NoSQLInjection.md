## NoSQL Injection

#### Description

NoSQL Databases such as MongoDB are still vulnerable to "NoSQL" injection if queries are not safely handled. 

#### Problem

URL: `http://localhost:8081/view_applications?query={"_creator": "<some user id>"}`

The node.nV application parses user-input using the JSON library in order to directly construct an entire mongo database query therefore it allows a user to change the query and interact with the database differently than intended.

#### Walkthrough

Step 1. You need *at least* two user accounts to have applied for a job listing.
Step 2. Authenticate using one of the two accounts you have created job applications for.
Step 3. Navigate to the "Navigation Bar at the top of the page. Click on Settings -> View My Applications.
Step 4. Modify the query in the browser from `query={"_creator": "<some user id>"}` to `query={"_creator": {"$gte":""}}`
Step 5. Review the results. You should be able to see everyone's applications.


#### Code Snippet

User input is parsed as JSON and placed directly into a query:

routes/employeeRoutes.js

```
exports.viewApplications = function(req, res){
	query = JSON.parse(req.query.query)
	applicationService.getApplicationsByEmployee(query, function(err, apps ){
		res.render("eeListApplications.ejs", {user: req.user, applications: apps })
	});
}

```

services/applicationService.js

```
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
```


#### Solution Code

There is no real need to allow an entire query to be constructed by the user *nor* a reason to allow a user to control the `_creator_` identifier value (see Insecure Direct Object Reference). Instead, we should use `req.user.id` rather than allowing the user to dictate the identifier.


routes/employeeRoutes.js
```
exports.viewApplications = function(req, res){
	applicationService.getApplicationsByEmployee(req.user.id, function(err, apps ){
		res.render("eeListApplications.ejs", {user: req.user, applications: apps })
	});
}
```

services/applicationService.js

```
exports.getApplicationsByEmployee = function(id, callback) {
	Application
	.find({"_creator":id})
	.populate('_listing')
	.exec(function (err, applications) {
	  if (err) {
	  	callback(err);
	  } else {
	  	callback(false, applications);
	  }
	});
}
```
