package com.edutrackplus.server.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

import com.edutrackplus.server.model.Course;
import com.edutrackplus.server.repository.CourseRepository;

public class CourseControllerTest {

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private CourseController courseController;

    private WebTestClient webTestClient;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        webTestClient = WebTestClient.bindToController(courseController).build();
    }

    @Test
    public void testGetAllCourses() {
        // Create test data
        Course course1 = new Course();
        course1.setId(1L);
        course1.setName("Test Course 1");
        course1.setCode("TC101");
        course1.setDescription("Test Description 1");
        course1.setCredits(3);

        Course course2 = new Course();
        course2.setId(2L);
        course2.setName("Test Course 2");
        course2.setCode("TC102");
        course2.setDescription("Test Description 2");
        course2.setCredits(4);

        List<Course> courses = Arrays.asList(course1, course2);

        // Mock repository behavior
        when(courseRepository.findAll()).thenReturn(courses);

        // Test the endpoint
        webTestClient.get()
                .uri("/api/courses")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(Course.class)
                .hasSize(2)
                .contains(course1, course2);
    }

    @Test
    public void testGetCourseById() {
        // Create test data
        Course course = new Course();
        course.setId(1L);
        course.setName("Test Course");
        course.setCode("TC101");
        course.setDescription("Test Description");
        course.setCredits(3);

        // Mock repository behavior
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));

        // Test the endpoint
        webTestClient.get()
                .uri("/api/courses/1")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .expectBody(Course.class)
                .isEqualTo(course);
    }

    @Test
    public void testGetCourseByIdNotFound() {
        // Mock repository behavior
        when(courseRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Test the endpoint
        webTestClient.get()
                .uri("/api/courses/999")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isNotFound();
    }

    @Test
    public void testCreateCourse() {
        // Create test data
        Course course = new Course();
        course.setName("New Course");
        course.setCode("NC101");
        course.setDescription("New Course Description");
        course.setCredits(3);

        Course savedCourse = new Course();
        savedCourse.setId(1L);
        savedCourse.setName("New Course");
        savedCourse.setCode("NC101");
        savedCourse.setDescription("New Course Description");
        savedCourse.setCredits(3);

        // Mock repository behavior
        when(courseRepository.save(any(Course.class))).thenReturn(savedCourse);

        // Test the endpoint
        webTestClient.post()
                .uri("/api/courses")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(course)
                .exchange()
                .expectStatus().isCreated()
                .expectBody(Course.class)
                .isEqualTo(savedCourse);
    }
} 