<?php
require '../auth/authorize.php';
require '../config/dbconfig.php';

//headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // The request is using the POST method
    header("HTTP/1.1 200 OK");
    return;
}
// print_r($decoded);
$data = json_decode(file_get_contents("php://input"));
$course_id = $_GET['courseId'];

if ($authorized) {
    $sql = "
    SELECT * 
    FROM videos
    WHERE course_id = '$course_id'";
    // $sql = "INSERT INTO user_enrolled_courses (user_id,course_id,complete,progress) VALUES($user_id,$course_id,false,0)" ;
    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

    $datasetArray = [];

    while ($record = mysqli_fetch_assoc($result)) {
        $datasetArray[] = $record;
    }
    http_response_code(200);
    echo json_encode($datasetArray);
} else {
    http_response_code(401);

    echo json_encode(array(
        "message" => "Access denied.",
        "error" => 'unAuthorized'
    ));
}
