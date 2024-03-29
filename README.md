# Event Map

## Description

Event Map is a web-bpage application that combines the Google Maps API with client-side JavaScript to enable users to view, create, and manage event markers on a map. By clicking directly on the map interface, users can place new markers and input associated details such as the event's title, description, and time. All event data is currently managed and stored locally in the browser's localStorage, providing persistence across browser sessions. The application is designed with future enhancements in mind, such as server-side storage for event data and additional features that will expand user interaction and event management capabilities.

## Features

- Display a Google Map centered on the user's current location.
- Interactive UI to add event markers by clicking on the map.
- Info windows for inputting event title, description, and time.
- Local persistence of event details across browser sessions.
- Capability to delete events.
- A visually rich interface that showcases featured destinations and recent activities.

## Setup

1. Clone the repository to your local machine.
2. Obtain a Google Maps API key and insert it into the `index.html` file.
3. Open `index.html` in a browser to run the application.

## Usage

- Explore the map to see pinned events and featured locations.
- Add new event markers by clicking on the map.
- Enter details in the info window and click "Save" to store the event.
- Use the "Delete" button in the info window to remove an event.
- Access and modify existing markers by clicking on them.

## Future Enhancements (TODO)

- Transition from localStorage to server-side storage for event data.
- Secure the Google Maps API key by moving it server-side.
- Introduce user authentication for personalized experiences.
- Color code markers based on the imminence of event times.
- Customize markers with icons reflective of user interests.
- Add event filters for sorting by date, proximity, and interests.
- Develop a search feature to locate events by keywords or locations.
