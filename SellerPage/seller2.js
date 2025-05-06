$(document).on('click', '.imgOutput', function (event) {
    //alert("Image preview 1 changed"); //Debugging alert
    //var imageOutput = $(this).parent().next();
    $(this).parent().next().click(); //Trigger the file input click event to allow user to select a new image 
    //alert($(this).parent().next().prop('files').length); //Debugging alert
    //alert("Image output: " + imageOutput.attr('src')); //Debugging alert
    //Set the src of the image preview to the selected file
});

$(document).on('change', '.imgPreview', function (event) {
    var image = URL.createObjectURL($(this).prop('files')[0]); //Debugging alert
    //alert("Image: " + image); //Debugging alert
    //alert(URL.createObjectURL(event.target.files[0]))
    //alert($(this).prev().children().attr('src'));
    //alert("Image preview 1 changed"); //Debugging alerts
  //imageOutput.src = URL.createObjectURL(event.target.files[0]); 
    $(this).prev().children().attr('src', image); //Set the src of the image preview to the selected file
});
  
  
//jQuery function to fetch user's items data from the database and display it in the table
$(document).ready(function() {
    //Make an AJAX request to fetch the user's items
    $.ajax({
      url: "fetchItems.php", // The URL to PHP file that fetches items
      method: "GET", // HTTP GET method
      dataType: "json", // Expecting JSON response data
      success: function(response) {
        // Check if item details are returned
        if (response.length > 0) { 
          // Iterate through the items and append them to the table, then display them
          $.each(response, function (item) {
            $('#itemsTableBody').append(
              `<tr>
                <td>${item.itemId}</td>
                <td>${item.itemName}</td>
                <td>£${item.itemPrice}</td>
                <td>${item.itemCategory}</td>
                <td>${item.itemDescription}</td>
                <td><img src="${item.itemImages}" alt="Item Image" width="50" height="50"></td>
                <td><button id="editBtn" class="btn edit-btn">Edit</button></td>
                <td><button id="deleteBtn" onclick="deleteItem(this)" class="btn">Delete</button></td>
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
        //alert("Error fetching items data, please try again later.");
      }
    });
});
  
  
//Event listener for cancelling the edit of an item in the table
$(document).on('click', '.cancel-btn', function(event) 
  {
    event.preventDefault(); 
  
    // Get the row of the button that was clicked
    var row = $(this).closest("tr");
  
    // Get the item ID from the first cell of the row
    var itemId = row.find("td").eq(0).text();
  
    alert("Cancelling edit for item with ID: " + itemId);
  
    //Hide the save button and cancel button and show the edit button
    row.find(".save-btn").hide(); 
    row.find(".cancel-btn").hide(); 
    row.find(".edit-btn").show(); 
  
    // Make the whole row non-editable
    //row.find(".row-data").attr("contenteditable","false").prop("disabled",true)
  
    //Iterate through the row-data class elements and set them to be non-editable and set the original value to be the current value
    row.find(".row-data").each(function() {
      if ($(this).attr("type") == "file") {
        //alert(jQuery.type($(this).attr("originalvalue"))); // Store the original value in a data attribute
        $(this).prev().children().attr("src", $(this).attr("originalvalue")); // Set the src of the image preview to the original value
        $(this).prop("disabled", true); // Disable the file input
      } else {
        //$(this).attr("value", $(this).attr("originalvalue")); // Set the value of the element to the original value
        //alert($(this).attr("originalvalue"));
        //$(this).attr("value", $(this).attr("origiSnalvalue")); // Set the value of the element to the original value
        //alert($(this).attr("value"));
        $(this).val($(this).attr("originalvalue")); // Set the value of the element to the original value
        $(this).attr("disabled", true); // Make the element non-editable
      }
  
      //alert("Value: " + $(this).attr("value")); //Debugging alert
      //alert("Original value: " + $(this).attr("originalvalue")); //Debugging alert
    });
  
})
  
//Event listener for saving the edit of an item in the table
$(document).on('click', '.save-btn', function(event) 
  {
    event.preventDefault(); 
  
    // Get the row of the button that was clicked
    var row = $(this).closest("tr");
  
    // Get the item ID from the first cell of the row
    var itemId = row.find("td").eq(0).text();
  
    //alert("Saving edit for item with ID: " + itemId);
  
    //Hide the save button and cancel button and show the edit button
    row.find(".save-btn").hide(); 
    row.find(".cancel-btn").hide(); 
    row.find(".edit-btn").show();
  
    //Iterate through the row-data class elements and set them to be non-editable and set the original value to be the current value
  
    row.find(".row-data").each(function() {
      if ($(this).attr("type") == "file") {
        //$(this).prev().children().attr("src", $(this).attr("src"));
        $(this).attr("originalvalue", $(this).prev().children().attr("src"));
        $(this).prop("disabled", true); // Disable the file input
      } else {
        //$(this).val($(this).attr("value")); // Set the value of the element to the original value
        $(this).attr("originalvalue", $(this).val()); // Set the value of the element to the original value
        $(this).attr("disabled", true); // Make the element non-editable
      }
  
      alert("Value: " + $(this).attr("originalvalue")); //Debugging alert
    });
  
    //Get the item details from the row and store them in an object
    //alert(parseFloat(row.find("td").eq(2).find(".row-data").attr("value"))); //Debugging alert
    //var num = row.find("td").eq(2).find(".row-data").attr("value").length-1;
    //alert(parseFloat(row.find("td").eq(2).find(".row-data").attr("value")).toPrecision(num)); //Debugging alert
  
    lenOfPrice = row.find("td").eq(2).find(".row-data").attr("value").length-1; //Get the length of the price string minus the £ sign
    
    var itemDetails = {
      itemId: parseInt(row.find("td").eq(0).text()),
      itemName: row.find("td").eq(1).find(".row-data").val(),
      itemCategory: row.find("td").eq(4).find(".row-data").val(),
      itemDescription: row.find("td").eq(5).find(".row-data").val(),
      itemPrice: parseFloat(row.find("td").eq(2).find(".row-data").val()).toPrecision(lenOfPrice), //Convert the price to a float and remove the £ sign
      itemPostage: row.find("td").eq(3).find(".row-data").val(),
      itemImages: {itemImage1: row.find("td").eq(6).find("img").eq(0).attr("src"), imgImage2:row.find("td").eq(6).find("img").eq(1).attr("src")}
    };
  
    alert("Item details: " + JSON.stringify(itemDetails)); //Debugging alert
});
  
//jQuery function for deleting an item from the table
$(document).on("click", ".delete-btn", function(event) {
    
    event.preventDefault(); // Prevent the default action of the button
  
    // Get the row of the button that was clicked
    var row = $(this).closest("tr");
  
    // Get the item ID from the first cell of the row
    var itemId = row.find("td").eq(0).text(); //Get the item ID from the first cell of the row
    
    // Make an AJAX request to delete the item from the database
    $.ajax({
      url: "deleteItem.php", //The URL to PHP file that deletes items
      method: "POST", //HTTP POST method
      data: { "itemId": itemId }, //Data to be sent to the server
      success: function(response) {
        // If deletion is successful, remove the row from the table
        if (response.success) {
          row.remove();
        } else {
          //alert("Error deleting item, please try again later.");
        }
      },
      error: function(error) {
        // Handle errors (e.g., network issues)
        //alert("Error deleting item, please try again later.");
      }
    });
});