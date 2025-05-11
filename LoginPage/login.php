<?php
include '../connect.php';
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the form is submitted and whether it's a POST request and from login page
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['login-submit'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Check if username or password is empty
        if (empty($username) || empty($password)) {
            die("<script>
                alert('Username or password is missing.');
                window.location.href = 'loginPage.html';
            </script>");
        }

        // Check if username and password are valid
        $membersTbl = "iBayMembers";
        $sql = "SELECT * FROM $membersTbl WHERE username = ? 
                AND password = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param( "ss",$username, $password);
    
        try{
            $stmt->execute();
        }
        catch (Exception $e) {
            die("<script>
                alert('Query failed: " . $e->getMessage() . "');
                window.location.href = 'loginPage.html';
            </script>");
        }

        $result = $stmt->get_result();

        if (!$result) {
            die("<script>
                alert('Query failed: " . mysqli_error($db) . "');
                window.location.href = 'loginPage.html';
            </script>");
        }

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                session_start();
                $_SESSION['userId'] = $row['userId'];
                exit("<script>
                    window.location.href = '../BuyersPage/homePage/buyersHomePage.html';
                </script>");
            }
        } 
        else {
            die("<script>
                alert('Incorrect username or password.');
                window.location.href = 'loginPage.html';
            </script>");
        }
    } 
    else {
        die("<script>
            alert('This should be called from clicking the button login-submit.');
            window.location.href = 'loginPage.html';
        </script>");
    }
} 
else {
    die("<script>
        alert('Use POST to access this page.');
        window.location.href = 'loginPage.html';
    </script>");
}
?>