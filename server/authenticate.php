<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST)) {
    if($_POST['userId']=="ishanak1602"&&$_POST['password']=="123456"){
        $sessionId = rand(100000000,999999999);
        $_SESSION["SessionId"] = $sessionId;
        setcookie("SessionId",$sessionId, time() + 86400, "/",httponly:true);
        header('Location:home/');
    }
}
