<?php
require '../config/dbconfig.php';
require '../auth/authorize.php';

if ($authorized) {
    // print_r($decoded);
    $email = $decoded->data->email;
    $id = $decoded->data->id;
    $sql = "SELECT * FROM userprofile WHERE email='$email' AND id ='$id'";

    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

    $num = mysqli_num_rows($result);

    if ($num == 1) {
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
//     else {
//         http_response_code(401);

//         echo json_encode(array(
//             "message" => "Access denied.",
//             "error" => "unauthorized"
//         ));
//     }
// } else {