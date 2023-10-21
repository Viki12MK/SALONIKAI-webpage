
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the category elements
  const saladsCategory = document.getElementById("salads-category");
  const mainDishCategory = document.getElementById("main-dish_category");
  const dessertsCategory = document.getElementById("dessert_category");

  // Function to display menu items
  function displayMenuItems(menuItems) {
    //Clear the existing menu items
    const displayMenuItems = document.querySelector(".display-menu-items")
    displayMenuItems.innerHTML = "";

    // Create a grid for menu items
    const menuGrid =document.createElement("div");
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

      menuItem.appendChild(itemImage);
      menuItem.appendChild(itemName);
      menuItem.appendChild(itemHebrewName);
      menuItem.appendChild(itemPrice);
      menuItem.appendChild(itemButton);

      menuGrid.appendChild(menuItem);
    });

    // Append the menu grid to the display menu container
    displayMenuItems.appendChild(menuGrid);
  }

  // Load the menu data from menu-items.json
  fetch("/menu-items.json")
    .then((response) => response.json())
    .then((data) => {
      // Event listener for menu categories image
      saladsCategory.addEventListener("click", function( ) {
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
});