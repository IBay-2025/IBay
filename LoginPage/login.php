<?php
include 'connect.php';

echo "<h1>Action Debugging</h1>";
// Check if the form is submitted and weather itsd login

if(isset($_POST['login-submit'])){
    $email = $_POST['username'];
    $password = $_POST['password'];

    #login form submitted
    if (empty($_POST['username']) || empty($_POST['password'])) {
        die("Username or password is missing.");
    }
    else{
        //username and pas present
        $membersTbl = "iBayMembers";
        $sql = "SELECT * 
            FROM $membersTbl 
            WHERE email = '$email' 
            AND password = '$password'";
        $result = mysqli_query($db, $sql);
    
        //use query results
        if (!$result) {
            die("Query failed: " . mysqli_error($db));
        }
        else{
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "correct username and password<br>";
    
    
                    #### open corresponding page ####
    
    
                    echo "<hr>";
                }
            } else {
                echo "incorrect username or password.<br>";
    
                ####pass message to login page####
    
    
    
            }
        }
    }
    
}
else{
    echo "Incorrect php file called. this is for the login form only.<br>";
}
echo "<h1>End of Action Debugging</h1>";
?>