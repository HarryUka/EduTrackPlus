document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = './index.html';
        return;
    }

    // Initialize schedule variables
    let currentWeek = new Date();

    // Initialize the schedule grid with day columns
    initializeScheduleGrid();
    updateWeekDisplay();
    loadSchedule();

    // Add event listeners for week navigation
    document.getElementById('prevWeek').addEventListener('click', () => {
        currentWeek.setDate(currentWeek.getDate() - 7);
        updateWeekDisplay();
        loadSchedule();
    });

    document.getElementById('nextWeek').addEventListener('click', () => {
        currentWeek.setDate(currentWeek.getDate() + 7);
        updateWeekDisplay();
        loadSchedule();
    });

    // Initialize the schedule grid with day columns
    function initializeScheduleGrid() {
        const scheduleGrid = document.getElementById('fullSchedule');
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        days.forEach(day => {
            const dayColumn = document.createElement('div');
            dayColumn.className = 'day-column';
            dayColumn.innerHTML = `
                <div class="day-header">${day}</div>
                <div class="day-slots">
                    ${Array(10).fill(0).map(() => '<div class="time-slot-cell"></div>').join('')}
                </div>
            `;
            scheduleGrid.appendChild(dayColumn);
        });
    }

    // Update the week display in the header
    function updateWeekDisplay() {
        const weekStart = new Date(currentWeek);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
            });
        };

        document.querySelector('.schedule-controls h2').textContent = 
            `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;

        // Update day headers with dates
        const dayHeaders = document.querySelectorAll('.day-header');
        dayHeaders.forEach((header, index) => {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + index);
            header.textContent = date.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        });
    }

    // Load and display the schedule
    function loadSchedule() {
        clearSchedule();
        const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
        
        enrollments.forEach(enrollment => {
            if (enrollment.schedule) {
                const days = enrollment.schedule.days.split('/');
                days.forEach(day => {
                    const scheduleItem = {
                        type: 'Lecture', // Default to lecture if not specified
                        startTime: enrollment.schedule.time.split(' - ')[0],
                        endTime: enrollment.schedule.time.split(' - ')[1],
                        location: enrollment.schedule.location,
                        day: day.trim()
                    };
                    const dayIndex = getDayIndex(day.trim());
                    if (dayIndex !== -1) {
                        createClassEvent(enrollment, scheduleItem, dayIndex);
                    }
                });
            }
        });
    }

    // Clear existing schedule events
    function clearSchedule() {
        document.querySelectorAll('.class-event').forEach(event => event.remove());
    }

    // Create a class event element
    function createClassEvent(course, scheduleItem, dayIndex) {
        const startTime = convertTimeToMinutes(scheduleItem.startTime);
        const endTime = convertTimeToMinutes(scheduleItem.endTime);
        const duration = endTime - startTime;
        const top = ((startTime - 480) / 60) * 60; // 480 = 8:00 AM in minutes
        const height = (duration / 60) * 60;

        const eventElement = document.createElement('div');
        eventElement.className = `class-event ${scheduleItem.type.toLowerCase()}`;
        eventElement.style.top = `${top}px`;
        eventElement.style.height = `${height}px`;
        
        eventElement.innerHTML = `
            <strong>${course.code}</strong><br>
            ${scheduleItem.type}<br>
            ${scheduleItem.location}
        `;

        // Add tooltip with more information
        eventElement.title = `
            ${course.code} - ${course.title}
            ${scheduleItem.type}
            ${scheduleItem.startTime} - ${scheduleItem.endTime}
            ${scheduleItem.location}
        `;

        const dayColumn = document.querySelectorAll('.day-slots')[dayIndex];
        dayColumn.appendChild(eventElement);
    }

    // Helper function to convert time string to minutes
    function convertTimeToMinutes(timeString) {
        const [time, period] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
    }

    // Helper function to get day index from day name
    function getDayIndex(day) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days.indexOf(day);
    }

    // Handle logout
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = './index.html';
    });
});