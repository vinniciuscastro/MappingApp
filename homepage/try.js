// Initialize the map and set its view to our chosen geographical coordinates and a zoom level
var myMap = L.map('map').setView([40.73, -74.00], 12);

// Add a tile layer to add to our map, here we're using the OpenStreetMap tile server
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(myMap);

// Add a marker with a popup
var marker = L.marker([40.73, -74.00]).addTo(myMap);
marker.bindPopup("<b>New York City</b><br>This is a marker with a popup.").openPopup();

// Add a circle about 500m radius
var circle = L.circle([40.73, -74.00], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(myMap);
circle.bindPopup("I am a circle.");

// // Add a polygon with 3 end points (a triangle)
// var polygon = L.polygon([
//     [40.73, -74.00],
//     [40.71, -74.05],
//     [40.74, -74.07]
// ], {
//     color: 'blue',
//     fillColor: '#f03',
//     fillOpacity: 0.5
// }).addTo(myMap);
// polygon.bindPopup("I am a polygon.");

// Event handling for click on map
myMap.on('click', function(e) {
    alert("You clicked the map at " + e.latlng.toString());
});

// Set the view to a given center and zoom
myMap.setView(new L.LatLng(40.73, -74.00), 12);