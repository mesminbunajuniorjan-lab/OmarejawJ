import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetCheckinStatus, useDoCheckin } from '@workspace/api-client-react';
import { Loader2, Calendar, Check, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function Checkin() {
  const queryClient = useQueryClient();
  const { data: status, isLoading } = useGetCheckinStatus();
  const checkinMutation = useDoCheckin();

  const handleCheckin = async () => {
    if (status?.checkedInToday) return;

    try {
      const res = await checkinMutation.mutateAsync();
      toast.success(`Pointage réussi! +${res.reward} XOF`);
      queryClient.invalidateQueries({ queryKey: ['/api/checkin/status'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/stats'] });
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors du pointage');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-mcdo-red" />
      </div>
    );
  }

  const days = [1, 2, 3, 4, 5, 6, 7];
  const currentStreak = status?.streak || 0;

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="Pointage quotidien" />

      <div className="px-4 py-4">
        {/* Main Card */}
        <div className="gradient-red rounded-[24px] p-6 text-white shadow-mcdo mb-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <p className="text-white/80 font-medium mb-1">Récompenses cumulées</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">
              {status?.totalRewards.toLocaleString('fr-FR') || 0} <span className="text-xl">XOF</span>
            </h2>
            <p className="text-mcdo-yellow font-bold">
              Pointez aujourd'hui et recevez {status?.dailyReward || 50} XOF
            </p>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-[24px] p-5 shadow-card mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-mcdo-red" />
              Pointez {currentStreak} jours consécutifs
            </h3>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-6">
            {days.map((day) => {
              const isChecked = day <= currentStreak;
              const isToday = day === currentStreak + 1;
              return (
                <div key={day} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isChecked 
                      ? 'bg-green-100 text-green-500' 
                      : isToday && !status?.checkedInToday
                        ? 'bg-red-50 text-mcdo-red border-2 border-mcdo-red border-dashed'
                        : 'bg-[#F6F7FB] text-gray-400'
                  }`}>
                    {isChecked ? <Check className="w-5 h-5" strokeWidth={3} /> : <span className="text-sm font-bold">{day}</span>}
                  </div>
                  <span className={`text-[10px] font-bold ${isChecked ? 'text-green-500' : 'text-gray-400'}`}>Jour {day}</span>
                </div>
              );
            })}
          </div>

          <motion.button
            whileTap={!status?.checkedInToday ? { scale: 0.97 } : undefined}
            onClick={handleCheckin}
            disabled={status?.checkedInToday || checkinMutation.isPending}
            className={`w-full h-[58px] font-bold rounded-[18px] text-lg shadow-sm flex items-center justify-center transition-all ${
              status?.checkedInToday
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'gradient-yellow text-black'
            }`}
          >
            {checkinMutation.isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : status?.checkedInToday ? (
              'Déjà pointé aujourd\'hui'
            ) : (
              'Pointer maintenant'
            )}
          </motion.button>
        </div>

        {/* Promo Image */}
        <div className="rounded-[24px] overflow-hidden shadow-card mb-6 h-[160px] relative">
          <img src="/images/pointage-reward.jpg" alt="Reward" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 flex flex-col justify-end">
            <h3 className="text-white font-bold text-lg mb-1">Allez au pointage</h3>
            <p className="text-white/80 text-sm font-medium">Pointez chaque jour et gagnez!</p>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-white rounded-[24px] p-5 shadow-card">
          <h3 className="font-bold text-gray-900 mb-4">Comment ça marche ?</h3>
          <ul className="space-y-4 text-sm text-gray-600 font-medium">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-50 text-mcdo-red flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</div>
              <p>Connectez-vous tous les jours pour effectuer votre pointage et recevoir une récompense.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-50 text-mcdo-red flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</div>
              <p>Si vous manquez un jour, la série est réinitialisée et vous recommencez au jour 1.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-50 text-mcdo-red flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">3</div>
              <p>Les récompenses gagnées s'ajoutent automatiquement à votre solde retirable.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}