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

    // Load notifications
    function loadNotifications() {
        const notifications = [
            {
                id: 1,
                title: 'Assignment Due Soon',
                message: 'Your CS101 project is due in 2 days',
                timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
                unread: true
            },
            {
                id: 2,
                title: 'New Grade Posted',
                message: 'A new grade has been posted for MATH201',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
                unread: true
            },
            {
                id: 3,
                title: 'Office Hours Changed',
                message: 'Prof. Smith has updated their office hours',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
                unread: false
            }
        ];

        const notificationsMenu = document.getElementById('notificationsMenu');
        const notificationCount = document.getElementById('notificationCount');
        
        // Update notification badge
        const unreadCount = notifications.filter(n => n.unread).length;
        notificationCount.textContent = unreadCount;
        notificationCount.style.display = unreadCount > 0 ? 'block' : 'none';

        // Populate notifications menu
        notificationsMenu.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.unread ? 'unread' : ''}" data-id="${notification.id}">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <small>${formatTimestamp(notification.timestamp)}</small>
            </div>
        `).join('');
    }

    // Load academic calendar
    function loadAcademicCalendar() {
        const events = [
            {
                title: 'Mid-Semester Break',
                date: '2024-03-15',
                type: 'holiday',
                description: 'No classes scheduled'
            },
            {
                title: 'Course Registration',
                date: '2024-03-20',
                type: 'academic',
                description: 'Summer semester registration begins'
            },
            {
                title: 'Final Exams',
                date: '2024-04-15',
                type: 'exam',
                description: 'Spring semester final examinations begin'
            }
        ];

        const calendarContainer = document.getElementById('academicCalendar');
        calendarContainer.innerHTML = events.map(event => {
            const date = new Date(event.date);
            return `
                <div class="calendar-event">
                    <div class="event-date">
                        <div class="day">${date.getDate()}</div>
                        <div class="month">${date.toLocaleString('default', { month: 'short' })}</div>
                    </div>
                    <div class="event-info">
                        <h4>${event.title}</h4>
                        <p>${event.description}</p>
                    </div>
                    <span class="event-type ${event.type}">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
                </div>
            `;
        }).join('');
    }

    // Calculate and update attendance rate
    function updateAttendanceRate() {
        // In a real application, this would come from actual attendance data
        const attendanceRate = Math.floor(Math.random() * (100 - 85) + 85); // Random between 85-100%
        document.getElementById('attendanceRate').textContent = `${attendanceRate}%`;
    }

    // Helper function to format timestamps
    function formatTimestamp(date) {
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffMinutes < 60) {
            return `${diffMinutes} minutes ago`;
        } else if (diffMinutes < 1440) {
            const hours = Math.floor(diffMinutes / 60);
            return `${hours} hours ago`;
        } else {
            const days = Math.floor(diffMinutes / 1440);
            return `${days} days ago`;
        }
    }

    // Initialize notifications dropdown
    document.getElementById('notificationsToggle').addEventListener('click', (e) => {
        e.preventDefault();
        const menu = document.getElementById('notificationsMenu');
        menu.classList.toggle('show');
    });

    // Close notifications menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notifications-dropdown')) {
            document.getElementById('notificationsMenu').classList.remove('show');
        }
    });

    // Load all new components
    loadNotifications();
    loadAcademicCalendar();
    updateAttendanceRate();

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

    // Initialize resource card handlers
    function initializeResourceCards() {
        const resourceActions = {
            'library': {
                url: '#',
                handler: () => {
                    alert('Library system will open in a new tab');
                    // In production: window.open('library-url', '_blank');
                }
            },
            'academic-support': {
                url: '#',
                handler: () => {
                    alert('Academic Support portal will open in a new tab');
                    // In production: window.open('academic-support-url', '_blank');
                }
            },
            'office-hours': {
                url: '#',
                handler: () => {
                    showOfficeHoursModal();
                }
            },
            'career-services': {
                url: '#',
                handler: () => {
                    alert('Career Services portal will open in a new tab');
                    // In production: window.open('career-services-url', '_blank');
                }
            }
        };

        // Add click handlers to resource cards
        document.querySelectorAll('.resource-card .btn-secondary').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const card = button.closest('.resource-card');
                const type = card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
                if (resourceActions[type]) {
                    resourceActions[type].handler();
                }
            });
        });
    }

    // Office Hours Modal
    function showOfficeHoursModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="modal" id="officeHoursModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Schedule Office Hours</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="selectCourse">Select Course</label>
                            <select id="selectCourse" required>
                                ${enrollments.map(course => 
                                    `<option value="${course.code}">${course.code}: ${course.title}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="selectDate">Select Date</label>
                            <input type="date" id="selectDate" required min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label for="selectTime">Select Time</label>
                            <select id="selectTime" required>
                                <option value="09:00">9:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="13:00">1:00 PM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="15:00">3:00 PM</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="meetingReason">Reason for Meeting</label>
                            <textarea id="meetingReason" rows="3" required></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-secondary" id="cancelBooking">Cancel</button>
                        <button class="btn-primary" id="confirmBooking">Book Session</button>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('officeHoursModal');
        const closeBtn = modal.querySelector('.close-modal');
        const cancelBtn = modal.querySelector('#cancelBooking');
        const confirmBtn = modal.querySelector('#confirmBooking');

        // Show modal
        modal.style.display = 'flex';

        // Close modal functions
        const closeModal = () => {
            modal.remove();
        };

        // Event listeners
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        confirmBtn.addEventListener('click', () => {
            const course = modal.querySelector('#selectCourse').value;
            const date = modal.querySelector('#selectDate').value;
            const time = modal.querySelector('#selectTime').value;
            const reason = modal.querySelector('#meetingReason').value;

            if (!course || !date || !time || !reason) {
                alert('Please fill in all fields');
                return;
            }

            // In a real app, this would make an API call
            alert(`Office hours booked for ${course} on ${date} at ${time}`);
            closeModal();

            // Add to notifications
            addNotification({
                title: 'Office Hours Booked',
                message: `Your session for ${course} is scheduled for ${date} at ${time}`,
                timestamp: new Date(),
                unread: true
            });
        });

        // Close modal if clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Add notification function
    function addNotification(notification) {
        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        notifications.unshift(notification);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        loadNotifications(); // Refresh notifications display
    }

    // Make notification items clickable
    document.getElementById('notificationsMenu').addEventListener('click', (e) => {
        const notificationItem = e.target.closest('.notification-item');
        if (notificationItem) {
            const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
            const notificationId = notificationItem.dataset.id;
            
            // Mark as read
            const updatedNotifications = notifications.map(n => {
                if (n.id === parseInt(notificationId)) {
                    return { ...n, unread: false };
                }
                return n;
            });

            localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
            notificationItem.classList.remove('unread');
            
            // Update badge count
            const unreadCount = updatedNotifications.filter(n => n.unread).length;
            document.getElementById('notificationCount').textContent = unreadCount;
            if (unreadCount === 0) {
                document.getElementById('notificationCount').style.display = 'none';
            }
        }
    });

    // Initialize resource cards
    initializeResourceCards();

    // Add CSS for modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .modal-content {
            background: white;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-header {
            padding: 1rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-body {
            padding: 1rem;
        }

        .modal-footer {
            padding: 1rem;
            border-top: 1px solid var(--border-color);
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
        }

        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }

        .close-modal:hover {
            color: var(--accent-color);
        }

        textarea {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-family: inherit;
            font-size: 1rem;
        }

        select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 1rem;
        }
    `;
    document.head.appendChild(modalStyle);
});