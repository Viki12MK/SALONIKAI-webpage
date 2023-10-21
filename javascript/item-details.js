document.addEventListener("DOMContentLoaded", function () {
    // Get references to the HTML elements where you want to display item details
    const itemImage = document.getElementById("item-image");
    const itemName = document.getElementById("item-name");
    const itemHebrewName = document.getElementById("item-hebrewName");
    const itemIngredients = document.getElementById("item-ingredients");
    const itemPrice = document.getElementById("item-price");
    const backButton = document.getElementById("back-btn");
    const addToCartButton = document.getElementById("add-to-cart-btn");
    const buyNowButton = document.getElementById("buy-now-btn");
    const quantityInput = document.getElementById("item-quantity");
    const increaseButton = document.getElementById("increase-quantity");
    const decreaseButton = document.getElementById("decrease-quantity");
  
    // Check if the selected item exists in local storage
    const selectedItem = JSON.parse(localStorage.getItem("selectedItem"));
  
    if (selectedItem) {
      // Populate the item details on the page
      itemImage.src = selectedItem.imageUrl;
      itemName.textContent = selectedItem.name;
      itemHebrewName.textContent = selectedItem.hebrewName;
      itemIngredients.textContent = "Ingredients: " + selectedItem.ingredients;
      itemPrice.textContent = "Price: " + selectedItem.price + " NIS";
  
      // Add a click event listener to the "Back" button to navigate back to the previous page
      backButton.addEventListener("click", function () {
        window.history.back();
      });

      // Add a click event listener to "Add to Cart" button
      addToCartButton.addEventListener("click", function () {
        const cartItem = {
          name: selectedItem.name,
          hebrewName: selectedItem.hebrewName,
          imageUrl: selectedItem.imageUrl,
          quantity: parseInt(quantityInput.value),
          price:selectedItem.price
        };

        // Retrieve the existing shopping cart from localStorage
        const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

        // Add the selected item to the shopping cart
        shoppingCart.push(cartItem);

        // Save the updated shopping cart in local storage
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

        // Show the confirmation modal
        const modal = document.getElementById("confirmationModal");
        const closeModalBtn = document.getElementById("closeModalBtn");

        modal.style.display = "block";

        // CLose the modal when the close button is clicked
        closeModalBtn.addEventListener("click", function () {
          modal.style.display = "none";
        });

        // Reser the quantity input to 1
        quantityInput.value = "1";

        // Set the product details in the modal
        const modalItemImage = document.getElementById("modal-item-image"); // Corrected id
        const modalItemName = document.getElementById("modal-item-name");
        const modalItemHebrewName = document.getElementById("modal-item-hebrewName");
        
        // Set the image source in the modal
        modalItemImage.src = selectedItem.imageUrl; // Set the image source

        // Set other details in the modal
        modalItemName.textContent = selectedItem.name;
        modalItemHebrewName.textContent = selectedItem.hebrewName;

        // Calculate and set the total price in the modal
        const modalItemPrice = document.getElementById("modal-item-price");
        const modalItemQuantity = document.getElementById("modal-item-quantity");
        // Calculate the total price based on the item price and quality
        const totalItemPrice = selectedItem.price * parseInt(modalItemQuantity.value);
        modalItemPrice.textContent = "Price: " + totalItemPrice + " NIS";
        
      });

      // Add a click event listener to the "Buy Now" button
      buyNowButton.addEventListener("click", function () {

      })

      // Add event listeners for increasing and decreaseing quantity
      increaseButton.addEventListener("click", function () {
        // Increment the quantity by 1
        quantityInput.value = parseInt(quantityInput.value) + 1;
      });

      decreaseButton.addEventListener("click", function () {
        // Decrement the quantity by 1, but ensure it doesn't go below 1
        const currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
          quantityInput.value = currentQuantity - 1;
        }
      });
    } else {
      // Handle the case where there is no selected item in local storage
      // You can display an error message or redirect the user to a different page
      console.error("No selected item in local storage.");
    }
  });
  