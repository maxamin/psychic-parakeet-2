## Cross-site Scripting (XSS)

#### Description

Cross-Site Scripting is a vulnerability that occurs when user-supplied data is unsafely rendered back in an application. When malicious data is rendered to the front end views without any escaping, the user's browser may be hijacked or commanded for malicious purposes.

XSS flaws usually rely on executing JavaScript in the user's browser, but can occur in a wide variety of settings beyond the common ```<script>``` tag. HTML is a versatile language, and JavaScript can be executed from within HTML attributes, CSS, or even from within JSON payloads.

Most common XSS attacks attempt to either steal user cookie information (containing their site session), browser information, account contents, or other sensitive information. It's also possible to force the user's browser to navigate to an attacker controlled server for further exploitation.


#### Problem
URL: http://localhost:8081/login?next=

node.nV uses the EJS templating language to render its frontend views.  The ```<%- q %>``` syntax does not perform any encoding by default and is therefore an insecure mechanism for rendering data. In the  template above, the value of the ```next``` parameter is printed out in raw format; if an attacker passes in a value that contains a script tag, it would be output to the page directly and treated as HTML. 

#### Walkthrough
1. Using Firefox or Chrome (Chrome may detect XSS, however) - navigate to `http://localhost:8081/login?next=""><script>alert(1)</script>`
2. Note that a JavaScript alert box will appear

#### Code Snippet
views/login.ejs

```
	<% if (next_url) {%>
	<input type="hidden" name="next_url" value=<%- next_url %>>
	<% } %>
```

#### Solution


XSS requires a more proactive approach to mitigate in EJS templates than in other templating languages. While some other languages encode automatically, and require you to specifically mark variables you do not wish to encode, EJS templates do not always help. Therefore, it is extremely important to be careful when outputting variables in EJS templates.



Use ```<%= %>``` instead of ```<%= %>``` when reflecting dynamic user input. The remediated code snippet can be found below:  

views/login.ejs

```
	<% if (next_url) {%>
	<input type="hidden" name="next_url" value=<%= next_url %>>
	<% } %>
```


One potential problem with XSS is when a value starts in one context, and shifts to another. *Multiple context XSS* attacks, may start in the URL but then be output onto the page. In general, it is best to allow only the smallest subset of characters that are needed for the application to function.

There are also several useful HTTP headers your application can set to prevent XSS attacks. For example, setting ```X-XSS-Protection``` to 1 will ensure that the browser uses its built-in XSS protections. While this is usually enabled by default, it may not be on some older browsers. It's also worth setting a strong ```Content-Security-Policy``` header. While out of the scope of this document, CSP will help protect your site in a broader way than just against XSS.

