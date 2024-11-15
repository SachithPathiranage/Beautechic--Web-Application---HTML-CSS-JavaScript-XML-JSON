//name section

var fullName = "anonymous";

function setName() {
    var fullName = prompt("What is your full name?");
    document.querySelector("#fullName").textContent = fullName;
}

function printName() {
    document.querySelector("#nameInput").textContent = fullName;
}



//face section
var eyeBrows1 = document.querySelector("#eyebrows1");
var eyeBrows2 = document.querySelector("#eyebrows2");
var eyeLids1 = document.querySelector("#eyelids1");
var eyeLids2 = document.querySelector("#eyelids2");
var lips1 = document.querySelector("#lips1");
var lips2 = document.querySelector("#lips2");

//reference for functions below: https://www.youtube.com/watch?v=n3BbDbCHiX4

function changeEyebrowColor() {
    let color = document.getElementById('colorInputColor').value;
    eyeBrows1.style.color = color;
    eyeBrows2.style.color = color;
}

function changeEyelids() {
    let background = document.getElementById('colorInputColor1').value;
    eyeLids1.style.background = background;
    eyeLids2.style.background = background;
}

function changeLips() {
    let background = document.getElementById('colorInputColor2').value;
    let lipBottom = document.getElementById('lips1').value;
    lips1.style.background = background;
}


// Variable to store the currently selected hair style
var selectedHairStyle = "";

// Function to toggle hair style and store the selected style
// Function to toggle hair style and additional hair elements
function toggleHairStyle(style) {
    selectedHairStyle = style;
    var hairStyles = document.querySelectorAll('.hair-back0, .hair-back1, .hair-back2, .hair-back3');
    hairStyles.forEach(function(element) {
        element.style.display = 'none';
    });

    // Show the selected hair style
    var selectedHair = document.querySelector('.' + style);
    if (selectedHair) {
        selectedHair.style.display = 'block';
    }

    // Show or hide the additional hair elements for hair style 3
    if (style === 'hair-back3') {
        var additionalHairElements = document.querySelectorAll('.hair-top31, .hair-top32, .hair-top33, .hair-top34, .hair-top35, .hair-top36, .hair-top37, .hair-top38, .hair-top39');
        additionalHairElements.forEach(function(element) {
            element.style.display = 'block';
        });
    } else {
        var additionalHairElements = document.querySelectorAll('.hair-top31, .hair-top32, .hair-top33, .hair-top34, .hair-top35, .hair-top36, .hair-top37, .hair-top38, .hair-top39');
        additionalHairElements.forEach(function(element) {
            element.style.display = 'none';
        });
    }
}



// Function to change the hair color based on the selected style
function changeHairColor() {
    var color = document.getElementById('hairColorPicker').value;
    var hairElements = document.querySelectorAll('.' + selectedHairStyle);
    hairElements.forEach(function(element) {
        element.style.backgroundColor = color;
    });

    // Change color for additional hair elements and forehead if the selected style is 'hair-back3'
    if (selectedHairStyle === 'hair-back3') {
        var additionalHairElements = document.querySelectorAll('.hair-top31, .hair-top32, .hair-top33, .hair-top34, .hair-top35, .hair-top36, .hair-top37, .hair-top38, .hair-top39');
        additionalHairElements.forEach(function(element) {
            element.style.backgroundColor = color;
        });
    }
}

function changeFaceColor() {
    var color = document.getElementById('faceColorPicker').value;
    var faceElements = document.querySelectorAll('.face, .forehead, .neck, .ear');
    faceElements.forEach(function(element) {
        // Check if the element is not an eyebrow before changing its background color
        if (!element.classList.contains('eyebrow')) {
            element.style.backgroundColor = color;
        }
    });
}






