import React, { useState } from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetUserStats, useRecharge } from '@workspace/api-client-react';
import { Wallet, CreditCard, Info, Loader2, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useLocation, Link } from 'wouter';

const PRESETS = [5000, 15000, 30000, 60000, 100000, 250000];

const COUNTRIES = [
  { code: '+225', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: '+237', name: 'Cameroun', flag: '🇨🇲' },
  { code: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: '+229', name: 'Bénin', flag: '🇧🇯' },
  { code: '+221', name: 'Sénégal', flag: '🇸🇳' },
  { code: '+223', name: 'Mali', flag: '🇲🇱' },
  { code: '+227', name: 'Niger', flag: '🇳🇪' },
  { code: '+228', name: 'Togo', flag: '🇹🇬' },
];

export default function Recharge() {
  const [, setLocation] = useLocation();
  const { data: stats } = useGetUserStats();
  const rechargeMutation = useRecharge();
  
  const [amount, setAmount] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0].code);

  const handleRecharge = async () => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount < 5000) {
      toast.error('Le montant minimum est de 5,000 XOF');
      return;
    }

    try {
      await rechargeMutation.mutateAsync({
        data: {
          amount: numAmount,
          method: 'mobile_money',
          countryCode: selectedCountry
        }
      });
      toast.success('Demande de recharge initiée. Vous allez être redirigé vers la page de paiement.');
      setLocation('/recharge-history');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la recharge');
    }
  };

  return (
    <div className="pb-8 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="Rechargement" />

      <div className="px-4 py-4">
        {/* Balance Card */}
        <div className="gradient-red rounded-[24px] p-6 text-white shadow-mcdo mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-white/80 font-medium mb-1">Solde disponible</p>
              <h2 className="text-3xl font-extrabold tracking-tight">
                {stats?.balance.toLocaleString('fr-FR') || 0} <span className="text-xl font-bold">XOF</span>
              </h2>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Wallet className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-white rounded-[24px] p-5 shadow-card mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-mcdo-yellow rounded-full" />
            Montant de la recharge
          </h3>
          
          <div className="relative mb-6">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-[60px] bg-[#F6F7FB] border-0 rounded-[16px] pl-4 pr-16 text-2xl font-bold text-gray-900 focus:ring-2 focus:ring-mcdo-red transition-all"
              placeholder="0"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
              XOF
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className={`h-[48px] rounded-[14px] font-bold text-sm transition-all ${
                  amount === preset.toString()
                    ? 'gradient-red text-white shadow-md'
                    : 'bg-[#F6F7FB] text-gray-600 hover:bg-gray-100'
                }`}
              >
                {preset.toLocaleString('fr-FR')}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-[24px] p-5 shadow-card mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-mcdo-red rounded-full" />
            Mode de paiement
          </h3>
          
          <div className="space-y-3">
            {COUNTRIES.map((country) => (
              <label 
                key={country.code}
                className={`flex items-center justify-between p-4 rounded-[16px] border-2 cursor-pointer transition-all ${
                  selectedCountry === country.code 
                    ? 'border-mcdo-red bg-red-50/50' 
                    : 'border-transparent bg-[#F6F7FB] hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="font-semibold text-gray-900">{country.name}</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedCountry === country.code ? 'border-mcdo-red bg-mcdo-red' : 'border-gray-300'
                }`}>
                  {selectedCountry === country.code && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </div>
                <input 
                  type="radio" 
                  name="country" 
                  value={country.code}
                  checked={selectedCountry === country.code}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleRecharge}
          disabled={rechargeMutation.isPending}
          className="w-full h-[58px] gradient-red text-white font-bold rounded-[18px] text-lg shadow-mcdo flex items-center justify-center mb-6 disabled:opacity-70"
        >
          {rechargeMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirmer la recharge'}
        </motion.button>

        <Link href="/support">
          <div className="flex items-center justify-center gap-2 text-mcdo-red font-medium mb-8 cursor-pointer hover:underline">
            <span>Rechargement en retard ? Cliquez ici</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Info Rules */}
        <div className="bg-white rounded-[24px] p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-mcdo-yellow" />
            <h3 className="font-bold text-gray-900">Informations importantes</h3>
          </div>
          
          <ul className="space-y-3 text-sm text-gray-600 font-medium">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-mcdo-red flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">1</span>
              <p>Le montant minimum de recharge est de 5,000 XOF.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-mcdo-red flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">2</span>
              <p>Veuillez vérifier attentivement le numéro de compte avant de confirmer le paiement.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-mcdo-red flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">3</span>
              <p>Si la recharge n'arrive pas dans les 10 minutes, contactez le service client.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}