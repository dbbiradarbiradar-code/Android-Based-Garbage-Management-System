export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* About */}
        <div>

          <h2 className="text-2xl font-bold text-green-400">
            Smart Garbage
          </h2>

          <p className="mt-4 text-gray-300">
            A smart solution for reporting garbage,
            assigning collectors and keeping our
            cities clean using modern technology.
          </p>

        </div>

        {/* Quick Links */}
        <div>

          <h3 className="text-xl font-bold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-300">

            <li>Home</li>
            <li>Features</li>
            <li>Statistics</li>
            <li>Contact</li>

          </ul>

        </div>

        {/* Features */}
        <div>

          <h3 className="text-xl font-bold mb-4">
            Features
          </h3>

          <ul className="space-y-2 text-gray-300">

            <li>📸 Report Garbage</li>
            <li>📍 GPS Tracking</li>
            <li>👷 Collector Assignment</li>
            <li>📊 Live Status</li>

          </ul>

        </div>

        {/* Contact */}
        <div>

          <h3 className="text-xl font-bold mb-4">
            Contact
          </h3>

          <p className="text-gray-300">
            📧 support@smartgarbage.com
          </p>

          <p className="text-gray-300 mt-2">
            📍 Karnataka, India
          </p>

          <p className="text-gray-300 mt-2">
            📞 +91 XXXXX XXXXX
          </p>

        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">

        © 2026 Smart Garbage Management System

        <br />

        Developed by <span className="text-green-400 font-semibold">Dnyanesh</span>

      </div>

    </footer>
  );
}