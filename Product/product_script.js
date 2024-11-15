
let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Function to generate product rows
function generateRowProducts(rowElement, products) {
    let rowHTML = "";

    products.forEach(product => {
        let brand = product.brand ? `<span>${product.brand}</span>` : ""; // Check if brand exists before adding it
        let search = basket.find((x) => x.productId === product.id) || {}; // Find the product in the basket
        let quantityInBasket = search.quantity || 0; // Get the quantity from the basket, default to 0 if not found

        // Update the product quantity based on the quantity stored in localStorage
        product.quantity = quantityInBasket;

        rowHTML += `
          <div class="thumbnail-wrapper">
              <img class="product thumbnails" src="${product.imgSrc}" alt="${product.alt}">
              <div class="details">
                  <p class="thumbnail-title">                   
                      ${brand}  <h4>${product.name}</h4></p>                     
                      <p class=product_description">${product.description}</p>
                      <div class="price-quantity">
                      <div class="price"><h2>${product.price}</h2></div>                      
                      <div class="quantity-controls">
                          <img class="decrement_img" src="../Images/Product_img/minus.png" onclick="decrementQuantity('${product.id}', '${rowElement.classList[1]}')">
                          <span class="quantity">${product.quantity}</span>
                          <img class="increment_img" src="../Images/Product_img/plus.png" onclick="incrementQuantity('${product.id}', '${rowElement.classList[1]}')">
                      </div>
                      </div>                  
                  <div class="add_to_cart">
                  <button data-id="${product.id}" onclick="addToCart('${product.id}')">Add to Cart</button>                   
                  </div>
              </div>
          </div>
      `;
    });
    rowElement.innerHTML = rowHTML;
}


function incrementQuantity(productId, rowClassName) {
    console.log("!!!!!!!!!!!!!" + productId);
    // Get products by class name
    let products = getProductsByClassName(rowClassName);

    // Find the product with the given productId
    let product = products.find(item => item.id === productId);

    // Find the index of the product in the basket
    let basketProductIndex = basket.findIndex(item => item.productId === productId);

    // If the product is not found in the basket, add it
    if (basketProductIndex === -1) {
        basket.push({
            productId: productId,
            quantity: 1,
            imgSrc: product.imgSrc,
            name: product.name,
            price: product.price
        });
    } else {
        // Increment the quantity of the product in the basket
        if (basket[basketProductIndex].quantity < product.maxStock) {
            basket[basketProductIndex].quantity += 1;
        } else {
            // Display a message or handle reaching maximum stock
            alert("Maximum stock limit reached!");
            return; // Stop further execution
        }
    }

    // Update the quantity of the product in the UI
    if (product) {
        if (product.quantity < product.maxStock) {
            product.quantity++;
            // Update the quantity in the UI
            document.querySelector(`.${rowClassName} [data-id="${productId}"]`).closest('.thumbnail-wrapper').querySelector('.quantity').textContent = product.quantity;
        } else {
            // Display a message or handle reaching maximum stock
            alert("Maximum stock limit reached!");
            return; // Stop further execution
        }
    } else {
        // Handle scenario where product is not found
        console.log("Product not found.");
        return; // Stop further execution
    }

    // Update the basket in local storage
    localStorage.setItem("data", JSON.stringify(basket));

    // Log the updated basket
    console.log(basket);
    update(productId);
}



function decrementQuantity(productId, rowClassName) {
    let products = getProductsByClassName(rowClassName);
    let product = products.find(item => item.id === productId);

    // Find the product in the basket
    let basketProductIndex = basket.findIndex(item => item.productId === productId);

    // If the product is not found in the basket, return
    if (basketProductIndex === -1) {
        return;
    }

    // Decrement the quantity of the product in the basket
    if (basket[basketProductIndex].quantity > 0) {
        basket[basketProductIndex].quantity--;
    }

    // Update the quantity in the UI
    if (product && product.quantity > 0) {
        product.quantity--;
        document.querySelector(`.${rowClassName} [data-id="${productId}"]`).closest('.thumbnail-wrapper').querySelector('.quantity').textContent = product.quantity;
    }
    // Update cart count
    updateCartCount();

    basket = basket.filter((x) => x.quantity !== 0);

    //console.log(basket);
    update(productId);

    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    // Find the product in the basket
    let search = basket.find((item) => item.productId === id);

    // Check if the product is found
    if (search) {
        // Log the quantity of the product to the console
        console.log(search.quantity);

        // Update the HTML content to display the quantity
        let element = document.getElementById(id);
        if (element) {
            element.innerHTML = search.quantity;
        }
    } else {
        // If the product is not found, display a message or handle it accordingly
        console.log(`Product with productId ${id} not found in the basket.`);
    }
};



// Function to update cart count
function updateCartCount() {
    let totalQuantity = 0;
    // Loop through all products and sum up the quantities
    lipProducts.forEach(product => {
        totalQuantity += product.quantity;
    });
    faceProducts.forEach(product => {
        totalQuantity += product.quantity;
    });
    eyesProducts.forEach(product => {
        totalQuantity += product.quantity;
    });
    cheeksProducts.forEach(product => {
        totalQuantity += product.quantity;
    });
    hairProducts.forEach(product => {
        totalQuantity += product.quantity;
    });
    toolProducts.forEach(product => {
        totalQuantity += product.quantity;
    });
    // Update the cart count element with the total quantity
    document.getElementById('cart_count').textContent = totalQuantity;
}

// Call updateCartCount when the page loads to initialize the cart count
window.onload = function () {
    updateCartCount();
};



// Helper function to get products by row class name
function getProductsByClassName(className) {
    switch (className) {
        case 'row-lip':
            return lipProducts;
        case 'row-face':
            return faceProducts;
        case 'row-eyes':
            return eyesProducts;
        case 'row-cheeks':
            return cheeksProducts;
        case 'row-hair':
            return hairProducts;
        case 'row-tools':
            return toolProducts;
        default:
            return [];
    }
}

// Generate products for lips row
generateRowProducts(document.querySelector(".row-lip"), lipProducts);

// Generate products for face row
generateRowProducts(document.querySelector(".row-face"), faceProducts);

// Generate products for eyes row
generateRowProducts(document.querySelector(".row-eyes"), eyesProducts);

// Generate products for cheeks row
generateRowProducts(document.querySelector(".row-cheeks"), cheeksProducts);

// Generate products for hair row
generateRowProducts(document.querySelector(".row-hair"), hairProducts);

// Generate products for tools & brushes row
generateRowProducts(document.querySelector(".row-tools"), toolProducts);


// Keep track of whether the arrow buttons were clicked
let arrowClicked = false;

// Function to handle right and left arrow key press for all rows
document.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('next-btn') || target.classList.contains('prev-btn')) {
        arrowClicked = true; // Set arrowClicked to true when an arrow button is clicked
        const container = target.closest('.thumbnails-container');
        const row = container.querySelector('.product-row');
        const offsetWidth = 400; // Width of a thumbnail wrapper including margin
        if (target.classList.contains('next-btn')) {
            row.scrollLeft += offsetWidth * 3; // Scroll the row to show next three products
        } else {
            row.scrollLeft -= offsetWidth * 3; // Scroll the row to show previous three products
        }
    }
});

// Function to handle scroll event for product rows
document.querySelectorAll('.product-row').forEach(function (row) {
    row.addEventListener('scroll', function () {
        const container = row.closest('.thumbnails-container');
        checkArrowsVisibility(row, container);
    });
});

// Function to check arrow visibility based on scroll position
function checkArrowsVisibility(row, container) {
    const nextBtn = container.querySelector('.next-btn');
    const prevBtn = container.querySelector('.prev-btn');

    // Check if there's content to scroll left
    if (row.scrollLeft <= 0) {
        prevBtn.style.opacity = 0.5; // Set transparency for left arrow
    } else {
        prevBtn.style.opacity = 1; // Set full opacity for left arrow
    }

    // Check if there's content to scroll right
    if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 1) {
        nextBtn.style.opacity = 0.5; // Set transparency for right arrow when reaching the end
    } else {
        nextBtn.style.opacity = 1; // Set full opacity for right arrow
    }
}

// Function to add product to shopping cart
/*function addToCart(productId) {
    let product = null;
    // Find the product in all product arrays
    [lipProducts, faceProducts, eyesProducts, cheeksProducts].forEach(products => {
        const foundProduct = products.find(item => item.id === productId);
        if (foundProduct) {
            product = foundProduct;
            return; // Exit forEach loop once product is found
        }
    });

    if (product) {
        // Check if adding this product will exceed the maximum stock
        if (basket.length < product.maxStock) {
            let basketProduct = basket.find(item => item.id === productId);
            if (basketProduct) {
                // If the product is already in the basket, update its quantity
                basketProduct.quantity += product.quantity;
            } else {
                // If the product is not in the basket, add it
                basket.push({ ...product });
                // Show success message
                alert("Product added to cart!");
            }
            //localStorage.setItem("data", JSON.stringify(basket)); // Save basket to localStorage
            
            
            updateCartCount(); // Update cart count in UI
        } else {
            // Display a message or handle maximum stock limit reached
            alert("Maximum stock limit reached!");
        }
    } else {
        // Display a message or handle product not found
        alert("Product not found!");
    }
    
}*/



// Attach click event listeners to all "Add to Cart" buttons separately
document.querySelectorAll('.add_to_cart button').forEach(button => {
    // Attach click event listener to the button
    button.addEventListener('click', function () {
        // Retrieve the product ID from the button's data-id attribute
        let productId = button.dataset.id;
        // Find the product in all product arrays
        let product = null;
        [lipProducts, faceProducts, eyesProducts, cheeksProducts, hairProducts, toolProducts].forEach(products => {
            const foundProduct = products.find(item => item.id === productId);
            if (foundProduct) {
                product = foundProduct;
                return; // Exit forEach loop once product is found
            }
        });

        if (product) {
            // Check if the product quantity is greater than 0
            if (product.quantity > 0) {
                // Call the addToCart function with the product ID
                alert("Product added to cart!");
                updateCartCount();
            } else {
                // Display a message if the product quantity is 0
                alert("Please select a quantity greater than 0!");
            }
        } else {
            // Display a message or handle product not found
            alert("Product not found!");
        }
    });
});

// Function to handle smooth scrolling to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Function to show/hide scroll-to-top button based on scroll position
window.addEventListener("scroll", function () {
    var scrollToTopButton = document.getElementById("scrollToTopBtn");
    if (scrollToTopButton) {
        if (window.pageYOffset > 100) { // Show button when scrolled down 100px
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    }
});




//localStorage.clear();

