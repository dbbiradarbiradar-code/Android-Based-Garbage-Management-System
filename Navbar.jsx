import { Link } from "react-router-dom";
import { FaRecycle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-lg shadow-md z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="bg-green-600 p-3 rounded-xl text-white">
            <FaRecycle size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-green-700">
              Smart Garbage
            </h1>

            <p className="text-xs text-gray-500">
              Management System
            </p>
          </div>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <a href="#home" className="hover:text-green-600">
            Home
          </a>

          <a href="#features" className="hover:text-green-600">
            Features
          </a>

          <a href="#stats" className="hover:text-green-600">
            Statistics
          </a>

          <a href="#workflow" className="hover:text-green-600">
            Workflow
          </a>

          <a href="#about" className="hover:text-green-600">
            About
          </a>

        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-6 py-2 rounded-xl border border-green-600 text-green-700 hover:bg-green-50 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
          >
            Create Account
          </Link>

        </div>

      </div>

    </nav>
  );
}