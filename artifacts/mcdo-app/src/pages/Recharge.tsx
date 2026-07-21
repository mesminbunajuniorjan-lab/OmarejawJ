import React, { useState } from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetUserStats, useRecharge } from '@workspace/api-client-react';
import { Wallet, Loader2, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useLocation, Link } from 'wouter';

const PRESETS = [5000, 15000, 30000];

const COUNTRIES = [
  { code: 'CM', dial: '+237', name: 'Cameroun', flag: '🇨🇲' },
  { code: 'BF', dial: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'CI', dial: '+225', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: 'BJ', dial: '+229', name: 'Bénin', flag: '🇧🇯' },
  { code: 'SN', dial: '+221', name: 'Sénégal', flag: '🇸🇳' },
  { code: 'ML', dial: '+223', name: 'Mali', flag: '🇲🇱' },
  { code: 'NE', dial: '+227', name: 'Niger', flag: '🇳🇪' },
  { code: 'TG', dial: '+228', name: 'Togo', flag: '🇹🇬' },
];

export default function Recharge() {
  const [, setLocation] = useLocation();
  const { data: stats } = useGetUserStats();
  const rechargeMutation = useRecharge();
  const [amount, setAmount] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('CM');

  const handleRecharge = async () => {
    const num = Number(amount);
    if (!num || num < 5000) { toast.error('Montant minimum: 5 000 XOF'); return; }
    try {
      const country = COUNTRIES.find(c => c.code === selectedCountry);
      await rechargeMutation.mutateAsync({ data: { amount: num, method: 'mobile_money', countryCode: country?.dial } });
      toast.success('Demande de recharge initiée !');
      setLocation('/recharge-history');
    } catch (e: any) { toast.error(e.message || 'Erreur'); }
  };

  return (
    <div className="pb-8 bg-[#F6F7FB]">
      <PageHeader title="Rechargement" />

      <div className="px-4 pt-3 space-y-3">
        {/* Balance Card */}
        <div className="gradient-red rounded-[18px] px-4 py-3 text-white flex items-center justify-between shadow-mcdo">
          <div>
            <p className="text-white/70 text-[10px] font-medium">Solde disponible</p>
            <p className="text-2xl font-black">{(stats?.balance ?? 0).toLocaleString('fr-FR')} <span className="text-sm font-bold">XOF</span></p>
          </div>
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Amount */}
        <div className="bg-white rounded-[18px] px-4 py-3 shadow-sm">
          <p className="text-xs font-bold text-gray-700 mb-2">Montant</p>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Saisissez un montant"
            className="w-full h-[44px] bg-[#F6F7FB] rounded-[12px] px-3 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-mcdo-red"
          />
          <div className="flex gap-2 mt-2">
            {PRESETS.map(p => (
              <button
                key={p}
                onClick={() => setAmount(p.toString())}
                className={`flex-1 py-1.5 text-xs font-bold rounded-[10px] border transition-colors ${
                  amount === p.toString()
                    ? 'bg-mcdo-red text-white border-mcdo-red'
                    : 'bg-[#F6F7FB] text-gray-700 border-gray-200'
                }`}
              >
                {p.toLocaleString('fr-FR')}
              </button>
            ))}
          </div>
        </div>

        {/* Country Selection */}
        <div className="bg-white rounded-[18px] overflow-hidden shadow-sm">
          <div className="px-4 py-2 border-b border-gray-50">
            <p className="text-xs font-bold text-gray-700">Mode de paiement</p>
          </div>
          {COUNTRIES.map((country, i) => (
            <label
              key={country.code}
              className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${
                i < COUNTRIES.length - 1 ? 'border-b border-gray-50' : ''
              } ${selectedCountry === country.code ? 'bg-red-50/50' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{country.flag}</span>
                <span className={`text-sm font-semibold ${selectedCountry === country.code ? 'text-mcdo-red' : 'text-gray-700'}`}>
                  {country.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedCountry === country.code && (
                  <Check className="w-4 h-4 text-mcdo-red" strokeWidth={3} />
                )}
                <input
                  type="radio"
                  name="country"
                  value={country.code}
                  checked={selectedCountry === country.code}
                  onChange={() => setSelectedCountry(country.code)}
                  className="sr-only"
                />
              </div>
            </label>
          ))}
        </div>

        {/* Confirm Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleRecharge}
          disabled={rechargeMutation.isPending}
          className="w-full h-[52px] gradient-red text-white font-bold rounded-[16px] shadow-mcdo flex items-center justify-center text-base disabled:opacity-70"
        >
          {rechargeMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmer'}
        </motion.button>

        <Link href="/support">
          <p className="text-center text-mcdo-red text-xs font-semibold flex items-center justify-center gap-1 py-1">
            Rechargement en retard ? Cliquez ici <ChevronRight className="w-3 h-3" />
          </p>
        </Link>

        {/* Info */}
        <div className="bg-white rounded-[18px] px-4 py-3 shadow-sm">
          <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
            <span className="w-1 h-4 bg-gray-300 rounded-full inline-block" />
            Informations importantes
          </p>
          <ul className="space-y-1.5">
            {[
              'Montant minimum de recharge: 5 000 XOF.',
              'Les recharges inférieures à ce montant ne sont pas créditées.',
              'Utilisez toujours votre numéro de compte le plus récent.',
              'Suivez attentivement les instructions de paiement.',
              'En cas de problème, contactez le service client.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-gray-500">
                <span className="text-gray-400 font-bold shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fries Image */}
        <div className="h-[100px] rounded-[16px] overflow-hidden">
          <img src="/images/pack-classic.jpg" alt="frites" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
