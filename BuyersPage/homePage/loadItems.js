$(document).ready(function () {
  function loadItems(category, containerId) {
    $.ajax({
      url: "fetchItemsRow.php",
      method: "GET",
      data: { category: category },
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
                  <p class="item-price">&pound;${parseFloat(item.itemPrice).toFixed(2)}</p>
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

  // Call it for each category (these must match your DB categories exactly)
  loadItems("Home", "home-items");
  loadItems("Garden & DIY", "garden-items");
  loadItems("Jewellery & Watches", "jewellery-items");
  loadItems("Electronics", "electronics-items");
  loadItems("Fashion", "fashion-items");
  loadItems("Sport & Leisure", "sports-items");
  loadItems("Health & Beauty", "health-items");
  loadItems("Collectables", "collectables-items");
});
