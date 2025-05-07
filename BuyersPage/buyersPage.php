<?php
// Database connection
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch distinct categories
$categories_sql = "SELECT DISTINCT category FROM iBayItems";
$categories_result = $conn->query($categories_sql);

if ($categories_result->num_rows > 0) {
    while ($category_row = $categories_result->fetch_assoc()) {
        $category = $category_row['category'];

        echo '<h2>' . htmlspecialchars($category) . '</h2>';
        echo '<div class="horizontal-scroll">';

        // Fetch items and their first images for each category
        $items_sql = "SELECT iBayItems.itemId, iBayImages.imagePath 
                      FROM iBayItems
                      JOIN iBayImages ON iBayItems.itemId = iBayImages.itemId
                      WHERE iBayItems.category = ?";
        $stmt = $conn->prepare($items_sql);
        $stmt->bind_param("s", $category);
        $stmt->execute();
        $items_result = $stmt->get_result();

        while ($item_row = $items_result->fetch_assoc()) {
            echo '<div class="grid-item">';
            echo '<img src="' . htmlspecialchars($item_row['imagePath']) . '" alt="Item Icon" class="item-icon">';
            echo '<p>Item ' . htmlspecialchars($item_row['itemId']) . '</p>';
            echo '</div>';
        }

        echo '</div>';
        $stmt->close();
    }
}

$conn->close();
?>