import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { Product } from '@workspace/api-client-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onConfirm: () => Promise<void>;
}

export function PurchaseModal({ isOpen, onClose, product, onConfirm }: PurchaseModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-4 right-4 top-1/2 -translate-y-1/2 bg-white rounded-[28px] p-6 z-50 shadow-2xl max-w-sm mx-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto rounded-[20px] overflow-hidden mb-4 shadow-card">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Confirmer l'achat</h3>
              <p className="text-gray-500 font-medium text-sm mt-1">{product.name}</p>
            </div>

            <div className="bg-[#F6F7FB] rounded-2xl p-4 space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Prix d'achat</span>
                <span className="text-mcdo-red font-bold text-lg">{product.price.toLocaleString('fr-FR')} XOF</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Revenu quotidien</span>
                <span className="text-gray-900 font-semibold">{product.dailyReturn.toLocaleString('fr-FR')} XOF</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Durée du cycle</span>
                <span className="text-gray-900 font-semibold">{product.durationDays} jours</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Revenu total estimé</span>
                <span className="text-mcdo-yellow font-bold text-lg drop-shadow-sm">{product.totalReturn.toLocaleString('fr-FR')} XOF</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirm}
              disabled={isLoading}
              className="w-full h-[58px] gradient-red text-white font-bold rounded-[18px] text-lg shadow-mcdo flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirmer le paiement'}
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}