document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
        window.location.href = './dashboard.html';
        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            // Basic validation
            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }

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
    });
});