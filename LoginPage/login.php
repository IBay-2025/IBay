<?php
echo "<h1>Action Debugging</h1>";
// Start the session
session_start();

// Check if the form is submitted and which form it is
if (!empty($_POST['login-submit'])) {
    echo "Login Form Submitted";
    // Hardcoded credentials for Db
    $servername = "localhost";
    $dbname = "cob295db";
    $username = 'cob295user';
    $password = 'aey38pcb';

    //set db variable
    $db = mysqli_connect($servername, $username, $password, $dbname);


    
}
else {
    //not known source, redirect to login page
}
?>