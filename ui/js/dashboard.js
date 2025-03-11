document.addEventListener('DOMContentLoaded', function() {
    console.log("Dashboard script loaded");
    
    const userNameElement = document.getElementById('userName');
    const enrolledCountElement = document.getElementById('enrolledCount');
    const currentGPAElement = document.getElementById('currentGPA');
    const totalCreditsElement = document.getElementById('totalCredits');
    const attendanceRateElement = document.getElementById('attendanceRate');
    const registeredCoursesElement = document.getElementById('registeredCourses');
    const upcomingClassesElement = document.getElementById('upcomingClasses');
    const weeklyScheduleElement = document.getElementById('weeklySchedule');
    const deadlinesElement = document.getElementById('deadlines');
    const courseProgressElement = document.getElementById('courseProgress');
    const academicCalendarElement = document.getElementById('academicCalendar');
    const logoutButton = document.getElementById('logout');
    const notificationCountElement = document.getElementById('notificationCount');
    const notificationsMenu = document.getElementById('notificationsMenu');
    const notificationsToggle = document.getElementById('notificationsToggle');
    
    // Check if user is logged in
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        window.location.href = './index.html';
        return;
    }
    
    const user = JSON.parse(userJson);
    console.log("User data:", user);
    
    // Update user name
    if (userNameElement) {
        userNameElement.textContent = user.name || 'Student';
    }
    
    // Direct navigation buttons (using direct click handlers instead of data attributes)
    const browseCourseBtn = document.querySelector('.browse-courses-btn');
    if (browseCourseBtn) {
        browseCourseBtn.onclick = function() {
            window.location.href = 'courses.html';
        };
    }
    
    const viewScheduleBtn = document.querySelector('.view-schedule-btn');
    if (viewScheduleBtn) {
        viewScheduleBtn.onclick = function() {
            window.location.href = 'schedule.html';
        };
    }
    
    // Resource buttons
    const resourceButtons = document.querySelectorAll('.resource-btn');
    resourceButtons.forEach(button => {
        button.onclick = function(e) {
            e.preventDefault();
            const feature = this.getAttribute('data-feature') || this.textContent.trim().toLowerCase();
            alert(`The ${feature.replace(/-/g, ' ')} feature will be available soon!`);
        };
    });
    
    // Mock data for dashboard
    const mockData = {
        enrolledCourses: 4,
        currentGPA: 3.75,
        totalCredits: 15,
        attendanceRate: '95%',
        courses: [
            { id: 1, code: 'CS101', name: 'Introduction to Programming', instructor: 'Prof. John Doe', schedule: 'Mon, Wed 10:00 AM', progress: 85 },
            { id: 2, code: 'MATH101', name: 'Calculus I', instructor: 'Prof. Jane Wilson', schedule: 'Tue, Thu 9:00 AM', progress: 72 },
            { id: 3, code: 'CS201', name: 'Data Structures', instructor: 'Prof. John Doe', schedule: 'Mon, Wed 1:00 PM', progress: 90 },
            { id: 4, code: 'ENG101', name: 'Engineering Principles', instructor: 'Prof. Robert Johnson', schedule: 'Fri 11:00 AM', progress: 65 }
        ],
        upcomingClasses: [
            { course: 'CS101', time: 'Today, 10:00 AM', location: 'Room 101' },
            { course: 'MATH101', time: 'Tomorrow, 9:00 AM', location: 'Room 203' },
            { course: 'CS201', time: 'Today, 1:00 PM', location: 'Room 105' }
        ],
        deadlines: [
            { course: 'CS101', task: 'Assignment 3', due: 'Mar 15, 2024' },
            { course: 'MATH101', task: 'Midterm Exam', due: 'Mar 20, 2024' },
            { course: 'CS201', task: 'Project Proposal', due: 'Mar 18, 2024' }
        ],
        calendarEvents: [
            { date: 'Mar 15, 2024', event: 'Last Day to Drop Classes' },
            { date: 'Mar 25-29, 2024', event: 'Spring Break' },
            { date: 'Apr 10, 2024', event: 'Registration for Fall Semester Opens' }
        ],
        notifications: [
            { id: 1, message: 'New assignment posted in CS101', time: '2 hours ago' },
            { id: 2, message: 'Reminder: MATH101 midterm next week', time: '5 hours ago' },
            { id: 3, message: 'Your CS201 project proposal has been approved', time: '1 day ago' }
        ]
    };
    
    // Update dashboard with mock data
    if (enrolledCountElement) enrolledCountElement.textContent = mockData.enrolledCourses;
    if (currentGPAElement) currentGPAElement.textContent = mockData.currentGPA;
    if (totalCreditsElement) totalCreditsElement.textContent = mockData.totalCredits;
    if (attendanceRateElement) attendanceRateElement.textContent = mockData.attendanceRate;
    
    // Populate registered courses
    if (registeredCoursesElement) {
        registeredCoursesElement.innerHTML = mockData.courses.map(course => `
            <div class="course-card">
                <h3>${course.code}: ${course.name}</h3>
                <p><strong>Instructor:</strong> ${course.instructor}</p>
                <p><strong>Schedule:</strong> ${course.schedule}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${course.progress}%"></div>
                </div>
                <p class="progress-text">${course.progress}% Complete</p>
                <a href="course-details.html?id=${course.id}" class="btn-secondary view-course-btn">View Course</a>
            </div>
        `).join('');
        
        // Add event listeners to view course buttons
        const viewCourseButtons = document.querySelectorAll('.view-course-btn');
        viewCourseButtons.forEach(button => {
            button.onclick = function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href) {
                    window.location.href = href;
                }
            };
        });
    }
    
    // Populate upcoming classes
    if (upcomingClassesElement) {
        upcomingClassesElement.innerHTML = mockData.upcomingClasses.map(cls => `
            <div class="schedule-item">
                <div class="schedule-course">${cls.course}</div>
                <div class="schedule-time">${cls.time}</div>
                <div class="schedule-location">${cls.location}</div>
            </div>
        `).join('');
    }
    
    // Populate weekly schedule
    if (weeklyScheduleElement) {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        weeklyScheduleElement.innerHTML = days.map(day => `
            <div class="schedule-day">
                <div class="day-header">${day}</div>
                <div class="day-content">
                    ${mockData.courses.filter(course => course.schedule.includes(day.substring(0, 3))).map(course => `
                        <div class="schedule-block">
                            <div class="course-code">${course.code}</div>
                            <div class="course-time">${course.schedule.split(' ')[1]}</div>
                        </div>
                    `).join('') || '<div class="no-classes">No Classes</div>'}
                </div>
            </div>
        `).join('');
    }
    
    // Populate deadlines
    if (deadlinesElement) {
        deadlinesElement.innerHTML = mockData.deadlines.map(deadline => `
            <div class="deadline-item">
                <div class="deadline-course">${deadline.course}</div>
                <div class="deadline-task">${deadline.task}</div>
                <div class="deadline-date">${deadline.due}</div>
            </div>
        `).join('');
    }
    
    // Populate course progress
    if (courseProgressElement) {
        courseProgressElement.innerHTML = mockData.courses.map(course => `
            <div class="progress-item">
                <div class="progress-course">${course.code}: ${course.name}</div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${course.progress}%"></div>
                </div>
                <div class="progress-percentage">${course.progress}%</div>
            </div>
        `).join('');
    }
    
    // Populate academic calendar
    if (academicCalendarElement) {
        academicCalendarElement.innerHTML = mockData.calendarEvents.map(event => `
            <div class="calendar-item">
                <div class="calendar-date">${event.date}</div>
                <div class="calendar-event">${event.event}</div>
            </div>
        `).join('');
    }
    
    // Setup notifications
    if (notificationCountElement && notificationsMenu && notificationsToggle) {
        notificationCountElement.textContent = mockData.notifications.length;
        
        notificationsMenu.innerHTML = mockData.notifications.map(notification => `
            <div class="notification-item">
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
        `).join('');
        
        notificationsToggle.addEventListener('click', function(e) {
            e.preventDefault();
            notificationsMenu.classList.toggle('show');
        });
        
        // Close notifications menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationsToggle.contains(e.target) && !notificationsMenu.contains(e.target)) {
                notificationsMenu.classList.remove('show');
            }
        });
    }
    
    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Logout clicked");
            localStorage.removeItem('user');
            window.location.href = './index.html';
        });
    }
    
    // Add CSS for dashboard elements
    const style = document.createElement('style');
    style.textContent = `
        .course-card {
            background-color: #fff;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .progress-bar {
            background-color: #f0f0f0;
            border-radius: 4px;
            height: 8px;
            margin: 10px 0;
            overflow: hidden;
        }
        
        .progress {
            background-color: var(--primary-color, #4285f4);
            height: 100%;
        }
        
        .progress-text {
            font-size: 0.8rem;
            text-align: right;
            margin-bottom: 10px;
        }
        
        .schedule-item, .deadline-item, .calendar-item, .notification-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        
        .schedule-day {
            flex: 1;
            border-right: 1px solid #eee;
        }
        
        .day-header {
            background-color: var(--secondary-color, #5c6bc0);
            color: white;
            padding: 8px;
            text-align: center;
        }
        
        .day-content {
            min-height: 150px;
        }
        
        .schedule-block {
            background-color: var(--secondary-color, #5c6bc0);
            color: white;
            margin: 5px;
            padding: 8px;
            border-radius: 4px;
        }
        
        .no-classes {
            text-align: center;
            padding: 20px 0;
            color: #999;
        }
        
        .notifications-menu {
            display: none;
            position: absolute;
            top: 100%;
            right: 0;
            background-color: white;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            width: 300px;
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
        }
        
        .notifications-menu.show {
            display: block;
        }
        
        .view-course-btn {
            display: inline-block;
            margin-top: 10px;
            text-decoration: none;
            padding: 5px 10px;
            border-radius: 4px;
            background-color: var(--secondary-color, #5c6bc0);
            color: white;
            font-size: 0.9rem;
            cursor: pointer;
        }
        
        .view-course-btn:hover {
            background-color: #4a59a7;
        }
        
        .btn-secondary {
            cursor: pointer;
        }
        
        .notification-badge {
            background-color: var(--accent-color, #e74c3c);
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 0.7rem;
            position: absolute;
            top: -5px;
            right: -5px;
        }
    `;
    document.head.appendChild(style);
    
    console.log("Dashboard initialization complete");
}); 