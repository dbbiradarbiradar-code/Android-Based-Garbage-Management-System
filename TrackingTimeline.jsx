import {
  FaClipboardCheck,
  FaUserCheck,
  FaTruck,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

export default function TrackingTimeline({ report }) {
  const steps = [
    {
      title: "Complaint Submitted",
      done: true,
      icon: <FaClipboardCheck />,
    },
    {
      title: "Collector Assigned",
      done: report.collector,
      icon: <FaUserCheck />,
    },
    {
      title: "Collector Accepted",
      done: report.status === "In Progress" || report.status === "Completed",
      icon: <FaTruck />,
    },
    {
      title: "Journey Started",
      done: report.collectorStarted,
      icon: <FaTruck />,
    },
    {
      title: "Collector Reached",
      done: report.collectorReached,
      icon: <FaMapMarkerAlt />,
    },
    {
      title: "Garbage Cleaned",
      done: report.status === "Completed",
      icon: <FaCheckCircle />,
    },
    {
      title: "Rate Collector",
      done: false,
      icon: <FaStar />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Live Progress
      </h2>

      <div className="space-y-5">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.done
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step.icon}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">
                {step.title}
              </h3>
            </div>

            <div>
              {step.done ? "✅" : "⏳"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}