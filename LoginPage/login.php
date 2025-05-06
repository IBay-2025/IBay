<?php
include '../connect.php';
// Check if the form is submitted and weather itsd login
if(isset($_POST['login-submit'])){
    $email = $_POST['username'];
    $password = $_POST['password'];

    #login form submitted
    if (empty($_POST['username']) || empty($_POST['password'])) {
        die("Username or password is missing.");
    }
    else{
        //username and pass present check if valid
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
                    session_start();
                    $_SESSION['userId'] = $row['userId'];
                    header("Location: ../SellerPage/sellerHomePage.html");
                    //header("Location: ../BuyerPage/buyerHomePage.html");
                    exit();
                    #### open corresponding page ####
                }
            } else {
                die("incorrect username or password.<br>");
    
                ####pass message to login page####
    
    
    
            }
        }
    }
    
}
else{
    echo "Incorrect php file called. this is for the login form only.<br>";
}
?>