<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Less-26a Trick with comments</title>
</head>
<body bgcolor="#000000">
	<center>
		<img src="../images/Less-26-a.jpg" />
		<img src="../images/Less-26a-1.jpg" />
	</center>
	<div style=" margin-top:70px;color:#FFF; font-size:40px; text-align:center">Welcome&nbsp;&nbsp;&nbsp;<font color="#FF0000"> DVLabs </font><br>
		<font size="3" color="#FFFF00">
		<?php
			//including the Mysql connect parameters.
			include("../../connections/mysqli-connect.php");

			// take the variables 
			if(isset($_GET['id']))
			{
				$id=$_GET['id'];
				//logging the connection parameters to a file for analysis.
				$fp=fopen('result.txt','a');
				fwrite($fp,'ID:'.$id."\n");
				fclose($fp);

				//fiddling with comments
				$id= blacklist($id);
				//echo "<br>";
				//echo $id;
				//echo "<br>";
				$hint=$id;

				// connectivity 
				$sql="SELECT * FROM users WHERE id=('$id') LIMIT 0,1";
				$result=mysqli_query($con, $sql);
				$row = mysqli_fetch_array($result);
				if($row)
				{
					echo "<font size='5' color= '#99FF00'>";	
					echo 'Your Login name:'. $row['username'];
					echo "<br>";
					echo 'Your Password:' .$row['password'];
					echo "<br>";
					echo 'Your E-mail:' .$row['email'];
					echo "</font>";
				}
				else 
				{
					echo '<font color= "#FFFF00">';
					//print_r(mysql_error());
					echo "</font>";  
				}
			}
			else
			{
				echo "Please input the ID as parameter with numeric value";
			}

			function blacklist($id)
			{
				$id= preg_replace('/or/i',"", $id);			//strip out OR (non case sensitive)
				$id= preg_replace('/and/i',"", $id);		//Strip out AND (non case sensitive)
				$id= preg_replace('/[\/\*]/',"", $id);		//strip out /*
				$id= preg_replace('/[--]/',"", $id);		//Strip out --
				$id= preg_replace('/[#]/',"", $id);			//Strip out #
				$id= preg_replace('/[\s]/',"", $id);		//Strip out spaces
				$id= preg_replace('/[\s]/',"", $id);		//Strip out spaces
				$id= preg_replace('/[\/\\\\]/',"", $id);		//Strip out slashes
				return $id;
			}
		?>
		</font>
	</div>
	<center>
		<font size='4' color= "#33FFFF">
			<?php
				//echo "Hint: Your Input is Filtered with following result: ".$hint;
			?>
		</font> 
	</center>
</body>
</html>





 
