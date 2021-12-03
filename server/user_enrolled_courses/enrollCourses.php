<?php
require '../auth/authorize.php';
require '../config/dbconfig.php';

//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


print_r($decoded);
$data = json_decode(file_get_contents("php://input"));
$course_id = $data->courseId;
$user_id = $decoded->data->id;

if ($authorized) {
    echo 'authorised';
    $sql = "INSERT INTO user_enrolled_courses (user_id,course_id,complete,progress) VALUES($user_id,$course_id,false,0)" ;
    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

    print_r($result);
} else {
    echo 'not authroised';
}
