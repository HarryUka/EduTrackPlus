package com.edutrackplus.server.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import com.edutrackplus.server.model.Course;
import com.edutrackplus.server.model.Department;
import com.edutrackplus.server.model.Faculty;
import com.edutrackplus.server.model.Student;
import com.edutrackplus.server.repository.CourseRepository;
import com.edutrackplus.server.repository.DepartmentRepository;
import com.edutrackplus.server.repository.FacultyRepository;
import com.edutrackplus.server.repository.StudentRepository;

@Configuration
public class TestDataInitializer {

    @Bean
    @Transactional
    CommandLineRunner initDatabase(
            DepartmentRepository departmentRepository,
            FacultyRepository facultyRepository,
            CourseRepository courseRepository,
            StudentRepository studentRepository) {
        return args -> {
            // Create Departments
            Department csDepartment = createDepartmentIfNotExists(departmentRepository, "CS", "Computer Science", "Department of Computer Science");
            Department mathDepartment = createDepartmentIfNotExists(departmentRepository, "MATH", "Mathematics", "Department of Mathematics");
            Department engDepartment = createDepartmentIfNotExists(departmentRepository, "ENG", "Engineering", "Department of Engineering");
            Department bioDepartment = createDepartmentIfNotExists(departmentRepository, "BIO", "Biology", "Department of Biology");

            // Create Faculty Members
            Faculty profJohn = createFacultyIfNotExists(facultyRepository, "F001", "John", "Doe", "john.doe@university.edu", "Professor", csDepartment);
            Faculty profJane = createFacultyIfNotExists(facultyRepository, "F002", "Jane", "Wilson", "jane.wilson@university.edu", "Associate Professor", mathDepartment);
            Faculty profRobert = createFacultyIfNotExists(facultyRepository, "F003", "Robert", "Johnson", "robert.johnson@university.edu", "Assistant Professor", engDepartment);
            Faculty profEmily = createFacultyIfNotExists(facultyRepository, "F004", "Emily", "Brown", "emily.brown@university.edu", "Professor", bioDepartment);
            Faculty profMichael = createFacultyIfNotExists(facultyRepository, "F005", "Michael", "Davis", "michael.davis@university.edu", "Lecturer", csDepartment);

            // Create Courses
            Course cs101 = createCourseIfNotExists(courseRepository, "CS101", "Introduction to Programming", "An introductory course to programming concepts", 3, profJohn);
            Course cs201 = createCourseIfNotExists(courseRepository, "CS201", "Data Structures", "Study of data structures and algorithms", 4, profJohn);
            Course cs301 = createCourseIfNotExists(courseRepository, "CS301", "Database Systems", "Introduction to database design and SQL", 3, profMichael);
            Course math101 = createCourseIfNotExists(courseRepository, "MATH101", "Calculus I", "Introduction to differential calculus", 4, profJane);
            Course math201 = createCourseIfNotExists(courseRepository, "MATH201", "Linear Algebra", "Study of vector spaces and linear mappings", 3, profJane);
            Course eng101 = createCourseIfNotExists(courseRepository, "ENG101", "Engineering Principles", "Fundamental principles of engineering", 3, profRobert);
            Course bio101 = createCourseIfNotExists(courseRepository, "BIO101", "Introduction to Biology", "Basic concepts in biology", 4, profEmily);

            // Create Students
            Student student1 = createStudentIfNotExists(studentRepository, "S001", "Jane", "Smith", "jane.smith@university.edu", "Computer Science", 1, Arrays.asList(cs101, math101));
            Student student2 = createStudentIfNotExists(studentRepository, "S002", "John", "Williams", "john.williams@university.edu", "Mathematics", 2, Arrays.asList(math101, math201));
            Student student3 = createStudentIfNotExists(studentRepository, "S003", "Sarah", "Johnson", "sarah.johnson@university.edu", "Computer Science", 3, Arrays.asList(cs201, cs301, math201));
            Student student4 = createStudentIfNotExists(studentRepository, "S004", "Michael", "Brown", "michael.brown@university.edu", "Engineering", 2, Arrays.asList(eng101, math101));
            Student student5 = createStudentIfNotExists(studentRepository, "S005", "Emily", "Davis", "emily.davis@university.edu", "Biology", 1, Arrays.asList(bio101, math101));
            Student student6 = createStudentIfNotExists(studentRepository, "S006", "David", "Miller", "david.miller@university.edu", "Computer Science", 4, Arrays.asList(cs301, math201));
        };
    }

    private Department createDepartmentIfNotExists(DepartmentRepository repository, String code, String name, String description) {
        return repository.findAll().stream()
            .filter(d -> code.equals(d.getCode()))
            .findFirst()
            .orElseGet(() -> {
                Department newDepartment = new Department();
                newDepartment.setName(name);
                newDepartment.setCode(code);
                newDepartment.setDescription(description);
                return repository.save(newDepartment);
            });
    }

    private Faculty createFacultyIfNotExists(FacultyRepository repository, String facultyId, String firstName, String lastName, String email, String title, Department department) {
        return repository.findAll().stream()
            .filter(f -> facultyId.equals(f.getFacultyId()))
            .findFirst()
            .orElseGet(() -> {
                Faculty newFaculty = new Faculty();
                newFaculty.setFirstName(firstName);
                newFaculty.setLastName(lastName);
                newFaculty.setEmail(email);
                newFaculty.setFacultyId(facultyId);
                newFaculty.setTitle(title);
                newFaculty.setDepartment(department);
                return repository.save(newFaculty);
            });
    }

    private Course createCourseIfNotExists(CourseRepository repository, String code, String name, String description, int credits, Faculty faculty) {
        return repository.findAll().stream()
            .filter(c -> code.equals(c.getCode()))
            .findFirst()
            .orElseGet(() -> {
                Course newCourse = new Course();
                newCourse.setName(name);
                newCourse.setCode(code);
                newCourse.setDescription(description);
                newCourse.setCredits(credits);
                newCourse.setFaculty(faculty);
                return repository.save(newCourse);
            });
    }

    private Student createStudentIfNotExists(StudentRepository repository, String studentId, String firstName, String lastName, String email, String major, int yearLevel, List<Course> courses) {
        return repository.findAll().stream()
            .filter(s -> studentId.equals(s.getStudentId()))
            .findFirst()
            .orElseGet(() -> {
                Student newStudent = new Student();
                newStudent.setFirstName(firstName);
                newStudent.setLastName(lastName);
                newStudent.setEmail(email);
                newStudent.setStudentId(studentId);
                newStudent.setMajor(major);
                newStudent.setYearLevel(yearLevel);
                newStudent.getEnrolledCourses().addAll(courses);
                return repository.save(newStudent);
            });
    }
} 