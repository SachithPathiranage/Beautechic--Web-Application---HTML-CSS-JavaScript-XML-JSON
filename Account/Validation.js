document.getElementById('signup-form').addEventListener('submit', function(event) {
    var nameInput = document.getElementById('name').value.trim();
    var emailInput = document.getElementById('email').value.trim();
    var passwordInput = document.getElementById('password').value.trim();
    
    var namePattern = /^[a-zA-Z\s]+$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!namePattern.test(nameInput)) {
        alert('Name must have only letters');
        event.preventDefault();
    }
    
    if (!emailPattern.test(emailInput)) {
        alert('Invalid email address');
        event.preventDefault();
    }

    if (!passwordInput) {
        alert('Please enter a password');
        event.preventDefault();
    }

    if (namePattern.test(nameInput) && emailPattern.test(emailInput) && passwordInput) {
        alert('Dear ' + nameInput + ', thank you for signing up with us. Please fill out this form:');

        setTimeout(function() {
                window.location.href = "PreferenceForm.html";
            }, 1000);

            event.preventDefault();
    }
});
