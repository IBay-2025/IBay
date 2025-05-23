//Function to resize header when window is resized
$(window).resize(function() { 
  $("#itemTable").width(window.innerWidth);
  $(".content-box").width($("#itemTable").width());
  $("body").width("max-content");
  $("header").width($("body").width());
});

//jQuery function to fetch user's items data from the database and display it in the table
$(document).ready(function() {
    $("html").width("max-content"); 

    //Make an AJAX request to fetch the user's items
    $.ajax({
      url: "fetchItems.php", // The URL to PHP file that fetches items
      method: "GET", // HTTP GET method
      dataType: "json", // Expecting JSON response data
      success: function(response) {

        if (response.length > 0) { 
          // Iterate through the items and append them to the table, then display them
          var tbl = '';

          $.each(response, function(index, item) {
            // Create a table row for each item
            tbl += `<tr>`;
            tbl += `<td hidden>${item.itemId}</td>`;
            tbl += `<td>
                      <textarea type="text" class="row-data itemTitle itemTextbox" name="itemTitle" disabled>${item.itemTitle}</textarea>
                    </td>`;
            tbl += `<td>
                      <input type="number" class="row-data itemPrice" step="0.01" min="0.00" placeholder="Enter Item Price (in GBP)" name="itemPrice" value="${parseFloat(item.itemPrice).toFixed(2)}" disabled>
                    </td>`;
            tbl += `<td>
                      <select class="row-data itemPostage" name="itemPostage" disabled>
                      <option value=${item.itemPostage} selected disabled hidden>${item.itemPostage}</option>
                      <option value="0.00 - Standard Delivery">0.00 - Standard Delivery</option>
                      <option value="1.00 - Standard Delivery">1.00 - Standard Delivery</option>
                      <option value="2.00 - Standard Delivery">2.00 - Standard Delivery</option>
                      <option value="0.00 - Economy Delivery">0.00 - Economy Delivery</option>
                      <option value="1.00 - Economy Delivery">1.00 - Economy Delivery</option>
                      <option value="2.00 - Economy Delivery">2.00 - Economy Delivery</option>
                      </select>
                    </td>`;
            tbl += `<td>
                      <select class="row-data itemCategory" name="itemCategory" disabled>
                        <option value=${item.itemCategory} selected disabled hidden>${item.itemCategory}</option>
                        <option value="Home">Home</option>
                        <option value="Garden & DIY">Garden & DIY</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Refurbished">Refurbished</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Jewellery & Watches">Jewellery & Watches</option>
                        <option value="Motors">Motors</option>
                        <option value="Collectables">Collectables</option>
                        <option value="Sport & Leisure">Sport & Leisure</option>
                        <option value="Health & Beauty">Health & Beauty</option> 
                      </select>           
                    </td>`;
            tbl += `<td>
                      <textarea type="text" class="row-data itemTextbox" name="itemDescription" disabled>${item.itemDescription}</textarea>
                    </td>`;
            tbl += `<td>
                      <label for="imgPreview"><img class="imgOutput" src="data:image/${item.images[0].imageExtension};base64, ${item.images[0].imageBin}" alt="Item Image 1" ></label>
                      <input type="file" class="row-data imgPreview" name="imgPreview1" accept="image/*" hidden disabled>
                      <label for="imgPreview"><img class="imgOutput" src="data:image/${item.images[1].imageExtension};base64, ${item.images[1].imageBin}" alt="Item Image 2"></label>
                      <input type="file" class="row-data imgPreview" name="imgPreview2" accept="image/*" hidden disabled>
                    </td>`;
            tbl += `<td>
                      <label for="startDate">Start Date:</label>
                      <input type="datetime-local" class="row-data startDate" id="startDate" name="startDate" value=${item.startDate.slice(0, 10) + "T" + item.startDate.slice(11, 19)} step="1" disabled required>
                      <br>
                      <label for="endDate">End Date:</label>
                      <input type="datetime-local" class="row-data endDate" id="endDate" name="endDate" value=${item.endDate.slice(0, 10) + "T" + item.endDate.slice(11, 19)} step="1" disabled required>
                    </td>`;
            tbl += `<td>
                      <button id="editBtn" class="btn edit-btn">Edit</button>
                      <button name="saveBtn" class="btn save-btn" hidden>Save</button> 
                      <button name="cancelBtn" class="btn cancel-btn" hidden>Cancel</button>
                    </td>`;
            tbl += `<td>
                      <button id="deleteBtn" class="btn delete-btn">Delete</button>
                    </td>`;
            tbl += `</tr>`;
  
          });

          //Append the table rows to the table body
          $(document).find('#itemTableBody').html(tbl);

          //Resize the header and content box after all items have loaded in
          $(".content-box").width($("#itemTable").width());
	        $("header").width($(".content-box").outerWidth());

      } else {
          // If no items are found, display a error message in the table
          $(document).find('#itemTableBody').html(
            `<tr>
              <td colspan="9">No items found. Please try again later, or add an item.</td>
            </tr>`
          );
        }
      },
      error: function (error) {
        // Handle errors (e.g., network issues)
        alert("Error adding items to html, please try again later.");
        $("header").width($("body").outerWidth());
        
        // If there is an error, display a error message in the table
        $(document).find('#itemTableBody').html(
          `<tr>
            <td colspan="9">No items found. Please try again later, or add an item.</td>
          </tr>`
        );

      }
    });
});

//Event listener for resizing the header and content box if no items are found
$(document).ready( function() {
  $("header").width($("body").outerWidth());
});

//Event listener for allowing user to upload a different image by clicking on the image preview
$(document).on('click', '.imgOutput', function (event) {
  $(this).parent().next().click(); //Trigger the file input click event to allow user to select a new image 
});

//Event listener for changing the image preview when a new file is selected
$(document).on('change', '.imgPreview', function (event) {
  var image = URL.createObjectURL($(this).prop('files')[0]);
  $(this).prev().children().attr('src', image); //Set the src of the image preview to the selected file
});

//Event listener for cancelling the edit of an item in the table
$(document).on('click', '.cancel-btn', function(event) 
{
  event.preventDefault(); 

  // Get the row of the button that was clicked
  var row = $(this).closest("tr");

  //Hide the save button and cancel button and show the edit button
  row.find(".save-btn").hide(); 
  row.find(".cancel-btn").hide(); 
  row.find(".edit-btn").show(); 

  //Iterate through the row-data class elements and set them to be non-editable and set the original value to be the current value
  row.find(".row-data").each(function() {
    if ($(this).attr("type") == "file") {
      $(this).prev().children().attr("src", $(this).attr("originalvalue")); // Set the src of the image preview to the original value
      $(this).prop("disabled", true); // Disable the file input
    } else if (["itemPostage", "itemCategory"].includes($(this).attr("name"))){
      $(this).val($(this).attr("originalvalue")); // Set the selected value of the element to the original value
      $(this).prop("disabled", true); // Disable the element
    } else {
      $(this).val($(this).attr("originalvalue")); // Set the value of the element to the original value
      $(this).attr("disabled", true); // Disable the element
    }
  });
});

//Function for validating item title, item price, item description, item images and duration dates when the user clicks on the save button
function validateOnSave(row) {
  // Get the item title, item price, item description, item images and duration dates from the row
  var itemTitle = row.find(".itemTitle"); //Get the value of the item title input field
  var itemPrice = row.find(".itemPrice"); //Get the value of the item price input field
  var itemDescription = row.find(".itemTextbox").eq(1); //Get the value of the item description input field
  var startDate = row.find(".startDate").val(); //Get th;e value of the start date input field
  var endDate = row.find(".endDate").val(); //Get the value of the end date input field
  var itemImage1 = row.find(".imgPreview").eq(0); //Get the value of the item images input field
  var itemImage2 = row.find(".imgPreview").eq(1); //Get the value of the item images input field

  //Check validity for the item title, item price, item description, item images and duration dates
  if (itemTitle.val() == "" || itemPrice.val() == "" || itemDescription.val() == "" ) {
    alert("Please fill in all empty fields");
    return false; //Return false to prevent item from being saved
    //Check if start date is greater than end date
  } else if (startDate > endDate) {
    alert("Start date cannot be greater than end date"); //If the start date is greater than the end date, set the custom validity message
    return false; //Return true to allow item to be saved
  } else if (startDate < new Date()) { //Check if start date is less than current date
    this.setCustomValidity("Start date cannot be less than current date");
    return false;
  } else if (endDate < new Date()) { //Check if end date is less than current date
    this.setCustomValidity("End date cannot be less than current date");
    return false;
  } else if (itemImage1[0].files.length > 0 && itemImage1[0].files[0].size > 1048576*5 || itemImage2[0].files.length > 0 && itemImage2[0].files[0].size > 1048576*5) {
    alert("File size must be less than 5MB"); //If the file size is greater than 5MB, set the custom validity message
    return false; 
  } else{
    return true; //Return true to allow item to be saved
  }
};

//Event listener for saving the edit of an item in the table
$(document).on('click', '.save-btn', function(event) 
{
  event.preventDefault(); 

  // Get the row of the button that was clicked
  var row = $(this).closest("tr");

  if (validateOnSave(row) == false) {
    alert("Please fill in all the required fields correctly before saving."); //If the validation fails, show an alert message
    return; //If the validation fails, return and do not proceed with saving
  }

  // Get the item details and store them in an object
  const itemDetails = {
    itemId: parseInt(row.find("td").eq(0).text()),
    itemTitle: row.find("td").eq(1).find(".row-data").val(),
    itemCategory: row.find("td").eq(4).find(":selected").val(), //Get the selected value from the select element
    itemDescription: row.find("td").eq(5).find(".row-data").val(),
    itemPrice: parseFloat(row.find("td").eq(2).find(".row-data").val()), //Convert the price (type string) to a float
    itemPostage: row.find("td").eq(3).find(":selected").val(),
    itemImages: {imgLink1: row.find("td").eq(6).find("img").eq(0).attr("src"), 
      imgLink2: row.find("td").eq(6).find("img").eq(1).attr("src")},
    startDate: row.find("td").eq(7).find(".row-data").eq(0).val(), //Get the value of the start date input field
    endDate: row.find("td").eq(7).find(".row-data").eq(1).val() //Get the value of the end date input field
  };

  //Make an AJAX request to update the item details in the database
  $.ajax({
    url: "updateItem.php", // The URL to PHP file that updates items
    method: "POST", // HTTP POST method
    data: itemDetails, // Data to be sent to the server
    success: function(response) {
      // If update is successful, update the row in the table with the new values
      if (response) {
        alert("Item updated successfully"); //Debugging alert
        //Iterate through the row-data class elements and set them to be non-editable and set the original value to be the current value
        row.find(".row-data").each(function() {
        if ($(this).attr("type") == "file") {
          $(this).attr("originalvalue", $(this).prev().children().attr("src"));
          $(this).prop("disabled", true); // Disable the file input
        } else if (["itemPostage", "itemCategory"].includes($(this).attr("name"))) {
          $(this).find(":selected").val($(this).attr("originalvalue")); // Set the selected value of the element to the original value
          $(this).prop("disabled", true); // Make the element non-editable
        } else {
          $(this).attr("originalvalue", $(this).val()); // Set the value of the element to the original value
          $(this).attr("disabled", true); // Make the element non-editable
        }
      });

      //Hide the save button and cancel button and show the edit button
        row.find(".save-btn").hide(); 
        row.find(".cancel-btn").hide(); 
        row.find(".edit-btn").show();
        
      } else {
        alert("Your item was not updated, please try again later."); //Debugging alert
    }},
    error: function(error) {
      // Handle errors (e.g., network issues)
      alert("Error updating item, please cick cancel and try again later.");
    }
  });
});

//jQuery function for deleting an item from the table
$(document).on("click", ".delete-btn", function(event) {
  
  event.preventDefault(); // Prevent the default action of the button

  // Get the row of the button that was clicked
  var row = $(this).closest("tr");

  // Get the item ID from the first cell of the row
  var itemId = parseInt(row.find("td").eq(0).text()); //Get the item ID from the first cell of the row
  
  // Make an AJAX request to delete the item from the database
  $.ajax({
    url: "deleteItem.php", //The URL to PHP file that deletes items
    method: "POST", //HTTP POST method
    data: { "itemId": itemId }, //Data to be sent to the server
    success: function(response) {
      // If deletion is successful, remove the row from the table
      if (response) {
        row.remove();
      } else {
        alert("Error deleting item, please try again later.");
      }
    },
    error: function(error) {
      // Handle errors (e.g., network issues)
      alert("Error deleting item, please try again later.");
    }
  });

  
});

//Event listener for editing an item's details in the table
$(document).on('click', '.edit-btn', function(event) 
  {
    event.preventDefault(); 

    // Get the row of the button that was clicked
    var row = $(this).closest("tr");
  
    //Hide the edit button and show the save button and cancel button
    row.find(".edit-btn").hide(); 
    row.find(".save-btn").show(); 
    row.find(".cancel-btn").show(); 
  
    // Make the whole row editable
    row.find(".row-data").each(function() {
      //Check if element is a file input, 
      if ($(this).attr("type") == "file") {
        $(this).attr("originalvalue", $(this).prev().children().attr("src")); // Store the original value in a data attribute
        $(this).prop("disabled", false); // Enable the file input
      } else if (["itemPostage", "itemCategory"].includes($(this).attr("name"))) { //
        $(this).attr("originalvalue", $(this).find(":selected").val()); // Store the original value in a data attribute
        $(this).prop("disabled", false); // Make the element editable
      } else {
        $(this).attr("originalvalue", $(this).val()); // Store the original value in a data attribute
        $(this).prop("disabled", false); // Make the element editable
      }
    });
});
