import {
  FaLeaf,
  FaRecycle,
  FaGlobeAsia,
} from "react-icons/fa";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-linear-to-r from-green-700 via-green-600 to-emerald-600 text-white"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            About Our Project
          </h2>

          <p className="mt-6 text-xl max-w-3xl mx-auto text-green-100">
            Smart Garbage Management System is a modern web application
            designed to help citizens report garbage easily, enable
            administrators to manage complaints efficiently, and assist
            collectors in keeping cities clean.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">

            <FaLeaf className="text-5xl mb-5 text-green-200" />

            <h3 className="text-2xl font-bold mb-3">
              Cleaner Environment
            </h3>

            <p className="text-green-100">
              Reduce waste and improve city cleanliness by encouraging
              quick reporting and efficient garbage collection.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">

            <FaRecycle className="text-5xl mb-5 text-green-200" />

            <h3 className="text-2xl font-bold mb-3">
              Smart Waste Management
            </h3>

            <p className="text-green-100">
              GPS tracking, image uploads, real-time status updates,
              and collector assignment in one platform.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">

            <FaGlobeAsia className="text-5xl mb-5 text-green-200" />

            <h3 className="text-2xl font-bold mb-3">
              Smart City Initiative
            </h3>

            <p className="text-green-100">
              Supporting digital governance by connecting citizens,
              administrators, and collectors through technology.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}