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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // The request is using the POST method
    header("HTTP/1.1 200 OK");
    return;

}

$privateKey = file_get_contents('../private.pem');
$email = '';
$password = '';

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$checkpwd = $data->password;
// $email = $_POST['email'];
// $checkpwd = $_POST['password'];
foreach ($_POST as $key => $value) {
    if (isset($display[$key])) {
        $display[$key] = htmlspecialchars($value);
    }
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(401);
    echo json_encode(array("message" => "Invalid email format", "status" => 200));
} elseif (!preg_match("/^.{6,}$/", $checkpwd)) {
    $passwordErr = "Password must be atleast 6 characters";
    http_response_code(422);
    echo json_encode(array("message" => "Password must be atleast 6 characters", "status" => 422));
} else {
    $sql = "SELECT * FROM userprofile where email=\"$email\"";
    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

    $num = mysqli_num_rows($result);

    if ($num > 0) {
        $row = mysqli_fetch_assoc($result);
        $id = $row['id'];
        $firstname = $row['firstname'];
        $lastname = $row['lastname'];
        $password2 = $row['password'];

        if (password_verify($checkpwd, $password2)) {
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
                    "message" => "Success", "status" => 200, "user" =>$row
                )
            );
        } else {

            http_response_code(403);

            echo json_encode(array("message" => "Login failed.", "status" => 403));
        }
    } else {
        http_response_code(403);

        echo json_encode(array("message" => "Login failed.", "status" => 403));
    }
}


// function login($conn){
    
// if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST)) {
//     $email = $_POST['email'];
//     $checkpwd = $_POST['password'];
//     foreach ($_POST as $key => $value) {
//       if (isset($display[$key])) {
//         $display[$key] = htmlspecialchars($value);
//       }
//     }
  
//     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//       echo "Invalid email format";
//     } elseif (!preg_match("/^.{6,}$/", $checkpwd)) {
//       $passwordErr = "Password must be atleast 6 characters";
//     } else {
//       $sql = "SELECT * FROM userprofile where email=\"$email\"";
//       $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");
  
//       $rows = mysqli_num_rows($result);
  
//       if ($rows > 0) {
//         $row = mysqli_fetch_assoc($result);
  
//         if (!password_verify($checkpwd, $row["password"])) {
//           $credError = "Incorrect Credentials";
//         } else {
//           session_start();
//           $sessionId = rand(100000000, 999999999);
//           $_SESSION["SessionId"] = $sessionId;
//           setcookie("SessionId", $sessionId, time() + 86400, "/", httponly: true);
//           header('Location:home/');
//         }
//       } else {
//         $credError = "Account Not Found!<br/> register <button class='btn btn-outline btn-primary' data-toggle='modal' data-target='#signupModal'>Sign Up</a>";
//       }
//     }
//   }
  
// }
