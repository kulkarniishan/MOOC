<?php
require "../vendor/autoload.php";
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$publicKey = file_get_contents('../public.pem');
$jwt = null;

$data = json_decode(file_get_contents("php://input"));

$authorized = false;
if($_COOKIE['jwt']){
    try {
        $jwt = $_COOKIE['jwt'];

        $decoded = JWT::decode($jwt, $publicKey, ['RS256']);
        // Access is granted. Add code of the operation here 

        $authorized = true;

    }catch (Exception $e){

    http_response_code(401);

    echo json_encode(array(
        "message" => "Access denied.",
        "error" => $e->getMessage()
    ));
}

}

?>