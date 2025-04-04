<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="noindex, nofollow" />
        <style type="text/css">
        body{background-color:orange;font-size:1.1em;text-align:center;}
        </style>
        <title> Access MySQL </title>
</head>
<body>
	<div style="background-color:yellow;width:20em;margin-left:auto;margin-right:auto">
 	<h2> Access MySQL Database with MySQLi</h2>
	</div>
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