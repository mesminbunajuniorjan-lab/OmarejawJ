import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InformationModal({ isOpen, onClose }: InformationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-4 right-4 top-[50%] -translate-y-[50%] bg-white rounded-[28px] z-50 overflow-hidden shadow-2xl max-w-sm mx-auto"
          >
            {/* Header image/gradient */}
            <div className="relative h-[120px] gradient-hero flex items-center justify-center">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Bell className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                Bienvenue sur Pico !
              </h3>
              
              <div className="space-y-4 text-sm font-medium text-gray-600 mb-6">
                <p>
                  Nous sommes heureux de vous compter parmi nos investisseurs.
                </p>
                <div className="bg-purple-50 p-4 rounded-2xl text-mcdo-red border border-purple-100">
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Bénéficiez de revenus quotidiens réguliers.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Retraits rapides de 9h à 18h.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Parrainez vos amis et gagnez jusqu'à 36%.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href="https://t.me/McDoInvest_Support" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full"
                >
                  <Button 
                    className="w-full h-14 rounded-2xl gradient-yellow text-black font-bold shadow-sm hover:opacity-90 transition-opacity"
                  >
                    Rejoindre notre Telegram
                  </Button>
                </a>
                
                <Button 
                  onClick={onClose}
                  className="w-full h-14 rounded-2xl gradient-red text-white font-bold shadow-mcdo hover:opacity-90 transition-opacity"
                >
                  D'accord
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}