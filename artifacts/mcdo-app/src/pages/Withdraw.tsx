import React, { useState } from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetUserStats, useGetBankAccounts, useWithdraw } from '@workspace/api-client-react';
import { Wallet, Info, Loader2, Landmark, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useLocation, Link } from 'wouter';

export default function Withdraw() {
  const [, setLocation] = useLocation();
  const { data: stats } = useGetUserStats();
  const { data: bankAccounts } = useGetBankAccounts();
  const withdrawMutation = useWithdraw();
  
  const [amount, setAmount] = useState<string>('');
  const [selectedBankId, setSelectedBankId] = useState<number | ''>('');

  const numAmount = Number(amount);
  const fee = numAmount ? numAmount * 0.20 : 0;
  const receiveAmount = numAmount ? numAmount - fee : 0;

  const handleWithdraw = async () => {
    if (!selectedBankId) {
      toast.error('Veuillez sélectionner un compte bancaire');
      return;
    }
    if (!numAmount || numAmount < 2000) {
      toast.error('Le montant minimum est de 2,000 XOF');
      return;
    }
    if (stats && numAmount > stats.balance) {
      toast.error('Solde insuffisant');
      return;
    }

    try {
      await withdrawMutation.mutateAsync({
        data: {
          amount: numAmount,
          bankAccountId: Number(selectedBankId)
        }
      });
      toast.success('Demande de retrait envoyée avec succès');
      setLocation('/withdraw-history');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la demande de retrait');
    }
  };

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="Retrait" />

      <div className="px-4 py-4">
        {/* Balance Card */}
        <div className="gradient-red rounded-[24px] p-6 text-white shadow-mcdo mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-white/80 font-medium mb-1">Solde retirable</p>
              <h2 className="text-3xl font-extrabold tracking-tight">
                {stats?.balance.toLocaleString('fr-FR') || 0} <span className="text-xl font-bold">XOF</span>
              </h2>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Wallet className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Bank Selection */}
        <div className="bg-white rounded-[24px] p-5 shadow-card mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-mcdo-yellow rounded-full" />
            Compte de réception
          </h3>
          
          {(!bankAccounts || bankAccounts.length === 0) ? (
            <Link href="/add-bank">
              <div className="h-[60px] bg-[#F6F7FB] border border-dashed border-gray-300 rounded-[16px] flex items-center justify-center gap-2 text-gray-500 font-medium cursor-pointer hover:bg-gray-50 transition-colors">
                <Plus className="w-5 h-5" />
                Ajouter un compte bancaire
              </div>
            </Link>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Landmark className="w-5 h-5" />
              </div>
              <select
                value={selectedBankId}
                onChange={(e) => setSelectedBankId(Number(e.target.value))}
                className="w-full h-[60px] bg-[#F6F7FB] border-0 rounded-[16px] pl-12 pr-4 text-gray-900 font-bold focus:ring-2 focus:ring-mcdo-red appearance-none cursor-pointer"
              >
                <option value="" disabled>Sélectionnez un compte</option>
                {bankAccounts.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.bankName} - {bank.accountNumber.slice(-4).padStart(bank.accountNumber.length, '*')}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Amount Input */}
        <div className="bg-white rounded-[24px] p-5 shadow-card mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-mcdo-red rounded-full" />
            Montant du retrait
          </h3>
          
          <div className="relative mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-[60px] bg-[#F6F7FB] border-0 rounded-[16px] pl-4 pr-24 text-2xl font-bold text-gray-900 focus:ring-2 focus:ring-mcdo-red transition-all"
              placeholder="0"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
              XOF
            </div>
            <button 
              onClick={() => stats && setAmount(stats.balance.toString())}
              className="absolute right-16 top-1/2 -translate-y-1/2 text-xs font-bold text-mcdo-red bg-red-50 px-2 py-1 rounded-md"
            >
              MAX
            </button>
          </div>

          <div className="bg-[#F6F7FB] rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-500">Frais de retrait (20%)</span>
              <span className="text-gray-900">{fee.toLocaleString('fr-FR')} XOF</span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between font-bold">
              <span className="text-gray-900">Montant reçu</span>
              <span className="text-mcdo-red text-lg">{receiveAmount.toLocaleString('fr-FR')} XOF</span>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleWithdraw}
          disabled={withdrawMutation.isPending}
          className="w-full h-[58px] gradient-red text-white font-bold rounded-[18px] text-lg shadow-mcdo flex items-center justify-center mb-8 disabled:opacity-70"
        >
          {withdrawMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirmer le retrait'}
        </motion.button>

        {/* Info Rules */}
        <div className="bg-white rounded-[24px] p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-mcdo-yellow" />
            <h3 className="font-bold text-gray-900">Informations de retrait</h3>
          </div>
          
          <ul className="space-y-3 text-sm text-gray-600 font-medium">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-mcdo-red flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">1</span>
              <p>Retrait minimum: 2,000 XOF.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-mcdo-red flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">2</span>
              <p>Horaires de retrait: de 09h00 à 18h00 tous les jours.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-mcdo-red flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">3</span>
              <p>Les frais de retrait sont fixés à 20% par transaction.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-red-100 text-mcdo-red flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">4</span>
              <p>L'arrivée des fonds peut prendre de 1 à 24 heures selon la banque.</p>
            </li>
          </ul>
        </div>
        
        <div className="mt-8 rounded-2xl overflow-hidden h-[120px]">
          <img src="/images/pack-bigmac.jpg" alt="McDonalds" className="w-full h-full object-cover opacity-90" />
        </div>
      </div>
    </div>
  );
}