<?php  
session_start();  
print_r($_POST);

if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST)) {
    echo "hello";
    $SESSIONID = $_POST['sessionId'];
    echo $SESSIONID;
    $_SESSION['SESSIONID'] = $SESSIONID;  
}

if(isset($_SESSION['count']))  
{  
echo "Your session count: ".$_SESSION['count']."<br />";  
$_SESSION['count']++;  
}  
else  
{  
$_SESSION['count'] = 1;  
echo "Session does not exist";  
}  

echo "Welcome! "
?>  

<form action="session.php" method="post">
    <input type="text" name="sessionId">
    <input type="submit" value="Submit">
</form>
