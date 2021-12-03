<?php
include_once '../config/dbconfig.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));

    $firstname = $data->firstname;
    $lastname = $data->lastname;
    $email = $data->email;
    $originalpassword = $data->password;
    $gender = $data->gender;

    if ($firstname=='' && $lastname=='' && $email=='' && $originalpassword=='' && $gender=='' ) {
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
            http_response_code(200);
            echo json_encode(array("message" => "success", "status" => "200"));
        }
    }
}
