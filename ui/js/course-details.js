document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = './index.html';
        return;
    }

    // Get course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));

    // Sample course data - In a real application, this would come from an API
    const courses = {
        1: {
            id: 1,
            code: 'CS101',
            title: 'Introduction to Computer Science',
            description: 'An introduction to computer science concepts and programming. Topics include algorithm development, data types, control structures, functions, and basic object-oriented programming concepts.',
            credits: 3,
            instructor: {
                name: 'Dr. Smith',
                email: 'smith@university.edu',
                officeHours: 'Monday/Wednesday 2:00 PM - 4:00 PM'
            },
            schedule: {
                days: 'Monday/Wednesday',
                time: '10:00 AM - 11:30 AM',
                location: 'Room 101'
            },
            availableSeats: 5
        },
        2: {
            id: 2,
            code: 'MATH201',
            title: 'Calculus I',
            description: 'Introduction to differential and integral calculus. Topics include limits, continuity, derivatives, applications of derivatives, integrals, and fundamental theorem of calculus.',
            credits: 4,
            instructor: {
                name: 'Dr. Johnson',
                email: 'johnson@university.edu',
                officeHours: 'Tuesday/Thursday 1:00 PM - 3:00 PM'
            },
            schedule: {
                days: 'Tuesday/Thursday',
                time: '2:00 PM - 3:30 PM',
                location: 'Room 205'
            },
            availableSeats: 8
        }
    };

    // Get course data
    const course = courses[courseId];
    if (!course) {
        alert('Course not found');
        window.location.href = './dashboard.html';
        return;
    }

    // Check if user is already enrolled
    function isUserEnrolled() {
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        return enrollments.some(enrollment => 
            enrollment.courseId === courseId && 
            enrollment.userId === user.email
        );
    }

    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .course-details {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .course-header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--border-color);
        }

        .course-header h1 {
            color: var(--primary-color);
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .course-meta {
            color: #666;
            font-size: 1.1rem;
        }

        .course-meta span {
            margin-right: 2rem;
        }

        .course-info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            margin-top: 2rem;
        }

        .course-info-grid > div {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }

        .course-info-grid h2 {
            color: var(--primary-color);
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .course-description p {
            line-height: 1.6;
            color: var(--text-color);
        }

        .instructor-info p,
        .course-schedule p {
            margin: 0.5rem 0;
            line-height: 1.6;
        }

        .enrollment-section {
            text-align: center;
        }

        .enrollment-section p {
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }

        .btn-primary {
            display: inline-block;
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            margin-top: 1rem;
        }

        .btn-disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        .enrollment-status {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 1rem;
        }

        .status-enrolled {
            background-color: #2ecc71;
            color: white;
        }

        .status-full {
            background-color: #e74c3c;
            color: white;
        }

        @media (max-width: 768px) {
            .course-info-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }

            .course-header h1 {
                font-size: 1.75rem;
            }

            .course-meta span {
                display: block;
                margin-bottom: 0.5rem;
            }
        }
    `;
    document.head.appendChild(style);

    // Update page content
    document.getElementById('courseTitle').textContent = `${course.code}: ${course.title}`;
    document.getElementById('courseCode').textContent = course.code;
    document.getElementById('courseCredits').textContent = `Credits: ${course.credits}`;
    document.getElementById('courseDescription').textContent = course.description;

    // Update instructor details
    document.getElementById('instructorName').textContent = course.instructor.name;
    document.getElementById('instructorEmail').textContent = course.instructor.email;
    document.getElementById('officeHours').textContent = course.instructor.officeHours;

    // Update schedule details
    document.getElementById('classDays').textContent = course.schedule.days;
    document.getElementById('classTime').textContent = course.schedule.time;
    document.getElementById('classLocation').textContent = course.schedule.location;
    document.getElementById('availableSeats').textContent = course.availableSeats;

    // Handle enrollment
    const enrollButton = document.getElementById('enrollButton');
    const alreadyEnrolled = isUserEnrolled();

    if (alreadyEnrolled) {
        enrollButton.textContent = 'Already Enrolled';
        enrollButton.classList.add('btn-disabled');
        enrollButton.disabled = true;
        
        // Add enrolled status indicator
        const statusDiv = document.createElement('div');
        statusDiv.className = 'enrollment-status status-enrolled';
        statusDiv.textContent = 'Currently Enrolled';
        enrollButton.parentNode.appendChild(statusDiv);
    } else if (course.availableSeats === 0) {
        enrollButton.textContent = 'Course Full';
        enrollButton.classList.add('btn-disabled');
        enrollButton.disabled = true;

        // Add full status indicator
        const statusDiv = document.createElement('div');
        statusDiv.className = 'enrollment-status status-full';
        statusDiv.textContent = 'Course is Full';
        enrollButton.parentNode.appendChild(statusDiv);
    }

    enrollButton.addEventListener('click', async () => {
        try {
            if (alreadyEnrolled) {
                throw new Error('You are already enrolled in this course');
            }

            if (course.availableSeats === 0) {
                throw new Error('Sorry, this course is full');
            }

            // Show loading state
            enrollButton.textContent = 'Enrolling...';
            enrollButton.disabled = true;

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Save enrollment in localStorage
            const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
            enrollments.push({
                courseId: courseId,
                userId: user.email,
                enrollmentDate: new Date().toISOString(),
                code: course.code,
                title: course.title,
                instructor: course.instructor.name,
                schedule: course.schedule
            });
            localStorage.setItem('enrollments', JSON.stringify(enrollments));

            // Show success message and redirect
            alert('Successfully enrolled in the course!');
            window.location.href = './dashboard.html';
        } catch (error) {
            alert(error.message);
            // Reset button state if error
            if (!alreadyEnrolled) {
                enrollButton.textContent = 'Enroll in Course';
                enrollButton.disabled = false;
            }
        }
    });

    // Handle logout
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = './index.html';
    });
}); 