<?php
include_once '../config/dbconfig.php';
require "../vendor/autoload.php";

use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$privateKey = file_get_contents('../private.pem');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // The request is using the POST method
    header("HTTP/1.1 200 OK");
    return;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));

    $firstname = $data->firstname;
    $lastname = $data->lastname;
    $email = $data->email;
    $originalpassword = $data->password;
    $gender = $data->gender;

    if ($firstname == '' && $lastname == '' && $email == '' && $originalpassword == '' && $gender == '') {
        http_response_code(422);
        echo json_encode(array("message" => "empty field", "status" => "422"));
    } else {
        if (!preg_match("/^[a-zA-z]*$/", $firstname) && !preg_match("/^[a-zA-z]*$/", $lastname) && !filter_var($email, FILTER_VALIDATE_EMAIL) && strlen($originalpassword) < 6) {
            http_response_code(422);
            echo json_encode(array("message" => "Only alphabets and whitespace are allowed", "status" => "422"));
        } else {
            $password = password_hash($originalpassword, PASSWORD_BCRYPT);

            $sql = "INSERT INTO userprofile (firstname,lastname,email,gender,password) VALUES(\"$firstname\",\"$lastname\",\"$email\",\"$gender\",\"$password\");";

            $result = mysqli_query($conn, $sql);
            // http_response_code(200);
            // echo json_encode(array("message" => "success", "status" => "200"));

            $sql = "SELECT * FROM userprofile where email=\"$email\"";
            $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

            $num = mysqli_num_rows($result);
            $row = mysqli_fetch_assoc($result);
            $id = $row['id'];

            $issuer_claim = "THE_ISSUER"; // this can be the servername
            $audience_claim = "THE_AUDIENCE";
            $issuedat_claim = time(); // issued at
            $notbefore_claim = $issuedat_claim; //not before in seconds
            $expire_claim = $issuedat_claim + 86000; // expire time in seconds
            $token = array(
                "iss" => $issuer_claim,
                "aud" => $audience_claim,
                "iat" => $issuedat_claim,
                "nbf" => $notbefore_claim,
                "exp" => $expire_claim,
                "data" => array(
                    "id" => $id,
                    "firstname" => $firstname,
                    "lastname" => $lastname,
                    "email" => $email
                )
            );

            $jwt = JWT::encode($token, $privateKey, 'RS256');
            http_response_code(200);
            unset($row['password']);
            unset($row['id']);

            setcookie("jwt", $jwt, $expire_claim, "/", httponly: true);
            echo json_encode(
                array(
                    "message" => "Success", "status" => 200, "user" =>
                    $row
                )
            );
        }
    }
}
