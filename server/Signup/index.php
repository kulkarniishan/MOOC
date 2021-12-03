<!-- server code-->
<?php
    include_once '../config/dbconfig.php';
    $firstnameErr = $genderErr = $lastnameErr = $emailErr = $passwordErr= '';
    $display = array(
        'firstname' => '',
        'lastname' => '',
        'email' => '',
        'gender'=>''
    );

    if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST)) {
        foreach($_POST as $key => $value){
            if(isset($display[$key])){
                $display[$key] = htmlspecialchars($value);
            }
        }
        $firstname = ''; 
        $lastname = ''; 
        $email = '';
        $originalpassword = '';
        
        if(empty($_POST["firstname"])){$firstnameErr = "This field cannot be empty!";}
        else{$emailErr='';$firstname = $_POST["firstname"];}
        if(empty($_POST["lastname"])){$lastnameErr = "This field cannot be empty!";}
        else{$lastnameErr='';$lastname = $_POST["lastname"];}
        if(empty($_POST["email"])){$emailErr = "This field cannot be empty!";}
        else{$emailErr='';$email = $_POST["email"];}
        if(empty($_POST["password"])){$passwordErr = "This field cannot be empty!";}
        else{$passwordErr='';$originalpassword = $_POST["password"];}
        if(!isset($_POST["gender"])){$genderErr = "This field cannot be empty!";}
        else{$genderErr='';$gender = $_POST["gender"]=='1'?'Female':'Male';}
        
        if(!preg_match ("/^[a-zA-z]*$/", $firstname)){
            $firstnameErr = "Only alphabets and whitespace are allowed";
        }
        elseif(!preg_match ("/^[a-zA-z]*$/", $lastname)){
            $lastnameErr = "Only alphabets and whitespace are allowed";
        }
        elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $emailErr = "Invalid email format";
        }
        elseif(strlen( $originalpassword) < 6){
            $passwordErr = "Password must be atleast 6 characters";
        }
        else{
            $password = password_hash($originalpassword, PASSWORD_BCRYPT);

            $sql = "INSERT INTO userprofile (firstname,lastname,email,gender,password) VALUES(\"$firstname\",\"$lastname\",\"$email\",\"$gender\",\"$password\");";

            $result = mysqli_query($conn,$sql);
            print_r($result);

            header('Location:../');
        }
    }
?>
<!-- client side code-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
<style>
body {font-family: Arial, Helvetica, sans-serif;}

/* Full-width input fields */
input[type=text], input[type=password], input[type=email] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

form{
    width:40%;
    margin:auto;
    border:black solid 1px;
    padding:15px;
    border-radius:10px;
}

b{
    color:red;
}

</style>

</head>
<body>
    <h1>Signup Page</h1>
    <form action="index.php" method="post">
        <input type="text" name="firstname" id="firstname"  value= "<?php echo htmlspecialchars($display['firstname']); ?>"  placeholder='Your first name'/>
        <b><?php echo htmlspecialchars($firstnameErr);?></b>
        <input type="text" name="lastname" id="lastname"  value= "<?php echo htmlspecialchars($display['lastname']); ?>" placeholder='Your Last name'/>
        <b><?php echo htmlspecialchars($lastnameErr);?></b>
        <label for="male">Male: <input type="radio" name="gender" id="male" value ="0"> </label>
        <label for="female">Female: <input type="radio" name="gender" id="female" value ="1"></label>
        <b><?php echo htmlspecialchars($genderErr);?></b>
        <input type="email" name="email" id="email" value= "<?php echo htmlspecialchars($display['email']); ?>" placeholder='Email'/>
        <b><?php echo htmlspecialchars($emailErr);?></b>
        <input type="password" name="password" id="password" placeholder='Password'/>
        <b><?php echo htmlspecialchars($passwordErr);?></b>
        <button type="submit">Signup</button>
    </form>
    
</body>
</html>