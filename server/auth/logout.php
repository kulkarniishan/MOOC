<?php
require "../vendor/autoload.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$jwt = null;
setcookie("jwt", $jwt, time(), "/", httponly: true);
http_response_code(200);
echo json_encode(array("message"=>"success","status"=>"200"));
