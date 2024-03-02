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
        }

        // Getters and Setters
    }
}
