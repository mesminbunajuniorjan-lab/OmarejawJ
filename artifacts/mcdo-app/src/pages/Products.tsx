import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { PageHeader } from '../components/shared/PageHeader';
import { PurchaseModal } from '../components/shared/PurchaseModal';
import { Bell, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetProducts, useGetUserStats, usePurchaseProduct, Product } from '@workspace/api-client-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function Products() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();
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
      toast.success('Achat effectué avec succès!');
      queryClient.invalidateQueries({ queryKey: ['/api/user/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/my-products'] });
      setLocation('/my-products');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'achat. Solde insuffisant ?');
    }
  };

  if (isLoadingProducts) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24">
      <PageHeader 
        title="Produits d'investissement" 
        rightAction={
          <button className="w-full h-full flex items-center justify-center text-gray-600">
            <Bell className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-4 py-4">
        <div className="bg-white rounded-[24px] p-5 shadow-card border border-gray-50 flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Revenus générés</p>
            <p className="text-mcdo-red font-bold text-xl">{stats?.totalEarned.toLocaleString('fr-FR') || 0} XOF</p>
          </div>
          <Link href="/my-products">
            <button className="bg-[#F6F7FB] text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors">
              Mes produits
            </button>
          </Link>
        </div>

        <div className="space-y-4">
          {products?.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[24px] p-4 shadow-card border border-gray-50"
            >
              <div className="flex gap-4">
                <div className="w-[88px] h-[88px] rounded-[20px] overflow-hidden flex-shrink-0 shadow-sm">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-gray-900 font-bold text-lg leading-tight mb-1">{product.name}</h3>
                    <p className="text-mcdo-red font-bold">Prix: {product.price.toLocaleString('fr-FR')} XOF</p>
                  </div>
                  
                  <div className="text-xs text-gray-500 font-medium space-y-0.5 mt-1">
                    <p>Quotidien: <span className="text-gray-900 font-bold">{product.dailyReturn.toLocaleString('fr-FR')}</span> XOF</p>
                    <p>Total: <span className="text-mcdo-yellow font-bold drop-shadow-sm">{product.totalReturn.toLocaleString('fr-FR')}</span> XOF</p>
                    <p>Durée: {product.durationDays} jours</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handlePurchaseClick(product)}
                  className="w-full h-[48px] gradient-red text-white font-bold rounded-[14px] shadow-sm flex items-center justify-center"
                >
                  Acheter ce pack
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
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