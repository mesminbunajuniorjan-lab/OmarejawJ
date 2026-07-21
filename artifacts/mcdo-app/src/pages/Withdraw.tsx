import React, { useState } from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetUserStats, useGetBankAccounts, useWithdraw } from '@workspace/api-client-react';
import { Wallet, Loader2, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useLocation, Link } from 'wouter';

export default function Withdraw() {
  const [, setLocation] = useLocation();
  const { data: stats } = useGetUserStats();
  const { data: bankAccounts } = useGetBankAccounts();
  const withdrawMutation = useWithdraw();
  const [amount, setAmount] = useState('');
  const [selectedBankId, setSelectedBankId] = useState<number | ''>('');

  const num = Number(amount);
  const fee = num ? num * 0.20 : 0;
  const receive = num ? num - fee : 0;

  const handleWithdraw = async () => {
    if (!selectedBankId) { toast.error('Sélectionnez un compte bancaire'); return; }
    if (!num || num < 2500) { toast.error('Montant minimum: 2 500 XOF'); return; }
    if (stats && num > stats.balance) { toast.error('Solde insuffisant'); return; }
    try {
      await withdrawMutation.mutateAsync({ data: { amount: num, bankAccountId: Number(selectedBankId) } });
      toast.success('Demande de retrait envoyée !');
      setLocation('/withdraw-history');
    } catch (e: any) { toast.error(e.message || 'Erreur'); }
  };

  return (
    <div className="pb-8 bg-[#F6F7FB]">
      <PageHeader title="Retrait" />

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

        {/* Bank Account */}
        <div className="bg-white rounded-[18px] px-4 py-3 shadow-sm">
          <p className="text-xs font-bold text-gray-700 mb-2">Compte bancaire</p>
          {(!bankAccounts || bankAccounts.length === 0) ? (
            <Link href="/add-bank">
              <div className="h-[44px] bg-[#F6F7FB] border border-dashed border-gray-300 rounded-[12px] flex items-center justify-center gap-2 text-gray-400 text-sm font-medium cursor-pointer">
                <Plus className="w-4 h-4" /> Sélectionnez votre compte
                <ChevronRight className="w-4 h-4 ml-auto" />
              </div>
            </Link>
          ) : (
            <select
              value={selectedBankId}
              onChange={e => setSelectedBankId(Number(e.target.value))}
              className="w-full h-[44px] bg-[#F6F7FB] rounded-[12px] px-3 text-gray-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-mcdo-red"
            >
              <option value="">Sélectionnez votre compte</option>
              {bankAccounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.bankName} — {acc.accountNumber}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Amount */}
        <div className="bg-white rounded-[18px] px-4 py-3 shadow-sm">
          <p className="text-xs font-bold text-gray-700 mb-2">Montant à retirer</p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mcdo-red font-bold text-sm">XOF</span>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Entrez le montant"
              className="w-full h-[44px] bg-[#F6F7FB] rounded-[12px] pl-12 pr-3 text-gray-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-mcdo-red"
            />
          </div>
          <div className="flex justify-between mt-2 text-[11px]">
            <span className="text-gray-400">Montant reçu: <span className="text-gray-700 font-bold">{receive.toLocaleString('fr-FR')} XOF</span></span>
            <span className="text-gray-400">Frais (20%): <span className="text-gray-700 font-bold">{fee.toLocaleString('fr-FR')} XOF</span></span>
          </div>
        </div>

        {/* Confirm */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleWithdraw}
          disabled={withdrawMutation.isPending}
          className="w-full h-[52px] gradient-red text-white font-bold rounded-[16px] shadow-mcdo flex items-center justify-center text-base disabled:opacity-70"
        >
          {withdrawMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmer'}
        </motion.button>

        {/* Info */}
        <div className="bg-white rounded-[18px] px-4 py-3 shadow-sm">
          <p className="text-xs font-bold text-gray-700 mb-2">Informations importantes</p>
          <ul className="space-y-1.5">
            {[
              'Montant minimum de retrait: 2 500 XOF.',
              'Les frais de retrait s\'élèvent à 20% du montant.',
              'Les retraits sont disponibles tous les jours de 4h à 24 heures.',
              'Assurez-vous d\'avoir au moins un appareil actif pour effectuer un retrait.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-gray-500">
                <span className="w-4 h-4 rounded-full bg-red-50 text-mcdo-red flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Burger image */}
        <div className="h-[100px] rounded-[16px] overflow-hidden">
          <img src="/images/pack-bigmac.jpg" alt="burger" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
