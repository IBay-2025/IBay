//jQuery function to fetch user's items data from the database and display it in the table
$(document).ready(function() {
    //Make an AJAX request to fetch the user's items
    $.ajax({
      url: "fetchItems.php", // The URL to PHP file that fetches items
      method: "GET", // HTTP GET method
      dataType: "json", // Expecting JSON response data
      success: function(response) {
        console.log("Program reached the success callback of the AJAX request.");
        // Check if item details are returned
        //console.log("Response from fetchItems.php:", response); // Log the response to the console

        if (response.length > 0) { 
          // Iterate through the items and append them to the table, then display them
          var tbl = '';
          
          $.each(items, function(index, item) {
            tbl += `<tr>`;
            tbl += `<td>${item.itemId}</td>`;
            tbl += `<td>
                      <textarea type="text" class="row-data itemTitle itemTextbox" name="itemTitle" disabled>${item.itemTitle}</textarea>
                    </td>`;
            tbl += `<td>
                      <input type="number" class="row-data itemPrice" step="0.01" min="0.00" placeholder="Enter Item Price (in GBP)" name="itemPrice" value="${item.itemPrice.toFixed(2)}" disabled>
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
                      <label for="imgPreview"><img id=${item.itemImages[0].imageId} class="imgOutput" src="${item.itemImages[0].imageLink}" alt="Item Image 1" ></label>
                      <input type="file" class="row-data imgPreview" name="imgPreview1" accept="image/*" hidden disabled>
                      <label for="imgPreview"><img id=${item.itemImages[1].imageId} class="imgOutput" src="${item.itemImages[1].imageLink}" alt="Item Image 2"></label>
                      <input type="file" class="row-data imgPreview" name="imgPreview2" accept="image/*" hidden disabled>
                    </td>`;
            tbl += `<td>
                      <label for="startDate">Auction Start Date:</label>
                      <input type="datetime-local" class="row-data startDate" id="startDate" name="startDate" value=${item.startDate} disabled required>
                      <br>
                      <label for="endDate">Auction End Date:</label>
                      <input type="datetime-local" class="row-data endDate" id="endDate" name="endDate" value=${item.endDate} disabled required>
                    </td>`;
            tbl += `<td>
                      <button id="editBtn" class="btn edit-btn">Edit</button>
                      <button name="saveBtn" class="btn save-btn" hidden>Save</button> 
                      <button name="cancelBtn" class="btn cancel-btn" hidden>Cancel</button>
                    </td>`;
            tbl += `<td>
                      <button id="deleteBtn" class="btn delete-btn">Delete</button>
                    </td>`;
            tbl += '</tr>';
  
          //Append the table rows to the table body
          $(document).find('#itemTableBody').append(tbl); //Append the table rows to the table body
          });
      } else {
          // If no items are found, display a error message in the table
          $('#itemsTableBody').append(
            `<tr>
              <td colspan="11">No items found</td>
            </tr>`
          );
        }
      },
      error: function (error) {
        // Handle errors (e.g., network issues)
        alert("Error fetching items data, please try again later.");
      }
    });
  });