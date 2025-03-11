document.addEventListener('DOMContentLoaded', function() {
    const studentListElement = document.getElementById('studentList');
    const searchInput = document.getElementById('searchStudents');
    const departmentFilter = document.getElementById('departmentFilter');
    const yearFilter = document.getElementById('yearFilter');
    const logoutButton = document.getElementById('logout');
    
    // Check if user is logged in
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        window.location.href = './index.html';
        return;
    }
    
    // Mock data for students
    const mockStudents = [
        { 
            id: 1, 
            name: 'Alex Johnson', 
            studentId: 'S10001',
            department: 'CS', 
            year: '3',
            email: 'alex.johnson@edutrackplus.com',
            gpa: '3.8',
            advisor: 'Prof. John Doe',
            enrolledCourses: ['CS301', 'CS401', 'MATH201'],
            image: 'https://randomuser.me/api/portraits/men/11.jpg'
        },
        { 
            id: 2, 
            name: 'Emily Davis', 
            studentId: 'S10002',
            department: 'MATH', 
            year: '2',
            email: 'emily.davis@edutrackplus.com',
            gpa: '3.9',
            advisor: 'Prof. Jane Wilson',
            enrolledCourses: ['MATH101', 'MATH201', 'CS101'],
            image: 'https://randomuser.me/api/portraits/women/12.jpg'
        },
        { 
            id: 3, 
            name: 'Michael Brown', 
            studentId: 'S10003',
            department: 'CS', 
            year: '4',
            email: 'michael.brown@edutrackplus.com',
            gpa: '3.5',
            advisor: 'Prof. Sarah Johnson',
            enrolledCourses: ['CS401', 'CS301'],
            image: 'https://randomuser.me/api/portraits/men/13.jpg'
        },
        { 
            id: 4, 
            name: 'Sophia Wilson', 
            studentId: 'S10004',
            department: 'ENG', 
            year: '1',
            email: 'sophia.wilson@edutrackplus.com',
            gpa: '3.7',
            advisor: 'Prof. Robert Johnson',
            enrolledCourses: ['ENG101', 'MATH101'],
            image: 'https://randomuser.me/api/portraits/women/14.jpg'
        },
        { 
            id: 5, 
            name: 'Daniel Lee', 
            studentId: 'S10005',
            department: 'CS', 
            year: '2',
            email: 'daniel.lee@edutrackplus.com',
            gpa: '3.6',
            advisor: 'Prof. Michael Davis',
            enrolledCourses: ['CS201', 'MATH101'],
            image: 'https://randomuser.me/api/portraits/men/15.jpg'
        },
        { 
            id: 6, 
            name: 'Olivia Martinez', 
            studentId: 'S10006',
            department: 'MATH', 
            year: '3',
            email: 'olivia.martinez@edutrackplus.com',
            gpa: '4.0',
            advisor: 'Prof. Jane Wilson',
            enrolledCourses: ['MATH201', 'CS201'],
            image: 'https://randomuser.me/api/portraits/women/16.jpg'
        },
        { 
            id: 7, 
            name: 'William Taylor', 
            studentId: 'S10007',
            department: 'ENG', 
            year: '4',
            email: 'william.taylor@edutrackplus.com',
            gpa: '3.4',
            advisor: 'Prof. Robert Johnson',
            enrolledCourses: ['ENG201'],
            image: 'https://randomuser.me/api/portraits/men/17.jpg'
        },
        { 
            id: 8, 
            name: 'Ava Anderson', 
            studentId: 'S10008',
            department: 'CS', 
            year: '1',
            email: 'ava.anderson@edutrackplus.com',
            gpa: '3.8',
            advisor: 'Prof. John Doe',
            enrolledCourses: ['CS101', 'MATH101'],
            image: 'https://randomuser.me/api/portraits/women/18.jpg'
        }
    ];
    
    // Function to render students
    function renderStudents(students) {
        if (!studentListElement) return;
        
        if (students.length === 0) {
            studentListElement.innerHTML = '<div class="no-students">No students found matching your criteria.</div>';
            return;
        }
        
        studentListElement.innerHTML = students.map(student => `
            <div class="student-card">
                <div class="student-header">
                    <div class="student-image">
                        <img src="${student.image}" alt="${student.name}">
                    </div>
                    <div class="student-info">
                        <h3>${student.name}</h3>
                        <p class="student-id">ID: ${student.studentId}</p>
                        <p class="student-department">${getDepartmentName(student.department)} - Year ${student.year}</p>
                    </div>
                </div>
                <div class="student-details">
                    <p><strong>Email:</strong> <a href="mailto:${student.email}">${student.email}</a></p>
                    <p><strong>GPA:</strong> ${student.gpa}</p>
                    <p><strong>Academic Advisor:</strong> ${student.advisor}</p>
                    <p><strong>Enrolled Courses:</strong> ${student.enrolledCourses.join(', ')}</p>
                </div>
                <div class="student-footer">
                    <a href="student-details.html?id=${student.id}" class="btn-secondary">View Profile</a>
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
    
    // Function to filter students
    function filterStudents() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const department = departmentFilter ? departmentFilter.value : '';
        const year = yearFilter ? yearFilter.value : '';
        
        const filteredStudents = mockStudents.filter(student => {
            const matchesSearch = searchTerm === '' || 
                student.name.toLowerCase().includes(searchTerm) || 
                student.studentId.toLowerCase().includes(searchTerm) ||
                student.email.toLowerCase().includes(searchTerm);
                
            const matchesDepartment = department === '' || student.department === department;
            const matchesYear = year === '' || student.year === year;
            
            return matchesSearch && matchesDepartment && matchesYear;
        });
        
        renderStudents(filteredStudents);
    }
    
    // Initial render
    renderStudents(mockStudents);
    
    // Add event listeners for filters
    if (searchInput) {
        searchInput.addEventListener('input', filterStudents);
    }
    
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterStudents);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', filterStudents);
    }
    
    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = './index.html';
        });
    }
    
    // Add CSS for student cards
    const style = document.createElement('style');
    style.textContent = `
        .student-card {
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .student-header {
            display: flex;
            margin-bottom: 15px;
        }
        
        .student-image {
            width: 80px;
            height: 80px;
            margin-right: 20px;
            border-radius: 50%;
            overflow: hidden;
        }
        
        .student-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .student-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .student-id {
            color: #555;
            margin-bottom: 5px;
        }
        
        .student-department {
            color: var(--secondary-color, #5c6bc0);
            font-weight: bold;
        }
        
        .student-details {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .student-details p {
            margin-bottom: 5px;
        }
        
        .student-footer {
            display: flex;
            justify-content: flex-end;
        }
        
        .no-students {
            text-align: center;
            padding: 30px;
            color: #666;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
}); 