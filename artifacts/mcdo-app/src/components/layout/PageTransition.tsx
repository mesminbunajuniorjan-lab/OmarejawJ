import React from "react";
import { motion } from "framer-motion";

export function PageTransition({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`min-h-[100dvh] w-full bg-white pb-28 ${className}`}
    >
      {children}
    </motion.div>
  );
}
