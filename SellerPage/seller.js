//Event listener for making sure user uploads only 2 files
$(document).on('change', '#imgFiles', function () {
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

//Adjust the width of header to be the same as body width for the view page
$("#view-header").css("width", $("#view-body").width()); //Set the width of the header to be the same as the body width
//$("#home-header").css("width", $("#home-body").width()); //Set the margin of the header to be the same as the body margin

//Validate the price input to make sure it has 2 decimal places
$(document).on('change, blur', '.itemPrice', function () {
  itemPriceValue = $(this).val(); //Get the value of the input field
  
  //Check if the input matches the regex pattern for a valid price format
  pattern = /^(0|[1-9]\d*)\.\d{2}$/; //Regex pattern for a valid price format
  if (pattern.test(itemPriceValue)) {
    this.setCustomValidity(''); //If the input is valid, set the custom validity to empty
  } else {
    this.setCustomValidity("Please enter a valid price to 2 decimal places and no leading zeros."); //If the input is invalid, set the custom validity message
  }
  
  this.reportValidity(); //Report the validity of the input field
});

//Validate the item title input to make sure it is not empty
$(document).on('change, blur', '.itemTitle, .itemTextbox', function () {
  itemNameValue = $(this).val(); //Get the value of the input field
  
  //Check if the input is empty
  if (itemNameValue == "") {
    this.setCustomValidity("Please do not leave this field empty"); //If the input is empty, set the custom validity message
  } else {
    this.setCustomValidity(''); //If the input is not empty, set the custom validity to empty
  }
  
  this.reportValidity(); //Report the validity of the input field
});

//Events listener for allowing user to upload a different image by clicking on the image preview
/*var imgPreview1 = document.getElementById("imgPreview1");
var imgPreview2 = document.getElementById("imgPreview2");

imgPreview1.addEventListener('change', function (event) {
  var imageOutput1 = document.getElementById('imgOutput1');

  imageOutput1.src = URL.createObjectURL(event.target.files[0]); //Set the src of the image preview to the selected file
});

imgPreview2.addEventListener('change', function (event) {
  var imageOutput2 = document.getElementById('imgOutput2');

  imageOutput2.src = URL.createObjectURL(event.target.files[0]); //Set the src of the image preview to the selected file
});*/

//Event listener for editing an item's details in the table
$(document).on('click', '.edit-btn', function(event) 
  {
    alert("Edit button clicked"); //Debugging alert
    event.preventDefault(); 
  
    // Get the row of the button that was clicked
    var row = $(this).closest("tr");
  
    // Get the item ID from the first cell of the row
    var itemId = row.find("td").eq(0).text();
  
    alert("Editing item with ID: " + itemId);
  
    //Hide the edit button and show the save button and cancel button
    row.find(".edit-btn").hide(); 
    row.find(".save-btn").show(); 
    row.find(".cancel-btn").show(); 
  
    // Make the whole row editable
    // The class row-data is used to allow for specific values to be editable and prevent editing of item id
    //row.find(".row-data").attr("contenteditable","true").prop("disabled", false);
  
    //alert("Enabled: " + row.find("imgPreview"));
    //Iterate through the row-data class elements and set them to be editable and set the original value to be the current value
    //originalvalue used to revert back to the original value if the user cancels the edit
    //alert("Row data: " + row.find(".row-data").length);
    row.find(".row-data").each(function() {
      //Check if element is a file input, 
      if ($(this).attr("type") == "file") {
        $(this).attr("originalvalue", $(this).prev().children().attr("src")); // Store the original value in a data attribute
        $(this).prop("disabled", false); // Enable the file input
      } else if (["itemPostage", "itemCategory"].includes($(this).attr("name"))) { //
        $(this).attr("originalvalue", $(this).find(":selected").val()); // Store the original value in a data attribute
        //$(this).html($(this).attr("originalvalue")); // Set the inner HTML of the element to the value
        $(this).prop("disabled", false); // Make the element editable
        //alert($(this).attr("originalvalue")); //Debugging alert
      } else {
        $(this).attr("originalvalue", $(this).val()); // Store the original value in a data attribute
        $(this).prop("disabled", false); // Make the element editable
      }
  
      //alert($(this).attr("originalvalue")) // Store the original value in a data attribute
    });
      //Check if the element is 
    //Store the original values of the row in data attributes in case the user wants to cancel the edit
    /*row.find(".row-data").each(function() {
      if ($(this).attr("contenteditable") == "true") {
        $(this).attr("original-value", $(this).text()); // Store the original value in a data attribute
      }
      alert("Original value: " + $(this).attr("original-value"));
    });*/
  
});

//Event listener for allowing user to upload a different image by clicking on the image preview
$(document).on('click', '.imgOutput', function (event) {
  //alert("Image preview 1 changed"); //Debugging alert
  //var imageOutput = $(this).parent().next();
  $(this).parent().next().click(); //Trigger the file input click event to allow user to select a new image 
  //alert($(this).parent().next().prop('files').length); //Debugging alert
  //alert("Image output: " + imageOutput.attr('src')); //Debugging alert
  //Set the src of the image preview to the selected file
});

//Event listener for changing the image preview when a new file is selected
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
    } else if (["itemPostage", "itemCategory"].includes($(this).attr("name"))){
      //$(this).attr("value", $(this).attr("originalvalue")); // Set the value of the element to the original value
      //alert($(this).attr("originalvalue"));
      //$(this).attr("value", $(this).attr("origiSnalvalue")); // Set the value of the element to the original value
      //alert($(this).attr("value"));
      $(this).val($(this).attr("originalvalue")); // Set the selected value of the element to the original value
      $(this).prop("disabled", true); // Make the element non-editable
      //alert($(this).find(":selected").val()); //Debugging alert
    } else {
      $(this).val($(this).attr("originalvalue")); // Set the value of the element to the original value
      $(this).attr("disabled", true); // Make the element non-editable
    }

    //alert($(this).attr("disabled")); // Store the original value in a data attribute
    //alert("Value: " + $(this).find(":selected").val()); //Debugging alert
    //alert("Original value: " + $(this).attr("originalvalue")); //Debugging alert
  });

  /*row.find(".row-data").each(function() {
      //Check if element is a file input, 
      if ($(this).attr("type") == "file") {
        $(this).attr("originalvalue", $(this).prev().children().attr("src")); // Store the original value in a data attribute
        $(this).prop("disabled", false); // Enable the file input
      } else if (["itemPostage", "itemCategory"].includes($(this).attr("name"))) { //
        $(this).attr("originalvalue", $(this).find(":selected").val()); // Store the original value in a data attribute
        //$(this).html($(this).attr("originalvalue")); // Set the inner HTML of the element to the value
        $(this).prop("disabled", false); // Make the element editable
        //alert($(this).attr("originalvalue")); //Debugging alert
      } else {
        $(this).attr("originalvalue", $(this).val()); // Store the original value in a data attribute
        $(this).prop("disabled", false); // Make the element editable
      }
  
      //alert($(this).attr("originalvalue")) // Store the original value in a data attribute
    });*/

})

//Event listener for saving the edit of an item in the table
$(document).on('click', '.save-btn', function(event) 
{
  alert("Save button clicked"); //Debugging alert
  event.preventDefault(); 

  // Get the row of the button that was clicked
  var row = $(this).closest("tr");

  // Get the item ID from the first cell of the row
  var itemId = row.find("td").eq(0).text();

  //alert("Saving edit for item with ID: " + itemId);

  //Get the item details from the row and store them in an object
  //alert(parseFloat(row.find("td").eq(2).find(".row-data").attr("value"))); //Debugging alert
  //var num = row.find("td").eq(2).find(".row-data").attr("value").length-1;
  //alert(parseFloat(row.find("td").eq(2).find(".row-data").attr("value")).toPrecision(num)); //Debugging alert
  //var e = row.find("td").eq(4).find(":selected");
  //var e = document.getElementById("itemCategory"); //Get the item category from the select element
  //alert(e.val()); //Debugging alert

  const itemDetails = {
    itemId: parseInt(row.find("td").eq(0).text()),
    itemName: row.find("td").eq(1).find(".row-data").val(),
    itemCategory: row.find("td").eq(4).find(":selected").val(), //Get the selected value from the select element
    itemDescription: row.find("td").eq(5).find(".row-data").val(),
    itemPrice: parseFloat(row.find("td").eq(2).find(".row-data").val()), //Convert the price (type string) to a float
    itemPostage: row.find("td").eq(3).find(":selected").val(),
    itemImages: {itemImage1: row.find("td").eq(6).find("img").eq(0).attr("src"), 
      imgImage2:row.find("td").eq(6).find("img").eq(1).attr("src")}
  };

  const itemDetailsJSON = JSON.stringify(itemDetails); //Convert the object to a JSON string

  alert("Item details: " + JSON.stringify(itemDetails)); //Debugging alert

  //Make an AJAX request to update the item details in the database
  $.ajax({
    url: "updateItem.php", // The URL to PHP file that updates items
    method: "POST", // HTTP POST method
    data: itemDetailsJSON, // Data to be sent to the server
    success: function(response) {
      // If update is successful, update the row in the table with the new values
      if (response.success) {
        alert("Item updated successfully"); //Debugging alert
        //Iterate through the row-data class elements and set them to be non-editable and set the original value to be the current value
        row.find(".row-data").each(function() {
        if ($(this).attr("type") == "file") {
          //$(this).prev().children().attr("src", $(this).attr("src"));
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
    //alert("Value: " + $(this).attr("originalvalue")); //Debugging alert
      } else {
        alert("Error updating item, please click cancel and try again later.");
    }},
    error: function(error) {
      // Handle errors (e.g., network issues)
      alert("Error updating item, please cick cancel and try again later.");
      /*row.find(".row-data").each(function() {
        alert($(this).attr("originalvalue")); 
      });*/
    }
  });


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
    data: JSON.stringify({ "itemId": itemId }), //Data to be sent to the server
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