<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>insomnia - Main</title>

	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link rel="stylesheet" href="css/docs.css">
	<link rel="stylesheet" href="css/custom.css">
	
	<script type="text/javascript" src="js/jquery-2.0.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>


	<!--[if lt IE 9]>
		<script src="js/html5shiv.js"></script>
    <![endif]-->
</head>
<body>

	<!-- NAVBAR -->
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<button type="button" class="btn btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
	          	</button>
	          	<a class="brand" href="#">insomnia</a>

	          	<div class="nav-collapse collapse">
	          		<ul class="nav">
	          			<li class="active"><a href="index.php"><i class="icon-signal"></i> Main</a><li>

	          			<!-- DROPDOWN MENU -->
	          			<li class="dropdown">
	          				<a href="project.php" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-sitemap"></i> Project <b class="caret"></b></a>
	          				<ul class="dropdown-menu">
	          					<li><a href="project.php"><i class="icon-file"></i> New Project</a></li>
	          				</ul>
	          			</li>
	          			<!-- END OF DROPDOWN MENU -->
	          			
	          			<li><a href="statistics.php"><i class="icon-align-left"></i> Statistics</a></li>
	          			<li><a href="report.php"><i class="icon-eye-close"></i> Report Viewer</a></li>
	          			<li><a href="howto.php"><i class="icon-user"></i> How To</a>
	          		</ul>
	          	</div>
	        </div>
	    </div>
	</div>
	<!-- END OF NAVBAR -->

	<!-- CONTENT -->
	<div class="container">

		<!-- TOPIC -->
		<div class="row">
			<div class="span12 custom-hero">
				<h3><i class="icon-signal"></i> insomnia - Web Application Vulnerability Scanner <img src="img/brand.png" class="pull-right"></h3>
			</div>
		</div>

		<!-- CONTENT -->
		<div class="row">
			<div class="span2"></div>

			<div class="span4">
				<h2 class="pager"><img src="img/brand_testing.png"> Testing</h2>
				<p>Testing Web applications for vulnerabilities such as SQL-Injection and XSS.</p>
				<p class="pagination-centered">
					<a class="btn" href="project.php"><i class="icon-sitemap"></i> Begin</a>
					<a class="btn btn-info" href="howto.php"><i class="icon-user"></i> How To</a>
				</p>
			</div>

			<div class="span4">
				<h2 class="pager"><img src="img/brand_reporting.png"> Reporting</h2>
				<p>Creating and viewing reports of testing in the form of web document with imports into XML.</p>
				<p class="pagination-centered">
					<a class="btn" href="report.php"><i class="icon-eye-close"></i> Begin</a>
					<a class="btn btn-info" href="howto.php"><i class="icon-user"></i> How To</a>
				</p>
			</div>

			<div class="span2"></div>
		</div>

		<!-- PICTURES -->
		<div class="row">
			<div class="span2"></div>
			<div class="span8">
				
				<br><br>

				<div id="screenshotCarousel" class="carousel slide">
				  <ol class="carousel-indicators">
				    <li data-target="#screenshotCarousel" data-slide-to="0" class="active"></li>
				    <li data-target="#screenshotCarousel" data-slide-to="1"></li>
				    <li data-target="#screenshotCarousel" data-slide-to="2"></li>
				    <li data-target="#screenshotCarousel" data-slide-to="3"></li>
				    <li data-target="#screenshotCarousel" data-slide-to="4"></li>

				  </ol>
				  <!-- Carousel items -->
				  <div class="carousel-inner">

				    <div class="active item">
				    	<img src="img/screenshot_mainpage.png" class="img-polaroid">
				   		<div class="carousel-caption">
				        	<p><i class="icon-signal"></i> insomnia - The Web Application Vulnerability Scanner. Penetration testing tool for system administrators.</p>
				     	</div>    	
				    </div>

				    <div class="item">
				    	<img src="img/screenshot_projectpage_results.png" class="img-polaroid">
				   		<div class="carousel-caption">
				        	<p><i class="icon-indent-left"></i> Testing Web applications for vulnerabilities (XSS, SQL-Injection).</p>
				     	</div>
				    </div>

				    <div class="item">
				    	<img src="img/screenshot_reportpage.png" class="img-polaroid">
				   		<div class="carousel-caption">
				        	<p><i class="icon-eye-open"></i> Сomfortable report viewer with detailed information output about the test.</p>
				     	</div>    	
				    </div>

				     <div class="item">
				    	<img src="img/screenshot_projectpage_interface.png" class="img-polaroid">
				   		<div class="carousel-caption">
				        	<p><i class="icon-cogs"></i> Easy task settings.</p>
				     	</div>    	
				    </div>

				    <div class="item">
				    	<img src="img/screenshot_statisticspage.png" class="img-polaroid">
				   		<div class="carousel-caption">
				        	<p><i class="icon-align-left"></i> Informative statistics.</p>
				     	</div>    	
				    </div>

				    

				  </div>
				  <!-- Carousel nav -->
				  <a class="carousel-control left" href="#screenshotCarousel" data-slide="prev">&lsaquo;</a>
				  <a class="carousel-control right" href="#screenshotCarousel" data-slide="next">&rsaquo;</a>
				</div>

			</div>
			<div class="span2"></div>
		</div>

	</div>

</body>
</html>