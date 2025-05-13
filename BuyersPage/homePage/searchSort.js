let allItems = []; // This will be populated with all fetched items

// Fetch and display items initially
$(document).ready(function () {
    $.ajax({
        url: "fetchItemsRow.php",
        method: "GET",
        dataType: "json",
        success: function (response) {
            allItems = response;
            displayItems(allItems);
        },
        error: function () {
            alert("Error loading items.");
        }
    });
});

function displayItems(items) {
    const container = $('#itemContainer'); // change to your actual container ID or class
    container.html('');

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

function searchItems() {
    const searchQuery = $('#searchInput').val().toLowerCase();
    const filter = $('#Advanced\\ searchOptions').val();

    let filtered = allItems.filter(item =>
        item.itemTitle.toLowerCase().includes(searchQuery)
    );

    if (filter === "Price less than £2") {
        filtered = filtered.filter(item => parseFloat(item.itemPrice) < 2);
    } else if (filter === "Price greater than £2") {
        filtered = filtered.filter(item => parseFloat(item.itemPrice) > 2);
    } else if (filter === "Price between £2 and £5") {
        filtered = filtered.filter(item => {
            const price = parseFloat(item.itemPrice);
            return price >= 2 && price <= 5;
        });
    } else if (filter === "free postage") {
        filtered = filtered.filter(item => item.itemPostage.includes("0.00"));
    } else if (filter === "restricted categories") {
        const restricted = ["Weapons", "Illegal", "Hazardous"]; // example
        filtered = filtered.filter(item => !restricted.includes(item.itemCategory));
    } else if (filter === "location") {
        filtered = filtered.filter(item => item.sellerLocation === "YourLocationHere"); // replace with logic
    } else if (filter === "Average or better condition") {
        filtered = filtered.filter(item => ["Average", "Good", "New"].includes(item.itemCondition));
    } else if (filter === "Refurbished") {
        filtered = filtered.filter(item => item.itemCondition === "Refurbished");
    }

    displayItems(filtered);
}

function sortItems() {
    const sortOption = $('#sortOptions').val();
    let sorted = [...allItems]; // clone to avoid mutating original

    if (sortOption === "Price High to Low") {
        sorted.sort((a, b) => b.itemPrice - a.itemPrice);
    } else if (sortOption === "Price Low to High") {
        sorted.sort((a, b) => a.itemPrice - b.itemPrice);
    } else if (sortOption === "Ending soonest") {
        sorted.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    } else if (sortOption === "User rating") {
        sorted.sort((a, b) => b.userRating - a.userRating);
    }

    displayItems(sorted);
}
