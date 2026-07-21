import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetWithdrawHistory } from '@workspace/api-client-react';
import { Loader2, ArrowUpFromLine, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function WithdrawHistory() {
  const { data: history, isLoading } = useGetWithdrawHistory();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="Historique des retraits" />

      <div className="px-4 py-4">
        {!history || history.length === 0 ? (
          <div className="bg-white rounded-[24px] p-8 shadow-card border border-gray-50 text-center flex flex-col items-center mt-8">
            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 overflow-hidden">
              <img src="/images/pack-premium.jpg" alt="Empty" className="w-full h-full object-cover opacity-50 mix-blend-multiply" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun retrait</h3>
            <p className="text-gray-500 font-medium">
              Vos demandes de retrait apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((tx) => {
              const isSuccess = tx.status === 'success';
              const isPending = tx.status === 'pending';
              
              return (
                <div key={tx.id} className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSuccess ? 'bg-green-50 text-green-500' :
                      isPending ? 'bg-orange-50 text-orange-500' :
                      'bg-red-50 text-red-500'
                    }`}>
                      {isSuccess ? <CheckCircle2 className="w-6 h-6" /> :
                       isPending ? <Clock className="w-6 h-6" /> :
                       <XCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Retrait</h4>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        {format(new Date(tx.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">-{tx.amount.toLocaleString('fr-FR')}</p>
                    <p className={`text-xs font-bold mt-0.5 ${
                      isSuccess ? 'text-green-500' :
                      isPending ? 'text-orange-500' :
                      'text-red-500'
                    }`}>
                      {isSuccess ? 'Réussi' : isPending ? 'En attente' : 'Échoué'}
                    </p>
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