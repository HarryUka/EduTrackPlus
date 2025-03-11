package com.edutrackplus.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edutrackplus.server.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // Additional custom query methods can be added here if needed
} 