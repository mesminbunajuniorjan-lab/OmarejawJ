import React from "react";
import { motion } from "framer-motion";

export function Skeleton({ className = "", style, ...props }: { className?: string, style?: React.CSSProperties, [key: string]: any }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
      className={`bg-gray-200 rounded-xl ${className}`}
      style={style}
      {...props}
    />
  );
}
