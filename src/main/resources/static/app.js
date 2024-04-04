// src/main/resources/static/app.js
var map; // Define map globally

$(document).ready(function() {
    $('#geocode').click(function() {
        var address = $('#address').val();
        $.ajax({
            url: '/api/geocode?address=' + encodeURIComponent(address),// This should point to  Spring endpoint
            type: 'GET',// This should be 'GET' if the server expects a GET request
            success: function(data) {
                // Assuming 'data' is the response with latitude and longitude
                console.log("correct map:",map);

                console.log("data",data)
                console.log("lat",data.latitude)
                console.log("lng",data.longitude)
                var pos = {lat: data.latitude, lng:data.longitude};
                map.setCenter(pos);
                new google.maps.Marker({
                    position: pos,
                    map: map
                });
            },
            error: function(error) {
                // Handle error here
                console.log("error map:",error);

                console.log("correct pos:",pos);

                console.error(error);
            }
        });
    });
});

// Inside app.js
function initMap() {
     map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 }
    });
}

// Make sure the initMap function is called when the API script is loaded
window.initMap = initMap;


