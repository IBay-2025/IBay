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

    // Normalize the $_FILES structure
    $tmpNames = $images['tmp_name'];
    $names = $images['name'];
    $types = $images['type'];
    $errors = $images['error'];
    $sizes = $images['size'];
    
    // Loop through each image and add it to the database
    foreach ($tmpNames as $key => $tmpName) {
        // Validate the uploaded file
        if ($errors[$key] !== UPLOAD_ERR_OK) {
            die("<script>
                alert('File upload failed for image $key with error code: " . $errors[$key] . "');
                window.location.href = 'addItemPage.html';
            </script>");
        }

        // Validate MIME type (only allow JPEG or PNG)
        $mimeType = $types[$key];
        if (!in_array($mimeType, ['image/jpeg', 'image/png'])) {
            die("<script>
                alert('Invalid file type for image $key. Only JPEG and PNG images are allowed.');
                window.location.href = 'addItemPage.html';
            </script>");
        }

        // Read the binary data of the uploaded image
        $imageData = file_get_contents($tmpName);
        $imageSizeKB = $sizes[$key] / 1024; // Convert size to KB

        // Find a unique imageId
        $imageId = 1;
        while (true) {
            $sql = "SELECT imageId FROM iBayImages WHERE imageId = $imageId";
            $result = mysqli_query($db, $sql);

            if (!$result) {
                die("Query failed: " . mysqli_error($db));
            }

            if (mysqli_num_rows($result) === 0) {
                break; // Unique imageId found
            }
            $imageId++;
        }

        // Insert the new image into the database
        $sql = "INSERT INTO iBayImages (imageId, image, mimeType, imageSizeKB, itemId) 
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
        if (!$stmt->execute()) {
            die("<script>
                alert('Query execution failed for image $key: " . $stmt->error . "');
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