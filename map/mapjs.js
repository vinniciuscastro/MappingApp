// Initialize and add the map
let map; 

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerView({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();
// 在上面的代码中，调用 initMap() 函数时会加载 Map 和 AdvancedMarkerView 库。

// The location of Uluru
const position = { lat: -25.344, lng: 131.031 };
// Request needed libraries.
//@ts-ignore
const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

// The map, centered at Uluru
map = new Map(document.getElementById("map"), {
  zoom: 4,
  center: position,
  mapId: "DEMO_MAP_ID",
});

// The marker, positioned at Uluru
const marker = new AdvancedMarkerView({
      map: map,
      position: position,
      title: "Uluru",
    });