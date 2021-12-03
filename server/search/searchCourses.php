
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

print_r($_SERVER['QUERY_STRING']);
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET": {
            get($conn, $_GET);
        };
        break;
    case "POST": {
            post($conn, json_decode(file_get_contents('php://input')));
        };
        break;
    case "DELETE": {
            $Email = $_GET['email'];
            delete($conn, $Email);
        }
        break;
    default: {
            echo "An Internal Server Error occured";
            http_response_code(500);
            break;
        }
}


//GET METHOD
function get($conn, $get)
{
    print_r($get);
    if ($get && $get['string']) {
        $str = $get['string'];
        $sql = "SELECT * FROM courses WHERE name LIKE '%$str%'";
        $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

        $datasetArray = array();
        while ($record = mysqli_fetch_assoc($result)) {
            $datasetArray[] = $record;
            http_response_code(200);
            echo json_encode($datasetArray);
        }
    } else {
        $sql = "SELECT * FROM courses";
        $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

        $datasetArray = array();
        while ($record = mysqli_fetch_assoc($result)) {
            $datasetArray[] = $record;
            http_response_code(200);
            echo json_encode($datasetArray);
        }
    }
}

//POST METHOD
function post($conn, $data)
{
    // echo 'post';
    $firstname = $data->firstname;
    $lastname = $data->lastname;
    $emailId = $data->emailId;
    $gender = $data->gender;
    $password = password_hash($data->password, PASSWORD_BCRYPT);

    $sql = "INSERT INTO userprofile (firstname,lastname,emailId,gender,password) VALUES(\"$firstname\",\"$lastname\",\"$emailId\",\"$gender\",\"$password\");";

    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");
    if ($result) {
        echo "\nRecord added";
    }
}

//DELETE METHOD
function delete($conn, $email)
{
    echo 'delete';
    $sql = "DELETE FROM userprofile WHERE emailId=\"$email\";";
    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");
    if ($result) {
        echo "\n Record(s) deleted";
    }
}

?>