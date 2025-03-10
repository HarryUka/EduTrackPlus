package com.edutrack.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edutrack.server.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // Additional custom query methods can be added here if needed
} 