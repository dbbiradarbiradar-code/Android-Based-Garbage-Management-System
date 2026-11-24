import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import garbageData from "../data/garbageData";

function MapComponent() {
  return (
    <MapContainer
      center={[17.3315, 76.8343]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {garbageData.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
        >
          <Popup>
            <h3>{location.area}</h3>
            <p>Status: {location.status}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;