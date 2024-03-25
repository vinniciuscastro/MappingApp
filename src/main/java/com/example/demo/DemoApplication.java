package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
    // Define the CORS configuration
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Customize the following as per your requirements
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000") // or "*" for all origins
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // etc.
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
