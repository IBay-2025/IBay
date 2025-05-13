<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);   
include '../../connect.php'; 
session_start(); // Start the session to access session variables
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_SESSION['userId'])) { 
        die("<script>
            alert('User not logged in.');
            window.location.href = '../../login.php';
        </script>");
    }
    $userId = $_SESSION['userId'];

    $sqlItems = "SELECT * FROM iBayItems WHERE userId = $userId";
    $resultItems = mysqli_query($db, $sqlItems);
    if (!$resultItems) {
        die("<script>
            alert('Query preparation failed: " . mysqli_error($db) . "');
            window.location.href = 'ViewItemsPage.html';
        </script>");
    }

    //now use $result to add to the table
    $items = [];
    while ($rowItems = mysqli_fetch_assoc($resultItems)) {

        $sqlImages = "SELECT * FROM iBayImages WHERE itemId = " . $rowItems['itemId'];
        $resultImages = mysqli_query($db, $sqlImages);
        if (!$resultImages) {
            die("Query failed: " . mysqli_error($db));
        }

        // Fetch the images for the current item
        $images = [];
        while ($imageRow = mysqli_fetch_assoc($resultImages)) {
            $images[] = [
                "imageBin" => base64_encode($imageRow['image']),
                "imageExtension" => $imageRow['mimeType'],
            ];
        }

        // Add each item to the items array
        $items[] = [
            "itemId" => $rowItems['itemId'],
            "itemTitle" => $rowItems['title'],
            "itemPrice" => $rowItems['price'],   
            "itemPostage" => $rowItems['postage'],
            "itemCategory" => $rowItems['category'],
            "itemDescription" => $rowItems['description'],
            "startDate" => $rowItems['start'],
            "endDate" => $rowItems['finish'],
            "images" => $images
        ];
    }

    if (empty($items)) {
        die("<script>
            alert('No items found.');
            window.location.href = 'ViewItemsPage.html';
        </script>");
    }
    // Return the items as a JSON response]

    $json = json_encode($items);
    if ($json === false) {
        echo "JSON Encoding Error: " . json_last_error_msg(); // Output the error message
    die();
}
echo $json;
}
else {
    // If the request method is not POST, return an error
    echo json_encode(["error" => "Invalid request method."]);
}
?>