document.addEventListener('DOMContentLoaded', function() {
    const courseTitle = document.getElementById('courseTitle');
    const courseCode = document.getElementById('courseCode');
    const courseCredits = document.getElementById('courseCredits');
    const courseImage = document.getElementById('courseImage');
    const courseDescription = document.getElementById('courseDescription');
    const instructorName = document.getElementById('instructorName');
    const instructorEmail = document.getElementById('instructorEmail');
    const officeHours = document.getElementById('officeHours');
    const classDays = document.getElementById('classDays');
    const classTime = document.getElementById('classTime');
    const classLocation = document.getElementById('classLocation');
    const availableSeats = document.getElementById('availableSeats');
    const enrollButton = document.getElementById('enrollButton');
    const logoutButton = document.getElementById('logout');
    
    // Check if user is logged in
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        window.location.href = './index.html';
        return;
    }
    
    // Get course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (!courseId) {
        window.location.href = './courses.html';
        return;
    }
    
    // Mock course data
    const mockCourses = [
        { 
            id: 1, 
            code: 'CS101', 
            name: 'Introduction to Programming', 
            department: 'CS', 
            level: '100', 
            credits: 3, 
            description: 'An introductory course to programming concepts and practices. Students will learn fundamental programming principles, algorithm development, and problem-solving techniques using a high-level programming language. Topics include variables, data types, control structures, functions, arrays, and basic object-oriented programming concepts. No prior programming experience is required.',
            instructor: {
                name: 'Prof. John Doe',
                email: 'john.doe@edutrackplus.com',
                officeHours: 'Monday, Wednesday 2-4 PM'
            },
            schedule: {
                days: 'Monday, Wednesday',
                time: '10:00 AM - 11:30 AM',
                location: 'CS Building, Room 101'
            },
            availableSeats: 15,
            image: 'images/course-placeholder.jpg'
        },
        { 
            id: 2, 
            code: 'CS201', 
            name: 'Data Structures', 
            department: 'CS', 
            level: '200', 
            credits: 4, 
            description: 'A comprehensive study of data structures and algorithms. This course explores the design, analysis, and implementation of fundamental data structures such as lists, stacks, queues, trees, graphs, and hash tables. Students will learn algorithm analysis techniques and apply them to understand the efficiency of various implementations. Prerequisites: CS101 or equivalent programming experience.',
            instructor: {
                name: 'Prof. John Doe',
                email: 'john.doe@edutrackplus.com',
                officeHours: 'Tuesday, Thursday 1-3 PM'
            },
            schedule: {
                days: 'Tuesday, Thursday',
                time: '9:00 AM - 10:30 AM',
                location: 'CS Building, Room 105'
            },
            availableSeats: 10,
            image: 'images/course-placeholder.jpg'
        },
        { 
            id: 3, 
            code: 'CS301', 
            name: 'Database Systems', 
            department: 'CS', 
            level: '300', 
            credits: 3, 
            description: 'Introduction to database design and SQL. This course covers relational database concepts, entity-relationship modeling, normalization, SQL query language, and database application development. Students will design and implement database solutions for real-world problems and gain hands-on experience with modern database management systems. Prerequisites: CS201.',
            instructor: {
                name: 'Prof. Michael Davis',
                email: 'michael.davis@edutrackplus.com',
                officeHours: 'Monday, Friday 10 AM-12 PM'
            },
            schedule: {
                days: 'Monday, Wednesday, Friday',
                time: '1:00 PM - 2:00 PM',
                location: 'CS Building, Room 210'
            },
            availableSeats: 8,
            image: 'images/course-placeholder.jpg'
        }
    ];
    
    // Find the course
    const course = mockCourses.find(c => c.id === parseInt(courseId));
    
    if (!course) {
        window.location.href = './courses.html';
        return;
    }
    
    // Populate course details
    if (courseTitle) courseTitle.textContent = course.name;
    if (courseCode) courseCode.textContent = course.code;
    if (courseCredits) courseCredits.textContent = `Credits: ${course.credits}`;
    if (courseImage) courseImage.src = course.image;
    if (courseDescription) courseDescription.textContent = course.description;
    if (instructorName) instructorName.textContent = course.instructor.name;
    if (instructorEmail) instructorEmail.textContent = course.instructor.email;
    if (officeHours) officeHours.textContent = course.instructor.officeHours;
    if (classDays) classDays.textContent = course.schedule.days;
    if (classTime) classTime.textContent = course.schedule.time;
    if (classLocation) classLocation.textContent = course.schedule.location;
    if (availableSeats) availableSeats.textContent = course.availableSeats;
    
    // Handle enrollment
    if (enrollButton) {
        enrollButton.addEventListener('click', function() {
            // Check if already enrolled
            const user = JSON.parse(userJson);
            const enrolledCourses = user.enrolledCourses || [];
            
            if (enrolledCourses.includes(course.id)) {
                alert('You are already enrolled in this course.');
                return;
            }
            
            // Add course to enrolled courses
            enrolledCourses.push(course.id);
            user.enrolledCourses = enrolledCourses;
            localStorage.setItem('user', JSON.stringify(user));
            
            // Update button
            enrollButton.textContent = 'Enrolled';
            enrollButton.disabled = true;
            enrollButton.classList.add('enrolled');
            
            alert(`Successfully enrolled in ${course.code}: ${course.name}`);
        });
        
        // Check if already enrolled
        const user = JSON.parse(userJson);
        const enrolledCourses = user.enrolledCourses || [];
        
        if (enrolledCourses.includes(course.id)) {
            enrollButton.textContent = 'Enrolled';
            enrollButton.disabled = true;
            enrollButton.classList.add('enrolled');
        }
    }
    
    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = './index.html';
        });
    }
    
    // Add CSS for course details
    const style = document.createElement('style');
    style.textContent = `
        .enrolled {
            background-color: var(--success-color) !important;
            cursor: default;
        }
    `;
    document.head.appendChild(style);
}); 