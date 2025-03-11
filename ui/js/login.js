document.addEventListener('DOMContentLoaded', function() {
    console.log("Login script loaded");
    
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
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Update icon
            const eyeIcon = this.querySelector('.eye-icon');
            if (eyeIcon) {
                eyeIcon.style.backgroundImage = type === 'password' 
                    ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>\')'
                    : 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>\')';
            }
        });
    }

    // Form validation
    function validateUsername() {
        const username = usernameInput.value.trim();
        if (!username) {
            usernameValidation.textContent = 'Username is required';
            usernameValidation.classList.add('error');
            return false;
        }
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            usernameValidation.textContent = 'Please enter a valid email address';
            usernameValidation.classList.add('error');
            return false;
        }
        
        usernameValidation.textContent = '✓ Valid email';
        usernameValidation.classList.remove('error');
        usernameValidation.classList.add('success');
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (!password) {
            passwordValidation.textContent = 'Password is required';
            passwordValidation.classList.add('error');
            return false;
        }
        
        // Password strength validation
        if (password.length < 8) {
            passwordValidation.textContent = 'Password must be at least 8 characters long';
            passwordValidation.classList.add('error');
            return false;
        }
        
        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            passwordValidation.textContent = 'Password must contain at least one uppercase letter';
            passwordValidation.classList.add('error');
            return false;
        }
        
        // Check for at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            passwordValidation.textContent = 'Password must contain at least one lowercase letter';
            passwordValidation.classList.add('error');
            return false;
        }
        
        // Check for at least one number
        if (!/[0-9]/.test(password)) {
            passwordValidation.textContent = 'Password must contain at least one number';
            passwordValidation.classList.add('error');
            return false;
        }
        
        passwordValidation.textContent = '✓ Strong password';
        passwordValidation.classList.remove('error');
        passwordValidation.classList.add('success');
        return true;
    }

    // Real-time validation as user types
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            if (usernameInput.value.trim().length > 0) {
                validateUsername();
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (passwordInput.value.length > 0) {
                validatePassword();
            }
        });
    }

    // Input validation on blur
    if (usernameInput) usernameInput.addEventListener('blur', validateUsername);
    if (passwordInput) passwordInput.addEventListener('blur', validatePassword);

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Login form submitted");

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

                    // Allow any valid email/password to log in
                    // Store user info in localStorage with more details
                    const userData = {
                        email: email,
                        name: email.split('@')[0], // Use email username as display name
                        role: 'student',
                        studentId: 'S' + Math.floor(10000 + Math.random() * 90000), // Random student ID
                        department: 'Computer Science',
                        enrolledCourses: [1, 3], // Pre-enrolled in some courses
                        lastLogin: new Date().toISOString()
                    };
                    
                    localStorage.setItem('user', JSON.stringify(userData));
                    console.log("User logged in:", userData);

                    // Redirect to dashboard
                    window.location.href = './dashboard.html';
                } catch (error) {
                    console.error("Login error:", error);
                    alert(error.message);
                    // Reset button state
                    const submitButton = loginForm.querySelector('button[type="submit"]');
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }
            }
        });
    }

    // Help link
    if (helpLink) {
        helpLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Login with any valid email and password that meets the requirements:\n\n- Password must be at least 8 characters\n- Include at least one uppercase letter\n- Include at least one lowercase letter\n- Include at least one number');
        });
    }
    
    // Add CSS for validation messages
    const style = document.createElement('style');
    style.textContent = `
        .validation-message.error {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 5px;
        }
        .validation-message.success {
            color: #2ecc71;
            font-size: 0.8rem;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
    
    console.log("Login initialization complete");
});