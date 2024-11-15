const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
  member.addEventListener('mouseover', () => {
    const overlay = member.querySelector('.overlay');
    overlay.style.opacity = '1';
  });
  member.addEventListener('mouseout', () => {
    const overlay = member.querySelector('.overlay');
    overlay.style.opacity = '0';
  });
});


// Function to change font size
function changeFontSize(action) {
  // Array of selectors for elements whose font size will be changed
  const selectors = ['#about-us-heading', '#member1 .overlay p', '#member2 .overlay p','#member3 .overlay p','#member4 .overlay p'];

  // Define the step of font size change
  const step = 2;

  // Define the minimum and maximum font sizes
  const minFontSize = 5; // Minimum font size
  const maxFontSize = 75; // Maximum font size

  // Loop through each selector
  selectors.forEach(selector => {
      // Select the elements using the selector
      const elements = document.querySelectorAll(selector);

      // Loop through each selected element
      elements.forEach(element => {
          // Get the current font size
          let currentSize = window.getComputedStyle(element, null).getPropertyValue("font-size");
          currentSize = parseFloat(currentSize);

          // Increase or decrease font size based on the action
          if (action === 'increase' && currentSize < maxFontSize) {
              element.style.fontSize = Math.min(currentSize + step, maxFontSize) + "px";
          } else if (action === 'decrease' && currentSize > minFontSize) {
              element.style.fontSize = Math.max(currentSize - step, minFontSize) + "px";
          }
      });
  });
}





