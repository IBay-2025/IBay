$(document).ready(function(){
    $.get("login.php",function(data,status){
        if(status == "success"){
            //alert("Login loaded!");
        }else{
            //alert("Login failed!");
        }
    });
});	