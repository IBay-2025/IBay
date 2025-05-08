<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); 


$itemsTbl = "iBayItems";
$itemId = 1;

echo "id: $itemId<br>";
$sql = "SELECT itemId FROM $itemsTbl WHERE itemId = $itemId";
echo"$sql<br>";      
$result = mysqli_query($db, $sql);
echo "result has been found?"
 
?>