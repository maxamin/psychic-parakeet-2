
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Damn Vulnerable File Upload Application</title>
    <link rel="stylesheet" href="../css/materialize.min.css">
    <script src="../js/materialize.min.js">

    </script>
  </head>
  <body>
<div class="container">

  <?php error_reporting(0); ?>

<!-- Navbar goes here -->

   <!-- Page Layout here -->
   <div class="row">

     <div class="col s3">
       <?php include("nav1.php"); ?>
     </div>

     <div class="col s9">
       <h3>Damn Vulnerable File Upload</h3>
       <b>Description</b>
       <p>-Goal for this level is about to upload a file.This program only allows to upload GIF images.</p>
       <div class="card  teal lighten-1">
            <div class="card-content white-text">
              <span class="card-title">Level 4</span>
              <form enctype="multipart/form-data" action="fu4.php" method="POST">
                <input type="hidden" name="MAX_FILE_SIZE" value="100000" />
                <input name="uploadedfile" type="file" />
                <input type="submit" value="Upload File" />
              </form>

            </div>
            <div class="card-action">
              <?php

                          if($_FILES['uploadedfile']['type'] != "image/gif") {
                          if(isset($_FILES['uploadedfile'])){echo "Sorry, GIF only!";}
                          exit;
                          }
                          $uploaddir = 'uploads/';
                          $uploadfile = $uploaddir . basename($_FILES['uploadedfile']['name']);
                          if (move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $uploadfile)) {
                          echo "File is valid, and was successfully uploaded.\n";
                          } else {
                          echo "File uploading failed.\n";
                          }
                  ?>
              <?php if($uploadfile!= '') { echo "<a href=\"$uploadfile\">Uploaded</a>"; } ?>
            </div>
          </div>

     </div>

   </div>

</div>
  </body>
</html>
