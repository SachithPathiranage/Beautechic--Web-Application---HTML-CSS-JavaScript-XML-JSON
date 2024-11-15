// After window is loaded completely
window.onload = function(){
    // Hide the preloader
    document.querySelector(".preloader").style.display = "none";
    
    // Redirect to the shopping cart page after 3 seconds
    setTimeout(function() {
        window.location.href = "file:///C:/Users/Sachith/Music/html%20prac%20-%202%20without%20arrow%20styles/productPage/Shopping%20Cart.html"; // Change this to your shopping cart page URL
    }, 3000); // 3000 milliseconds = 3 seconds
}