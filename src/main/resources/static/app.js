// src/main/resources/static/app.js
$(document).ready(function() {
    $('#geocode').click(function() {
        var address = $('#address').val();
        $.ajax({
            url: '/api/geocode?address=' + encodeURIComponent(address),
            type: 'GET',
            success: function(data) {
                // Assuming 'data' is the response with latitude and longitude
                var pos = new google.maps.LatLng(data.lat, data.lng);
                map.setCenter(pos);
                new google.maps.Marker({
                    position: pos,
                    map: map
                });
            },
            error: function(error) {
                // Handle error here
                console.error(error);
            }
        });
    });
});
// Inside app.js
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 }
    });
}

// Make sure the initMap function is called when the API script is loaded
window.initMap = initMap;

