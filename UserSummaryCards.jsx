import {
  FaClipboardList,
  FaCheckCircle,
  FaSpinner,
  FaClock,
} from "react-icons/fa";

export default function UserSummaryCards({ reports }) {

  const total = reports.length;

  const completed = reports.filter(
    (r) => r.status === "Completed"
  ).length;

  const progress = reports.filter(
    (r) => r.status === "In Progress"
  ).length;

  const pending = reports.filter(
    (r) => r.status === "Pending" || r.status === "Assigned"
  ).length;

  const cards = [
    {
      title: "Total Complaints",
      value: total,
      icon: <FaClipboardList />,
      color: "bg-blue-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: <FaCheckCircle />,
      color: "bg-green-600",
    },
    {
      title: "In Progress",
      value: progress,
      icon: <FaSpinner />,
      color: "bg-yellow-500",
    },
    {
      title: "Pending",
      value: pending,
      icon: <FaClock />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
        >

          <div
            className={`w-14 h-14 rounded-full ${card.color} text-white flex items-center justify-center text-2xl`}
          >
            {card.icon}
          </div>

          <h2 className="text-4xl font-bold mt-5">
            {card.value}
          </h2>

          <p className="text-gray-500 mt-2">
            {card.title}
          </p>

        </div>

      ))}

    </div>
  );
}