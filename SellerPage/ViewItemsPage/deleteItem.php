<?php

include '../../connect.php'; // Include the database connection
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the user is logged in
    if (!isset($_SESSION['userId'])) {
        die(json_encode(["error" => "User not logged in."]));
    }

     $input = json_decode(file_get_contents('php://input'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        die(json_encode(["error" => "Invalid JSON input."]));
    }

    // Retrieve the itemId from the POST request
    if (!isset($input['itemId']) || empty($input['itemId'])) {
        die(json_encode(["error" => "Item ID is required."]));
    }
    
    $itemId = $input['itemId'];

    // Prepare the SQL query to delete the item
    $sql = "DELETE FROM iBayItems WHERE itemId = ?";
    $stmt = $db->prepare($sql);
    if (!$stmt) {
        die(json_encode(["error" => "Query preparation failed: " . $db->error]));
    }

    // Bind the parameter to the prepared statement
    $stmt->bind_param("i", $itemId); // "i" indicates the parameter is an integer

    // Execute the prepared statement
    if ($stmt->execute()) {
        // Check if any rows were affected (i.e., if the item was deleted)
        if ($stmt->affected_rows > 0) {
            echo json_encode(["success" => "Item deleted successfully."]);
        } else {
            echo json_encode(["error" => "No item found with the given ID."]);
        }
    } else {
        die(json_encode(["error" => "Query execution failed: " . $stmt->error]));
    }

    // Close the statement
    $stmt->close();
} else {
    // If the request method is not POST, return an error
    echo json_encode(["error" => "Invalid request method."]);
}

?>