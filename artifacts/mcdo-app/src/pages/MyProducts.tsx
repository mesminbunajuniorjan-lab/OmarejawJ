import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetMyProducts, useGetUserStats } from '@workspace/api-client-react';
import { Loader2, Info, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function MyProducts() {
  const { data: products, isLoading } = useGetMyProducts();
  const { data: stats } = useGetUserStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-7 h-7 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24 bg-[#F6F7FB]">
      <PageHeader title="Mes Produits" />

      <div className="px-4 pt-2 space-y-3">
        {/* Info banner */}
        <div className="bg-red-50 border border-red-100 rounded-[14px] px-3 py-2 flex items-start gap-2">
          <Info className="w-4 h-4 text-mcdo-red shrink-0 mt-0.5" />
          <p className="text-mcdo-red text-[11px] font-medium leading-tight">
            Les revenus de vos produits sont réglés automatiquement toutes les 24 heures.
            Vous pouvez acheter plusieurs appareils pour augmenter vos revenus.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex gap-2">
          <div className="flex-1 bg-white rounded-[14px] px-3 py-2.5 shadow-sm flex items-center gap-2">
            <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-mcdo-red" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-base leading-none">
                XOF {(stats?.totalEarned ?? 0).toLocaleString('fr-FR')}
              </p>
              <p className="text-gray-400 text-[10px]">Revenue réel</p>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-[14px] px-3 py-2.5 shadow-sm flex items-center gap-2">
            <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-base leading-none">{products?.length ?? 0}</p>
              <p className="text-gray-400 text-[10px]">Nombre total de produits</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {(!products || products.length === 0) ? (
          <div className="bg-white rounded-[18px] py-10 px-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-[20px] overflow-hidden mb-4 shadow-sm">
              <img src="/images/empty-products.jpg" alt="empty" className="w-full h-full object-cover" />
            </div>
            <p className="font-black text-gray-900 text-base mb-1">Aucun produit pour le moment</p>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">
              Commencez à investir pour générer plus de revenus.
            </p>
            <Link href="/products">
              <button className="gradient-red text-white font-bold px-6 py-2.5 rounded-[12px] text-sm shadow-mcdo">
                Voir les produits
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {products.map((product) => {
              const progress = Math.min(100, (product.earnedSoFar / product.totalReturn) * 100);
              const isActive = product.status === 'active';
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[18px] p-3 shadow-sm border border-gray-50"
                >
                  <div className="flex gap-3 items-start mb-3">
                    <div className="w-14 h-14 rounded-[12px] overflow-hidden shrink-0">
                      <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="font-black text-gray-900 text-sm truncate">{product.productName}</p>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ml-1 shrink-0 ${isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                          {isActive ? 'Actif' : 'Terminé'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">Acheté le {new Date(product.purchaseDate).toLocaleDateString('fr-FR')}</p>
                      <div className="flex gap-3 mt-1 text-[11px]">
                        <span className="text-gray-500">Quotidien: <span className="font-bold text-gray-800">{product.dailyReturn.toLocaleString('fr-FR')}</span></span>
                        <span className="text-mcdo-red font-bold">{product.earnedSoFar.toLocaleString('fr-FR')} / {product.totalReturn.toLocaleString('fr-FR')} XOF</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-semibold mb-1">
                      <span className="text-gray-400">Progression</span>
                      <span className="text-mcdo-red">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8 }}
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
