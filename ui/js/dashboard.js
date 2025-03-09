document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = './index.html';
        return;
    }

    // Get enrollments from localStorage
    const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];

    // Calculate academic metrics
    const academicMetrics = calculateAcademicMetrics(enrollments);

    // Update user name and quick stats
    document.getElementById('userName').textContent = user.name;
    document.getElementById('enrolledCount').textContent = enrollments.length;
    document.getElementById('currentGPA').textContent = academicMetrics.gpa.toFixed(2);
    document.getElementById('totalCredits').textContent = academicMetrics.totalCredits;

    // Load and display different sections
    loadWeeklySchedule(enrollments);
    loadUpcomingClasses(enrollments);
    loadDeadlines(enrollments);
    loadCourseProgress(enrollments);
    loadRegisteredCourses(enrollments);

    // Calculate academic metrics
    function calculateAcademicMetrics(enrollments) {
        // Sample GPA calculation (in a real app, this would come from a backend)
        const sampleGrades = {
            'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'F': 0.0
        };

        let totalPoints = 0;
        let totalCredits = 0;

        enrollments.forEach(enrollment => {
            // Randomly assign a grade for demonstration
            const grades = Object.keys(sampleGrades);
            const randomGrade = grades[Math.floor(Math.random() * 5)]; // Bias towards better grades
            const gradePoints = sampleGrades[randomGrade];
            
            totalPoints += gradePoints * 3; // Assuming 3 credits per course
            totalCredits += 3;
        });

        return {
            gpa: totalCredits > 0 ? totalPoints / totalCredits : 0.0,
            totalCredits: totalCredits
        };
    }

    // Load weekly schedule
    function loadWeeklySchedule(enrollments) {
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const scheduleGrid = document.getElementById('weeklySchedule');
        scheduleGrid.innerHTML = ''; // Clear existing content

        weekDays.forEach(day => {
            const dayColumn = document.createElement('div');
            dayColumn.className = 'schedule-day';
            dayColumn.innerHTML = `<h3>${day}</h3>`;

            // Filter classes for this day
            const dayClasses = enrollments.filter(enrollment => 
                enrollment.schedule && enrollment.schedule.days.includes(day)
            );

            if (dayClasses.length > 0) {
                dayClasses.forEach(enrollment => {
                    const classSlot = document.createElement('div');
                    classSlot.className = 'class-slot';
                    classSlot.innerHTML = `
                        <strong>${enrollment.code}</strong><br>
                        ${enrollment.schedule.time}<br>
                        <small>${enrollment.schedule.location}</small>
                    `;
                    dayColumn.appendChild(classSlot);
                });
            } else {
                dayColumn.innerHTML += '<p class="no-classes">No Classes</p>';
            }

            scheduleGrid.appendChild(dayColumn);
        });
    }

    // Load upcoming classes
    function loadUpcomingClasses(enrollments) {
        const upcomingContainer = document.getElementById('upcomingClasses');
        upcomingContainer.innerHTML = ''; // Clear existing content

        const now = new Date();
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
        const currentTime = now.getHours() * 60 + now.getMinutes();

        // Filter and sort upcoming classes
        const upcomingClasses = enrollments
            .filter(enrollment => enrollment.schedule)
            .map(enrollment => {
                const startTime = convertTimeToMinutes(enrollment.schedule.time.split(' - ')[0]);
                return { ...enrollment, startTime };
            })
            .filter(enrollment => {
                return enrollment.schedule.days.includes(currentDay) && 
                       enrollment.startTime > currentTime;
            })
            .sort((a, b) => a.startTime - b.startTime)
            .slice(0, 3); // Show next 3 classes

        if (upcomingClasses.length > 0) {
            upcomingClasses.forEach(enrollment => {
                const classElement = document.createElement('div');
                classElement.className = 'class-slot';
                classElement.innerHTML = `
                    <strong>${enrollment.code}</strong><br>
                    ${enrollment.schedule.time}<br>
                    <small>${enrollment.schedule.location}</small>
                `;
                upcomingContainer.appendChild(classElement);
            });
        } else {
            upcomingContainer.innerHTML = '<p class="no-classes">No more classes today</p>';
        }
    }

    // Load deadlines
    function loadDeadlines(enrollments) {
        const deadlinesContainer = document.getElementById('deadlines');
        deadlinesContainer.innerHTML = ''; // Clear existing content

        // Generate sample deadlines for each course
        const allDeadlines = enrollments.flatMap(enrollment => {
            return [
                {
                    courseCode: enrollment.code,
                    title: 'Assignment 1',
                    date: getRandomFutureDate(7), // Due within 7 days
                    type: 'assignment'
                },
                {
                    courseCode: enrollment.code,
                    title: 'Midterm Exam',
                    date: getRandomFutureDate(14), // Due within 14 days
                    type: 'exam'
                }
            ];
        });

        // Sort deadlines by date
        allDeadlines.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Display the next 5 deadlines
        allDeadlines.slice(0, 5).forEach(deadline => {
            const deadlineElement = document.createElement('div');
            deadlineElement.className = 'deadline-item';
            const daysUntil = getDaysUntil(deadline.date);
            const urgencyClass = daysUntil <= 3 ? 'deadline-urgent' : 
                               daysUntil <= 7 ? 'deadline-upcoming' : '';
            
            deadlineElement.classList.add(urgencyClass);
            deadlineElement.innerHTML = `
                <div class="deadline-info">
                    <h4>${deadline.courseCode}: ${deadline.title}</h4>
                    <p>Due: ${new Date(deadline.date).toLocaleDateString()}</p>
                </div>
                <span class="deadline-date">${getDaysUntil(deadline.date)}</span>
            `;
            deadlinesContainer.appendChild(deadlineElement);
        });
    }

    // Load course progress
    function loadCourseProgress(enrollments) {
        const progressContainer = document.getElementById('courseProgress');
        progressContainer.innerHTML = ''; // Clear existing content

        enrollments.forEach(enrollment => {
            // Generate random progress for demonstration
            const progress = Math.floor(Math.random() * (85 - 45) + 45); // Progress between 45-85%
            
            const progressElement = document.createElement('div');
            progressElement.className = 'progress-card';
            progressElement.innerHTML = `
                <h3>${enrollment.code}: ${enrollment.title}</h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-details">
                    <span><strong>${progress}%</strong> Complete</span>
                    <span class="progress-status">${getProgressStatus(progress)}</span>
                </div>
            `;
            progressContainer.appendChild(progressElement);
        });
    }

    // Load registered courses
    function loadRegisteredCourses(enrollments) {
        const coursesContainer = document.getElementById('registeredCourses');
        coursesContainer.innerHTML = ''; // Clear existing content

        enrollments.forEach(enrollment => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course-card';
            courseElement.innerHTML = `
                <h3>${enrollment.code}: ${enrollment.title}</h3>
                <p><strong>Instructor:</strong> ${enrollment.instructor}</p>
                <p><strong>Schedule:</strong> ${enrollment.schedule.days} ${enrollment.schedule.time}</p>
                <p><strong>Location:</strong> ${enrollment.schedule.location}</p>
                <a href="course-details.html?id=${enrollment.courseId}" class="btn-primary">View Details</a>
            `;
            coursesContainer.appendChild(courseElement);
        });

        if (enrollments.length === 0) {
            coursesContainer.innerHTML = `
                <div class="no-courses">
                    <p>You haven't enrolled in any courses yet.</p>
                    <a href="courses.html" class="btn-primary">Browse Courses</a>
                </div>
            `;
        }
    }

    // Helper Functions
    function convertTimeToMinutes(timeString) {
        const [time, period] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
    }

    function getRandomFutureDate(maxDays) {
        const date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * maxDays) + 1);
        return date.toISOString().split('T')[0];
    }

    function getDaysUntil(dateString) {
        const today = new Date();
        const deadline = new Date(dateString);
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Due Today';
        if (diffDays < 0) return 'Past Due';
        return `${diffDays} days left`;
    }

    function getProgressStatus(progress) {
        if (progress < 50) return 'Needs Attention';
        if (progress < 70) return 'On Track';
        return 'Good Progress';
    }

    // Handle logout
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = './index.html';
    });
});