document.addEventListener("DOMContentLoaded", function () {
  // Helper: Extract itemId from URL
  function getItemIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("itemId");
  }

  const itemId = getItemIdFromURL();

  if (!itemId) {
    alert("No item ID provided in the URL.");
    return;
  }

  // Fetch item data from server
  fetch(`getItemDetails.php?itemId=${itemId}`)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(item => {
      // Update page with item data
      document.getElementById("itemTitle").textContent = item.itemTitle;
      document.getElementById("itemPrice").textContent = `£${parseFloat(item.itemPrice).toFixed(2)}`;
      document.getElementById("itemDesc").textContent = item.itemDescription;
      document.getElementById("itemCondition").textContent = item.itemCondition || "N/A";
      document.getElementById("itemEndDate").textContent = new Date(item.endDate).toLocaleString();
      document.getElementById("itemPostage").textContent = item.itemPostage;
      document.getElementById("itemSeller").textContent = item.sellerName || "Unknown";
      document.getElementById("itemRating").textContent = item.sellerRating ? `${item.sellerRating}/5` : "N/A";
      document.getElementById("itemLocation").textContent = item.sellerLocation || "N/A";

      // Set item images
      document.getElementById("img1").src = item.itemBin?.image1 || "placeholder.jpg";
      document.getElementById("img2").src = item.itemBin?.image2 || "placeholder.jpg";
      document.getElementById("img3").src = item.itemBin?.image3 || "placeholder.jpg";
    })
    .catch(error => {
      console.error("Error loading item details:", error);
      alert("Failed to load item details.");
    });
});
