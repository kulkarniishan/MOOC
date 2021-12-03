<?php
session_start();

?>
<h1>Welcome to the Home page</h1>
<?php 
print_r($_SESSION);
if(array_key_exists("SessionId",$_SESSION)){
    echo "<h2><br/>Logged In Successfully</h2>";
}
else{
  
}
?>
<style>
input{
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 10%;
}

</style>
<h2>
<p>Session Id is: <?php echo $_SESSION['SessionId']?> </p>

<a href="../logout.php"><input type="submit" value="Logout"><a/>
</h2>

