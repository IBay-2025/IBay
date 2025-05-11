<?php
include '../../connect.php';
session_start(); // Start the session to access session variables

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the user is logged in
    if (!isset($_SESSION['userId'])) {
        die("<script>
            alert('User not logged in.');
            window.location.href = '../../login.php';");
    }

    //check if a basket allready exists
    if(!isset($_POST['basketIds'])) {
        // Create a new basket
        $basketIds[] = $_POST['itemId'];
        $_SESSION['basketIds'] = $basketIds;
    } 
    else {
        // Add to existing basket
        $basketIds = $_SESSION['basketIds'];
        $basketIds[] = $_POST['itemId'];
        $_SESSION['basketIds'] = $basketIds;
    }

}


?>