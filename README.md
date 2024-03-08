# Event Map

## Description

Event Map is a web-based application that allows users to view, save, and manage events on a map. The application uses Google Maps API to display the map and markers, and allows users to add new events by clicking on the map. Event details such as title, description, and event time can be added and saved. The application currently stores event data locally in the browser's localStorage, but future versions will include server-side storage and additional features.

## Features

- Display a Google Map centered on the user's current location.
- Allow users to click on the map to add new event markers.
- Provide an info window for each marker with input fields for event title, description, and time.
- Allow users to save event details, which persist across browser sessions.
- Enable deletion of events from the map and storage.

## Setup

1. Clone the repository to your local machine.
2. Obtain a Google Maps API key and replace the placeholder in the `index.html` file with your API key.
3. Open `index.html` in your browser to launch the application.

## Usage

- Click anywhere on the map to add a new event marker.
- Fill in the event details in the info window and click "Save" to store the event.
- Click "Delete" in the info window to remove an event.
- Click on an existing marker to view or edit its details.

## Future Enhancements (TODO)

- Implement server-side storage for event data to enable data persistence across different devices.
- Implement server-side storage for secure API key usage.
- Add user authentication to allow personalized event lists.
- Introduce color grading for markers based on how soon the events are happening.
- Customize marker icons based on the interest of the user.
- Add filtering options to display events based on date, proximity, or interests.
- Implement a search function to find events by name or location.
