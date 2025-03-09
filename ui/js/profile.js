document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = './index.html';
        return;
    }

    // Sample user profile data - In a real application, this would come from an API
    const profile = {
        name: user.name,
        email: user.email,
        studentId: 'STU' + Math.floor(100000 + Math.random() * 900000), // Random student ID
        department: 'Computer Science',
        year: '2nd Year',
        enrolledCourses: [
            {
                code: 'CS101',
                title: 'Introduction to Computer Science',
                instructor: 'Dr. Smith',
                grade: 'In Progress',
                progress: 65
            },
            {
                code: 'MATH201',
                title: 'Calculus I',
                instructor: 'Dr. Johnson',
                grade: 'In Progress',
                progress: 78
            }
        ],
        academicStatus: 'Good Standing',
        gpa: '3.75'
    };

    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .profile-header {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
            text-align: center;
        }

        .profile-header h1 {
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        .profile-status {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: #2ecc71;
            color: white;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-top: 1rem;
        }

        .profile-container {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
        }

        .profile-section {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .profile-section h2 {
            color: var(--primary-color);
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid var(--border-color);
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--primary-color);
            font-weight: bold;
        }

        .form-group input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 1rem;
        }

        .form-group input[readonly] {
            background-color: #f8f9fa;
            cursor: not-allowed;
        }

        .course-item {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid var(--border-color);
        }

        .course-item:last-child {
            margin-bottom: 0;
        }

        .course-item h3 {
            color: var(--primary-color);
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }

        .course-item p {
            margin: 0.5rem 0;
            color: var(--text-color);
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: #eee;
            border-radius: 4px;
            margin-top: 1rem;
            overflow: hidden;
        }

        .progress-bar-fill {
            height: 100%;
            background: var(--secondary-color);
            transition: width 0.3s ease;
        }

        .academic-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-top: 1rem;
        }

        .academic-stat {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            border: 1px solid var(--border-color);
        }

        .academic-stat h4 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }

        .academic-stat p {
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--secondary-color);
        }

        @media (max-width: 768px) {
            .profile-container {
                grid-template-columns: 1fr;
            }

            .academic-info {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);

    // Update profile information
    document.getElementById('fullName').value = profile.name;
    document.getElementById('email').value = profile.email;
    document.getElementById('studentId').value = profile.studentId;
    document.getElementById('department').value = profile.department;

    // Add academic status and GPA section
    const profileHeader = document.createElement('div');
    profileHeader.className = 'profile-header';
    profileHeader.innerHTML = `
        <h1>Student Profile</h1>
        <div class="academic-info">
            <div class="academic-stat">
                <h4>Academic Status</h4>
                <p>${profile.academicStatus}</p>
            </div>
            <div class="academic-stat">
                <h4>Current GPA</h4>
                <p>${profile.gpa}</p>
            </div>
        </div>
        <div class="profile-status">Active Student</div>
    `;
    document.querySelector('.container').insertBefore(profileHeader, document.querySelector('.profile-container'));

    // Populate enrolled courses
    const enrolledCoursesContainer = document.getElementById('enrolledCourses');
    profile.enrolledCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course-item';
        courseElement.innerHTML = `
            <h3>${course.code}: ${course.title}</h3>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Grade:</strong> ${course.grade}</p>
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: ${course.progress}%"></div>
            </div>
            <p style="text-align: right; margin-top: 0.5rem; font-size: 0.9rem;">
                Course Progress: ${course.progress}%
            </p>
        `;
        enrolledCoursesContainer.appendChild(courseElement);
    });

    // Handle profile update
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedName = document.getElementById('fullName').value.trim();
        const updatedEmail = document.getElementById('email').value.trim();

        try {
            if (!updatedName || !updatedEmail) {
                throw new Error('Please fill in all required fields');
            }

            // Show loading state
            const submitButton = profileForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Updating...';

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update local storage
            const updatedUser = {
                ...user,
                name: updatedName,
                email: updatedEmail
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Show success message
            alert('Profile updated successfully!');
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Update Profile';
        } catch (error) {
            alert(error.message);
        }
    });

    // Handle logout
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = './index.html';
    });
}); 