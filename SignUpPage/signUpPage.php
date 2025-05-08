<?php
include '../connect.php';
//echo('active debugging<br>');
echo`Sign up page<br>`;
if(isset($_POST['signUp-Submit'])){
    $firstName = $_POST['firstname'];
    $surname = $_POST['surname'];
    $password = $_POST['password'];
    $address = $_POST['address'];
    $postcode = $_POST['postcode'];
    $phonenumber = $_POST['phonenumber'];
    $dob = $_POST['dob'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $username = $_POST['username'];#$firstname.' '.$surname;
    #login form submitted
    $membersTbl = "iBayMembers";
    $userId = 1;
    while (true) {
        $sql = "SELECT userId FROM $membersTbl WHERE userId = $userId";
        $result = mysqli_query($db, $sql);
        if (mysqli_num_rows($result) === 0) {
            break; // Unique userId found
        }
        echo "id: $userId<br>";
        $userId++;
    }
    $sql = "INSERT INTO $membersTbl (userId,password, username,firstname,surname, email, address, postcode, rating, gender, phone_number) 
    VALUES ($userId, '$password','$username', '$firstname','$surname', '$email', '$address', '$postcode', 0, '$gender', '$phonenumber')";

    $result = mysqli_query($db, $sql);
    if (!$result) {
        die("Query failed: " . mysqli_error($db));
    }
    else{
        echo "<script>
             alert('New user created successfully!');
            window.location.href = '../LoginPage/loginPage.html';
        </script>";
        exit();
    }
}
else{
    echo "Incorrect php file called. this is for the sign up form only.<br>";

} 
echo('active debugging<br>');
?>