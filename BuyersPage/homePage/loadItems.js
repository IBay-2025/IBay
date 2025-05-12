// buyersPage.js

// Fetch data from fetchItemsRow.php
fetch('fetchItemsRow.php?category=Electronics') // Replace 'Electronics' with the desired category
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched data:', data);
        // Process and display the data as needed
        displayItems(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Function to display items on the page
function displayItems(items) {
    const itemsContainer = document.querySelector('.grid-container'); // Select the container for items
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'grid-item';
        itemElement.onclick = () => location.href = '../itemView/buyersItemView.html'; // Redirect on click

        // Add item details to the grid item
        itemElement.innerHTML = `
            <h3>${item.itemTitle}</h3>
            <p>${item.itemDescription}</p>
            <p>Price: £${item.itemPrice}</p>
            <p>Postage: ${item.itemPostage}</p>
            ${item.images.length > 0 ? `<img src="data:${item.images[0].imageExtension};base64,${item.images[0].imageBin}" alt="${item.itemTitle}" style="width:100px;height:100px;">` : ''}
        `;

        // Append the item to the container
        itemsContainer.appendChild(itemElement);
    });
}