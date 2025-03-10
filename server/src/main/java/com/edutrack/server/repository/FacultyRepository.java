package com.edutrack.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edutrack.server.model.Faculty;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    // Add custom query methods if needed
} 