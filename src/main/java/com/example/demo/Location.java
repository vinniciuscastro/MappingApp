package com.example.demo;

import java.util.Map;

public class Location {
    private double lat;
    private double lng;
    private String title;
    private String description;
    private String eventTime; // Consider using a proper date-time type

    public Location(double v, double v1, String mockTitle, String mockDescription, String mockEventTime) {
    }

    public double getLat() {
        return lat;
    }

    public double getLng() {
        return lng;
    }

    public Map<String, ?> getId() {
        return null;
    }

    // Constructors, getters, setters
}
