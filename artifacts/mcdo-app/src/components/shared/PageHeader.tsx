import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

interface PageHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
  onBack?: () => void;
}

export function PageHeader({ title, rightAction, onBack }: PageHeaderProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="sticky top-0 bg-white/90 backdrop-blur-xl z-30 px-4 py-4 flex items-center justify-between border-b border-gray-100">
      <button 
        onClick={handleBack}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      <div className="w-10 h-10 flex items-center justify-center">
        {rightAction}
      </div>
    </div>
  );
}