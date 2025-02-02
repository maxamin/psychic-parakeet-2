## Unvalidated Redirects

#### Description

Unvalidated redirects occur when a web application accepts malicious user input and allows redirects to occur based on it. The malicious input is usually in the form of a URL to an attacker-controlled server. When the unvalidated redirect occurs, the base URL of the site the user is on appears to be yours and trusted, but their browser will then be redirected to the attacker's domain.

Unvalidated redirects are common after users authenticate themselves on a website. When a user first attempts to ask a protected page, they will be redirected to ```/login?next=/protected_page```. Using the ```next``` parameter, the site will take the user back to the protected page after they authenticate, creating a smooth user experience. However, if the value of the ```next``` value is not checked, then ```/login?next=http://evil.com``` will work just as well.

Unvalidated Redirects are sometimes not considered a direct vulnerability since they do not affect users of your website. However, they have the potential to affect users of any website and harm the reputation of your site. It is best to avoid allowing such redirects so malicious attackers cannot damage brand reputation by piggybacking off your users' trust.

#### Problem
URL: `http://localhost:8081/login?next=<some url>`

node.nV's login route action takes an optional ```next``` parameter that determines where the user browser is redirected to after registration. However, there is no validation that the path passed in is part of the application. In fact, passing in ```next=http%3A%2F%2Fevil.com``` results in a malicious browser redirect!

#### Walkthrough
1. Unauthenticated, click on one of the listings shown at http://localhost:8081/
2. Change the next parameter to ```?next=http%3A%2F%2Fgoogle.com```.
3. Hit return/enter in the URL bar to reload the page with the value loaded in the next parameter.
4. Enter login credentials of an employee, such as superhacker/abc123!!
5. Click the Register button.

Note that the application successfully registers and then redirects your browser to google.com.

#### Code Snippet


#### Solution

The optimal solution for preventing unvalidated redirect attacks is to require URLs to be passed in as controller and action pairs (ex: ```(user, login)```) rather than a URL. That way, the value cannot be manipulated to point to another website. You could also do a simple regex or string search for "http://", but a dedicated attacker may find ways around this. A final absolute option is to validate that the URL is a relative URL that contains one of your website domains. 

It may be worth allowing remote websites to be accessed, but putting up a redirect landing page informing users they will be accessing untrusted resources. This will inform the user that they may possibly be exposing themselves to attack.

#### Solution Code

We parse the `next_url` parameter using the `url` library. The pathname and query parameters are the only options allowed but we do not allow a redirection to another domain.

```
app.post('/login', passport.authenticate('local'), function(req, res) {
    if (req.body.next_url) {
		new_url = url.parse(req.body.next_url);	
		if (new_url.search) {
			res.redirect(new_url.pathname + new_url.search)
		} else {
			res.redirect(new_url.pathname)
		}
    	res.redirect(new_url.pathname + new_url.search)
    } else {
    	res.redirect('/homepage');
    }
});
```


