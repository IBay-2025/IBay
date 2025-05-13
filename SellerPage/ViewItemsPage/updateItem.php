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
    if ($_POST === null) {
        die(json_encode(["error" => "Invalid or empty JSON input."]));
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
    
    // UPDATE THE ITEM IN THE DATABASE
    $sql ="UPDATE iBayItems 
        SET title = ?, price = ?, postage = ?, category = ?, description = ?, start = ?, finish = ? 
        WHERE itemId = ?";
    
    $stmt = $db->prepare($sql);
    if (!$stmt) {
        die(json_encode(["error" => "Query preparation failed: " . $db->error]));
    }
    $stmt->bind_param(
        "sdsssssi", // Data types: s = string, d = double, i = integer
        $itemTitle,
        $itemPrice,
        $itemPostage,
        $itemCategory,
        $itemDescription,
        $startDate,
        $endDate,
        $itemId
    );

    // Execute the prepared statement
    if ($stmt->execute()) {
        // Return a success message
        echo json_encode(["success" => "Item updated successfully."]);
    } else {
        // Return an error message if execution fails
        die(json_encode(["error" => "Query execution failed: " . $stmt->error]));
    }

    // Close the statement
    $stmt->close();

}
?>