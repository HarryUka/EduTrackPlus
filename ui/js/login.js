document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameValidation = document.getElementById('username-validation');
    const passwordValidation = document.getElementById('password-validation');
    const passwordToggle = document.querySelector('.password-toggle');
    const helpLink = document.getElementById('helpLink');
    const loginButton = document.querySelector('.login-button');

    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
        window.location.href = './dashboard.html';
        return;
    }

    // Add focus animations
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Password visibility toggle with animation
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update icon with animation
        const eyeIcon = this.querySelector('.eye-icon');
        eyeIcon.style.transform = 'scale(0)';
        
        setTimeout(() => {
            eyeIcon.style.backgroundImage = type === 'password' 
                ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>\')'
                : 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>\')';
            eyeIcon.style.transform = 'scale(1)';
        }, 150);
    });

    // Form validation with animations
    function validateUsername() {
        const username = usernameInput.value.trim();
        if (!username) {
            usernameValidation.textContent = 'Username is required';
            usernameInput.classList.add('error');
            return false;
        }
        usernameValidation.textContent = '';
        usernameInput.classList.remove('error');
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (!password) {
            passwordValidation.textContent = 'Password is required';
            passwordInput.classList.add('error');
            return false;
        }
        passwordValidation.textContent = '';
        passwordInput.classList.remove('error');
        return true;
    }

    // Input validation on blur with animations
    usernameInput.addEventListener('blur', validateUsername);
    passwordInput.addEventListener('blur', validatePassword);

    // Form submission with loading animation
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();

        if (isUsernameValid && isPasswordValid) {
            // Show loading animation
            loginButton.classList.add('loading');
            loginButton.disabled = true;

            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Store user info in localStorage
                localStorage.setItem('user', JSON.stringify({
                    email: usernameInput.value.trim(),
                    name: usernameInput.value.split('@')[0], // Use username as display name
                    role: 'student'
                }));

                // Add exit animation
                document.querySelector('.login-box').style.transform = 'scale(0.95)';
                document.querySelector('.login-box').style.opacity = '0';

                // Redirect to dashboard after animation
                setTimeout(() => {
                    window.location.href = './dashboard.html';
                }, 300);

            } catch (error) {
                alert(error.message);
                loginButton.classList.remove('loading');
                loginButton.disabled = false;
            }
        }
    });

    // Help link with hover animation
    helpLink.addEventListener('click', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-1px)';
        }, 100);
        // Add your help functionality here
        console.log('Help requested');
    });

    // Add input animations
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.value) {
                input.classList.add('has-content');
            } else {
                input.classList.remove('has-content');
            }
        });
    });
});