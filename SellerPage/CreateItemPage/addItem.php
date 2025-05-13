<?php
include '../../connect.php'; // Include your database connection file
//error checking
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start(); // Start the session to access session variables
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the user is logged in
    if (!isset($_SESSION['userId'])) {
        die(json_encode(["error" => "User not logged in."]));
    }

    // Retrieve form data
    $userId = $_SESSION['userId']; // Replace with the actual userId (e.g., from session or authentication)
    $title = $_POST['itemTitle'];
    $category = $_POST['itemCategory'];
    $description = $_POST['description'];
    $price = $_POST['itemPrice'];
    $postage = $_POST['itemPostage'];
    $start = $_POST['startDate']; 
    $finish = $_POST['endDate']; 

    $images = $_FILES['imgFiles']; //gets all images

    // print images
    print_r($_FILES['imgFiles']);
    print_r("<br>");
    
    // Prepare the SQL query

    $itemsTbl = "iBayItems";
    $itemId = 1;
    while (true) {
        $sql = "SELECT itemId FROM $itemsTbl WHERE itemId = $itemId";
        $result = mysqli_query($db, $sql);

        if (!$result) {
            die("Query failed: " . mysqli_error($db));
        }
        
        if (mysqli_num_rows($result) === 0) {
            break; // Unique userId found
        }
        $itemId++;
    }

    // Insert the new item into the database
    $sql = "INSERT INTO $itemsTbl (itemId, userId, title, category, description, price, postage, start, finish) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $db->prepare($sql);
    if (!$stmt) {
        die("<script>
            alert('Query preparation failed: " . $db->error . "');
            window.location.href = 'addItemPage.html';
        </script>");
    }
    $stmt->bind_param(
        "iisssdsss",
        $itemId,
        $userId,
        $title,
        $category,
        $description,
        $price,
        $postage,
        $start,
        $finish
    );

    if(!$stmt->execute()) {    
        die("<script>
            alert('Query execution failed: " . $stmt->error . "');
            window.location.href = 'addItemPage.html';
        </script>");
    }


    //now add image to images table
    $imageTbl = "iBayImages";
    //for each image returned in the images array add the image to the database
    // Loop through each image and add to db
    
    foreach ($tmpNames as $key => $tmpName) {

        $image = $images['tmp_name'][$i];
        $mimeType = $image['type'];
        $imageSizeKB = $image['size'] / 1024; // Convert size to KB
        $imageData = file_get_contents($image['tmp_name']);
        //find image id`
        $imageId = 1;
        while (true) {
            $sql = "SELECT imageId FROM $imageTbl WHERE imageId = $imageId";
            $result = mysqli_query($db, $sql);

            if (!$result) {
                die("Query failed: " . mysqli_error($db));
            }
            
            if (mysqli_num_rows($result) === 0) {
                break; // Unique userId found
            }
            $imageId++;
        }

        // Insert the new item into the database
        $sql = "INSERT INTO $imageTbl (imageId,image,mimeType,imageSizeKB, itemId) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            die("<script>
                alert('Query preparation failed: " . $db->error . "');
                window.location.href = 'addItemPage.html';
            </script>");
        }
        $stmt->bind_param(
            "isssi",
            $imageId,
            $imageData,
            $mimeType,
            $imageSizeKB,
            $itemId
        );
        if(!$stmt->execute()) {       
            die("<script>
                alert('Query execution failed: " . $stmt->error . "');
                window.location.href = 'addItemPage.html';
            </script>");
        }
}
} 
else 
{
    die("<script>
        alert('Invalid request method.');
        window.location.href = 'addItemPage.html';
    </script>");
}
?>