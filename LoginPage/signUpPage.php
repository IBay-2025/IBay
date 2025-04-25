<?php
include '../connect.php';
//echo('active debugging<br>');

if(isset($_POST['signUp-Submit'])){
    $firstName = $_POST['firstName'];
    $surname = $_POST['surname'];
    $password = $_POST['password'];
    $address = $_POST['address'];
    $postcode = $_POST['postcode'];
    $phoneNumber = $_POST['phoneNumber'];
    $dob = $_POST['dob'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];

    #login form submitted
    $membersTbl = "iBayMembers";


    //$sql = "SELECT MAX(userId) FROM $membersTbl";
    //$result = mysqli_query($db, $sql);
    echo('Query: ' . $result . '<br>');
    $sql = "INSERT INTO $membersTbl (userId, password, name, email, address, postcode, rating, firstname, surname, gender, phone_number) 
        VALUES (NULL, '$password', '$firstname + ' ' + $surname', '$email', '$address', '$postcode', 0, '$firstName', '$surname', '$gender', '$phoneNumber')";
    
    
    $result = mysqli_query($db, $sql);
    //use query results
    if (!$result) {
        die("Query failed: " . mysqli_error($db));
    }
    else{
        echo('Sign up successful<br>');
        header("Location: ../LoginPage/login.php");
        exit();
    }

}
else{
    echo "Incorrect php file called. this is for the sign up form only.<br>";

} 
echo('active debugging<br>');
?>