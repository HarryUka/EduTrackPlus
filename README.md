# EduTrackPlus - Modern Educational Management System

![EduTrackPlus Logo](ui/images/edutrackplus-logo.png)

## Overview

EduTrackPlus is a modern, user-friendly educational management system designed to streamline the academic experience for students and educators. With its intuitive interface and real-time updates, EduTrackPlus makes it easy to manage courses, track academic progress, and stay organized throughout the academic journey.

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Quick Start Guide](#quick-start-guide)
- [Detailed Setup Instructions](#detailed-setup-instructions)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Features

- **Secure Authentication**
  - Modern login system with animated UI
  - Secure password management
  - Session handling

- **Dashboard**
  - Personalized welcome screen
  - Quick access to important information
  - Real-time academic progress tracking
  - Current semester overview
  - Important deadlines

- **Course Management**
  - Course catalog browsing
  - Course registration
  - Schedule viewing
  - Course progress tracking
  - Grade monitoring

- **Academic Tools**
  - Weekly schedule view
  - Upcoming deadlines
  - Course materials access
  - Academic calendar
  - Quick resources section

- **Profile Management**
  - Personal information management
  - Academic history
  - Enrollment records
  - Progress tracking

## Screenshots

### Login Page
![Login Page](ui/images/edutrackplus-logo.png)
*The login page provides secure authentication with a modern, animated UI.*

### Dashboard
![Dashboard](ui/images/edutrackplus-logo.png)
*The dashboard offers a comprehensive overview of the student's academic progress and upcoming events.*

### Course Catalog
![Course Catalog](ui/images/edutrackplus-logo.png)
*The course catalog allows students to browse and register for available courses.*

### Weekly Schedule
![Weekly Schedule](ui/images/edutrackplus-logo.png)
*The weekly schedule provides a clear view of classes and academic commitments.*

### Student Profile
![Student Profile](ui/images/edutrackplus-logo.png)
*The profile page allows students to manage their personal information and view their academic history.*

## Technology Stack

### Frontend
- HTML5
- CSS3 (with modern animations and transitions)
- JavaScript (ES6+)
- Responsive Design
- Modern UI/UX principles

### Backend
- Java 20
- Spring Boot 3.2.3
- Spring WebFlux
- Spring Data JPA
- H2 Database (development)
- PostgreSQL (production)
- Project Lombok
- Maven

## Quick Start Guide

This section provides a streamlined approach to running the application.

### Prerequisites
- Git
- Python 3 (for running the frontend server)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Step 1: Clone the Repository
```bash
git clone https://github.com/[your-username]/UniCourseHub.git
cd UniCourseHub
```

### Step 2: Run the Frontend
The frontend includes mock data and can run independently without the backend:

```bash
cd ui
python3 -m http.server 8080
```

If Python 3 is not available, you can use any static file server:
- With Node.js: `npx http-server -p 8080`
- With PHP: `php -S localhost:8080`

### Step 3: Access the Application
Open your browser and navigate to:
```
http://localhost:8080
```

### Step 4: Login Credentials
- Email: Any valid email format (e.g., `test@example.com`)
- Password: Must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number (e.g., `Password123`)

### Key Features to Explore
1. **Login Form Validation**: Real-time validation for email format and password strength
2. **Dashboard**: Interactive elements and data visualization
3. **Course Catalog**: Filtering and search functionality
4. **Faculty & Student Directories**: Browsing and filtering capabilities
5. **Profile Management**: Form submission and data persistence
6. **Responsive Design**: Test on different screen sizes

### Optional: Running the Backend

> Note: The frontend can run independently with mock data if you don't want to set up the backend.

If you have Java 20+ and Maven installed:

```bash
cd server
mvn clean install -DskipTests
java -jar target/server-0.0.1-SNAPSHOT.jar
```

The backend will start on port 3000 and provide API endpoints at `http://localhost:3000/api/`.

## Detailed Setup Instructions

### Prerequisites
- Java JDK 20 or higher
- Maven 3.6 or higher
- Python 3 or another static file server
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- PostgreSQL (for production deployment only)

### Frontend Setup

1. Navigate to the UI directory:
```bash
cd ui
```

2. Start a simple HTTP server:
```bash
python3 -m http.server 8080
```

3. Alternative methods to serve the frontend:
```bash
# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080

# Using Ruby
ruby -run -ehttpd . -p8080
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Build the project:
```bash
mvn clean install -DskipTests
```

> Note: We skip tests due to compatibility issues between Mockito and Java 23.

3. Run the server:
```bash
java -jar target/server-0.0.1-SNAPSHOT.jar
```

4. Verify the server is running:
```bash
curl http://localhost:3000/api/courses
```

### Troubleshooting

#### Frontend Issues
- If you see 404 errors for JavaScript files, ensure you're in the correct directory when starting the server
- If CSS styles are not loading, check browser console for path errors
- For login issues, ensure your password meets all requirements

#### Backend Issues
- If you encounter Maven build errors, try `mvn clean install -DskipTests`
- If the JAR file is not found, check the target directory to ensure the build was successful
- If port 3000 is already in use, modify the `server.port` in `application.properties`
- If you see "No plugin found for prefix 'spring-boot'" error, make sure you're in the server directory and use `mvn clean install -DskipTests` instead

## API Documentation

### Authentication
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Logout user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses` - Create a new course
- `PUT /api/courses/{id}` - Update a course
- `DELETE /api/courses/{id}` - Delete a course

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create a new student
- `PUT /api/students/{id}` - Update a student
- `DELETE /api/students/{id}` - Delete a student

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/{id}` - Get department by ID
- `POST /api/departments` - Create a new department
- `PUT /api/departments/{id}` - Update a department
- `DELETE /api/departments/{id}` - Delete a department

### Faculty
- `GET /api/faculty` - Get all faculty members
- `GET /api/faculty/{id}` - Get faculty member by ID
- `POST /api/faculty` - Create a new faculty member
- `PUT /api/faculty/{id}` - Update a faculty member
- `DELETE /api/faculty/{id}` - Delete a faculty member

## Project Structure

```
edutrackplus/
├── server/                 # Backend server
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── edutrackplus/
│   │   │   │           └── server/
│   │   │   │               ├── config/
│   │   │   │               ├── controller/
│   │   │   │               ├── model/
│   │   │   │               ├── repository/
│   │   │   │               ├── service/
│   │   │   │               └── EduTrackPlusApplication.java
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── ui/                    # Frontend
│   ├── css/
│   ├── js/
│   ├── images/
│   └── *.html
└── README.md
```

## Configuration

### Backend Configuration
- Application properties: `server/src/main/resources/application.properties`
- Logging configuration: `server/src/main/resources/logback.xml`

### Frontend Configuration
- API endpoints: `ui/js/config.js`
- Styling variables: `ui/css/styles.css`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Modern UI/UX inspiration from leading educational platforms
- Spring Boot framework and its community
- All contributors and testers

## Contact

For support or queries, please contact:
- Email: ukaegbuharrisonmary@gmail.com

---

Made by Harrison Ukaegbu 