document.addEventListener('DOMContentLoaded', function() {
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');
    const currentWeekElement = document.getElementById('currentWeek');
    const fullScheduleElement = document.getElementById('fullSchedule');
    const logoutButton = document.getElementById('logout');
    
    // Check if user is logged in
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        window.location.href = './index.html';
        return;
    }
    
    // Current date and week
    let currentDate = new Date();
    let currentWeekStart = getMonday(currentDate);
    
    // Update week display
    updateWeekDisplay();
    
    // Generate schedule
    generateSchedule();
    
    // Event listeners for week navigation
    if (prevWeekBtn) {
        prevWeekBtn.addEventListener('click', function() {
            currentWeekStart.setDate(currentWeekStart.getDate() - 7);
            updateWeekDisplay();
            generateSchedule();
        });
    }
    
    if (nextWeekBtn) {
        nextWeekBtn.addEventListener('click', function() {
            currentWeekStart.setDate(currentWeekStart.getDate() + 7);
            updateWeekDisplay();
            generateSchedule();
        });
    }
    
    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = './index.html';
        });
    }
    
    // Helper function to get Monday of current week
    function getMonday(date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
        return new Date(date.setDate(diff));
    }
    
    // Update week display
    function updateWeekDisplay() {
        if (currentWeekElement) {
            const weekEnd = new Date(currentWeekStart);
            weekEnd.setDate(weekEnd.getDate() + 4); // Friday
            
            const options = { month: 'long', day: 'numeric' };
            const startStr = currentWeekStart.toLocaleDateString('en-US', options);
            const endStr = weekEnd.toLocaleDateString('en-US', options);
            const yearStr = currentWeekStart.getFullYear();
            
            currentWeekElement.textContent = `Week of ${startStr} - ${endStr}, ${yearStr}`;
        }
    }
    
    // Generate schedule
    function generateSchedule() {
        if (!fullScheduleElement) return;
        
        // Mock schedule data
        const mockSchedule = [
            { day: 'Monday', time: '8:00 AM', course: 'CS101', type: 'lecture', location: 'Room 101' },
            { day: 'Monday', time: '11:00 AM', course: 'MATH101', type: 'lecture', location: 'Room 203' },
            { day: 'Tuesday', time: '9:00 AM', course: 'CS201', type: 'lecture', location: 'Room 105' },
            { day: 'Tuesday', time: '2:00 PM', course: 'CS101', type: 'lab', location: 'Lab 302' },
            { day: 'Wednesday', time: '8:00 AM', course: 'CS101', type: 'lecture', location: 'Room 101' },
            { day: 'Wednesday', time: '1:00 PM', course: 'ENG101', type: 'lecture', location: 'Room 405' },
            { day: 'Thursday', time: '9:00 AM', course: 'CS201', type: 'lecture', location: 'Room 105' },
            { day: 'Thursday', time: '3:00 PM', course: 'MATH101', type: 'tutorial', location: 'Room 210' },
            { day: 'Friday', time: '10:00 AM', course: 'ENG101', type: 'lab', location: 'Lab 401' }
        ];
        
        // Create day columns
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
        
        let scheduleHTML = '';
        
        // Create day columns
        days.forEach(day => {
            const dayDate = new Date(currentWeekStart);
            dayDate.setDate(dayDate.getDate() + days.indexOf(day));
            
            const formattedDate = dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            scheduleHTML += `
                <div class="day-column">
                    <div class="day-header">${day}<br><span class="date-small">${formattedDate}</span></div>
                    <div class="day-slots">
            `;
            
            // Create time slots for each day
            timeSlots.forEach(time => {
                const classesAtTime = mockSchedule.filter(item => item.day === day && item.time === time);
                
                if (classesAtTime.length > 0) {
                    classesAtTime.forEach(cls => {
                        scheduleHTML += `
                            <div class="time-slot-cell">
                                <div class="class-event ${cls.type}" title="${cls.course}: ${cls.type} at ${cls.location}">
                                    <div class="class-code">${cls.course}</div>
                                    <div class="class-type">${cls.type}</div>
                                    <div class="class-location">${cls.location}</div>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    scheduleHTML += `<div class="time-slot-cell"></div>`;
                }
            });
            
            scheduleHTML += `
                    </div>
                </div>
            `;
        });
        
        fullScheduleElement.innerHTML = scheduleHTML;
    }
    
    // Add CSS for schedule elements
    const style = document.createElement('style');
    style.textContent = `
        .date-small {
            font-size: 0.8rem;
            font-weight: normal;
            opacity: 0.8;
        }
        
        .time-slot-cell {
            height: 60px;
            border-bottom: 1px solid #eee;
            padding: 5px;
        }
        
        .class-event {
            background-color: var(--secondary-color);
            color: white;
            padding: 8px;
            border-radius: 4px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .class-event:hover {
            transform: scale(1.02);
        }
        
        .class-event.lecture {
            background-color: var(--secondary-color);
        }
        
        .class-event.lab {
            background-color: var(--success-color);
        }
        
        .class-event.tutorial {
            background-color: var(--warning-color);
        }
        
        .class-code {
            font-weight: bold;
        }
        
        .class-type {
            font-size: 0.8rem;
            text-transform: capitalize;
        }
        
        .class-location {
            font-size: 0.8rem;
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
}); 