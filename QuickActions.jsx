import {
  FaUserPlus,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <button className="w-full bg-green-600 text-white py-3 rounded-xl mb-4 hover:bg-green-700">
        <FaUserPlus className="inline mr-2" />
        Add Collector
      </button>

      <button className="w-full bg-blue-600 text-white py-3 rounded-xl mb-4 hover:bg-blue-700">
        <FaUsers className="inline mr-2" />
        Manage Users
      </button>

      <button className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700">
        <FaChartBar className="inline mr-2" />
        Analytics
      </button>

    </div>
  );
}