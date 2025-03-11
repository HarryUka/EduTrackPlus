document.addEventListener('DOMContentLoaded', function() {
    const courseListElement = document.getElementById('courseList');
    const searchInput = document.getElementById('searchCourses');
    const departmentFilter = document.getElementById('departmentFilter');
    const levelFilter = document.getElementById('levelFilter');
    const logoutButton = document.getElementById('logout');
    
    // Check if user is logged in
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        window.location.href = './index.html';
        return;
    }
    
    // Mock data for courses
    const mockCourses = [
        { id: 1, code: 'CS101', name: 'Introduction to Programming', department: 'CS', level: '100', credits: 3, description: 'An introductory course to programming concepts', instructor: 'Prof. John Doe', availableSeats: 15 },
        { id: 2, code: 'CS201', name: 'Data Structures', department: 'CS', level: '200', credits: 4, description: 'Study of data structures and algorithms', instructor: 'Prof. John Doe', availableSeats: 10 },
        { id: 3, code: 'CS301', name: 'Database Systems', department: 'CS', level: '300', credits: 3, description: 'Introduction to database design and SQL', instructor: 'Prof. Michael Davis', availableSeats: 8 },
        { id: 4, code: 'CS401', name: 'Artificial Intelligence', department: 'CS', level: '400', credits: 4, description: 'Introduction to AI concepts and algorithms', instructor: 'Prof. Sarah Johnson', availableSeats: 12 },
        { id: 5, code: 'MATH101', name: 'Calculus I', department: 'MATH', level: '100', credits: 4, description: 'Introduction to differential calculus', instructor: 'Prof. Jane Wilson', availableSeats: 20 },
        { id: 6, code: 'MATH201', name: 'Linear Algebra', department: 'MATH', level: '200', credits: 3, description: 'Study of vector spaces and linear mappings', instructor: 'Prof. Jane Wilson', availableSeats: 15 },
        { id: 7, code: 'ENG101', name: 'Engineering Principles', department: 'ENG', level: '100', credits: 3, description: 'Fundamental principles of engineering', instructor: 'Prof. Robert Johnson', availableSeats: 25 },
        { id: 8, code: 'ENG201', name: 'Circuit Analysis', department: 'ENG', level: '200', credits: 4, description: 'Analysis of electrical circuits', instructor: 'Prof. Robert Johnson', availableSeats: 18 }
    ];
    
    // Function to render courses
    function renderCourses(courses) {
        if (!courseListElement) return;
        
        if (courses.length === 0) {
            courseListElement.innerHTML = '<div class="no-courses">No courses found matching your criteria.</div>';
            return;
        }
        
        courseListElement.innerHTML = courses.map(course => `
            <div class="course-card">
                <h3>${course.code}: ${course.name}</h3>
                <p class="course-department">${getDepartmentName(course.department)}</p>
                <p class="course-details">
                    <span class="course-credits">${course.credits} Credits</span>
                    <span class="course-level">Level ${course.level}</span>
                </p>
                <p class="course-instructor">Instructor: ${course.instructor}</p>
                <p class="course-description">${course.description}</p>
                <div class="course-footer">
                    <span class="available-seats">Available Seats: ${course.availableSeats}</span>
                    <a href="course-details.html?id=${course.id}" class="btn-secondary">View Details</a>
                </div>
            </div>
        `).join('');
    }
    
    // Helper function to get department name
    function getDepartmentName(code) {
        const departments = {
            'CS': 'Computer Science',
            'MATH': 'Mathematics',
            'ENG': 'Engineering'
        };
        return departments[code] || code;
    }
    
    // Function to filter courses
    function filterCourses() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const department = departmentFilter ? departmentFilter.value : '';
        const level = levelFilter ? levelFilter.value : '';
        
        const filteredCourses = mockCourses.filter(course => {
            const matchesSearch = searchTerm === '' || 
                course.name.toLowerCase().includes(searchTerm) || 
                course.code.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm);
                
            const matchesDepartment = department === '' || course.department === department;
            const matchesLevel = level === '' || course.level === level;
            
            return matchesSearch && matchesDepartment && matchesLevel;
        });
        
        renderCourses(filteredCourses);
    }
    
    // Initial render
    renderCourses(mockCourses);
    
    // Add event listeners for filters
    if (searchInput) {
        searchInput.addEventListener('input', filterCourses);
    }
    
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterCourses);
    }
    
    if (levelFilter) {
        levelFilter.addEventListener('change', filterCourses);
    }
    
    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = './index.html';
        });
    }
    
    // Add CSS for course cards
    const style = document.createElement('style');
    style.textContent = `
        .course-card {
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .course-department {
            color: var(--secondary-color, #5c6bc0);
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .course-details {
            display: flex;
            gap: 15px;
            margin-bottom: 10px;
        }
        
        .course-credits, .course-level {
            background-color: #f0f0f0;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.9rem;
        }
        
        .course-instructor {
            font-style: italic;
            margin-bottom: 10px;
        }
        
        .course-description {
            margin-bottom: 15px;
            color: #555;
        }
        
        .course-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
        }
        
        .available-seats {
            font-weight: bold;
        }
        
        .no-courses {
            text-align: center;
            padding: 30px;
            color: #666;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
}); 