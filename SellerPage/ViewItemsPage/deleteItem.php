<?php

include '../../connect.php'; // Include the database connection
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the user is logged in
    if (!isset($_SESSION['userId'])) {
        die(json_encode(["error" => "User not logged in."]));
    }

    // Retrieve the itemId from the POST request
    if (!isset($_POST['itemId']) || empty($_POST['itemId'])) {
        die(json_encode(["error" => "Item ID is required."]));
    }
    $itemId = $_POST['itemId'];

    // Prepare the SQL query to delete the item
    $sql = "DELETE FROM iBayItems WHERE itemId = $itemId ";
    $result = mysqli_query($db, $sql);

    // Execute the query
    if(!$result) {
        die(json_encode(["error" => "Query failed: " . mysqli_error($db)]));
    }
    else {
        // Check if any rows were affected (i.e., if the item was deleted)
        if (mysqli_affected_rows($db) > 0) {
            echo json_encode(["success" => "Item deleted successfully."]);
        } 
        else {
            echo json_encode(["error" => "No item found with the given ID."]);
        }
    }
    
}
else {
    echo json_encode(["error" => "Failed to delete item: " . $stmt->error]);
}

?>