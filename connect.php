<?php
// Hardcoded credentials for Db
    $servername = "localhost";
    $dbname = "295group2";
    $username = '295group2';
    $password = 'uCyMtN7q9iRLXFpvJAqR';

    //retrive db
    $db = mysqli_connect($servername, $username, $password, $dbname);
    
    //if db empty or not connected
    if (!$db) {
        die("Connection failed<br>");
    }


?>