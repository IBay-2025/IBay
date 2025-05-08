<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);   
include '../../connect.php'; 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['userId'])) {
        die("User not logged in.");
    }
    $userId = $_SESSION['userId'];

    $query = "SELECT * FROM iBayItems WHERE userId = $userId";
    $result = mysqli_query($db, $query);
    if (!$result) {
        die("Query failed: " . mysqli_error($db));
    }

    //now use data to add to the table






    echo json_encode($items);
}
?>