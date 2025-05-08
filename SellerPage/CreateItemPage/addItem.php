<?php
include '../../connect.php'; // Include your database connection file
echo "connecting";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "connecting";     
    // Retrieve form data
    $userId = $_SESSION['userId']; // Replace with the actual userId (e.g., from session or authentication)
    $title = $_POST['itemTitle'];
    $category = $_POST['itemCategory'];
    $description = $_POST['description'];
    $price = $_POST['itemPrice'];
    $postage = $_POST['itemPostage'];
    $start = $_POST['startDate']; 
    $finish = $_POST['endDate']; 
    
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
    echo "$itemId<br>";
    $sql = "INSERT INTO $itemsTbl (itemId, userId, title, category, description, price, postage, start, finish) 
    VALUES ('$itemId','$userId', '$title', '$category', '$description', '$price', '$postage', '$start', '$finish')";

    $result = mysqli_query($db, $sql);
    
    
    if(!$result) {
        die("Query failed: " . mysqli_error($db));
       
    } else {
        echo "<script>
            alert('New item created successfully!');
            window.location.href = '../ViewItemsPage/ViewItemsPage.html';
        </script>";
        exit();
    }

} else {
    echo "Invalid request method.";
}
?>