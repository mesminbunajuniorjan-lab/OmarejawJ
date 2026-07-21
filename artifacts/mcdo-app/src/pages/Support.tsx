import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { Headset, Send, MessageCircle, Mail, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Support() {
  const faqs = [
    { q: "Comment recharger mon compte ?", a: "Allez dans la section 'Rechargement', choisissez le montant, sélectionnez votre mode de paiement et suivez les instructions. Le montant minimum est de 5,000 XOF." },
    { q: "Quand puis-je retirer mon argent ?", a: "Les retraits sont disponibles tous les jours de 09h00 à 18h00. Le montant minimum de retrait est de 2,000 XOF." },
    { q: "Quels sont les frais de retrait ?", a: "Une taxe de 20% est appliquée sur chaque retrait pour couvrir les frais de transaction." },
    { q: "Combien de temps dure un pack ?", a: "La durée varie entre 160 et 180 jours selon le pack choisi. Consultez la page Règlement pour plus de détails." },
    { q: "Comment fonctionne le parrainage ?", a: "Partagez votre lien d'invitation. Vous gagnez 36% sur les investissements de vos filleuls directs (Niveau 1), 1% sur le Niveau 2 et 1% sur le Niveau 3." }
  ];

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="Service Client" />

      <div className="px-4 py-4">
        <div className="gradient-red rounded-[24px] p-8 text-white shadow-mcdo mb-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm relative z-10">
            <Headset className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight mb-2 relative z-10">Besoin d'aide ?</h2>
          <p className="text-white/80 font-medium relative z-10">Nous sommes disponibles 24h/24, 7j/7</p>
        </div>

        <div className="space-y-4 mb-8">
          <a href="https://t.me/McDoInvest_Support" target="_blank" rel="noreferrer" className="block">
            <motion.div whileTap={{ scale: 0.98 }} className="bg-white rounded-[20px] p-4 shadow-card flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Send className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Canal Telegram</h3>
                <p className="text-sm text-gray-500 font-medium">@McDoInvest_Support</p>
              </div>
            </motion.div>
          </a>

          <a href="https://wa.me/22900000000" target="_blank" rel="noreferrer" className="block">
            <motion.div whileTap={{ scale: 0.98 }} className="bg-white rounded-[20px] p-4 shadow-card flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">WhatsApp</h3>
                <p className="text-sm text-gray-500 font-medium">+229 XX XX XX XX</p>
              </div>
            </motion.div>
          </a>

          <a href="mailto:support@mcdoinvest.com" className="block">
            <motion.div whileTap={{ scale: 0.98 }} className="bg-white rounded-[20px] p-4 shadow-card flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-mcdo-red" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Email</h3>
                <p className="text-sm text-gray-500 font-medium">support@mcdoinvest.com</p>
              </div>
            </motion.div>
          </a>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full h-[58px] gradient-red text-white font-bold rounded-[18px] text-lg shadow-mcdo flex items-center justify-center mb-8"
        >
          Contacter maintenant
        </motion.button>

        <h3 className="font-bold text-gray-900 mb-4 px-2">Questions fréquentes</h3>
        <div className="bg-white rounded-[24px] shadow-card overflow-hidden">
          {faqs.map((faq, i) => (
            <details key={i} className="group border-b border-gray-100 last:border-0">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-900">
                <span>{faq.q}</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </span>
              </summary>
              <div className="text-gray-600 font-medium text-sm px-5 pb-5 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}