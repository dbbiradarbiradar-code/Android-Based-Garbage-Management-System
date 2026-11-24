import { FaLeaf } from "react-icons/fa";

export default function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-green-600 via-emerald-500 to-green-700 text-white p-8 mb-8 shadow-2xl">

      <div className="absolute -right-10 -top-10 opacity-10 text-[180px]">
        <FaLeaf />
      </div>

      <h1 className="text-4xl font-bold">
        Welcome to Smart Garbage Management
      </h1>

      <p className="mt-3 text-green-100 text-lg">
        Together we are making our city cleaner, greener and smarter.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">

        <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl">
          🌍 Smart City
        </div>

        <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl">
          ♻ Eco Friendly
        </div>

        <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl">
          🚛 Live Tracking
        </div>

      </div>

    </div>
  );
}