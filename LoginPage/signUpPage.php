<?php
//set Variables
$serverName = 'localhost';
$password = 'aey38pcb';
$userName = 'cob295user';
$dbName = 'cob295db';

//
$db = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$db) {
    die("Connection failed: " . mysqli_connect_error());
  }


?>