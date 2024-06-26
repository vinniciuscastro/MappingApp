package com.example.demo;

import java.util.List;

public class GeocodeResponse {
    private List<Result> results;

    // Getters and Setters

    public static class Result {
        private Geometry geometry;

        // Getters and Setters
    }

    public static class Geometry {
        private Location location;

        // Getters and Setters
    }

    public static class Location {
        private double lat;
        private double lng;

        public Location(double lat, double lng) {
            this.lat=lat;
            this.lng=lng;
        }

        public double getLatitude() {
            return lat;
        }
        public double getLongitude() {
            return lng;
        }

        // Getters and Setters
    }
}
