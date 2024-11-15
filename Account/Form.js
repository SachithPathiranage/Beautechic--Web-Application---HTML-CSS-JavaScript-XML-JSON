function validateForm() {
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var occupation = document.getElementById("occupation").value;
    var beautyBrand = document.getElementById("beauty-brand").value;
    var features = document.getElementById("features").value;

    if (age === "" || gender === "" || occupation === "") {
        alert("Please fill out all required fields: Age, Gender, and Occupation.");
        return false;
    }

    if (occupation !== "" && !/^[A-Za-z\s]+$/.test(occupation)) {
        alert("Occupation must only contain letters and spaces.");
        return false;
    }

    if (beautyBrand !== "" && !/^[A-Za-z\s]+$/.test(beautyBrand)) {
        alert("Preferred Beauty Brand must only contain letters and spaces.");
        return false;
    }

    if (features !== "" && !/^[A-Za-z\s]+$/.test(features)) {
        alert("Preferred Features must only contain letters and spaces.");
        return false;
    }

    // If all checks pass, the form will be submitted
    // Redirect after form submission
    setTimeout(function() {
        alert("The recommended results will be shown in a while");
        window.location.href = "mainPage.html"; // Change this URL to your desired site
    }, 500);

    // Prevent default form submission
    event.preventDefault();

    return true;
}