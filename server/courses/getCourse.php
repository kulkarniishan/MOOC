
<?php
include_once '../config/dbconfig.php';

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// echo file_get_contents('php://input');

// print_r($_SERVER['QUERY_STRING']);
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $cid = $_GET['courseId'];
    $sql = "SELECT * FROM courses WHERE id=$cid";
    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

    $datasetArray = array();
    while ($record = mysqli_fetch_assoc($result)) {
        $datasetArray[] = $record;
        http_response_code(200);
        echo json_encode($datasetArray);
    }
} else {
}
