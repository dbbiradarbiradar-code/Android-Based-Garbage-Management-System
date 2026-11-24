import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import axios from "axios";

export default function RouteMap({ report }) {
  const [route, setRoute] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (
      !report.collectorLatitude ||
      !report.collectorLongitude
    )
      return;

    getRoute();
  }, [report]);

  const getRoute = async () => {
    try {
      const response = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          coordinates: [
            [
              report.collectorLongitude,
              report.collectorLatitude,
            ],
            [
              report.lng,
              report.lat,
            ],
          ],
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_ORS_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const coordinates =
        response.data.features[0].geometry.coordinates.map(
          (coord) => [coord[1], coord[0]]
        );

      setRoute(coordinates);

      setSummary(
        response.data.features[0].properties.summary
      );

    } catch (error) {
      console.log(error);
    }
  };

  if (route.length === 0) return null;

  return (
    <>
      <Polyline
        positions={route}
        pathOptions={{
          color: "#2563eb",
          weight: 6,
        }}
      />

      {summary && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1000,
            background: "white",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          <h3>🚛 Collector On The Way</h3>

          <p>
            📏 Distance: {(summary.distance / 1000).toFixed(2)} km
          </p>

          <p>
            ⏱ ETA: {Math.ceil(summary.duration / 60)} min
          </p>
        </div>
      )}
    </>
  );
}