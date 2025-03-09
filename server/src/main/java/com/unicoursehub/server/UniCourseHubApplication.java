package com.unicoursehub.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.context.ServletWebServerInitializedEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class UniCourseHubApplication {
    private static final Logger logger = LoggerFactory.getLogger(UniCourseHubApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(UniCourseHubApplication.class, args);
    }

    @EventListener
    public void onApplicationEvent(ServletWebServerInitializedEvent event) {
        logger.info("Server started on port: {}", event.getWebServer().getPort());
        logger.info("Try accessing: http://localhost:{}/api/courses", event.getWebServer().getPort());
    }
} 