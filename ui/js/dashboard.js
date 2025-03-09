document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = './index.html';
        return;
    }

    // Get enrollments from localStorage
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');

    // Update user name and quick stats
    document.getElementById('userName').textContent = user.name;
    document.getElementById('enrolledCount').textContent = enrollments.length;
    document.getElementById('currentGPA').textContent = '3.75'; // Sample GPA
    document.getElementById('totalCredits').textContent = enrollments.length * 3; // Sample credit calculation

    // Sample data for weekly schedule
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const scheduleGrid = document.getElementById('weeklySchedule');

    weekDays.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.className = 'schedule-day';
        dayColumn.innerHTML = `<h3>${day}</h3>`;

        // Filter classes for this day
        const dayClasses = enrollments.filter(course => 
            course.schedule.days.includes(day)
        );

        if (dayClasses.length > 0) {
            dayClasses.forEach(course => {
                const classSlot = document.createElement('div');
                classSlot.className = 'class-slot';
                classSlot.innerHTML = `
                    <strong>${course.code}</strong><br>
                    ${course.schedule.time}<br>
                    ${course.schedule.location}
                `;
                dayColumn.appendChild(classSlot);
            });
        } else {
            dayColumn.innerHTML += '<p style="text-align: center; color: #666;">No Classes</p>';
        }

        scheduleGrid.appendChild(dayColumn);
    });

    // Sample deadlines data
    const deadlines = [
        {
            course: 'CS101',
            title: 'Project Submission',
            date: '2024-03-15',
            type: 'upcoming'
        },
        {
            course: 'MATH201',
            title: 'Midterm Exam',
            date: '2024-03-20',
            type: 'upcoming'
        },
        {
            course: 'CS101',
            title: 'Quiz 2',
            date: '2024-03-12',
            type: 'due'
        }
    ];

    // Populate deadlines
    const deadlinesContainer = document.getElementById('deadlines');
    deadlines.forEach(deadline => {
        const deadlineElement = document.createElement('div');
        deadlineElement.className = `deadline-item deadline-${deadline.type}`;
        deadlineElement.innerHTML = `
            <div class="deadline-info">
                <h4>${deadline.course}: ${deadline.title}</h4>
                <p>Due: ${new Date(deadline.date).toLocaleDateString()}</p>
            </div>
            <span class="deadline-date">${getDaysUntil(deadline.date)}</span>
        `;
        deadlinesContainer.appendChild(deadlineElement);
    });

    // Sample course progress data
    const courseProgress = [
        { code: 'CS101', title: 'Introduction to Computer Science', progress: 65 },
        { code: 'MATH201', title: 'Calculus I', progress: 78 }
    ];

    // Populate course progress
    const progressContainer = document.getElementById('courseProgress');
    courseProgress.forEach(course => {
        const progressElement = document.createElement('div');
        progressElement.className = 'progress-card';
        progressElement.innerHTML = `
            <h3>${course.code}: ${course.title}</h3>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
            <p style="text-align: right; margin-top: 0.5rem;">
                <strong>${course.progress}%</strong> Complete
            </p>
        `;
        progressContainer.appendChild(progressElement);
    });

    // Populate registered courses
    const coursesContainer = document.getElementById('registeredCourses');
    enrollments.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course-card';
        courseElement.innerHTML = `
            <h3>${course.code}: ${course.title}</h3>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Schedule:</strong> ${course.schedule.days} ${course.schedule.time}</p>
            <p><strong>Location:</strong> ${course.schedule.location}</p>
            <a href="course-details.html?id=${course.courseId}" class="btn-primary">View Details</a>
        `;
        coursesContainer.appendChild(courseElement);
    });

    // Helper function to calculate days until deadline
    function getDaysUntil(dateString) {
        const today = new Date();
        const deadline = new Date(dateString);
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Due Today';
        if (diffDays < 0) return 'Past Due';
        return `${diffDays} days left`;
    }

    // Handle logout
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = './index.html';
    });
});