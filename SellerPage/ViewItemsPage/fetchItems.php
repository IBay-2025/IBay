<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);   
include '../../connect.php'; 
session_start(); // Start the session to access session variables
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_SESSION['userId'])) { 
        die("User not logged in.");
    }
    $userId = $_SESSION['userId'];

    $query = "SELECT * FROM iBayItems WHERE userId = $userId";
    $result = mysqli_query($db, $query);
    if (!$result) {
        die("Query failed: " . mysqli_error($db));
    }

    //now use $result to add to the table

    $items = [];
    while ($row = mysqli_fetch_assoc($result)) {
        // Add each item to the items array
        $items[] = [
            "itemId" => $row['itemId'],
            "itemTitle" => $row['title'],
            "itemPrice" => $row['price'],
            "itemPostage" => $row['postage'],
            "itemCategory" => $row['category'],
            "itemDescription" => $row['description'],
            "startDate" => $row['start'],
            "endDate" => $row['finish'],
            "itemImages" => [
                ["imageId" => 1, "imageLink" => "path/to/image1.jpg"], // Placeholder for image 1
                ["imageId" => 2, "imageLink" => "path/to/image2.jpg"]  // Placeholder for image 2
            ]
        ];
    }
    #echo('$items = ' . json_encode($items) . ';');
    // Return the items as a JSON response
    echo json_encode($items);
}
else {
    // If the request method is not POST, return an error
    echo json_encode(["error" => "Invalid request method."]);
}
?>