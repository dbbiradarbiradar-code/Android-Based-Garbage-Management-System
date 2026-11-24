export default function ReportModal({
  report,
  onClose,
}) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
<div className="bg-white p-6 rounded-lg" style={{ width: "500px" }}>

        <h2 className="text-2xl font-bold mb-4">
          Report Details
        </h2>

        <img
          src={report.image}
          alt=""
          className="w-full h-52 object-cover rounded"
        />

        <p className="mt-4">
          <strong>Area:</strong> {report.area}
        </p>

        <p>
          <strong>Status:</strong> {report.status}
        </p>

        <p>
          <strong>Latitude:</strong> {report.lat}
        </p>

        <p>
          <strong>Longitude:</strong> {report.lng}
        </p>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>
  );
}