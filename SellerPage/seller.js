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

