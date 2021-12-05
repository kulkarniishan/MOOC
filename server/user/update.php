<?php
require '../config/dbconfig.php';
require '../auth/authorize.php';

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
if ($authorized) {
    // print_r($decoded);

    $data = json_decode(file_get_contents("php://input"));

    $firstname = $data->firstname;
    $lastname = $data->lastname;
    $phone = $data->phone;
    $newsletterSubscribed = $data->newsletterSubscribed;

    $email = $decoded->data->email;
    $id = $decoded->data->id;
    // $sql = "SELECT * FROM userprofile WHERE email='$email' AND id ='$id'";
    $sql = "
    UPDATE userprofile 
    SET phone = '$phone', firstname = '$firstname', lastname = '$lastname', newsletterSubscribed = '$newsletterSubscribed'
    WHERE email='$email' AND id ='$id';
    ";
    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

    if ($result == 1) {
        $sql = "SELECT * FROM userprofile WHERE email='$email' AND id ='$id'";

        $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");
        $num = mysqli_num_rows($result);

        if ($num > 0) {
            $row =  mysqli_fetch_assoc($result);
            $firstname = $row['firstname'];
            $lastname = $row['lastname'];
            $email = $row['email'];
            unset($row['password']);
            unset($row['id']);

            echo json_encode(
                array(
                    "message" => "Success", "status" => 200, "user" =>
                    $row
                )
            );
        }
    }
}
//     else {
//         http_response_code(401);

//         echo json_encode(array(
//             "message" => "Access denied.",
//             "error" => "unauthorized"
//         ));
//     }
// } else {