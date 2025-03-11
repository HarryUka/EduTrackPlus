document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const studentIdInput = document.getElementById('studentId');
    const departmentInput = document.getElementById('department');
    const logoutButton = document.getElementById('logout');
    
    // Check if user is logged in
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        window.location.href = './index.html';
        return;
    }
    
    const user = JSON.parse(userJson);
    
    // Populate form with user data
    fullNameInput.value = user.name || '';
    emailInput.value = user.email || '';
    studentIdInput.value = user.studentId || 'S' + Math.floor(1000 + Math.random() * 9000); // Generate random ID if not present
    departmentInput.value = user.department || 'Computer Science'; // Default department
    
    // Handle form submission
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update user data
        user.name = fullNameInput.value;
        user.email = emailInput.value;
        user.studentId = studentIdInput.value;
        user.department = departmentInput.value;
        
        // Save updated user data
        localStorage.setItem('user', JSON.stringify(user));
        
        // Show success message
        alert('Profile updated successfully!');
    });
    
    // Handle logout
    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = './index.html';
    });
}); 