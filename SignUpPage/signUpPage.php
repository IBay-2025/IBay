<?php
include '../connect.php';
//echo('active debugging<br>');
echo`Sign up page<br>`;
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
    
    #$sql = "INSERT INTO $membersTbl (userId, password, firstname, email, address, postcode, rating, surname, gender, phone_number) 
    #VALUES (NULL, '$password', '$firstName', '$email', '$address', '$postcode', 0, '$surname', '$gender', '$phoneNumber')";

    
    
    #$result = mysqli_query($db, $sql);
    #echo('Query: ' . $result . '<br>');
    //use query results
    #if (!$result) {
     #   die("Query failed: " . mysqli_error($db));
    #}
    #else{
        echo('Sign up successful<br>');
        header("Location: ../LoginPage/lohin.html");
        exit();
    #   }

}
else{
    echo "Incorrect php file called. this is for the sign up form only.<br>";

} 
echo('active debugging<br>');
?>