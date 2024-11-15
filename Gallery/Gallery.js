// Wait for the document to be ready

document.addEventListener('DOMContentLoaded', function() {
      // Get all the elements with the class "slider-img"
	  var sliderImages = document.querySelectorAll('.slider-img');
  
      // Add a click event listener to each of the slider images
      sliderImages.forEach(function(sliderImage) {
        sliderImage.addEventListener('click', function() {
          // Remove the "active" class from all slider images
          sliderImages.forEach(function(image) {
            image.classList.remove('active');
          });
  
          // Add the "active" class to the clicked slider image
          this.classList.add('active');
        });
      });
});