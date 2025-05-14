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
  fetch(`displayItem.php?itemId=${itemId}`)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(item => {
      // Update page with item data
      document.getElementById("itemTitle").innerHTML = item.itemTitle;
      document.getElementById("itemPrice").innerHTML = `<strong>Price: </strong>Â£${parseFloat(item.itemPrice).toFixed(2)}`;
      document.getElementById("itemDesc").innerHTML = `<strong>Description: </strong>${item.itemDescription}`
      document.getElementById("itemEndDate").innerHTML = `<strong>End Date/Time: </strong>${new Date(item.endDate).toLocaleString()}`;      document.getElementById("itemPostage").innerHTML = `<strong>Postage Type: </strong>${item.itemPostage}`;
      document.getElementById("itemSellerName").innerHTML = `<strong>Seller: </strong>${item.sellerName}` || "<strong>Seller: </strong>Unknown";
      document.getElementById("itemRating").innerHTML =  `<strong>Seller's Rating: </strong>${item.sellerRating}/5` || "<strong>Seller's Rating: </strong>N/A";
      document.getElementById("itemLocation").innerHTML = item.sellerLocation || "<strong>Seller's Location: </strong>N/A";

      // Set item images
      document.getElementById("mainImg").src = `data:image/${item.images[0].imageExtension};base64,${item.images[0].imageBin}` || "placeholder.jpg";
      document.getElementById("smallImg1").src = `data:image/${item.images[0].imageExtension};base64,${item.images[0].imageBin}` || "placeholder.jpg";      
      document.getElementById("smallImg2").src = `data:image/${item.images[1].imageExtension};base64,${item.images[1].imageBin}` || "placeholder.jpg";   
 })
    .catch(error => {
      alert("Failed to load item details.");
    });
});
