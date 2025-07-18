import { motion } from "framer-motion";

export default function AOSLoader() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/70">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider"
      >
        <motion.span
          initial={{ textShadow: "0 0 0px #fff" }}
          animate={{
            textShadow: [
              "0 0 10px #00c2ff",
              "0 0 20px #00c2ff",
              "0 0 30px #00c2ff",
              "0 0 40px #00c2ff",
            ],
          }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
        >
          AOS
        </motion.span>
        <span className="text-cyan-300">-Shiksha</span>
      </motion.h1>
    </div>
  );
}
