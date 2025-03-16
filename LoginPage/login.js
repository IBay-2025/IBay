//Delete this if necessary//
/*window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
}*/

//Validation of password//
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");

//Event listener for password
password.addEventListener("input", function () {
  var passwordVal = document.getElementById("password").value;
  //If password is "test", skip password validation
  if (passwordVal == "test") {
    password.setCustomValidity('');
  } else {
    //Check if password is at least 8 characters
    if (passwordVal.length < 8) {
      password.setCustomValidity("Password must be at least 8 characters");
    //Check if password contains at least one number
    } else if (passwordVal.search(/[0-9]/) < 0) {
      password.setCustomValidity("Password must contain at least one number");
    //Check if password contains at least one uppercase letter
    } else if (passwordVal.search(/[A-Z]/) < 0) {
      password.setCustomValidity("Password must contain at least one uppercase letter");
    //Check if password contains at least one lowercase letter
    } else if (passwordVal.search(/[a-z]/) < 0) {
      password.setCustomValidity("Password must contain at least one lowercase letter");
    //Check if password contains at least one special character
    } else if (passwordVal.search(/[^a-zA-Z0-9]/) < 0) {
      password.setCustomValidity("Password must contain at least one special character");
    } else {
      password.setCustomValidity('');
    }
  }
  password.reportValidity();
})

//Event listener for confirming password
confirmPassword.addEventListener('input', function () {
  var passwordVal = document.getElementById("password").value;
  var confirmPasswordVal = document.getElementById("confirmPassword").value;

  // Check if passwords match
  if (passwordVal != confirmPasswordVal) {
    confirmPassword.setCustomValidity("Passwords do not match");
  } else {
    confirmPassword.setCustomValidity('');
  }

  confirmPassword.reportValidity();
});
