import {
  FaCamera,
  FaClipboardCheck,
  FaTruck,
  FaBroom,
  FaSmile,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaCamera />,
    title: "Report",
    desc: "User captures a garbage photo and submits the complaint.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Admin Review",
    desc: "Admin reviews the complaint and assigns a collector.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <FaTruck />,
    title: "Collector",
    desc: "Collector accepts the task and navigates to the location.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <FaBroom />,
    title: "Cleaning",
    desc: "Garbage is cleaned and a completion photo is uploaded.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <FaSmile />,
    title: "Feedback",
    desc: "User verifies the work and submits a rating and feedback.",
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function Workflow() {
  return (
    <section
      id="workflow"
      className="py-24 bg-lineaar-to-br from-green-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-gray-900">
            How It Works
          </h2>

          <p className="text-lg text-gray-500 mt-5">
            A simple and efficient workflow from complaint to completion.
          </p>

        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">

          {steps.map((step, index) => (

            <div
              key={index}
              className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2 p-8 text-center"
            >

              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl ${step.color}`}
              >
                {step.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {step.title}
              </h3>

              <p className="mt-4 text-gray-500 leading-7">
                {step.desc}
              </p>

              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 -right-8 text-green-500 text-3xl">
                  →
                </div>
              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}