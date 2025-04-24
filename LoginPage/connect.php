<?php
// Hardcoded credentials for Db
    $servername = "localhost";
    $dbname = "cob295db";
    $username = 'cob295user';
    $password = 'aey38pcb';

    //retrive db
    $db = mysqli_connect($servername, $username, $password, $dbname);
    
    //if db empty or not connected
    if (!$db) {
        die("Connection failed<br>");
    }


?>