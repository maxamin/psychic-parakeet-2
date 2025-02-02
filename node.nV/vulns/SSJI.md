## Server Side JavaScript Injection

#### Description

Dangerous methods such as `eval`, `Function`, `setTimeout`, and `setInterval` should not incorporate user data as they can lead to remote code execution flaws like SSJI.

#### Problem

URL: `http://localhost:8081/tools`

The node.nV application parses user-input and incorporates that user data into an `eval()` statement effectively executing user input as code.

#### Walkthrough

Step 1. Navigate to http://localhost:8081/tools
Step 2. Enter either `process.exit()`, `require('fs').readdirSync('.').toString()`, or `require('fs').readFileSync('server.js');` into the code field.
Step 3. Click submit
Step 3. Review results


#### Code Snippet

User input is parsed as JSON and placed directly into a query:

routes/adminRoutes.js

```
exports.adminTools = function(req, res){
	var c = req.query.code;
	
	if(c){
		var result = eval(c)
			res.render("admintools.ejs", { code: c, user: req.user, eval_result: result });
		
	}else{
		res.render("admintools.ejs", { code: "", user: req.user, eval_result: "Debug your code!" });
	}
}


```

#### Solution Code

There is no real need to allow this functionality whatsoever so remove eval altogether as well as the endpoint and view page.

If you must allow user input, perform some sort of strict match against a list of predefined values.

```
var predefinedValues = ['foo', 'bar']

Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

# returns true
predefinedValues.contains("foo") 

# returns false
predefinedValues.contains("foo\n")
```