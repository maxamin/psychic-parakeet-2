<html>
<head>
<script>
function search() {
  if (window.XMLHttpRequest) {
      var name = document.getElementsByName("sname")[0].value;
      alert(name);
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
      //var a = xmlhttp.responseText.split("|") // Delimiter is a string
       /* for (var i = 0; i < a.length; i++)
        {
            //alert(a[i]);
            document.getElementById("pname").innerHTML = a[i];
            
             
        }*/
      
    }
  }
  xmlhttp.open("GET","searchproduct.php?query="+name,true);
  xmlhttp.send();
}
</script>
</head>
<body>

<input type=text name=sname>
<input type=submit value=submit onclick=search()>

<div id = "txtHint"> </div>
</body>

</html>