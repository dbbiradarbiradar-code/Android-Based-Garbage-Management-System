import { motion } from "framer-motion";

const circles = [
  { size: 120, top: "10%", left: "5%", delay: 0 },
  { size: 180, top: "20%", right: "10%", delay: 1 },
  { size: 90, bottom: "20%", left: "15%", delay: 2 },
  { size: 150, bottom: "10%", right: "20%", delay: 3 },
  { size: 70, top: "55%", left: "45%", delay: 4 },
];

export default function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, opacity: 0.2 }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: circle.delay,
          }}
          className="absolute rounded-full bg-white/10 blur-3xl"
          style={{
            width: circle.size,
            height: circle.size,
            top: circle.top,
            bottom: circle.bottom,
            left: circle.left,
            right: circle.right,
          }}
        />
      ))}
    </div>
  );
}