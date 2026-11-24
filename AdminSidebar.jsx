import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaUserFriends,
  FaMapMarkedAlt,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaRecycle,
} from "react-icons/fa";

export default function AdminSidebar() {
  return (
    <aside className="w-72 min-h-screen bg-green-700 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-green-600">

        <div className="flex items-center gap-3">

          <div className="bg-white p-3 rounded-xl">
            <FaRecycle className="text-green-700 text-2xl" />
          </div>

          <div>

            <h2 className="text-xl font-bold">
              Smart Garbage
            </h2>

            <p className="text-green-100 text-sm">
              Management System
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">

        <SidebarItem icon={<FaTachometerAlt />} text="Dashboard" active />

        <SidebarItem icon={<FaClipboardList />} text="Reports" />

       <Link to="/collectors">
        <SidebarItem
          icon={<FaUserFriends />}
          text="Collectors"
        />
      </Link>

        <Link to="/users">
          <SidebarItem
            icon={<FaUsers />}
            text="Users"
          />
        </Link>
        <SidebarItem icon={<FaMapMarkedAlt />} text="Live Map" />

        <SidebarItem icon={<FaChartPie />} text="Analytics" />

        <SidebarItem icon={<FaCog />} text="Settings" />

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-600">

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-green-600 transition">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

function SidebarItem({ icon, text, active }) {
  return (
    <button
      className={`flex items-center gap-4 w-full p-3 rounded-xl mb-2 transition ${
        active
          ? "bg-white text-green-700 font-semibold"
          : "hover:bg-green-600"
      }`}
    >
      <span className="text-xl">
        {icon}
      </span>

      {text}
    </button>
  );
}