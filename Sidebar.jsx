import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaTrash,
  FaMapMarkedAlt,
  FaUsers,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-3 rounded-lg shadow-lg"
      >
        <FaBars size={20} />
      </button>

      {/* Dark Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-green-900 text-white
          shadow-2xl
          z-50
          transform transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          lg:static lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="px-6">
          <h1 className="text-2xl font-bold mb-8">
            ♻ Smart Garbage
          </h1>

          {/* Menu */}
          <ul className="space-y-3">

            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 cursor-pointer transition">
              <FaHome />
              Dashboard
            </li>

            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 cursor-pointer transition">
              <FaTrash />
              Reports
            </li>

            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 cursor-pointer transition">
              <FaMapMarkedAlt />
              Live Map
            </li>

            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 cursor-pointer transition">
              <FaUsers />
              Collectors
            </li>

          </ul>
        </div>

        {/* Footer */}
        <div className="absolute bottom-5 left-0 w-full text-center text-sm text-green-200">
          Smart Garbage System
          <br />
          Version 1.0
        </div>
      </div>
    </>
  );
}