<?php

include '../../connect.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the user is logged in
    if (!isset($_SESSION['userId'])) {
        die(json_encode(["error" => "User not logged in."]));
    }
    $userId = $_SESSION['userId'];

    // Retrieve the itemId from the POST request
    if (!isset($_POST['itemId']) || empty($_POST['itemId'])) {
        die(json_encode(["error" => "Item ID is required."]));
    }
    $itemId = intval($_POST['itemId']); // Sanitize the itemId

    // Prepare the SQL query to delete the item
    $query = "DELETE FROM iBayItems WHERE itemId = ? AND userId = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param("ii", $itemId, $userId);

    // Execute the query
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Item deleted successfully."]);
        } else {
            echo json_encode(["error" => "Item not found or you do not have permission to delete this item."]);
        }
    } 
}
else {
    echo json_encode(["error" => "Failed to delete item: " . $stmt->error]);
}

?>