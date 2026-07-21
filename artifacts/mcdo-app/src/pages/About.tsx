import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { ShieldCheck, Eye, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="À propos de nous" />

      {/* Hero Image */}
      <div className="h-[220px] w-full">
        <img 
          src="/images/about-restaurant.jpg" 
          alt="McDonald's Restaurant" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-4 py-6 -mt-6 relative z-10">
        <div className="bg-white rounded-[24px] p-6 shadow-card mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">À propos de notre entreprise</h2>
          <p className="text-gray-600 font-medium leading-relaxed mb-6">
            Pico est une plateforme d'investissement sûre et fiable. Nous proposons des plans de rendement stables et transparents. Notre mission est d'aider nos membres à atteindre la liberté financière grâce à des opportunités d'investissement innovantes.
          </p>

          <div className="space-y-4">
            <div className="bg-[#FFF0EF] border border-red-100 rounded-[16px] p-4 flex gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-mcdo-red" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Sécurité et fiabilité</h3>
                <p className="text-sm text-gray-600">Vos fonds sont protégés par les dernières technologies de cryptage bancaire.</p>
              </div>
            </div>

            <div className="bg-[#FFF0EF] border border-red-100 rounded-[16px] p-4 flex gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <Eye className="w-5 h-5 text-mcdo-red" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Transparence totale</h3>
                <p className="text-sm text-gray-600">Toutes les informations sur vos revenus sont accessibles en temps réel.</p>
              </div>
            </div>

            <div className="bg-[#FFF0EF] border border-red-100 rounded-[16px] p-4 flex gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <Clock className="w-5 h-5 text-mcdo-red" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Support 24/7</h3>
                <p className="text-sm text-gray-600">Notre équipe est toujours disponible pour répondre à vos questions.</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-4 px-2">Nos Avantages</h3>
        <div className="grid grid-cols-1 gap-3 mb-8">
          <div className="bg-mcdo-red text-white p-4 rounded-[16px] flex items-center justify-center text-center font-bold shadow-md">
            Revenus quotidiens garantis
          </div>
          <div className="bg-mcdo-red text-white p-4 rounded-[16px] flex items-center justify-center text-center font-bold shadow-md">
            Rentabilité élevée
          </div>
          <div className="bg-mcdo-red text-white p-4 rounded-[16px] flex items-center justify-center text-center font-bold shadow-md">
            Cycles de 160 à 180 jours
          </div>
        </div>

        <div className="rounded-[24px] overflow-hidden h-[140px] shadow-card">
          <img src="/images/pack-bigmac.jpg" alt="McDonalds" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}