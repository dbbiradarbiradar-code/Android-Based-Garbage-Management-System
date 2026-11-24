import {
  FaClipboardList,
  FaUsers,
  FaTruck,
  FaClock,
} from "react-icons/fa";

export default function AdminStats({
  reports,
  users,
  collectors,
}) {
  const cards = [
    {
      title: "Reports",
      value: reports.length,
      icon: <FaClipboardList />,
      color: "bg-blue-600",
    },
    {
      title: "Users",
      value: users.length,
      icon: <FaUsers />,
      color: "bg-green-600",
    },
    {
      title: "Collectors",
      value: collectors.length,
      icon: <FaTruck />,
      color: "bg-purple-600",
    },
    {
      title: "Pending",
      value: reports.filter(
        (r) =>
          r.status === "Pending" ||
          r.status === "Assigned"
      ).length,
      icon: <FaClock />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6"
        >
          <div
            className={`w-14 h-14 rounded-full ${card.color} flex items-center justify-center text-white text-2xl`}
          >
            {card.icon}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mt-4">
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