<?php

include 'd.php';
if ($_GET['action'] == "add")
{
		if (!is_numeric($_POST['pid']))
		{
		
			header('Location:product.php');	
			exit(0);
		}
		else 
			{
				$pid = $_POST['pid'];
				$pid = $_POST['pid'];
				$name = $_POST['cname'];
				$email=$_POST['cemail'];
				$comment=$_POST['ccomment'];

				$sql = "INSERT INTO comments (pid, cname, cemail, ccomment) VALUES (?, ?, ?, ?)";
				$stmt = $con->prepare($sql);
                                
				if($stmt)
				{
					$stmt->bind_param("isss",$pid,$name,$email,$comment);
					$stmt->execute();
					header('Location:view.php?id='.$pid);
					//$res = $stmt->get_result();

					
				}
				else
				{
					echo "error" ;
				}	

			}
}

else {
			 
		header('Location:view.php');
	}


mysqli_close($con);
?>