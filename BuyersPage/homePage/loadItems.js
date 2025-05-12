$(document).ready(function() {

    //Make an AJAX request to fetch the user's items
    $.ajax({
      url: "fetchItemsRow.php", // The URL to PHP file that fetches items
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
                      <label for="imgPreview"><img class="imgOutput" src="${item.itemBin.image1}" alt="Item Image 1" ></label>
                      <input type="file" class="row-data imgPreview" name="imgPreview1" accept="image/*" hidden disabled>
                      <label for="imgPreview"><img class="imgOutput" src="${item.itemBin.image2}" alt="Item Image 2"></label>
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


          //$(document).find('#itemTableBody').html(tbl); //Append the table rows to the table body
      
      
        } /*else {
          // If no items are found, display a error message in the table
          $(document).find('#itemTableBody').html(
            `<tr>
              <td colspan="9">No items found tom 12/05</td>
            </tr>`
          );
        }*/
      },
      error: function (error) {
        // Handle errors (e.g., network issues)
        alert("Error adding items to html, please try again later.");
      }
    });
  });