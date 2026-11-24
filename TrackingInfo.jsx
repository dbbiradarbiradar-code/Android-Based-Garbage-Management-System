export default function TrackingInfo({ report }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-5">

      <h2 className="text-2xl font-bold text-green-700 mb-4">
        🚛 Live Tracking
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span className="font-semibold">Collector</span>
          <span>{report.collector}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Status</span>
          <span>{report.status}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Current Location</span>
          <span>Live GPS Enabled</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Last Updated</span>
          <span>Just Now</span>
        </div>

      </div>

    </div>
  );
}