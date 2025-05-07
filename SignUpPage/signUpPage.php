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
    $name = 'tom';#$firstname.' '.$surname;
    #login form submitted
    $membersTbl = "iBayMembers";
    $userId = 2;
    #while (true) {
        #$sql = "SELECT userId FROM $membersTbl WHERE userId = $userId";
        #$result = mysqli_query($db, $sql);
        #if (!$result) {
        #    break; // Unique userId found
        #}
        #$userIdNum++;
    #}
    $sql = "INSERT INTO $membersTbl (userId, password, firstname,surname, email, address, postcode, rating, gender, phone_number) 
    VALUES ($userId, '$password', '$firstname','$surname', '$email', '$address', '$postcode', 0, '$gender', '$phoneNumber')";

    $result = mysqli_query($db, $sql);
    if ($result) {
        echo "User successfully added.<br>";
        echo("email".$email."<br>");
        echo("password".$password."<br>");
        echo("name".$firstname."<br>"); 
    } else {
        echo "Error:.<br>";
    }
    //use query results
    #if (!$result) {
     #   die("Query failed: " . mysqli_error($db));
    #}
    #else{
    #echo "<script>
    #     alert('New user created successfully!');
    #    window.location.href = '../LoginPage/loginPage.html';
    #</script>";
    #exit();
        
    #   }

}
else{
    echo "Incorrect php file called. this is for the sign up form only.<br>";

} 
echo('active debugging<br>');
?>