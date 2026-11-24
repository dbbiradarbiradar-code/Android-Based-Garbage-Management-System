import { Link } from "react-router-dom";
import { FaArrowRight, FaRecycle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
            <FaRecycle />
            <span className="font-medium">Smart City Solution</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            A Cleaner City
            <br />
            Starts With
            <span className="text-green-600"> You</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mt-8 leading-8">
            Report garbage instantly using GPS, track complaints in real time,
            and help create a cleaner, greener, and healthier city for everyone.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl shadow-xl flex items-center gap-3 transition duration-300"
            >
              Login
              <FaArrowRight />
            </Link>

            <Link
              to="/register"
              className="border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-8 py-4 rounded-xl transition duration-300"
            >
              Create Account
            </Link>

          </div>

        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <div className="bg-white rounded-3xl shadow-2xl p-6">

            <img
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&auto=format&fit=crop"
              alt="Clean Environment"
              className="rounded-2xl height-[420px] w-full object-cover"
            />

          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-5">

            <h3 className="text-3xl font-bold text-green-600">
              100%
            </h3>

            <p className="text-gray-500">
              Smart Complaint Tracking
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
}