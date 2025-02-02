<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>SETUP DB</title>
</head>
<body bgcolor="#000000">
<div style=" margin-top:20px;color:#FFF; font-size:24px; text-align:center"> 
	Welcome&nbsp;&nbsp;&nbsp;<font color="#FF0000"> DVLabs </font><br>
</div>
<div style=" margin-top:10px;color:#FFF; font-size:23px; text-align:left">
	<font size="3" color="#FFFF00">
	SETTING UP THE DATABASE SCHEMA AND POPULATING DATA IN TABLES:<br><br> 


	<?php
	//including the Mysql connect parameters.
	include("db-creds.inc");

	$con = mysqli_connect($host,$dbuser,$dbpass);
	if (!$con)
	{
		die('[*]...................Could not connect to DB, check the creds in db-creds.inc: ' . mysqli_error($con));
	}
	
	//purging Old Database	
	$sql="DROP DATABASE IF EXISTS dvlabs";
	if (mysqli_query($con, $sql))
	{
		echo "[*]...................Old database 'dvlabs' purged if exists"; echo "<br><br>\n";
	}
	else
	{
		echo "[*]...................Error purging database: " . mysqli_error($con); echo "<br><br>\n";
	}

	//Creating new database security
	$sql="CREATE database `dvlabs` CHARACTER SET `gbk` ";
	if (mysqli_query($con, $sql))
	{
		echo "[*]...................Creating New database 'dvlabs' successfully";echo "<br><br>\n";
	}
	else
	{
		echo "[*]...................Error creating database: " . mysqli_error($con);echo "<br><br>\n";
	}

	//creating table users
	$sql="CREATE TABLE dvlabs.users (id int(3) NOT NULL AUTO_INCREMENT, username varchar(20) NOT NULL, password varchar(20) NOT NULL, email varchar(30) NOT NULL, PRIMARY KEY (id))";
	if (mysqli_query($con, $sql))
	{
		echo "[*]...................Creating New Table 'USERS' successfully";echo "<br><br>\n";
	}
	else 
	{
		echo "[*]...................Error creating Table: " . mysqli_error($con);echo "<br><br>\n";
	}
	
	//creating table uagents
	$sql="CREATE TABLE dvlabs.uagents
		(
		id int(3)NOT NULL AUTO_INCREMENT,
		uagent varchar(256) NOT NULL,
		ip_address varchar(35) NOT NULL,
		username varchar(20) NOT NULL,
		PRIMARY KEY (id)
		)";
	if (mysqli_query($con, $sql))
	{
		echo "[*]...................Creating New Table 'UAGENTS' successfully";
		echo "<br><br>\n";
	}
	else 
	{
		echo "[*]...................Error creating Table: " . mysqli_error($con);
		echo "<br><br>\n";
	}

	//creating table referers
	$sql="CREATE TABLE dvlabs.referers
		(
		id int(3)NOT NULL AUTO_INCREMENT,
		referer varchar(256) NOT NULL,
		ip_address varchar(35) NOT NULL,
		PRIMARY KEY (id)
		)";
	if (mysqli_query($con, $sql))
	{
		echo "[*]...................Creating New Table 'REFERERS' successfully";
		echo "<br><br>\n";
	}
	else 
	{
		echo "[*]...................Error creating Table: " . mysqli_error($con);
		echo "<br><br>\n";
	}

	//inserting data
	$sql="INSERT INTO dvlabs.users (id, username, password, email) VALUES ('1', 'Dumb', 'Dumb', 'Dumb@dhakkan.com'), ('2', 'Angelina', 'I-kill-you', 'Angel@iloveu.com'), ('3', 'Dummy', 'p@ssword', 'Dummy@dhakkan.local'), ('4', 'secure', 'crappy', 'secure@dhakkan.local'), ('5', 'stupid', 'stupidity', 'stupid@dhakkan.local'), ('6', 'superman', 'genious', 'superman@dhakkan.local'), ('7', 'batman', 'mob!le', 'batman@dhakkan.local'), ('8', 'admin', 'admin', 'admin@dhakkan.com')";
	if (mysqli_query($con, $sql))
	{
		echo "[*]...................Inserted data correctly into table 'USERS'";
		echo "<br><br>\n";
	}
	else 
	{
		echo "[*]...................Error inserting data: " . mysqli_error($con);
		echo "<br><br>\n";
	}
	?>
	</font>
</div>
</body>
</html>
