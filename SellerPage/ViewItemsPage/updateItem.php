<?php
//use the form submit to update the item in the database
//error checking
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start(); // Start the session to access session variables
include '../../connect.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the user is logged in
    if (!isset($_SESSION['userId'])) {
        die(json_encode(["error" => "User not logged in."]));
    }
    
    //change item details in database
    $itemId = $_POST['itemId'];
    $itemTitle = $_POST['itemTitle'];   
    $itemPrice = $_POST['itemPrice'];
    $itemPostage = $_POST['itemPostage'];
    $itemCategory = $_POST['itemCategory'];
    $itemDescription = $_POST['itemDescription'];
    $startDate = $_POST['startDate'];
    $endDate = $_POST['endDate'];
    
    // uPDATE THE ITEM IN THE DATABASE
    $sql = "UPDATE iBayItems SET title = '$itemTitle', price = '$itemPrice', postage = '$itemPostage', category = '$itemCategory', description = '$itemDescription', start = '$startDate', finish = '$endDate' WHERE itemId = $itemId";
    $result = mysqli_query($db, $sql);
    
    if (!$result) {
        die(json_encode(["error" => "Query failed: " . mysqli_error($db)]));
    }
    else{
        // Return a success message
        echo json_encode(["success" => "Item updated successfully."]);
    }

}
?>