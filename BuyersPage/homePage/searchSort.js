// This is your second JavaScript file where searching and sorting happens

let allItems = []; // Make sure this is populated when items are fetched

// Function to display items (comes from first file)
function displayItems(items) {
    const container = $('#itemContainer'); // change to your actual container ID or class
    container.html(''); // Clear the container

    if (items.length === 0) {
        container.html('<p>No items found.</p>');
        return;
    }

    items.forEach(item => {
        const html = `
        <a href="viewItem.html?itemId=${item.itemId}" class="grid-item">
            <img src="${item.itemBin.image1}" alt="${item.itemTitle}" />
            <div class="item-info">
                <h3>${item.itemTitle}</h3>
                <p>£${parseFloat(item.itemPrice).toFixed(2)}</p>
                <p>${item.itemPostage}</p>
                <p>Ends: ${new Date(item.endDate).toLocaleDateString()}</p>
            </div>
        </a>`;
        container.append(html);
    });
}

// Function to filter items based on search and filter options
function searchItems() {
    const searchQuery = $('#searchInput').val().toLowerCase();
    const filter = $('#Advanced\\ searchOptions').val();

    let filtered = allItems.filter(item =>
        item.itemTitle.toLowerCase().includes(searchQuery)
    );

    // Apply any additional filters
    if (filter === "Price less than £2") {
        filtered = filtered.filter(item => parseFloat(item.itemPrice) < 2);
    } else if (filter === "Price greater than £2") {
        filtered = filtered.filter(item => parseFloat(item.itemPrice) > 2);
    } // Add more filters here...

    displayItems(filtered); // Display the filtered items
}

// Function to sort items
function sortItems() {
    const sortOption = $('#sortOptions').val();
    let sorted = [...allItems]; // clone to avoid mutating original

    if (sortOption === "Price High to Low") {
        sorted.sort((a, b) => b.itemPrice - a.itemPrice);
    } else if (sortOption === "Price Low to High") {
        sorted.sort((a, b) => a.itemPrice - b.itemPrice);
    } else if (sortOption === "Ending soonest") {
        sorted.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    }

    displayItems(sorted); // Display the sorted items
}
