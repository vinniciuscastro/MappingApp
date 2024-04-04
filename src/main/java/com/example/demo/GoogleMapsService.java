package com.example.demo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;


//This service method makes a request to the Google Geocoding API and returns the response.
//  would need to parse this response to extract the coordinates.
@Service
public class GoogleMapsService {

    @Value("${google.maps.apiKey}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private Object hy;

    public GoogleMapsService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }


    public GeocodeResponse.Location getCoordinatesForAddress(String address) throws JsonProcessingException {
        String baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
        String fullUrl = baseUrl + "?address=" + URLEncoder.encode(address, StandardCharsets.UTF_8) + "&key=" + apiKey;

        ResponseEntity<String> response = restTemplate.getForEntity(fullUrl, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.getBody());

        if (root.path("status").asText().equals("OK")) {
            JsonNode locationNode = root.path("results").get(0).path("geometry").path("location");
            double lat = locationNode.path("lat").asDouble();
            double lng = locationNode.path("lng").asDouble();
            System.out.println("lat" + lat);
            System.out.println("lng" + lng);

            return new GeocodeResponse.Location(lat, lng); // You need to create a Location class or use the inner class from GeocodeResponse
        } else {
            throw new RuntimeException("Geocoding failed with status: " + root.path("status").asText());
        }
    }

    public List<Location> getAllLocations() {
        return null;
    }
    // Implement the logic to retrieve all locations from the database or wherever they are stored
    // For example, if you're using a database, you would use your repository to find all locations.
    // return locationRepository.findAll();
    public GeocodeResult geocodeAddress(String address) {
        try {
            GeocodeResponse.Location location = getCoordinatesForAddress(address);
            //  implement the GeocodeResult class to accept a Location object.
            // Assuming it's done?create a new GeocodeResult object and return it.
            return new GeocodeResult(location);
        } catch (JsonProcessingException e) {
            // Log the exception and possibly throw a custom exception to be handled in your controller
            throw new RuntimeException("Error processing JSON", e);
        }
    }

    public Location saveLocation(Location location) {
        return location;
    }
    // Implement the logic to save the location to the database or wherever you wish to store it.
    // For example, if you're using a database, you would use your repository to save the location.
    // Location savedLocation = locationRepository.save(location);
    // return savedLocation;
}


