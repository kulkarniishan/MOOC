<?php
session_start();

session_destroy();
setcookie("SessionId",$sessionId, 0, "/",httponly:true);

header('Location:./');
?>