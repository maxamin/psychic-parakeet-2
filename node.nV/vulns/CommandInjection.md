## Command Injection

#### Description

Command and Expression Language Injection vulnerabilities are a class of vulnerability similar to SQL Injection where attackers can execute malicious on the server. Often times, untrusted data that is improperly validated can end up in strings that are directly executed as system commands or code, and become indistinguishable from the code created by the original developer. Command and Expression Language Injection attacks are often used to establish a foothold on the affected server that is then leveraged by an attacker to further attack an organization's network.

The most common avenue for any injection attack is when unverified input is directly concatenated into a command string.

#### Problem
1. Navigate to the ping endpoint
URL: http://localhost:8081/ping

The node.nV application contains a page which was originally designed to test network conectivity via ping. However, because the backend service does not validate inputs, the page is vulnerable to Command Injection.

#### Walkthrough

1. Navigate to the ping endpoint `http://localhost:8081/ping`
2. Type `;ls` into the search form
3. Note that you will receive back the directory listing results. Results are those of the current directory the application is running out of.

#### Code Snippet
UIRoutes.js

```
var ip = req.query.q;

if(ip){
	exec('ping -c 5 '+ip,function(err,stdout,stderr){
		res.render("adminping.ejs", { q: ip, user: req.user, ping: stdout });
	});
}else{
	res.render("adminping.ejs", { q: "", user: req.user, ping: "Submit An IP Address To Test Connectivity!" });
}
```

#### Solution

The main solution for dealing with command injection attacks is to remove any evaluation or passing of user-controlled parameters back to command interpreters. Alternatively, you can create a whitelist of valid values (IP addresses, in our case), and if the user input matches any of these values (strict check) then it is allowed to proceed forward. 


This functionality very rarely needs user-input, but if it does, input validation must be performed to eliminate control characters that give an attacker freeform access to commands and expressions. 

In some languages and frameworks, it is possible to perform parameterized system commands which are considered safer, much like SQL offers parameterized queries in order protect against SQL Injection.


#### Solution Code 

`childProcess.execFile` is a solution that allows us to parameterize our system commands and is an effective way of preventing OSCI. Note the following code:


```
exports.ping=function(req,res){
	var ip = req.query.q;
	
	if(ip){
		execFile('/sbin/ping', ['-c', '5', ip], function (err, result) {
			res.render("adminping.ejs", { q: ip, user: req.user, ping: result });
		});
	}else{
		res.render("adminping.ejs", { q: "", user: req.user, ping: "Submit An IP Address To Test Connectivity!" });
	}
	
}
       
```

The safe modification is made here, in that above code:

```
	execFile('/sbin/ping', ['-c', '5', ip], function (err, result) {
		res.render("adminping.ejs", { q: ip, user: req.user, ping: result });
	});
```

