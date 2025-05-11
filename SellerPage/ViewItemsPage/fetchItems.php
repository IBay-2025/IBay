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

    $sql = "SELECT * FROM iBayItems WHERE userId = $userId";
    $result = mysqli_query($db, $sql);
    if (!$result) {
        die("<script>
            alert('Query preparation failed: " . mysqli_error($db) . "');
            window.location.href = '../../login.php';
        </script>");
    }

    //now use $result to add to the table

    $items = [];
    while ($row = mysqli_fetch_assoc($result)) {

        $sql = "SELECT * FROM iBayImages WHERE itemId = " . $row['itemId'];
        $result = mysqli_query($db, $sql);
        if (!$result) {
            die("Query failed: " . mysqli_error($db));
        }

        // Fetch the images for the current item
        $images = [];
        while ($imageRow = mysqli_fetch_assoc($result)) {
            $images[] = [
                "imageBin" => $imageRow['image'],
                "imageExtension" => $imageRow['mimeType'],
            ];
        }
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
            "imageBin" => [
                ["image1" => $images[0]["imageBin"]],
                ["image2" => $images[1]["imageBin"]] 
            ],
            "imageExtension" =>[
                ["image1" => $images[0]['imageExtension']],
                ["image2" => $images[1]['imageExtension']]
            ],
        ];
    }

    if (empty($items)) {
        die("<script>
            alert('No items found.');
            window.location.href = '../../login.php';
        </script>");
    }
    // Return the items as a JSON response
    echo json_encode($items);
}
else {
    // If the request method is not POST, return an error
    echo json_encode(["error" => "Invalid request method."]);
}
?>