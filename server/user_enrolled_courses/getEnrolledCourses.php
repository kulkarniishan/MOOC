<?php
require '../auth/authorize.php';
require '../config/dbconfig.php';

//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// print_r($decoded);
$data = json_decode(file_get_contents("php://input"));
$course_id = $data->courseId;
$user_id = $decoded->data->id;

if ($authorized) {
    $sql = "
    SELECT * 
    FROM user_enrolled_courses
    JOIN courses
     ON user_enrolled_courses.course_id = courses.id
     AND user_enrolled_courses.user_id = '$user_id';";
    // $sql = "INSERT INTO user_enrolled_courses (user_id,course_id,complete,progress) VALUES($user_id,$course_id,false,0)" ;
    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

    echo json_encode(mysqli_fetch_assoc($result));
} else {
    http_response_code(401);

    echo json_encode(array(
        "message" => "Access denied.",
        "error" => 'unAuthorized'
    ));
}
