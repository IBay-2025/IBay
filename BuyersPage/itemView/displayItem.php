<?php
session_start(); // Start the session to access session variables

include '../../connect.php'; // Include the database connection file

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the user is logged in
    if (!isset($_SESSION['userId'])) {
        die(json_encode(["error" => "User not logged in."]));
    }

    // Validate and retrieve the itemId from the GET request
    if (!isset($_GET['itemId']) || empty($_GET['itemId'])) {
        die(json_encode(["error" => "Item ID is required."]));
    }
    $itemId = intval($_GET['itemId']); // Sanitize the input

    // Query the iBayItems table for the item details
    $sqlItem = "SELECT * FROM iBayItems WHERE itemId = $itemId";
    $resultItem = mysqli_query($db, $sqlItem);

    if (!$resultItem || mysqli_num_rows($resultItem) === 0) {
        die(json_encode(["error" => "Item not found."]));
    }

    $item = mysqli_fetch_assoc($resultItem);

    // Query the iBayImages table for the item's images
    $sqlImages = "SELECT * FROM iBayImages WHERE itemId = $itemId";
    $resultImages = mysqli_query($db, $sqlImages);

    if (!$resultImages) {
        die(json_encode(["error" => "Failed to fetch item images."]));
    }

    $images = [];
    while ($imageRow = mysqli_fetch_assoc($resultImages)) {
        $images[] = [
            "imageBin" => base64_encode($imageRow['image']),
            "imageExtension" => $imageRow['mimeType'],
        ];
    }

    // Combine item details and images into a single response
    $itemDetails = [
        "itemId" => $item['itemId'],
        "itemTitle" => $item['title'],
        "itemPrice" => $item['price'],
        "itemPostage" => $item['postage'],
        "itemCategory" => $item['category'],
        "itemDescription" => $item['description'],
        "startDate" => $item['start'],
        "endDate" => $item['finish'],
        "images" => $images
    ];

    // Return the item details as a JSON response
    echo json_encode($itemDetails);
} else {
    // If the request method is not GET, return an error
    echo json_encode(["error" => "Invalid request method."]);
}
?>