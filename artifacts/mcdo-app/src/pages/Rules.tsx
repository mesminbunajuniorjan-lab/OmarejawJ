import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { Info } from 'lucide-react';

export default function Rules() {
  const packs = [
    { name: 'Pack Classic', price: '5,000', daily: '1,250', total: '225,000', days: 160 },
    { name: 'Pack Big Mac', price: '15,000', daily: '3,825', total: '688,500', days: 180 },
    { name: 'Pack Chicken', price: '30,000', daily: '7,800', total: '1,404,000', days: 180 },
    { name: 'Pack Family', price: '60,000', daily: '15,000', total: '2,862,000', days: 180 },
    { name: 'Pack Royal', price: '250,000', daily: '70,000', total: '12,600,000', days: 180 },
    { name: 'Pack VIP', price: '500,000', daily: '165,000', total: '26,100,000', days: 160 },
    { name: 'Pack Ultimate', price: '1,000,000', daily: '300,000', total: '54,000,000', days: 180 },
    { name: 'Pack Empire', price: '2,000,000', daily: '800,000', total: '144,000,000', days: 180 },
  ];

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="Règlement" />

      <div className="px-4 py-4">
        <div className="gradient-red rounded-[24px] p-6 text-white shadow-mcdo mb-6 relative overflow-hidden flex items-center justify-between">
          <div className="relative z-10 w-2/3">
            <h2 className="text-2xl font-extrabold tracking-tight mb-2">Plan de revenus McDonald's</h2>
            <p className="text-white/80 text-sm font-medium">Découvrez nos offres d'investissement</p>
          </div>
          <div className="w-1/3 absolute right-0 bottom-0 top-0">
            <img src="/images/pack-family.jpg" alt="Pack" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
          </div>
        </div>

        <div className="bg-white rounded-[24px] shadow-card overflow-hidden mb-8 border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-[#FFF0EF] text-mcdo-red font-bold">
                <tr>
                  <th className="px-4 py-4">Pack</th>
                  <th className="px-4 py-4">Prix (XOF)</th>
                  <th className="px-4 py-4">Quotidien</th>
                  <th className="px-4 py-4">Total</th>
                  <th className="px-4 py-4">Durée</th>
                </tr>
              </thead>
              <tbody className="font-medium text-gray-700">
                {packs.map((pack, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FFF8F8]'}>
                    <td className="px-4 py-4 font-bold text-gray-900">{pack.name}</td>
                    <td className="px-4 py-4">{pack.price}</td>
                    <td className="px-4 py-4 text-mcdo-red font-bold">{pack.daily}</td>
                    <td className="px-4 py-4 text-mcdo-yellow font-bold">{pack.total}</td>
                    <td className="px-4 py-4">{pack.days} jrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-4 px-2 flex items-center gap-2">
          <Info className="w-5 h-5 text-mcdo-yellow" />
          Conditions générales
        </h3>
        
        <div className="bg-white rounded-[24px] p-6 shadow-card space-y-4 text-sm text-gray-600 font-medium">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-100 text-mcdo-red flex items-center justify-center font-bold flex-shrink-0 mt-0.5 text-xs">1</div>
            <p>Les revenus sont calculés et versés toutes les 24 heures après l'achat du pack.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-100 text-mcdo-red flex items-center justify-center font-bold flex-shrink-0 mt-0.5 text-xs">2</div>
            <p>Vous pouvez acheter plusieurs packs simultanément pour augmenter vos revenus quotidiens.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-100 text-mcdo-red flex items-center justify-center font-bold flex-shrink-0 mt-0.5 text-xs">3</div>
            <p>Les retraits sont soumis à des frais de 20% et sont traités entre 9h et 18h.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-100 text-mcdo-red flex items-center justify-center font-bold flex-shrink-0 mt-0.5 text-xs">4</div>
            <p>Le programme de parrainage vous permet de gagner 36% sur le niveau 1, 1% sur le niveau 2 et 1% sur le niveau 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
}