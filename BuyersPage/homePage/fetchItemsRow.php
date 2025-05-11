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
    $sql = "SELECT * FROM iBayItems";

}





?>