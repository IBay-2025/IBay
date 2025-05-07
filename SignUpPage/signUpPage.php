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
    $userId = substr($firstName, 0, 2) . substr($surname, 0, 2);
    $userIdNum = 0;
    //create $userid
    while (true) {
        $sql = "SELECT userId FROM $membersTbl WHERE userId = $userId";
        $result = mysqli_query($db, $sql);
        if (mysqli_num_rows($result) == 0) {
            break; // Unique userId found
        }
        $userIdNum++;
    }
    $userId .= $userIdNum; //1 Append the number to the userId
    $sql = "INSERT INTO $membersTbl (userId, password, firstname, email, address, postcode, rating, surname, gender, phone_number) 
    VALUES ($userId, '$password', '$firstName', '$email', '$address', '$postcode', 0, '$surname', '$gender', '$phoneNumber')";

    $result = mysqli_query($db, $sql);
    if ($result) {
        echo "User successfully added.<br>";
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