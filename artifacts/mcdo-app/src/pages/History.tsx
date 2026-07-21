import React, { useState } from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetTransactions } from '@workspace/api-client-react';
import { Loader2, ArrowDownToLine, ArrowUpFromLine, Banknote, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type TabType = 'all' | 'recharge' | 'withdraw' | 'income';

export default function History() {
  const { data: transactions, isLoading } = useGetTransactions();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-mcdo-red" />
      </div>
    );
  }

  const filteredTransactions = transactions?.filter(tx => {
    if (activeTab === 'all') return true;
    if (activeTab === 'recharge') return tx.type === 'recharge';
    if (activeTab === 'withdraw') return tx.type === 'withdraw';
    if (activeTab === 'income') return tx.type === 'income' || tx.type === 'commission' || tx.type === 'reward';
    return true;
  }) || [];

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="Historique" />

      <div className="px-4 py-4">
        {/* Tabs */}
        <div className="flex bg-white rounded-[16px] p-1 shadow-sm mb-6 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'all' ? 'bg-mcdo-red text-white shadow-sm' : 'text-gray-500'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setActiveTab('recharge')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'recharge' ? 'bg-mcdo-red text-white shadow-sm' : 'text-gray-500'
            }`}
          >
            Recharge
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'withdraw' ? 'bg-mcdo-red text-white shadow-sm' : 'text-gray-500'
            }`}
          >
            Retrait
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'income' ? 'bg-mcdo-red text-white shadow-sm' : 'text-gray-500'
            }`}
          >
            Revenus
          </button>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-[24px] p-8 shadow-card border border-gray-50 text-center flex flex-col items-center mt-8">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune transaction</h3>
            <p className="text-gray-500 font-medium">
              Aucune transaction trouvée pour cette catégorie.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((tx) => {
              const isSuccess = tx.status === 'success';
              const isPending = tx.status === 'pending';
              const isPositive = tx.type !== 'withdraw' && tx.type !== 'purchase';
              
              let Icon = Banknote;
              let iconBg = 'bg-gray-50';
              let iconColor = 'text-gray-500';

              if (tx.type === 'recharge') {
                Icon = ArrowDownToLine;
                iconBg = 'bg-green-50';
                iconColor = 'text-green-500';
              } else if (tx.type === 'withdraw') {
                Icon = ArrowUpFromLine;
                iconBg = 'bg-orange-50';
                iconColor = 'text-orange-500';
              } else if (tx.type === 'income' || tx.type === 'commission' || tx.type === 'reward') {
                Icon = Banknote;
                iconBg = 'bg-red-50';
                iconColor = 'text-mcdo-red';
              }

              return (
                <div key={tx.id} className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 capitalize">{
                        tx.type === 'recharge' ? 'Recharge' :
                        tx.type === 'withdraw' ? 'Retrait' :
                        tx.type === 'income' ? 'Revenu' :
                        tx.type === 'commission' ? 'Commission' :
                        tx.type === 'reward' ? 'Récompense' :
                        tx.type === 'purchase' ? 'Achat' : tx.type
                      }</h4>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        {format(new Date(tx.createdAt), 'dd MMM à HH:mm', { locale: fr })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${isPositive ? 'text-green-600' : 'text-gray-900'}`}>
                      {isPositive ? '+' : '-'}{tx.amount.toLocaleString('fr-FR')}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      {isSuccess ? <CheckCircle2 className="w-3 h-3 text-green-500" /> :
                       isPending ? <Clock className="w-3 h-3 text-orange-500" /> :
                       <XCircle className="w-3 h-3 text-red-500" />}
                      <p className={`text-[10px] font-bold uppercase ${
                        isSuccess ? 'text-green-500' :
                        isPending ? 'text-orange-500' :
                        'text-red-500'
                      }`}>
                        {isSuccess ? 'Réussi' : isPending ? 'En attente' : 'Échoué'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}