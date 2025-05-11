<?php
// Enable error reporting for debugging and incluede db connection 
include '../connect.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/*
fetches a row of items with a given a category
*/  




//check GET and from 
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM iBayItems WHERE category = ?";
    $stmt = $db->prepare($sql);
    $category = $_GET['category'];
    $stmt->bind_param("s", $category);
    try{
        $stmt->execute();
    }
    catch (Exception $e) {
        die("<script>
            alert('Query failed: " . $e->getMessage() . "');
            window.location.href = '../../login.php';
        </script>");
    }
    $result = $stmt->get_result();
    if (!$result) {
        die("<script>
            alert('Query failed: " . mysqli_error($db) . "');
            window.location.href = '../../login.php';
        </script>");
    }

    //now use $result to get all of the images in the catagory
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

    //return the items array
    if (empty($items)) {
        die("<script>
            alert('No items found.');
            window.location.href = '../../login.php';
        </script>");
    }
    
    
    echo json_encode($items);



}
else {
    die("<script>
        alert('Invalid request method.');
        window.location.href = '../../login.php';
    </script>");
}





?>