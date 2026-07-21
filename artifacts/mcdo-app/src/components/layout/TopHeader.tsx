import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

interface TopHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
  onBack?: () => void;
}

export function TopHeader({ title, rightElement, onBack }: TopHeaderProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    if (onBack) onBack();
    else setLocation("/");
  };

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl px-4 py-4 flex items-center justify-between">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleBack}
        className="w-10 h-10 rounded-full bg-[#F6F7FB] flex items-center justify-center text-gray-700"
      >
        <ChevronLeft size={24} />
      </motion.button>
      
      <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      
      <div className="w-10 h-10 flex items-center justify-center">
        {rightElement}
      </div>
    </div>
  );
}
