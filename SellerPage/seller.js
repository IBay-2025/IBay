//Event listener to resize header and center body when page is loaded
$(document).ready(function () {
  $("body").css("margin", "auto");
  $("body").css("width", "100%");
  $("header").css("width", "100%");
})

//Event listener for making sure start date is not greater than end date
$(document).on('change, blur', '#startDate, #endDate', function() {
  var startDate = $('#startDate').val(); //Get the value of the input field
  var endDate = $('#endDate').val(); //Get the value of the end date input field

  //Check if the start date is greater than the end date
  if (startDate > endDate) {
    this.setCustomValidity("Start date cannot be greater than end date"); //If the start date is greater than the end date, set the custom validity message
  } else if (startDate < new Date().toISOString().split('T')[0]) { //Check if start date is less than current date
    this.setCustomValidity("Start date cannot be less than current date");
  } else if (endDate < new Date().toISOString().split('T')[0]) { //Check if end date is less than current date
    this.setCustomValidity("End date cannot be less than current date");
  } else {
    this.setCustomValidity(''); //If the start date is not greater than the end date, set the custom validity to empty
  }
  
  this.reportValidity(); //Report the validity of the input field
});

//Event listener for making sure user uploads only 2 files
$(document).on('change', '.imgFiles', function () {
  //Check if the number of files is greater than 2
  if (this.files.length > 2) {
    imgFiles.setCustomValidity("You can only upload 2 files");
  //Check if the number of files is less than 2
  } else if (this.files.length < 2) {
    imgFiles.setCustomValidity("You must upload 2 files");
  } else {
     //Check if the file size is greater than 
    if (this.files[0].size > 1048576*5 || this.files[1].size > 1048576*5) {
      imgFiles.setCustomValidity("File size must be less than 5MB"); //Set the custom validity message
    } else {
      imgFiles.setCustomValidity(''); //If the file size is less than 1MB, set the custom validity to empty
    }
  }

  imgFiles.reportValidity();
});

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
  itemTitleValue = $(this).val(); //Get the value of the input field
  
  //Check if the input is empty
  if (itemTitleValue == "") {
    this.setCustomValidity("Please do not leave this field empty"); //If the input is empty, set the custom validity message
  } else {
    this.setCustomValidity(''); //If the input is not empty, set the custom validity to empty
  }
  
  this.reportValidity(); //Report the validity of the input field
});