import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetBankAccounts } from '@workspace/api-client-react';
import { Landmark, Plus, Trash2, Loader2 } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function BankAccounts() {
  const { data: bankAccounts, isLoading } = useGetBankAccounts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader 
        title="Comptes bancaires" 
        rightAction={
          <Link href="/add-bank">
            <button className="w-10 h-10 flex items-center justify-center bg-purple-50 text-mcdo-red rounded-xl hover:bg-purple-100 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </Link>
        }
      />

      <div className="px-4 py-4">
        {!bankAccounts || bankAccounts.length === 0 ? (
          <div className="bg-white rounded-[24px] p-8 shadow-card border border-gray-50 text-center flex flex-col items-center mt-8">
            <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6">
              <Landmark className="w-10 h-10 text-mcdo-red" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun compte bancaire</h3>
            <p className="text-gray-500 font-medium mb-8">
              Ajoutez un compte pour pouvoir retirer vos revenus.
            </p>
            <Link href="/add-bank">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full h-[58px] gradient-red text-white font-bold rounded-[18px] shadow-mcdo flex items-center justify-center gap-2 px-6"
              >
                <Plus className="w-5 h-5" />
                Ajouter un compte
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bankAccounts.map((bank) => (
              <div key={bank.id} className="bg-white rounded-[20px] p-5 shadow-card border border-gray-50 relative overflow-hidden">
                {bank.isDefault && (
                  <div className="absolute top-0 right-0 bg-mcdo-red text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
                    Principal
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-mcdo-red" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{bank.bankName}</h3>
                      <p className="text-gray-500 text-sm font-medium">{bank.accountHolder}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="bg-[#F6F7FB] rounded-xl p-4 flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Numéro</span>
                  <span className="font-bold text-gray-900 tracking-wider">
                    {bank.accountNumber.slice(0, 4)} **** **** {bank.accountNumber.slice(-4)}
                  </span>
                </div>
              </div>
            ))}

            <Link href="/add-bank">
              <button className="w-full h-[60px] bg-white border-2 border-dashed border-gray-300 rounded-[20px] flex items-center justify-center gap-2 text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700 transition-all mt-6">
                <Plus className="w-5 h-5" />
                Ajouter un autre compte
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}