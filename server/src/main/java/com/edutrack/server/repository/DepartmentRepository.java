package com.edutrack.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edutrack.server.model.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // Add custom query methods if needed
} 