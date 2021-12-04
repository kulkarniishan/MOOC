<?php
include_once '../config/dbconfig.php';
$datasetArray = array();

if (isset($_POST['retrive'])) {
    $sql = "SELECT * FROM userprofile";
    $result = mysqli_query($conn,$sql) or die("Bad Query: $sql");

    while($record = mysqli_fetch_assoc($result)){
        $datasetArray[] = $record;
    }
}

function get_table_records(){
    global $datasetArray;
    if(!empty($datasetArray)){
        foreach($datasetArray as $record){
            $firstname = $record['firstname'];
            $lastname = $record['lastname'];
            $email = $record['email'];
            $gender = $record['gender'];
            echo "<tr><td>$firstname</td><td>$lastname</td><td>$email</td><td>$gender</td><tr>";
        }
    }
};


?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .styled-table {
            border-collapse: collapse;
            font-size: 0.9em;
            font-family: sans-serif;
            min-width: 400px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            margin-left: auto;
            margin-right: auto;
            margin-top: 20vh;
        }

        .styled-table thead tr {
            background-color: #009879;
            color: #ffffff;
            text-align: left;
        }

        .styled-table th,
        .styled-table td {
            padding: 12px 15px;
        }

        .styled-table tbody tr {
            border-bottom: 1px solid #dddddd;
        }

        .styled-table tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }

        .styled-table tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
        }

        .styled-table tbody tr.active-row {
            font-weight: bold;
            color: #009879;
        }

        button {
            background-color: #04AA6D;
            color: white;
            padding: 14px 20px;
            margin: auto;
            border: none;
            cursor: pointer;
            margin-left: auto;
            margin-right: auto;
            margin-top: 5vh;
        }
    </style>
</head>

<body>

    <table class="styled-table">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                <th>Gender</th>
            </tr>
        </thead>
        <tbody>
            <?php
            get_table_records();
            ?>
        </tbody>
    </table>

    <form action="index.php" method="post">
        <button type="submit" name="retrive">Get Registered Users
            <submit />
    </form>

</body>

</html>