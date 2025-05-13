$(document).ready(function() {

    $(document).ready(function () {
  function loadItems(category, containerId) {
    $.ajax({
      url: "../../api/fetchItemsRow.php", // adjust path if needed
      method: "GET",
      data: { category: category },
      dataType: "json",
      success: function (response) {
        const $container = $(`#${containerId}`);
        $container.empty();

        if (response.length > 0) {
          $.each(response, function(index, item) {
            const itemHTML = `
              <div class="grid-item" onclick="location.href='../itemView/buyersItemView.html?itemId=${item.itemId}'">
              <div class="grid-item-image">
                <!-- Only display the first image -->
                <img src="data:image/${item.itemBin[0].imageExtension};base64,${item.itemBin[0].image1}" alt="${item.itemTitle}" />
              </div>
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
      error: function () {
        $(`#${containerId}`).html("<p>Error loading items.</p>");
      }
    });
  }

  // Load items for multiple categories
  loadItems("Home","home-items");
  loadItems("Garden & DIY", "garden-items");
  loadItems("Jewellery & Watches", "jewellery-items");
  loadItems("Electronics","electronics-items");
  loadItems("Fashion", "fashion-items");
  loadItems("Health & Beauty", "health-items");
  loadItems("Sport & Leisure", "sports-items");
  // loadItems("Motors", "motors-items");
  loadItems("Collectables", "collectables-items");


});})