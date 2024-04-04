package com.example.demo;

import ch.qos.logback.classic.Logger;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.net.URI;
import java.util.List;
@RequestMapping("/api/geocode")
@RestController
@Slf4j
public class MapController {

    @Autowired
    private GoogleMapsService googleMapsService; // This service would interact with your database and external APIs
//"/api/geocode"
    @GetMapping("")
    public ResponseEntity<?> geocodeAddress(@RequestParam String address) {
        GeocodeResult result = googleMapsService.geocodeAddress(address);
        // Log the result here

        log.info("Geocode response: {}", result.getLatitude());
        log.info(" lng: {}", result.getLongitude());

        return ResponseEntity.ok(result);
    }


    @PostMapping("/locations")
    public ResponseEntity<Location> saveLocation(@RequestBody Location location) {
        Location savedLocation = googleMapsService.saveLocation(location);
        if (savedLocation != null) {
            URI locationUri = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(savedLocation.getId())
                    .toUri();

            return ResponseEntity.created(locationUri).body(savedLocation);
        } else {
            // Handle the error appropriately
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = googleMapsService.getAllLocations();
        return ResponseEntity.ok(locations);
    }


    // Additional endpoints for updating/deleting locations, etc.
}
