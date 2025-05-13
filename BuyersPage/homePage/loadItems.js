// This is your first JavaScript file
$(document).ready(function () {
  let allItems = []; // This will be populated with all fetched items

  // Fetch and display items initially
  $.ajax({
    url: "fetchItemsRow.php",
    method: "GET",
    dataType: "json",
    success: function (response) {
      allItems = response;
      // Call displayItems from the second file (or function)
      displayItems(allItems);
    },
    error: function () {
      alert("Error loading items.");
    }
  });

  // Function to load items by category (from first script)
  function loadItems(category, mySort, containerId) {
    $.ajax({
      url: "fetchItemsRow.php",
      method: "GET",
      data: { category: category, sort: mySort }, // Send the category and sorting parameter
      dataType: "json",
      success: function (response) {
        const $container = $(`#${containerId}`);
        $container.empty();

        if (Array.isArray(response) && response.length > 0) {
          response.forEach(item => {
            const imageHtml = item.images && item.images.length > 0
              ? `<img src="data:image/${item.images[0].imageExtension};base64,${item.images[0].imageBin}" alt="${item.itemTitle}" class="item-image">`
              : `<div class="no-image">No Image</div>`;

            const itemHTML = `
              <div class="grid-item" onclick="location.href='../itemView/buyersItemView.html?itemId=${item.itemId}'">
                <div class="grid-item-image">${imageHtml}</div>
                <div class="grid-item-info">
                  <h3 class="item-title">${item.itemTitle}</h3>
                  <p class="item-price">£${parseFloat(item.itemPrice).toFixed(2)}</p>
                  <p class="item-postage">${item.itemPostage}</p>
                  <p class="item-enddate">Ends: ${new Date(item.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            `;
            $container.append(itemHTML);
          });
        } else {
          $container.html("<p>No items found in this category.</p>");
        }
      },
      error: function (xhr) {
        console.error("AJAX Error:", xhr.responseText);
        $(`#${containerId}`).html("<p>Failed to load items.</p>");
      }
    });
  }

  // Call loadItems for each category
  function loadAllItems(sortBy) {
    $.ajax({
      url: "fetchItemsRow.php",
      method: "GET",
      dataType: "json",
      success: function (response) {
        const $container = $('#all-items');
        $container.empty();

        if (Array.isArray(response) && response.length > 0) {
          // process items and append them to the container
          response.forEach(item => {
            const imageHtml = item.images && item.images.length > 0
              ? `<img src="data:image/${item.images[0].imageExtension};base64,${item.images[0].imageBin}" alt="${item.itemTitle}" class="item-image">`
              : `<div class="no-image">No Image</div>`;

            const itemHTML = `
              <div class="grid-item" onclick="location.href='../itemView/buyersItemView.html?itemId=${item.itemId}'">
                <div class="grid-item-image">${imageHtml}</div>
                <div class="grid-item-info">
                  <h3 class="item-title">${item.itemTitle}</h3>
                  <p class="item-price">£${parseFloat(item.itemPrice).toFixed(2)}</p>
                  <p class="item-postage">${item.itemPostage}</p>
                  <p class="item-enddate">Ends: ${new Date(item.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            `;
            $container.append(itemHTML);
          });

          // Now call loadItems for each category with the sortBy parameter
          loadItems("Home", sortBy, "home-items");
          loadItems("Garden & DIY", sortBy, "garden-items");
          loadItems("Jewellery & Watches", sortBy, "jewellery-items");
          loadItems("Electronics", sortBy, "electronics-items");
          loadItems("Fashion", sortBy, "fashion-items");
          loadItems("Sport & Leisure", sortBy, "sports-items");
          loadItems("Health & Beauty", sortBy, "health-items");
          loadItems("Collectables", sortBy, "collectables-items");
        } else {
          $container.html("<p>No items found.</p>");
        }
      },
      error: function (xhr) {
        console.error("AJAX Error:", xhr.responseText);
        $('#all-items').html("<p>Failed to load all items.</p>");
      }
    });
  }
});

//to use file to lad the page call loadAllItems("")
//re-load when you want it sorted change sort by to the SQL code you want.
