package com.edutrack.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edutrack.server.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Add custom query methods if needed
} 