import products from "../productPage/product_script.js"


// Function to generate rows for the shopping cart table
function generateCartRows(cartItems) {
    let cartHTML = "";
    cartItems.forEach(item => {
        // Extract numerical value from the price string
        let priceString = item.price.replace("Rs.", "").trim();
        let price = parseFloat(priceString);

        // Convert quantity to number
        let quantity = parseInt(item.quantity);

        // Calculate total price for each item
        let total = quantity * price;

        cartHTML += `
            <tr>
                <td><img src="${item.imgSrc}" alt="${item.alt}" style="width: 100px;"></td>
                <td>${item.name}</td>
                <td>
                    <button class="decrement_btn" onclick="decrementQuantity('${item.id}')"><img src="path/to/decrement_icon.png" alt="Decrement"></button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increment_btn" onclick="incrementQuantity('${item.id}')"><img src="path/to/increment_icon.png" alt="Increment"></button>
                </td>
                <td>${item.price}</td>
                <td>Rs.${total}</td>
                <td>
                    <button onclick="removeFromCart('${item.id}')">Remove</button>
                </td>
            </tr>
        `;
    });
    document.getElementById("cart_items").innerHTML = cartHTML;
}

// Function to increment quantity
function incrementQuantity(productId) {
    let item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        generateCartRows(cart);
    }
}

// Function to decrement quantity
function decrementQuantity(productId) {
    let item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        generateCartRows(cart);
    }
}


