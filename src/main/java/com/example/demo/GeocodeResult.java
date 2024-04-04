package com.example.demo;
import lombok.Data;
import lombok.Getter;

import java.util.List;
@Data
public class GeocodeResult {
    // Getters for latitude and longitude

    private  double latitude;
    private  double longitude;

    public GeocodeResult(GeocodeResponse.Location location) {
        this.latitude = location.getLatitude();
        this.longitude = location.getLongitude();
    }


    // Optionally, if you need to send back to the client as JSON, you might want to have a toString or toJson method??
    // or you can rely on a framework like Jackson to automatically serialize this object into JSON??
}
