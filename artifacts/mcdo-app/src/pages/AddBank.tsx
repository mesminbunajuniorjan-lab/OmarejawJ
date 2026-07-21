import React, { useState } from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useAddBankAccount } from '@workspace/api-client-react';
import { Landmark, User, Hash, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useLocation } from 'wouter';
import { useQueryClient } from '@tanstack/react-query';

export default function AddBank() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const addBankMutation = useAddBankAccount();

  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [isDefault, setIsDefault] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName || !accountNumber || !accountHolder) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      await addBankMutation.mutateAsync({
        data: {
          bankName,
          accountNumber,
          accountHolder,
          isDefault
        }
      });
      toast.success('Compte ajouté avec succès');
      queryClient.invalidateQueries({ queryKey: ['/api/bank-accounts'] });
      setLocation('/bank-accounts');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'ajout du compte');
    }
  };

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="Ajouter un compte" />

      <div className="px-4 py-4">
        <div className="bg-white rounded-[24px] p-6 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Nom de la banque</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Landmark className="h-5 w-5 text-mcdo-red" />
                </div>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="block w-full pl-12 pr-4 h-[56px] bg-[#F6F7FB] border-0 rounded-[16px] text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-mcdo-red transition-all"
                  placeholder="Ex: Orange Money, MTN..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Numéro de compte</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Hash className="h-5 w-5 text-mcdo-red" />
                </div>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="block w-full pl-12 pr-4 h-[56px] bg-[#F6F7FB] border-0 rounded-[16px] text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-mcdo-red transition-all"
                  placeholder="Numéro de compte"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Titulaire du compte</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-mcdo-red" />
                </div>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  className="block w-full pl-12 pr-4 h-[56px] bg-[#F6F7FB] border-0 rounded-[16px] text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-mcdo-red transition-all"
                  placeholder="Nom complet"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="font-bold text-gray-700">Définir comme principal</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-mcdo-red"></div>
              </label>
            </div>

            <div className="pt-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={addBankMutation.isPending}
                className="w-full h-[58px] gradient-red text-white font-bold rounded-[18px] text-lg shadow-mcdo flex items-center justify-center disabled:opacity-70"
              >
                {addBankMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Ajouter le compte'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}