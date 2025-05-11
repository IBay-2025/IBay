<?php
include '../connect.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//echo('active debugging<br>');
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(isset($_POST['signUp-Submit'])){
        // Check if the user is logged in
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

        //find new userid
        $userId = 1;
        while (true) {
            $sql = "SELECT userId FROM $membersTbl WHERE userId = $userId";
            $result = mysqli_query($db, $sql);
            if (!$result) {
                die("<script>
                alert('Query failed: " . mysqli_error($db) . "');
                window.location.href = 'signUpPage.html';
                </script>");
            }
            if (mysqli_num_rows($result) === 0) {
                break; // Unique userId found
            }
            $userId++;
        }

        //create user 
        $sql = "INSERT INTO $membersTbl (userId,password, username,firstname,surname, email, address, postcode, rating, gender, phone_number) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)";
        $stmt = $db->prepare($sql);
        $stmt->bind_param(
            "ssssssssss",
            $userId,
            $password,
            $username,
            $firstName,
            $surname,
            $email,
            $address,
            $postcode,
            $gender,
            $phonenumber
        );
        $stmt->execute();
        if ($stmt) {
            die("<script>
            alert('New user created successfully!   ');
            window.location.href = '../LoginPage/loginPage.html';
            </script>");
        }
        else{
            die("<script>
            alert('Query failed: " . $stmt->error . "');
            window.location.href = 'signUpPage.html';
            </script>");
        }
    }
    else{
        die("<script>
            alert('This should be called from the sign-up form only.');
            window.location.href = 'signUpPage.html';
        </script>");
    } 
}
else{
    die("<script>
    alert('Incorrect request method.');
    window.location.href = 'signUpPage.html';
</script>");}
?>