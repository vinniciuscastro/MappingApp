package com.example.demo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LocationService {

    private List<Location> locations = new ArrayList<>();

    public Location saveLocation(Location location) {
        locations.add(location);
        return location;
    }

    public List<Location> getAllLocations() {
        return locations;
    }

    public Location geocodeAddress(String address) {
        // Implement call to Google Maps Geocoding API here
        // For simplicity, returning a mock location
        return new Location(40.714224, -73.961452, "Mock Title", "Mock Description", "Mock Event Time");
    }
}
