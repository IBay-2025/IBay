//jQuery function for deleting an item from the basket
$(document).on("click", ".remove-btn", function() {
    //Remove the row of the button that was clicked
    $(this).closest("tr").remove();

    //Subtract the price and quantity of the item from the subtotal
    var subtotal = parseFloat($("#subtotal").text().split("£")[1]);
    var totalPrice = parseFloat($(this).closest("tr").find(".totalPrice").text());
    $("#subtotal").html(`<strong>Subtotal:</strong> £${(subtotal - totalPrice).toFixed(2)}`);
});

//jQuery function for calcating the total price for each item with respect to quantity in the basket
$(document).ready(function() {
    var rows = $("tbody").find("tr");
    $.each(rows, function() {
        var price = parseFloat($(this).find(".price").text());
        var quantity = parseFloat($(this).find(".quantity").text());
        var total = price * quantity;
        $(this).find(".totalPrice").html(total);
    });
});


//jQuery function for summing up the total price (subtotal) of all items in the basket
$(document).ready(function() {
    var subtotal = 0;
    var totalPrices = $(document).find(".totalPrice");
    $.each(totalPrices, function() {
        subtotal += parseFloat($(this).text());
    })

    //Round the subtotal to two decimal places and display it in the subtotal element with the text
    $("#subtotal").html(`<strong>Subtotal:</strong> £${subtotal.toFixed(2)}`); //Round the subtotal to two decimal places and display it in the subtotal element with the text
})