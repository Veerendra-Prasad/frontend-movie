import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react"; // plane-like send icon

export default function Button({ handleAddComment }) {
  const [fly, setFly] = useState(false);

  const handleClick = () => {
    handleAddComment();
    setFly(true);
    setTimeout(() => setFly(false), 5000); // bring plane back after 5s
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold overflow-hidden"
    >
      <span>Post</span>

      {/* Animate Presence handles plane flying away */}
      <AnimatePresence>
        {!fly && (
          <motion.div
            key="plane"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -40, x: 100, rotate: 45 }}
            transition={{ duration: 0.6 }}
          >
            <Send className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flying animation when clicked */}
      {fly && (
        <motion.div
          key="flying-plane"
          className="absolute right-2"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: 150, y: -80, opacity: 0, rotate: 60 }}
          transition={{ duration: 1 }}
        >
          <Send className="w-5 h-5" />
        </motion.div>
      )}
    </button>
  );
}
