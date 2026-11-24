import FloatingBackground from "../components/FloatingBackground";
import { motion } from "framer-motion";
import CityIllustration from "../components/CityIllustration";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRecycle,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaUsers,
  FaTruck,
} from "react-icons/fa";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const q = query(
        collection(db, "users"),
        where("email", "==", email)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("User data not found.");
        return;
      }

      const role = querySnapshot.docs[0].data().role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "collector") {
        navigate("/collector-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-700 via-emerald-600 to-lime-500 flex items-center justify-center p-5">
      <FloatingBackground />
       <div className="w-full max-w-7xl min-h-187.5 bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
    
        {/* LEFT SIDE */}
        <motion.div
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 1,
  }}
  
  className="hidden lg:flex flex-col justify-center p-14 bg-linear-to-br from-green-800 via-green-700 to-emerald-700 text-white relative overflow-hidden"

>
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full"></div>

          <div className="absolute bottom-0 left-0 w-52 h-52 bg-white/10 rounded-full"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

          <div className="absolute bottom-16 right-16 w-40 h-40 bg-lime-300/20 rounded-full blur-3xl animate-pulse"></div>

          <div className="absolute top-1/2 right-8 w-24 h-24 bg-green-200/20 rounded-full blur-2xl animate-bounce"></div>
          <div className="relative z-10">

            <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-2xl"
              >
              <FaRecycle
                className="text-green-700"
                size={55}
              />

            </motion.div>
            

            <h1 className="text-5xl font-extrabold mt-8 leading-tight">
              Smart Garbage
            </h1>

            <h2 className="text-3xl font-semibold mt-3">
              Management System
            </h2>

            <p className="mt-8 text-green-100 text-lg leading-8">
              A Smart City Solution for Real-Time Garbage
              Monitoring, Collector Tracking and Clean City
              Management.
            </p>

            <div className="mt-12 space-y-6">

              <div className="flex items-center gap-4">

                <FaMapMarkerAlt size={22} />

                <span className="text-lg">
                  Live Complaint Tracking
                </span>

              </div>

              <div className="flex items-center gap-4">

                <FaTruck size={22} />

                <span className="text-lg">
                  Smart Collector Management
                </span>

              </div>
              

              <motion.div
                    whileHover={{
                      x: 10,
                    }}
                    className="flex items-center gap-4"
                  >

                <FaUsers size={22} />

                <span className="text-lg">
                  Real-Time Admin Dashboard
                </span>

              </motion.div>
              <CityIllustration />

            </div>

          </div>

        </motion.div>
        

        {/* RIGHT SIDE */}
        {/* RIGHT SIDE */}
<motion.div
  initial={{ opacity: 0, x: 80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
  }}
  className="flex items-center justify-center bg-white p-6 sm:p-8 lg:p-14"
>
  <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8">

    {/* Mobile Logo */}
    <div className="lg:hidden flex justify-center mb-6">
      <div className="bg-linear-to-r from-green-700 to-emerald-500 p-5 rounded-3xl shadow-lg">
        <FaRecycle className="text-white text-5xl" />
      </div>
    </div>

    {/* Heading */}
    <h1 className="text-4xl sm:text-5xl font-black text-gray-800">
      Welcome Back 👋
    </h1>

    <p className="text-green-600 font-semibold mt-2">
      Sign in to continue
    </p>

    <p className="text-gray-500 mt-4 mb-8 leading-7">
      Login to access your Smart Garbage Management Dashboard and manage your city efficiently.
    </p>

    {/* Login Form */}
    <form onSubmit={handleLogin} className="space-y-6">

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Email Address
        </label>

        <div className="relative">

          <FaEnvelope
            className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 text-lg"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition"
          />

        </div>

      </div>

      {/* Password */}
      <div>

        <label className="block text-gray-700 font-semibold mb-2">
          Password
        </label>

        <div className="relative">

          <FaLock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 text-lg"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-14 pl-12 pr-14 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

      </div>

      {/* Forgot Password */}
      <div className="flex justify-between items-center">

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            className="accent-green-600"
          />
          Remember Me
        </label>

        <button
          type="button"
          className="text-green-700 hover:text-green-900 hover:underline font-semibold"
        >
          Forgot Password?
        </button>

      </div>

      {/* Login Button */}
      <motion.button
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 15px 35px rgba(16,185,129,0.35)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2 }}
        type="submit"
        className="w-full h-14 rounded-2xl bg-linear-to-r from-green-700 via-emerald-600 to-lime-500 text-white text-lg font-bold shadow-xl"
      >
        🚀 Login
      </motion.button>

      {/* Divider */}
      <div className="flex items-center">

        <div className="flex-1 border-t border-gray-300"></div>

        <span className="px-4 text-gray-400 text-sm">
          OR
        </span>

        <div className="flex-1 border-t border-gray-300"></div>

      </div>

      {/* Register */}
      <Link
        to="/register"
        className="block w-full text-center h-14 leading-14 rounded-2xl border-2 border-green-700 text-green-700 font-bold hover:bg-green-700 hover:text-white transition"
      >
        Create New Account
      </Link>

    </form>

    {/* Footer */}
    <div className="mt-8 text-center">

      <p className="text-sm text-gray-500">
        © 2026 Smart Garbage Management System
      </p>

      <p className="text-xs text-gray-400 mt-2">
        Building a Cleaner • Greener • Smarter City
      </p>

    </div>

  </div>
</motion.div>

      
    </div>
    </div>
  );
}