document.addEventListener("DOMContentLoaded", function () {
  // Get references to the category elements
  const saladsCategory = document.getElementById("salads");
  const mainDishCategory = document.getElementById("main-dishes");
  const dessertsCategory = document.getElementById("desserts");

  // Function to display menu items
  function displayMenuItems(menuItems) {
    // Clear the existing menu items
    const displayMenu = document.querySelector(".display-menu");

    // Create a grid for menu items
    const menuGrid = document.createElement("div");
    menuGrid.classList.add("menu-grid");

    // Iterate through menu items and create menu cards
    menuItems.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("menu-item");

      const itemName = document.createElement("h4");
      itemName.textContent = item.name;

      const itemHebrewName = document.createElement("p");
      itemHebrewName.textContent = item.hebrewName;

      const itemImage = document.createElement("img");
      itemImage.src = item.imageUrl;
      itemImage.alt = item.name;

      const itemPrice = document.createElement("p");
      itemPrice.textContent = `Price: ${item.price} NIS`;

      const itemButton = document.createElement("button");
      itemButton.innerHTML = "Add to order";

      // Add a click event listener to the "Add to order" button
      itemButton.addEventListener("click", function () {
        // Store the selected item's details in localStorage
        localStorage.setItem("selectedItem", JSON.stringify(item));

        // Redirect to item-details.html
        window.location.href = '/item-details.html';
      })

      menuItem.appendChild(itemImage);
      menuItem.appendChild(itemName);
      menuItem.appendChild(itemHebrewName);
      menuItem.appendChild(itemPrice);
      menuItem.appendChild(itemButton);

      menuGrid.appendChild(menuItem);

      
    });

    // Append the menu grid to the display menu container
    displayMenu.innerHTML = ""; // Clear existing content
    displayMenu.appendChild(menuGrid);
  }

  // Load the menu data from menu-items.json
  fetch("/menu-items.json")
    .then((response) => response.json())
    .then((data) => {
      // Event listener for menu categories images
      saladsCategory.addEventListener("click", function () {
        displayMenuItems(data.salads);
      });

      mainDishCategory.addEventListener("click", function () {
        displayMenuItems(data.main_dishes);
      });

      dessertsCategory.addEventListener("click", function () {
        displayMenuItems(data.desserts);
      });
    })
    .catch((error) => {
      console.error("Error fetching menu data:", error);
    });

    // Initialize an empty shopping cart in localStorage
    if (!localStorage.getItem("shoppingCart")) {
      localStorage.setItem("soppingCart", JSON.stringify([]));
    }
});
