//Event listener for making sure user uploads only 2 files
var imgFiles = document.getElementById("imgFiles");

imgFiles.addEventListener('change', function () {
  //Check if the number of files is greater than 2
  if (this.files.length > 2) {
    imgFiles.setCustomValidity("You can only upload 2 files");
  //Check if the number of files is less than 2
  } else if (this.files.length < 2) {
    imgFiles.setCustomValidity("You must upload 2 files");
  } else {
    imgFiles.setCustomValidity('');
  }

  imgFiles.reportValidity();
});

//jQuery function to fetch user's items data from the database and display it in the table
$(document).ready(function() {
  //Make an AJAX request to fetch the user's items
  $.ajax({
    url: "fetchItems.php", //The URL to PHP file that fetches items
    method: "GET", //HTTP GET method
    dataType: "json", //Expecting JSON response data
    success: function(response) {
      // Check if item details are returned
      if (response.length > 0) { 
        // Iterate through the items and append them to the table, then display them
        $.each(response, function (item) {
          $('#itemsTableBody').append(
            `<tr>
              <td>${item.itemName}</td>
              <td>£${item.itemPrice}</td>
              <td>${item.itemCategory}</td>
              <td>${item.itemDescription}</td>
              <td><img src="${item.itemImages}" alt="Item Image" width="50" height="50"></td>
              <td><button class="edit-button" data-item-id="${item.itemID}">Edit</button></td>
            </tr>`
          );
      });
    } else {
        // If no items are found, display a error message in the table
        $('#itemsTableBody').append(
          `<tr>
            <td colspan="5">No items found</td>
          </tr>`
        );
      }
    },
    error: function (error) {
      // Handle errors (e.g., network issues)
      alert("Error fetching items data, please try again later.");
    }
  });
});