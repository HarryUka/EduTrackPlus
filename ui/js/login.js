document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameValidation = document.getElementById('username-validation');
    const passwordValidation = document.getElementById('password-validation');
    const passwordToggle = document.querySelector('.password-toggle');
    const helpLink = document.getElementById('helpLink');

    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
        window.location.href = './dashboard.html';
        return;
    }

    // Password visibility toggle
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update icon
        const eyeIcon = this.querySelector('.eye-icon');
        eyeIcon.style.backgroundImage = type === 'password' 
            ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>\')'
            : 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>\')';
    });

    // Form validation
    function validateUsername() {
        const username = usernameInput.value.trim();
        if (!username) {
            usernameValidation.textContent = 'Username is required';
            return false;
        }
        usernameValidation.textContent = '';
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (!password) {
            passwordValidation.textContent = 'Password is required';
            return false;
        }
        passwordValidation.textContent = '';
        return true;
    }

    // Input validation on blur
    usernameInput.addEventListener('blur', validateUsername);
    passwordInput.addEventListener('blur', validatePassword);

    // Form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();

        if (isUsernameValid && isPasswordValid) {
            const email = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            try {
                // Show loading state
                const submitButton = loginForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Logging in...';
                submitButton.disabled = true;

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Store user info in localStorage
                localStorage.setItem('user', JSON.stringify({
                    email: email,
                    name: email.split('@')[0], // Use email username as display name
                    role: 'student'
                }));

                // Redirect to dashboard
                window.location.href = './dashboard.html';
            } catch (error) {
                alert(error.message);
                // Reset button state
                const submitButton = loginForm.querySelector('button[type="submit"]');
                submitButton.textContent = 'Login';
                submitButton.disabled = false;
            }
        }
    });

    // Help link
    helpLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Add your help functionality here
        console.log('Help requested');
    });
});