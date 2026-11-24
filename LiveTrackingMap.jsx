import RouteMap from "./RouteMap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const garbageIcon = new L.Icon({
  iconUrl:
    "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [40, 40],
});

const collectorIcon = new L.Icon({
  iconUrl:
    "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [40, 40],
});

export default function LiveTrackingMap({ report }) {
  if (
    !report ||
    !report.lat ||
    !report.lng
  ) {
    return null;
  }

  return (
    <MapContainer
      center={[report.lat, report.lng]}
      zoom={15}
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <RouteMap report={report} />

      {/* Garbage Marker */}

      <Marker
        position={[report.lat, report.lng]}
        icon={garbageIcon}
      >
        <Popup>
          Garbage Location
        </Popup>
      </Marker>

      {/* Collector Marker */}

      {report.collectorLatitude &&
        report.collectorLongitude && (
          <Marker
            position={[
              report.collectorLatitude,
              report.collectorLongitude,
            ]}
            icon={collectorIcon}
          >
            <Popup>
              Collector
            </Popup>
          </Marker>
        )}

    </MapContainer>
  );
}