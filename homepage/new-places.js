let map;
let marker;
let geocoder;
let responseDiv;
let response;

// Load saved locations from localStorage or initialize an empty array if none exist
let savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];

/**
 * Initializes the Google Maps map and adds functionality for geolocation,
 * geocoding, and handling saved locations.
 */
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
  });

  // Try to get the user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // Center the map on the user's location
        map.setCenter(userLocation);
      },
      () => {
        console.error("Error: The Geolocation service failed.");
      }
    );
  } else {
    console.error("Error: Your browser doesn't support geolocation.");
  }

  geocoder = new google.maps.Geocoder();

  // Add UI elements like inputText, submitButton, clearButton, instructionsElement, responseDiv
  const inputText = document.createElement("input");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Search";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");
  response = document.createElement("pre");
  response.id = "response";
  response.innerText = "";
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);

  const instructionsElement = document.createElement("p");

  // instructionsElement.id = "instructions";
  // instructionsElement.innerHTML =
  //   "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  marker = new google.maps.Marker({
    map,
  });

  // Add markers for previously saved locations and add click listeners to them
  savedLocations.forEach((location) => {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
    attachInfoWindow(marker, location);
  });

  /**
   * Adds a click listener to the map that handles the creation of new markers
   * and info windows, and the removal of unsaved markers when clicking on different
   * parts of the map.
   */
  map.addListener("click", (e) => {
    if (currentInfowindow) {
      currentInfowindow.close();
    }
    if (
      currentMarker &&
      !savedLocations.some(
        (loc) =>
          loc.lat === currentMarker.getPosition().lat() &&
          loc.lng === currentMarker.getPosition().lng()
      )
    ) {
      currentMarker.setMap(null); // Remove unsaved marker
      currentMarker = null;
    }

    const clickedLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    const marker = new google.maps.Marker({
      position: clickedLocation,
      map: map,
    });

    // Pass true to indicate this is a new location
    const infoWindow = attachInfoWindow(marker, clickedLocation, true);
    // Open the info window immediately for new locations
    infoWindow.open(map, marker);
    currentInfowindow = infoWindow;
    currentMarker = marker;
  });

  // Event listeners for submit and clear buttons
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );

  clearButton.addEventListener("click", () => {
    clear();
  });

  clear();
}

let currentInfowindow = null; // Variable to keep track of the current open info window
let currentMarker = null; // Variable to keep track of the current marker

/**
 * Attaches an info window to a marker with input fields for title, description,
 * and event time, along with Save and Delete buttons.
 * @param marker - The marker to attach the info window to.
 * @param location - The location data associated with the marker.
 * @param isNew - Indicates whether the location is new or existing.
 * @returns The created info window.
 */
function attachInfoWindow(marker, location, isNew = false) {
  // Create and populate the content for the info window
  const contentDiv = document.createElement("div");
  contentDiv.id = "content";

  const heading = document.createElement("h1");
  heading.id = "firstHeading";
  heading.className = "firstHeading";
  heading.textContent = "Location Details";
  contentDiv.appendChild(heading);

  const bodyContent = document.createElement("div");
  bodyContent.id = "bodyContent";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.value = location.title || "";
  bodyContent.appendChild(document.createTextNode("Title: "));
  bodyContent.appendChild(titleInput);

  bodyContent.appendChild(document.createElement("br"));

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.id = "description";
  descriptionInput.value = location.description || "";
  bodyContent.appendChild(document.createTextNode("Description: "));
  bodyContent.appendChild(descriptionInput);

  bodyContent.appendChild(document.createElement("br"));

  const eventTimeInput = document.createElement("input");
  eventTimeInput.type = "datetime-local";
  eventTimeInput.id = "eventTime";
  eventTimeInput.value = location.eventTime || "";
  bodyContent.appendChild(document.createTextNode("Event Time: "));
  bodyContent.appendChild(eventTimeInput);

  bodyContent.appendChild(document.createElement("br"));

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", () => {
    saveLocation(
      location.lat,
      location.lng,
      isNew,
      titleInput.value,
      descriptionInput.value,
      eventTimeInput.value
    );
  });
  bodyContent.appendChild(saveButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteLocation(location.lat, location.lng, marker);
  });
  bodyContent.appendChild(deleteButton);

  contentDiv.appendChild(bodyContent);

  const infoWindow = new google.maps.InfoWindow({
    content: contentDiv,
  });

  /**
   * Adds a click listener to the marker that opens the associated info window
   * and sets it as the current info window. It also sets the marker as the current
   * marker if it is a new (unsaved) marker.
   */
  marker.addListener("click", () => {
    if (currentInfowindow) {
      currentInfowindow.close();
    }
    if (currentMarker && currentMarker !== marker) {
      currentMarker.setMap(null);
    }
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
    currentInfowindow = infoWindow;
    currentMarker = isNew ? marker : null;
  });

  /**
   * Adds a closeclick listener to the info window that removes the associated
   * marker if it is a new (unsaved) marker. It also resets the current info window
   * and current marker if the closed info window was the current one.
   */
  infoWindow.addListener("closeclick", () => {
    // Remove the marker only if it's a new (unsaved) one
    if (isNew && marker) {
      marker.setMap(null);
    }
    // Reset currentInfowindow and currentMarker if the closed infowindow was the current one
    if (infoWindow === currentInfowindow) {
      currentInfowindow = null;
      currentMarker = null;
    }
  });

  return infoWindow; // Return the info window for immediate opening
}

/**
 * Saves a location with its details to an array and localStorage, updating
 * existing location if needed. Closes the info window after saving.
 * @param lat - Latitude of the location to be saved.
 * @param lng - Longitude of the location to be saved.
 * @param isNew - Indicates whether the location is new or existing.
 * @param title - Title of the location.
 * @param description - Description of the location.
 * @param eventTime - Event time associated with the location.
 */
function saveLocation(lat, lng, isNew, title, description, eventTime) {
  const location = { lat, lng, title, description, eventTime };

  if (isNew) {
    savedLocations.push(location);
  } else {
    const index = savedLocations.findIndex(
      (loc) => loc.lat === lat && loc.lng === lng
    );
    if (index !== -1) {
      savedLocations[index] = location;
    }
  }

  // Save the location to the savedLocations array and localStorage
  localStorage.setItem("savedLocations", JSON.stringify(savedLocations));

  if (currentInfowindow) {
    currentInfowindow.close(); // Close the info window after saving
  }
  currentMarker = null; // Reset the current marker as it's now saved
}

/**
 * Deletes a location from the saved locations array and localStorage, and
 * removes its marker from the map.
 * @param lat - Latitude of the location to be deleted.
 * @param lng - Longitude of the location to be deleted.
 * @param marker - The marker associated with the location to be deleted.
 */
function deleteLocation(lat, lng, marker) {
  const index = savedLocations.findIndex(
    (loc) => loc.lat === lat && loc.lng === lng
  );
  // Delete the location from the savedLocations array and localStorage
  if (index !== -1) {
    savedLocations.splice(index, 1);
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }

  // Remove the marker from the map
  if (marker) {
    marker.setMap(null);
  }
}

/**
 * Clears the marker from the map and hides the response container.
 */
function clear() {
  // Clear the marker and hide the response div
  marker.setMap(null);
  responseDiv.style.display = "none";
}

/**
 * Performs geocoding for a given address or location, centers the map on the
 * result, and displays it in the response container.
 * @param request - The geocoding request object containing the address or
 * location to be geocoded.
 */
function geocode(request) {
  // Geocode the request and update the map with the result
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      responseDiv.style.display = "block";
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}

window.initMap = initMap; // Make the initMap function available globally
