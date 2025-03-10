# EduTrack - Modern Educational Management System

![EduTrack Logo](ui/images/edutrack-logo.png)

## Overview

EduTrack is a modern, user-friendly educational management system designed to streamline the academic experience for students and educators. With its intuitive interface and real-time updates, EduTrack makes it easy to manage courses, track academic progress, and stay organized throughout the academic journey.

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
- Project Lombok
- Maven

## Getting Started

### Prerequisites
- Java JDK 20 or higher
- Maven 3.6 or higher
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/edutrack.git
cd edutrack
```

2. Build the backend:
```bash
cd server
mvn clean install
```

3. Start the backend server:
```bash
mvn spring-boot:run
```

4. Open the frontend:
- Navigate to the `ui` directory
- Open `index.html` in a web browser or serve using a local server

### Development Setup

1. Backend Development:
```bash
cd server
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

2. Frontend Development:
- Use any local server (e.g., Live Server in VS Code)
- Make sure CORS is properly configured in `application.properties`

## Project Structure

```
edutrack/
├── server/                 # Backend server
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
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
- Email: support@edutrack.com
- Website: https://www.edutrack.com

---

Made with ❤️ by the EduTrack Team 