package com.edutrackplus.server.config;

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
            // Create Department
            Department csDepartment = departmentRepository.findAll().stream()
                .filter(d -> "CS".equals(d.getCode()))
                .findFirst()
                .orElseGet(() -> {
                    Department newDepartment = new Department();
                    newDepartment.setName("Computer Science");
                    newDepartment.setCode("CS");
                    newDepartment.setDescription("Department of Computer Science");
                    return departmentRepository.save(newDepartment);
                });

            // Create Faculty
            Faculty professor = facultyRepository.findAll().stream()
                .filter(f -> "F001".equals(f.getFacultyId()))
                .findFirst()
                .orElseGet(() -> {
                    Faculty newFaculty = new Faculty();
                    newFaculty.setFirstName("John");
                    newFaculty.setLastName("Doe");
                    newFaculty.setEmail("john.doe@university.edu");
                    newFaculty.setFacultyId("F001");
                    newFaculty.setTitle("Professor");
                    newFaculty.setDepartment(csDepartment);
                    return facultyRepository.save(newFaculty);
                });

            // Create Course
            Course course = courseRepository.findAll().stream()
                .filter(c -> "CS101".equals(c.getCode()))
                .findFirst()
                .orElseGet(() -> {
                    Course newCourse = new Course();
                    newCourse.setName("Introduction to Programming");
                    newCourse.setCode("CS101");
                    newCourse.setDescription("An introductory course to programming concepts");
                    newCourse.setCredits(3);
                    newCourse.setFaculty(professor);
                    return courseRepository.save(newCourse);
                });

            // Create Student
            Student student = studentRepository.findAll().stream()
                .filter(s -> "S001".equals(s.getStudentId()))
                .findFirst()
                .orElseGet(() -> {
                    Student newStudent = new Student();
                    newStudent.setFirstName("Jane");
                    newStudent.setLastName("Smith");
                    newStudent.setEmail("jane.smith@university.edu");
                    newStudent.setStudentId("S001");
                    newStudent.setMajor("Computer Science");
                    newStudent.setYearLevel(1);
                    newStudent.getEnrolledCourses().add(course);
                    return studentRepository.save(newStudent);
                });
        };
    }
} 