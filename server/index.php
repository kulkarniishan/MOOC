<?php
include_once 'config/dbconfig.php';

$passwordErr = $emailErr = $credError = '';


$firstnameErr = $genderErr = $lastnameErr = $emailErr = $passwordErr = '';
$display = array(
  'firstname' => '',
  'lastname' => '',
  'email' => '',
  'gender' => ''
);


if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST)) {
  $email = $_POST['email'];
  $checkpwd = $_POST['password'];
  foreach ($_POST as $key => $value) {
    if (isset($display[$key])) {
      $display[$key] = htmlspecialchars($value);
    }
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $emailErr = "Invalid email format";
  } elseif (!preg_match("/^.{6,}$/", $checkpwd)) {
    $passwordErr = "Password must be atleast 6 characters";
  } else {
    $sql = "SELECT * FROM userprofile where email=\"$email\"";
    $result = mysqli_query($conn, $sql) or die("Bad Query: $sql");

    $rows = mysqli_num_rows($result);

    if ($rows > 0) {
      $row = mysqli_fetch_assoc($result);

      if (!password_verify($checkpwd, $row["password"])) {
        $credError = "Incorrect Credentials";
      } else {
        session_start();
        $sessionId = rand(100000000, 999999999);
        $_SESSION["SessionId"] = $sessionId;
        setcookie("SessionId", $sessionId, time() + 86400, "/", httponly: true);
        header('Location:home/');
      }
    } else {
      $credError = "Account Not Found!<br/> register <button class='btn btn-outline btn-primary' data-toggle='modal' data-target='#signupModal'>Sign Up</a>";
    }
  }
}

if (isset($_COOKIE["SessionId"])) {
  session_start();
  $_SESSION["SessionId"] = $_COOKIE["SessionId"];
  header('Location:mainPage.php');
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
    }

    /* Full-width input fields */
    .input {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    /* Set a style for all buttons */
    .button {
      background-color: #04AA6D;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
      width: 100%;
    }

    .b {
      color: red;
    }

    .button:hover {
      opacity: 0.8;
    }

    .form {
      width: 40%;
      margin: auto;
      border: black solid 1px;
      padding: 15px;
      border-radius: 10px;
    }
  </style>
  <title>Document</title>
</head>

<body>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
    <a class="navbar-brand" href="./">Course Me</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="./">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./aboutUs/">About Us</a>
        </li>
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form> -->

      <ul class=" navbar-nav mr-5">
        <li class="nav-item d-flex align-items-center mx-4">
          <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#loginModal">Login</button>
        </li>
        <li class="nav-item d-flex align-items-center mx-4">
          <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#signupModal">Signup</button>
        </li>
        <li class="nav-item">
          <div class="collapse navbar-collapse" id="navbar-list-4">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" class="rounded-circle">
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="#">Edit Profile</a>
                  <a class="dropdown-item" href="#">Log Out</a>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <!-- <li class='btn'><a data-toggle="modal" data-target="#loginModal"><span class="glyphicon glyphicon-log-in"></span> login</a></li> -->

      </ul>


    </div>

    <div id="loginModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Login</h4>

            <button type="button" class="close" data-dismiss="modal"> &times;</button>
          </div>
          <div class="modal-body">
            <form action="./" method="post">
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email'>
                <b class='b'><?php echo $emailErr; ?></b>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='password'>
                <b class='b'><?php echo $passwordErr; ?></b>
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
              <b class='b'><?php echo $credError; ?></b>

              <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Cancel</button>

            </form>
          </div>
        </div>
      </div>
    </div>

    <div id="signupModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Signup</h4>

            <button type="button" class="close" data-dismiss="modal"> &times;</button>
          </div>
          <div class="modal-body">
            <form action="./Signup/" method="post">
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <input type="text" name="firstname" class="form-control" id="firstname" value="<?php echo htmlspecialchars($display['firstname']); ?>" placeholder='Your first name' required />
                    <b><?php echo htmlspecialchars($firstnameErr); ?></b>
                  </div>
                  <div class="col">
                    <input type="text" name="lastname" class="form-control" id="lastname" value="<?php echo htmlspecialchars($display['lastname']); ?>" placeholder='Your Last name' required />
                    <b><?php echo htmlspecialchars($lastnameErr); ?></b>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col">
                    <div class="row align-items-center">
                      <div class="col-2">
                        <label for="male" class="form-check-label ">Male:
                        </label>
                      </div>
                      <div class="col-6">
                        <input class="form-control" type="radio" name="gender" id="male" value="0">
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row align-items-center">
                      <div class="col-2">
                        <label for="female">Female:
                        </label>
                      </div>
                      <div class="col-6">
                        <input class="form-control" type="radio" name="gender" id="female" value="1">
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <label for="example">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' required>
                <b class='b'><?php echo htmlspecialchars($emailErr); ?></b>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='password' required>
                <b class='b'><?php echo htmlspecialchars($passwordErr); ?></b>
              </div>


              <button type="submit" class="btn btn-primary">Signup</button>
              <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Cancel</button>

            </form>
          </div>
        </div>
      </div>
    </div>

  </nav>
  <br>

  <div id="carouselExampleControls" class="carousel slide w-75 mx-auto" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active bg-dark">
        <img class="d-block w-100" src="https://blog.coursera.org/wp-content/uploads/2018/01/Blog-3.png" alt="First slide" style="opacity:0.8">
        <div class="carousel-caption d-none d-md-block">
          <h5>Enroll Now</h5>
          <p>...</p>
        </div>
      </div>
      <div class="carousel-item  bg-dark">
        <img class="d-block w-100" src="https://miro.medium.com/max/1024/1*9s751zw7OnNtmj5X9o5Pow.png" alt="First slide" style="opacity:0.8">
        <div class="carousel-caption d-none d-md-block">
          <h5>Enroll Now</h5>
          <p>...</p>
        </div>
      </div>
      <div class="carousel-item bg-dark">
        <img class="d-block w-100" src="https://www.360edukraft.com/wp-content/uploads/2018/08/Docker-Certification-Training-Course.jpg" alt="First slide" style="opacity:0.8">
        <div class="carousel-caption d-none d-md-block">
          <h5>Enroll Now</h5>
          <p>...</p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <spuan class="sr-only">Next</span>
    </a>
  </div>

<hr>


  <form class="row justify-content-center mt-2 mb-5" method="GET" action>
    <input class="col-8 form-control mr-sm-2" type="search" id='SearchCourses' placeholder="Search" aria-label="Search">
    <button class="col-1 btn btn-outline-info my-2 my-sm-0" type="submit" onclick="">Search</button>
  </form>


  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  <script>
    function clickButton(){
      console.log(document.getElementById('SearchCourses'));
    // $.ajax({
    //     type:"get",
    //     url:"./search/searchCourses.php"+document.getElementById('SearchCourses'),
    //     cache:false,
    //     success: function (html) 
    //     {
    //        alert('Data Send');
    //        $('#msg').html(html);
    //     }
    // });
    return false;
    }
  </script>

</body>

</html>