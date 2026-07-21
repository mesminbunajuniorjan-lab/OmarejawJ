import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Bell, Loader2, ShoppingBag, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetProducts, useGetUserStats, usePurchaseProduct } from '@workspace/api-client-react';
import type { Product } from '@workspace/api-client-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '../components/shared/PageHeader';
import { PurchaseModal } from '../components/shared/PurchaseModal';

export default function Products() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useGetProducts();
  const { data: stats } = useGetUserStats();
  const purchaseMutation = usePurchaseProduct();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchaseClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedProduct) return;
    try {
      await purchaseMutation.mutateAsync({ id: selectedProduct.id });
      toast.success('Achat effectué avec succès !');
      queryClient.invalidateQueries({ queryKey: ['/api/user/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/my-products'] });
      setIsModalOpen(false);
      setLocation('/my-products');
    } catch (e: any) {
      toast.error(e.message || 'Solde insuffisant');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-7 h-7 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24 bg-white">
      <PageHeader
        title="Produits"
        rightAction={
          <button className="w-full h-full flex items-center justify-center text-gray-500">
            <Bell className="w-5 h-5" />
          </button>
        }
      />

      {/* Stats Bar */}
      <div className="px-4 pt-2 pb-3 flex gap-3">
        <div className="flex-1 flex items-center gap-2 bg-[#F6F7FB] rounded-[14px] px-3 py-2">
          <ShoppingBag className="w-4 h-4 text-mcdo-red shrink-0" />
          <div>
            <p className="text-gray-900 font-black text-base leading-none">{stats?.activeProducts ?? 0}</p>
            <p className="text-gray-400 text-[10px] font-medium">Mes produits</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2 bg-[#F6F7FB] rounded-[14px] px-3 py-2">
          <TrendingUp className="w-4 h-4 text-mcdo-red shrink-0" />
          <div>
            <p className="text-gray-900 font-black text-base leading-none">{stats?.totalEarned.toLocaleString('fr-FR') ?? 0}</p>
            <p className="text-gray-400 text-[10px] font-medium">Mes revenus</p>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="px-4 space-y-2.5">
        {products?.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white border border-gray-100 rounded-[18px] p-3 shadow-sm flex gap-3 items-center"
          >
            {/* Image */}
            <div className="w-[70px] h-[70px] rounded-[14px] overflow-hidden shrink-0">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-black text-gray-900 text-sm leading-tight mb-0.5 truncate">{product.name}</p>
              <p className="text-mcdo-red font-bold text-xs">Prix: {product.price.toLocaleString('fr-FR')} XOF</p>
              <p className="text-gray-500 text-[11px]">Quotidien: <span className="font-bold text-gray-700">{product.dailyReturn.toLocaleString('fr-FR')}</span> XOF</p>
              <p className="text-gray-500 text-[11px]">Total: <span className="font-bold text-gray-700">{product.totalReturn.toLocaleString('fr-FR')}</span> XOF</p>
              <p className="text-gray-400 text-[11px]">Durée: {product.durationDays} jours</p>
            </div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePurchaseClick(product)}
              className="shrink-0 gradient-red text-white text-xs font-bold px-3 py-2 rounded-[10px] shadow-sm"
            >
              Acheter
            </motion.button>
          </motion.div>
        ))}
      </div>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onConfirm={handleConfirmPurchase}
      />
    </div>
  );
}
