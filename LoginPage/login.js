$(document).ready(function(){
    $.get("login.php",function(data,status){
        if(status == "success"){
            //alert("Login successful!");
        }else{
            //alert("Login failed!");
        }
    });
});	