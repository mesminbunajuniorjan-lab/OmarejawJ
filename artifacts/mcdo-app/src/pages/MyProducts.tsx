import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetMyProducts, useGetUserStats } from '@workspace/api-client-react';
import { Loader2, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function MyProducts() {
  const { data: products, isLoading } = useGetMyProducts();
  const { data: stats } = useGetUserStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="Mes Produits" />

      <div className="px-4 py-4">
        <div className="bg-red-50 border border-red-100 rounded-[16px] p-3 flex items-start gap-3 mb-6">
          <Info className="w-5 h-5 text-mcdo-red flex-shrink-0 mt-0.5" />
          <p className="text-mcdo-red text-sm font-medium">
            Les revenus de vos investissements sont réglés automatiquement toutes les 24 heures après l'heure d'achat.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-[20px] shadow-card border border-gray-50">
            <p className="text-gray-500 text-xs font-medium mb-1">Revenus des packs</p>
            <p className="text-mcdo-red font-bold text-xl">{stats?.totalEarned.toLocaleString('fr-FR') || 0} <span className="text-sm">XOF</span></p>
          </div>
          <div className="bg-white p-4 rounded-[20px] shadow-card border border-gray-50">
            <p className="text-gray-500 text-xs font-medium mb-1">Packs actifs</p>
            <p className="text-gray-900 font-bold text-xl">{products?.filter(p => p.status === 'active').length || 0}</p>
          </div>
        </div>

        {!products || products.length === 0 ? (
          <div className="bg-white rounded-[24px] p-8 shadow-card border border-gray-50 text-center flex flex-col items-center mt-8">
            <div className="w-40 h-40 mb-6 relative">
              <img src="/images/empty-products.jpg" alt="Empty" className="w-full h-full object-cover rounded-[24px]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun produit actif</h3>
            <p className="text-gray-500 font-medium mb-8">
              Vous n'avez pas encore investi dans nos packs McDonald's. Commencez à générer des revenus dès aujourd'hui.
            </p>
            <Link href="/products">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full h-[58px] gradient-red text-white font-bold rounded-[18px] shadow-mcdo"
              >
                Commencer à investir
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => {
              const progress = Math.min(100, (product.earnedSoFar / product.totalReturn) * 100);
              const isActive = product.status === 'active';
              
              return (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[24px] p-4 shadow-card border border-gray-50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                        <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{product.productName}</h3>
                        <p className="text-xs text-gray-500 font-medium">Acheté le {new Date(product.purchaseDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {isActive ? 'Actif' : 'Terminé'}
                    </div>
                  </div>

                  <div className="bg-[#F6F7FB] rounded-[16px] p-3 mb-4 flex justify-between">
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium uppercase mb-0.5">Revenu Quotidien</p>
                      <p className="font-bold text-gray-900">{product.dailyReturn.toLocaleString('fr-FR')} XOF</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 font-medium uppercase mb-0.5">Gagné / Total</p>
                      <p className="font-bold text-mcdo-red">{product.earnedSoFar.toLocaleString('fr-FR')} <span className="text-gray-400 font-normal">/ {product.totalReturn.toLocaleString('fr-FR')}</span></p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-gray-500">Progression</span>
                      <span className="text-mcdo-red">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full gradient-red rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}