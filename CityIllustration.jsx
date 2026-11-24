import {
  FaTruck,
  FaRecycle,
  FaTree,
  FaCloud,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function CityIllustration() {
  return (
    <div className="relative w-full h-80 mt-12 overflow-hidden rounded-3xl">

      {/* Sky */}
      <div className="absolute inset-0 bg-linear-to-b from-sky-300/20 to-transparent"></div>

      {/* Sun */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="absolute top-5 right-8 w-16 h-16 rounded-full bg-yellow-300 shadow-[0_0_50px_rgba(255,221,0,0.7)]"
      />

      {/* Cloud 1 */}
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="absolute top-6 left-8"
      >
        <FaCloud
          size={45}
          className="text-white/80"
        />
      </motion.div>

      {/* Cloud 2 */}
      <motion.div
        animate={{ x: [20, -20, 20] }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
        className="absolute top-14 right-24"
      >
        <FaCloud
          size={40}
          className="text-white/70"
        />
      </motion.div>

      {/* Buildings */}

      <div className="absolute bottom-10 left-4 w-14 h-36 bg-white/25 rounded-t-xl"></div>

      <div className="absolute bottom-10 left-24 w-20 h-56 bg-white/20 rounded-t-xl"></div>

      <div className="absolute bottom-10 left-52 w-14 h-40 bg-white/30 rounded-t-xl"></div>

      <div className="absolute bottom-10 left-72 w-20 h-48 bg-white/20 rounded-t-xl"></div>

      <div className="absolute bottom-10 right-10 w-16 h-32 bg-white/25 rounded-t-xl"></div>

      {/* Trees */}

      <FaTree
        size={32}
        className="absolute bottom-10 left-44 text-green-400"
      />

      <FaTree
        size={32}
        className="absolute bottom-10 right-24 text-green-400"
      />

      {/* Road */}

      <div className="absolute bottom-0 w-full h-10 bg-gray-700">

        <div className="flex justify-center gap-5 pt-4">

          <div className="w-10 h-1 bg-white rounded-full"></div>

          <div className="w-10 h-1 bg-white rounded-full"></div>

          <div className="w-10 h-1 bg-white rounded-full"></div>

          <div className="w-10 h-1 bg-white rounded-full"></div>

        </div>

      </div>

      {/* Moving Truck */}

      <motion.div
        animate={{
          x: [-120, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
        className="absolute bottom-2"
      >
        <FaTruck
          size={42}
          className="text-green-200 drop-shadow-lg"
        />
      </motion.div>

      {/* Rotating Recycle */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear",
        }}
        className="absolute top-24 left-1/2 -translate-x-1/2"
      >
        <FaRecycle
          size={42}
          className="text-green-300"
        />
      </motion.div>

    </div>
  );
}