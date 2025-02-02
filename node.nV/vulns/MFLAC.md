## Missing Function Level Access Control

#### Description

Missing Function Leval Access Control or "MFLAC" occurs when authorization is not performed on a function prior to granting user access to the function.

#### Problem
1. Navigate to the ping endpoint
URL: http://localhost:8081/ping

The node.nV ping contains a page which was originally designed to test network conectivity via ping. However, any user can access this page as no authorization is performed prior to allowing a user to interact with the page.

#### Walkthrough

1. Navigate to the ping endpoint `http://localhost:8081/ping`
2. You now have access to an endpoint that was originally intended to be used only by administrators

#### Code Snippet
Note the lack of an authorization filter

server.js

```
app.get('/ping', UIRoutes.ping);
```

#### Solution

The main solution for dealing with MFLAC is to enforce authorization on the endpoint. We need to verify the user is both authenticated AND an administrator.


#### Solution Code 

server.js

```
app.get('/ping', authService.isAuthenticated, authService.isAdmin, UIRoutes.ping);
       
```

The following functions are from services/authService.js


```
exports.isAuthenticated = function(req, res, next) {
	if (req.user) {
		next();
	} else {
		req.flash("error", "You must authenticated to access this page!")
		res.redirect(302, "/")
	}
}

```


```
exports.isAdmin = function(req,res,next){
	if (req.user && (req.user.role === 3)) {
		next();
	} else {
		req.flash("error", "You do not have access this page!")
		res.redirect(302, "/homepage")
	}	
	
}
```