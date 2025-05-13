    <?php
    // Enable error reporting for debugging and incluede db connection 
    include '../../connect.php';
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    /*
    fetches a row of items with a given a category
    */  
print_r($_GET);

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
        $resultItem = $stmt->get_result();
        if (!$resultItem) {
            die("<script>
                alert('Query failed: " . mysqli_error($db) . "');
                window.location.href = '../../login.php';
            </script>");
        }

        //now use $result to get all of the images in the catagory
        $items = [];
        while ($rowItems = mysqli_fetch_assoc($resultItem)) {
            $sqlImages = "SELECT * FROM iBayImages WHERE itemId = " . $rowItems['itemId'];
            
            $resultImages = mysqli_query($db, $sqlImages);
            if (!$resultImages) {
                die(json_encode(["error" => "Image query failed: " . $db->error]));
            }

            $images = [];
            while ($imageRow = mysqli_fetch_assoc($resultImages)) {
                $images[] = [
                    "imageBin" => base64_encode($imageRow['image']), // Encode binary data as Base64
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
                "images" => $images,
            ];
        }

        //return the items array
        if (empty($items)) {
            die(json_encode(["error" => "No items found for the given category."]));
        }
        header('Content-Type: application/json');
        $json = json_encode($items);
        if ($json === false) {
            echo "JSON Encoding Error: " . json_last_error_msg(); // Output JSON encoding error
            die();
        }
        echo $json;
    } else {
        // If the request method is not GET, return an error
        header('Content-Type: application/json');
        echo json_encode(["error" => "Invalid request method."]);
    }
    ?>