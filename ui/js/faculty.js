document.addEventListener('DOMContentLoaded', function() {
    const facultyListElement = document.getElementById('facultyList');
    const searchInput = document.getElementById('searchFaculty');
    const departmentFilter = document.getElementById('departmentFilter');
    const logoutButton = document.getElementById('logout');
    
    // Check if user is logged in
    const userJson = localStorage.getItem('user');
    if (!userJson) {
        window.location.href = './index.html';
        return;
    }
    
    // Mock data for faculty members
    const mockFaculty = [
        { 
            id: 1, 
            name: 'Prof. John Doe', 
            department: 'CS', 
            title: 'Associate Professor', 
            email: 'john.doe@edutrackplus.com',
            phone: '(555) 123-4567',
            office: 'CS Building, Room 301',
            officeHours: 'Monday, Wednesday 2-4 PM',
            research: 'Artificial Intelligence, Machine Learning',
            bio: 'Dr. John Doe has been teaching computer science for over 10 years with a focus on programming languages and AI.',
            courses: ['CS101', 'CS201'],
            image: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        { 
            id: 2, 
            name: 'Prof. Jane Wilson', 
            department: 'MATH', 
            title: 'Professor', 
            email: 'jane.wilson@edutrackplus.com',
            phone: '(555) 234-5678',
            office: 'Math Building, Room 205',
            officeHours: 'Tuesday, Thursday 1-3 PM',
            research: 'Number Theory, Algebraic Geometry',
            bio: 'Dr. Jane Wilson is a distinguished professor with numerous publications in advanced mathematics and applied statistics.',
            courses: ['MATH101', 'MATH201'],
            image: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        { 
            id: 3, 
            name: 'Prof. Michael Davis', 
            department: 'CS', 
            title: 'Assistant Professor', 
            email: 'michael.davis@edutrackplus.com',
            phone: '(555) 345-6789',
            office: 'CS Building, Room 210',
            officeHours: 'Monday, Friday 10 AM-12 PM',
            research: 'Database Systems, Data Mining',
            bio: 'Dr. Michael Davis specializes in database architecture and has industry experience at major tech companies.',
            courses: ['CS301'],
            image: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        { 
            id: 4, 
            name: 'Prof. Sarah Johnson', 
            department: 'CS', 
            title: 'Professor', 
            email: 'sarah.johnson@edutrackplus.com',
            phone: '(555) 456-7890',
            office: 'CS Building, Room 401',
            officeHours: 'Wednesday, Friday 1-3 PM',
            research: 'Artificial Intelligence, Neural Networks',
            bio: 'Dr. Sarah Johnson is a leading researcher in AI with multiple patents and publications in top journals.',
            courses: ['CS401'],
            image: 'https://randomuser.me/api/portraits/women/4.jpg'
        },
        { 
            id: 5, 
            name: 'Prof. Robert Johnson', 
            department: 'ENG', 
            title: 'Associate Professor', 
            email: 'robert.johnson@edutrackplus.com',
            phone: '(555) 567-8901',
            office: 'Engineering Building, Room 305',
            officeHours: 'Tuesday, Thursday 9-11 AM',
            research: 'Electrical Engineering, Circuit Design',
            bio: 'Dr. Robert Johnson has extensive experience in electrical engineering and has led several industry projects.',
            courses: ['ENG101', 'ENG201'],
            image: 'https://randomuser.me/api/portraits/men/5.jpg'
        }
    ];
    
    // Function to render faculty
    function renderFaculty(faculty) {
        if (!facultyListElement) return;
        
        if (faculty.length === 0) {
            facultyListElement.innerHTML = '<div class="no-faculty">No faculty members found matching your criteria.</div>';
            return;
        }
        
        facultyListElement.innerHTML = faculty.map(member => `
            <div class="faculty-card">
                <div class="faculty-header">
                    <div class="faculty-image">
                        <img src="${member.image}" alt="${member.name}">
                    </div>
                    <div class="faculty-info">
                        <h3>${member.name}</h3>
                        <p class="faculty-title">${member.title}</p>
                        <p class="faculty-department">${getDepartmentName(member.department)}</p>
                    </div>
                </div>
                <div class="faculty-details">
                    <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Office:</strong> ${member.office}</p>
                    <p><strong>Office Hours:</strong> ${member.officeHours}</p>
                    <p><strong>Research Areas:</strong> ${member.research}</p>
                    <p><strong>Courses:</strong> ${member.courses.join(', ')}</p>
                </div>
                <div class="faculty-bio">
                    <p>${member.bio}</p>
                </div>
                <div class="faculty-footer">
                    <a href="faculty-details.html?id=${member.id}" class="btn-secondary">View Profile</a>
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
    
    // Function to filter faculty
    function filterFaculty() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const department = departmentFilter ? departmentFilter.value : '';
        
        const filteredFaculty = mockFaculty.filter(member => {
            const matchesSearch = searchTerm === '' || 
                member.name.toLowerCase().includes(searchTerm) || 
                member.title.toLowerCase().includes(searchTerm) ||
                member.research.toLowerCase().includes(searchTerm);
                
            const matchesDepartment = department === '' || member.department === department;
            
            return matchesSearch && matchesDepartment;
        });
        
        renderFaculty(filteredFaculty);
    }
    
    // Initial render
    renderFaculty(mockFaculty);
    
    // Add event listeners for filters
    if (searchInput) {
        searchInput.addEventListener('input', filterFaculty);
    }
    
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterFaculty);
    }
    
    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = './index.html';
        });
    }
    
    // Add CSS for faculty cards
    const style = document.createElement('style');
    style.textContent = `
        .faculty-card {
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .faculty-header {
            display: flex;
            margin-bottom: 15px;
        }
        
        .faculty-image {
            width: 100px;
            height: 100px;
            margin-right: 20px;
            border-radius: 50%;
            overflow: hidden;
        }
        
        .faculty-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .faculty-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .faculty-title {
            color: #555;
            margin-bottom: 5px;
        }
        
        .faculty-department {
            color: var(--secondary-color, #5c6bc0);
            font-weight: bold;
        }
        
        .faculty-details {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .faculty-details p {
            margin-bottom: 5px;
        }
        
        .faculty-bio {
            margin-bottom: 15px;
            color: #555;
        }
        
        .faculty-footer {
            display: flex;
            justify-content: flex-end;
        }
        
        .no-faculty {
            text-align: center;
            padding: 30px;
            color: #666;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
}); 