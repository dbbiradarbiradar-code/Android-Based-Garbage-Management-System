import {
  FaCamera,
  FaMapMarkedAlt,
  FaUserShield,
  FaTruck,
  FaChartLine,
  FaStar,
} from "react-icons/fa";

const features = [
  {
    icon: <FaCamera />,
    title: "Instant Complaint",
    desc: "Capture a photo and report garbage within seconds.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "GPS Tracking",
    desc: "Automatically captures the exact garbage location.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <FaUserShield />,
    title: "Admin Monitoring",
    desc: "Admin monitors every complaint in real time.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <FaTruck />,
    title: "Collector Assignment",
    desc: "Collectors receive assigned complaints instantly.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <FaChartLine />,
    title: "Live Analytics",
    desc: "Track reports, pending work, and completion rates.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: <FaStar />,
    title: "Ratings & Feedback",
    desc: "Users can rate collectors after the work is completed.",
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-gray-900">
            Why Choose Our System?
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Smart technology for a cleaner and greener city.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2 p-8 border border-gray-100"
            >

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${feature.color}`}
              >
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-7">
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}