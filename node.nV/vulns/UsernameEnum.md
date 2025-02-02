## Username Enumeration

#### Description

Username Enumeration refers to the ability of an attacker to determine which usernames are registered within the system, without having information about user passwords. Username Enumeration usually occurs when an action, such as attempting to log in or resetting your password, returns different information when an account exists with the given username and when an account does not exist with the given username. This allows an attacker to focus on only the passwords of the account during their attack.


#### Problem
URL: http://localhost:8081/login

The node.nV developers attempted to make their registration (/login) page more user friendly by specifying exactly what occurs when the user enters the incorrect information. If the user experiences an error while registering, the application will display the reason on the page - such as "This User Already Exists".

#### Walkthrough

1. Navigate to the login page (```/login```)
2. Attempt to register in with credentials that already exist ```Username: nvisium, Password: notreal```. 
3. Note that because the user already exists, a message will indicate this is the case.

#### Code Snippet
app/routes/UIRoutes.js

```
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
  

```

This line in particular presents an issue:

`req.flash('error', error.toString());`

#### Solution

Ensure that pages do not leak information about which users are registered in the system. Registration pages should only display a generic fail message with information relating to user authentication. 

If you use a password hash that is purposely slow, such as bcrypt/scrypt/pbkdf2, it is important to ensure that the algorithm is still run even when a user is not found. When a login is checked and the username does not exist, you should hashing a random string so the difference in response time will not leak information that could be used to enumerate users.

#### Solution Code 

app/routes/userRoutes.js

```
exports.register = function(req, res){
	if (!req.body.role || req.body.role === 0) {
	 req.flash('error', 'Please provide a role when registering!')
	 res.redirect("/login")
	} else {
	
		var registered = userService.createUser(req.body,function(data, error){
			
			if(error){
				req.flash('error', "Something went wrong, please try again with different information or check back later");
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

```
