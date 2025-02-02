<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>DVLabs -- Damn Vulnerable Labs</title>
	<link href="https://cdn.bootcss.com/twitter-bootstrap/2.3.2/css/bootstrap.min.css" rel="stylesheet">
	<link href="https://cdn.bootcss.com/twitter-bootstrap/2.3.2/css/bootstrap-responsive.min.css" rel="stylesheet">
	<link href="css/styles.css" rel="stylesheet">
	<script src="https://cdn.bootcss.com/jquery/3.4.1/core.js"></script>
	<script src="https://cdn.bootcss.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>
</head>
<body>
<h1 class="background">DVLabs</h1>
<div class="container-fluid">
	<div class="row-fluid">
		<div class="span12">
			<div class="row-fluid">
				<div class="span2">
				</div>
				<div class="span8">
					<div class="row-fluid">
						<div class="span12">
							<?php include("header.php"); ?>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span9" id="main">
							<p>> <span>测试环境</span>: "<i>Apache 2.4.39 | PHP 7.3.4nts | MySQL 8.0.12</i>"</p>
							<p>> <span>所含内容</span>: "<i>sqli-labs</i>"</p>
							<p>> <span>　　　　</span>: "<i>upload-labs</i>"</p>
							<p>> <span>　　　　</span>: "<i>XSS Challenges</i>"</p>
							<p>> <span>版　　本</span>: "<i>V1.0</i>"</p>
						</div>
						<div class="span2">
							<?php include("nav.php"); ?>
						</div>
					</div>
					<div class="row-fluid">
						<div class="span12">
							<?php include("footer.php"); ?>
						</div>
					</div>
				</div>
				<div class="span2">
				</div>
			</div>
		</div>
	</div>
</div>
<script>
	var str = document.getElementById('main').innerHTML.toString();
	var i = 0;
	document.getElementById('main').innerHTML = "";

	setTimeout(function() {
		var se = setInterval(function() {
			i++;
			document.getElementById('main').innerHTML = str.slice(0, i) + "|";
			if (i == str.length) {
				clearInterval(se);
				document.getElementById('main').innerHTML = str;
			}
		}, 10);
	},0);
</script>
</body>
</html>
