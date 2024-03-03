
//set up the map and add a function to place a marker using the geocoding data.
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}

function placeMarker(location) {
    new google.maps.Marker({
        position: location,
        map: map
    });
    map.panTo(location);
}


//AJAX call to your backend when the button is clicked.
document.getElementById('geocodeBtn').addEventListener('click', function() {
      var address = document.getElementById('addressInput').value;
      fetch(`/api/geocode?address=${encodeURIComponent(address)}`)
          .then(response => response.json())
          .then(data => {
              console.log(data); // Data from the backend
              // Now use data.lat and data.lng to place a marker on the map
          })
            // Inside the fetch call
            .then(data => {
                  placeMarker({ lat: data.lat, lng: data.lng });
            })
  
          .catch(error => console.error('Error fetching data:', error));
          
  });
  
