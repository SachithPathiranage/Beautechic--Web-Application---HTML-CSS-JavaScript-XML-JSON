let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

// Retrieve the basket from localStorage or initialize it as an empty array
let basket = JSON.parse(localStorage.getItem("data")) || [];

console.log(basket);

// Function to update cart count
function updateCartCount() {
    let totalQuantity = 0;
    // Loop through all products in the basket and sum up the quantities
    basket.forEach(product => {
        totalQuantity += product.quantity;
    });
    // Update the cart count element with the total quantity
    document.getElementById('cart_count').textContent = totalQuantity;
}

// Call updateCartCount when the page loads to initialize the cart count
window.onload = function() {
    updateCartCount();
};

// Function to calculate subtotal for a product
function calculateSubtotal(product) {
  // Extract numerical value from the price string
  let priceString = product.price.replace("Rs.", "").trim();
  let price = parseFloat(priceString);

  // Convert quantity to number
  let quantity = parseInt(product.quantity);

  // Calculate total price for each item
  let total = quantity * price;

  // Format the total with currency symbol and return
  return `Rs. ${total.toFixed(2)}`;
}


// Function to remove an item from the cart
function removeItemFromCart(index) {
  // Remove the item from the basket array
  basket.splice(index, 1);
  // Update the local storage with the updated basket
  localStorage.setItem('data', JSON.stringify(basket));
  // Update the cart count
  updateCartCount();
  // Regenerate cart items to reflect the changes
  generateCartItems();
}

let updateCartSubtotal = () => {
  let subtotalAmount = basket.reduce((total, item) => {
      // Extract numerical value from the price string
      let priceString = item.price.replace("Rs.", "").trim();
      let price = parseInt(priceString);

      // Calculate subtotal for each item
      let subtotal = price * item.quantity;

      return total + subtotal;
  }, 0);

  // Calculate shipping cost (5% of subtotal)
  let shippingCost = subtotalAmount * 0.05;

  // Retrieve quiz points from localStorage
  let quizPoints = localStorage.getItem('quizPoints');
  quizPoints = quizPoints ? parseInt(quizPoints) : 0;

  // Calculate discount based on quiz points
  let discount = (quizPoints / 100) * subtotalAmount;

  let cartSubtotalElement = document.querySelector('#subtotal td:nth-child(2)');
  let shippingElement = document.querySelector('#subtotal tr:nth-child(2) td:nth-child(2)');
  let discountElement = document.querySelector('#subtotal tr:nth-child(3) td:nth-child(2)');
  let totalElement = document.querySelector('#subtotal tr:last-child td:nth-child(2)');

  // Update Cart Subtotal
  cartSubtotalElement.textContent = `Rs.${subtotalAmount.toFixed(2)}`;

  // Update Shipping Cost
  shippingElement.textContent = `Rs.${shippingCost.toFixed(2)}`;

  // Update Discount on the Points
  discountElement.textContent = `Rs.${discount.toFixed(2)}`;

  // Update Total (Subtotal + Shipping Cost - Discount)
  let totalAmount = subtotalAmount + shippingCost - discount;
  totalElement.textContent = `Rs.${totalAmount.toFixed(2)}`;
};




let generateCartItems = () => {
  if (basket.length !== 0) {
      let cartHTML = basket.map((item, index) => {
          return `
              <tr class="cart-item">
                  <td>${index + 1}</td>
                  <td><a href="#" onclick="removeItemFromCart(${index})"><i class="far fa-times-circle"></i></a></td>
                  <td><img src="${item.imgSrc}" alt="${item.alt}" /></td>
                  <td>${item.name}</td>
                  <td>${item.price}</td>
                  <td><input type="number" value="${item.quantity}" min="1" max="10" data-index="${index}"></td>
                  <td id="subtotal-${index}">${calculateSubtotal(item)}</td>
              </tr>`;
      }).join("");
      ShoppingCart.innerHTML = cartHTML;

      // Add event listener to quantity input elements
      let quantityInputs = document.querySelectorAll('.cart-item input[type="number"]');
      quantityInputs.forEach(input => {
          input.addEventListener('change', function(event) {
              let index = parseInt(this.dataset.index);
              let newQuantity = parseInt(this.value);
              if (!isNaN(newQuantity) && newQuantity >= 1) {
                  basket[index].quantity = newQuantity;
                  localStorage.setItem('data', JSON.stringify(basket));
                  updateCartCount();
                  // Update subtotal
                  let subtotal = document.getElementById(`subtotal-${index}`);
                  subtotal.textContent = calculateSubtotal(basket[index]);
                  // Update cart subtotal
                  updateCartSubtotal();
              } else {
                  // Reset the input value if an invalid quantity is entered
                  this.value = basket[index].quantity;
              }
          });
      });

      // Update cart subtotal initially
      updateCartSubtotal();
  } else {
      ShoppingCart.innerHTML = ``;
      label.innerHTML = `
          <h2>Cart is Empty</h2>
          <a href="product.html">
              <button class="HomeBtn">Back to Products</button>
          </a>`;
  }
};

// Call generateCartItems to initially populate the shopping cart HTML based on the basket contents
generateCartItems();

function clearCart() {
  // Clear the basket array
  basket = [];

  // Clear the local storage
  localStorage.removeItem('data');

  // Update the cart display
  generateCartItems();

  updateCartSubtotal();

  // Update cart count
  updateCartCount();
}


var clearCartButton = document.querySelector(".normal2");
if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
        // Call the clearCart function when the button is clicked
        clearCart();
    });
}


// Function to toggle the visibility of the checkout form
function toggleCheckoutForm() {
  var form = document.getElementById("checkoutForm");
  form.style.display = (form.style.display === "none") ? "block" : "none";
}

// Function to validate the checkout form
function validateCheckoutForm() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var address = document.getElementById("address").value.trim();
  var bankAccount = document.getElementById("bankAccount").value.trim();

  // Regular expression for basic email validation
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "" || email === "" || address === "" || bankAccount === "") {
      alert("Please fill in all required fields.");
      return false;
  }

  // Check if email follows a valid format
  if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
  }

  // Additional validation logic if needed

  return true;
}


document.addEventListener("DOMContentLoaded", function() {
  // Add event listener to the "Proceed to Checkout" button
  var checkoutButton = document.getElementById("checkoutButton");
  if (checkoutButton) {
      checkoutButton.addEventListener("click", function(event) {
          event.preventDefault(); // Prevent default form submission behavior
          toggleCheckoutForm(); // Show/hide the checkout form
      });
  }

  // Add event listener to the checkout form
  var checkoutForm = document.getElementById("checkoutFormInner");
  if (checkoutForm) {
      checkoutForm.addEventListener("submit", function(event) {
          if (!validateCheckoutForm()) {
              event.preventDefault(); // Prevent form submission if validation fails
          }
      });
  }
});

function showAlertForBoughtItems() {
  // Retrieve the shopping cart data from local storage
  let basket = JSON.parse(localStorage.getItem("data")) || [];

  // Retrieve the name entered in the name input field
  let name = document.getElementById("name").value.trim();

  // Check if the basket is not empty
  if (basket.length > 0) {
      // Construct a message to display bought items and quantities
      let message = `Dear ${name}, your orders are as follows: \nItems Bought:\n`;
      basket.forEach(item => {
          message += `${item.name}: ${item.quantity}\n`;
      });

      // Show an alert box with the message
      alert(message);
  } else {
      // If the basket is empty, show a message indicating that there are no items bought
      alert(`Dear ${name},\nNo items bought yet!`);
  }
}


// Add event listener to the checkout form
var checkoutForm = document.getElementById("checkoutFormInner");
if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(event) {
        if (!validateCheckoutForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        } else {
            // If form validation passes, call showAlertForBoughtItems function
            showAlertForBoughtItems();
        }
    });
}



/*

  let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
  
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
  };
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
  };
  
  let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket
        .map((x) => {
          let { item, id } = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
  
          return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
      // console.log(amount);
      label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    } else return;
  };
  
  TotalAmount();
  */



















/*// Function to populate shopping cart table with products
function populateShoppingCart(products) {
    const cartTableBody = document.querySelector('#cart tbody');
    let cartHTML = '';

    products.forEach((product, index) => {
        cartHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><a href="#" onclick="removeProduct(${index})"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${product.imgSrc}" alt="${product.alt}"></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><input type="number" value="${product.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
                <td>${calculateSubtotal(product)}</td>
            </tr>
        `;
    });

    cartTableBody.innerHTML = cartHTML;
}

// Function to calculate subtotal for a product
function calculateSubtotal(product) {
    return product.price * product.quantity;
}

// Function to update quantity of a product in the cart
function updateQuantity(index, newQuantity) {
    // Update the quantity of the product in the cart
    basket[index].quantity = parseInt(newQuantity);
    // Re-calculate and update the subtotal for the product
    const subtotalCell = document.querySelector(`#cart tbody tr:nth-child(${index + 1}) td:nth-child(7)`);
    subtotalCell.textContent = calculateSubtotal(basket[index]);
    // Update the cart count
    updateCartCount();
}

// Function to remove a product from the cart
function removeProduct(index) {
    // Remove the product from the basket array
    basket.splice(index, 1);
    // Re-populate the shopping cart table
    populateShoppingCart(basket);
    // Update the cart count
    updateCartCount();
}

// Example usage:
populateShoppingCart(basket);*/
