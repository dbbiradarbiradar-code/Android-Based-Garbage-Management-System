import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color,
  bg,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${bg} rounded-2xl shadow-lg p-6`}
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-600 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${color}`}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}