package com.example.demo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;


//This service method makes a request to the Google Geocoding API and returns the response.
// You would need to parse this response to extract the coordinates.
public class GoogleMapsService {

//    @Value("${google.maps.apiKey}")
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

            return new GeocodeResponse.Location(lat, lng); // You need to create a Location class or use the inner class from GeocodeResponse
        } else {
            throw new RuntimeException("Geocoding failed with status: " + root.path("status").asText());
        }
    }
}

