import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const collectorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

const pendingIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

const progressIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  iconSize: [32, 32],
});

const completedIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

export default function AdminLiveMap({
  reports,
  collectors,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 mt-8">

      <h2 className="text-2xl font-bold mb-4">
        🗺 Smart City Live Map
      </h2>

      <MapContainer
        center={[16.212, 77.343]}
        zoom={13}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "15px",
        }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Complaints */}
                    {reports.map((report) => {

                if (
                    report.lat === undefined ||
                    report.lng === undefined ||
                    report.lat === null ||
                    report.lng === null
                ) {
                    return null;
                }

                return (
                    <Marker
                    key={report.id}
                    position={[
                        Number(report.lat),
                        Number(report.lng),
                    ]}
                    icon={
                        report.status === "Completed"
                        ? completedIcon
                        : report.status === "In Progress"
                        ? progressIcon
                        : pendingIcon
                    }
                    >
                    <Popup>
                        <strong>{report.area}</strong>
                        <br />
                        Status: {report.status}
                        <br />
                        Collector: {report.collector || "Not Assigned"}
                    </Popup>
                    </Marker>
                );
                })}

        {/* Collectors */}
        {collectors.map((collector) => {
          if (
            !collector.latitude ||
            !collector.longitude
          )
            return null;

          return (
            <Marker
              key={collector.id}
              position={[
                collector.latitude,
                collector.longitude,
              ]}
              icon={collectorIcon}
            >
              <Popup>
                🚛 {collector.name}
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>

    </div>
  );
}