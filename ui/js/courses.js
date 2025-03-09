document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = './index.html';
        return;
    }

    // Sample data - In a real application, this would come from an API
    const courses = [
        {
            id: 1,
            code: 'CS101',
            title: 'Introduction to Computer Science',
            department: 'CS',
            level: '100',
            instructor: 'Dr. Smith',
            description: 'An introduction to computer science concepts and programming.',
            credits: 3,
            seats: 5
        },
        {
            id: 2,
            code: 'MATH201',
            title: 'Calculus I',
            department: 'MATH',
            level: '200',
            instructor: 'Dr. Johnson',
            description: 'Introduction to differential and integral calculus.',
            credits: 4,
            seats: 8
        },
        {
            id: 3,
            code: 'ENG101',
            title: 'Technical Writing',
            department: 'ENG',
            level: '100',
            instructor: 'Prof. Williams',
            description: 'Fundamentals of technical writing and communication.',
            credits: 3,
            seats: 12
        }
    ];

    let filteredCourses = [...courses];

    // Add CSS styles for course cards
    const style = document.createElement('style');
    style.textContent = `
        .course-card {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
        }

        .course-card h3 {
            color: var(--primary-color);
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }

        .course-card p {
            margin: 0.5rem 0;
            color: var(--text-color);
        }

        .course-card .btn-primary {
            margin-top: auto;
            text-align: center;
            text-decoration: none;
            display: inline-block;
        }

        .course-card .seats-available {
            color: var(--accent-color);
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    // Search functionality
    const searchInput = document.getElementById('searchCourses');
    const departmentFilter = document.getElementById('departmentFilter');
    const levelFilter = document.getElementById('levelFilter');

    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        const department = departmentFilter.value;
        const level = levelFilter.value;

        filteredCourses = courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                                course.code.toLowerCase().includes(searchTerm) ||
                                course.instructor.toLowerCase().includes(searchTerm);
            
            const matchesDepartment = !department || course.department === department;
            const matchesLevel = !level || course.level === level;

            return matchesSearch && matchesDepartment && matchesLevel;
        });

        displayCourses();
    }

    function displayCourses() {
        const courseList = document.getElementById('courseList');
        courseList.innerHTML = '';

        filteredCourses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course-card';
            courseElement.innerHTML = `
                <h3>${course.code}: ${course.title}</h3>
                <p><strong>Instructor:</strong> ${course.instructor}</p>
                <p><strong>Department:</strong> ${course.department}</p>
                <p><strong>Level:</strong> ${course.level}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p class="seats-available"><strong>Available Seats:</strong> ${course.seats}</p>
                <a href="./course-details.html?id=${course.id}" class="btn-primary">View Details</a>
            `;
            courseList.appendChild(courseElement);
        });

        // Add message if no courses found
        if (filteredCourses.length === 0) {
            const noCourses = document.createElement('div');
            noCourses.className = 'no-courses';
            noCourses.innerHTML = '<p>No courses found matching your criteria.</p>';
            courseList.appendChild(noCourses);
        }
    }

    // Event listeners for search and filters
    searchInput.addEventListener('input', filterCourses);
    departmentFilter.addEventListener('change', filterCourses);
    levelFilter.addEventListener('change', filterCourses);

    // Handle logout
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = './index.html';
    });

    // Initial display
    displayCourses();
});