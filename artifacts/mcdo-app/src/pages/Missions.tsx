import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetMissions } from '@workspace/api-client-react';
import { Loader2, Target, CheckCircle2, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Missions() {
  const { data: missions, isLoading } = useGetMissions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader title="Centre des missions" />

      <div className="px-4 py-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-[20px] shadow-card border border-gray-50 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mb-2">
              <Gift className="w-5 h-5 text-mcdo-red" />
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">Récompenses totales</p>
            <p className="text-mcdo-red font-bold text-lg">{missions?.totalRewards.toLocaleString('fr-FR') || 0} XOF</p>
          </div>
          <div className="bg-white p-4 rounded-[20px] shadow-card border border-gray-50 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-mcdo-yellow" />
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">Missions</p>
            <p className="text-gray-900 font-bold text-lg">{missions?.totalCount || 0}</p>
          </div>
        </div>

        {/* Mission List */}
        <div className="space-y-4">
          {missions?.levels.map((mission) => {
            const isCompleted = mission.status === 'completed';
            const progress = Math.min(100, (mission.current / mission.objective) * 100);

            return (
              <div key={mission.level} className="bg-white rounded-[24px] overflow-hidden shadow-card border border-gray-50">
                <div className="gradient-red p-4 text-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold">
                      L{mission.level}
                    </div>
                    <h3 className="font-bold text-sm">Invitez {mission.objective} investisseurs</h3>
                  </div>
                  <div className="text-mcdo-yellow font-bold">+{mission.rewards.toLocaleString('fr-FR')}</div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-700">Progression</span>
                    <span className="text-sm font-bold text-mcdo-red">{mission.current} / {mission.objective}</span>
                  </div>
                  
                  <div className="h-3 bg-[#F6F7FB] rounded-full overflow-hidden mb-5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1 }}
                      className="h-full gradient-red rounded-full"
                    />
                  </div>

                  <button
                    disabled={true}
                    className={`w-full h-[48px] font-bold rounded-[14px] flex items-center justify-center gap-2 ${
                      isCompleted 
                        ? 'bg-green-50 text-green-500'
                        : 'bg-yellow-50 text-mcdo-yellow'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Complété
                      </>
                    ) : (
                      'En cours'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner */}
        <div className="mt-8 rounded-[24px] overflow-hidden shadow-card">
          <img src="/images/pack-family.jpg" alt="McDonalds" className="w-full h-32 object-cover" />
        </div>
      </div>
    </div>
  );
}