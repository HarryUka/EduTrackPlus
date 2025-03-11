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

import com.edutrackplus.server.model.Department;
import com.edutrackplus.server.service.DepartmentService;

public class DepartmentControllerTest {

    @Mock
    private DepartmentService departmentService;

    @InjectMocks
    private DepartmentController departmentController;

    private WebTestClient webTestClient;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        webTestClient = WebTestClient.bindToController(departmentController).build();
    }

    @Test
    public void testGetAllDepartments() {
        // Create test data
        Department department1 = new Department();
        department1.setId(1L);
        department1.setName("Computer Science");
        department1.setCode("CS");
        department1.setDescription("Department of Computer Science");

        Department department2 = new Department();
        department2.setId(2L);
        department2.setName("Mathematics");
        department2.setCode("MATH");
        department2.setDescription("Department of Mathematics");

        List<Department> departments = Arrays.asList(department1, department2);

        // Mock service behavior
        when(departmentService.getAllDepartments()).thenReturn(departments);

        // Test the endpoint
        webTestClient.get()
                .uri("/api/departments")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(Department.class)
                .hasSize(2)
                .contains(department1, department2);
    }

    @Test
    public void testGetDepartmentById() {
        // Create test data
        Department department = new Department();
        department.setId(1L);
        department.setName("Computer Science");
        department.setCode("CS");
        department.setDescription("Department of Computer Science");

        // Mock service behavior
        when(departmentService.getDepartmentById(1L)).thenReturn(Optional.of(department));

        // Test the endpoint
        webTestClient.get()
                .uri("/api/departments/1")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .expectBody(Department.class)
                .isEqualTo(department);
    }

    @Test
    public void testGetDepartmentByIdNotFound() {
        // Mock service behavior
        when(departmentService.getDepartmentById(anyLong())).thenReturn(Optional.empty());

        // Test the endpoint
        webTestClient.get()
                .uri("/api/departments/999")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isNotFound();
    }

    @Test
    public void testCreateDepartment() {
        // Create test data
        Department department = new Department();
        department.setName("New Department");
        department.setCode("ND");
        department.setDescription("New Department Description");

        Department savedDepartment = new Department();
        savedDepartment.setId(1L);
        savedDepartment.setName("New Department");
        savedDepartment.setCode("ND");
        savedDepartment.setDescription("New Department Description");

        // Mock service behavior
        when(departmentService.createDepartment(any(Department.class))).thenReturn(savedDepartment);

        // Test the endpoint
        webTestClient.post()
                .uri("/api/departments")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(department)
                .exchange()
                .expectStatus().isCreated()
                .expectBody(Department.class)
                .isEqualTo(savedDepartment);
    }
} 