package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for Spring Boot application
 * Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan
 */
@SpringBootApplication
public class SpringBootVueApp {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootVueApp.class, args);
    }
}