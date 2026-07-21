import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetMissions } from '@workspace/api-client-react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Missions() {
  const { data: missions, isLoading } = useGetMissions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-7 h-7 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24 bg-[#F6F7FB]">
      <PageHeader title="Centre des missions" />

      <div className="px-4 pt-2 space-y-3">
        {/* Stats Bar */}
        <div className="flex gap-2">
          <div className="flex-1 bg-mcdo-red rounded-[16px] px-4 py-3 text-white text-center">
            <p className="font-black text-xl leading-none">XOF {(missions?.totalRewards ?? 0).toLocaleString('fr-FR')}</p>
            <p className="text-white/75 text-[10px] font-medium mt-0.5">Récompenses totales</p>
          </div>
          <div className="flex-1 bg-mcdo-red rounded-[16px] px-4 py-3 text-white text-center">
            <p className="font-black text-xl leading-none">{missions?.totalCount ?? 0}</p>
            <p className="text-white/75 text-[10px] font-medium mt-0.5">Nombre total</p>
          </div>
        </div>

        {/* Level Cards */}
        {missions?.levels.map((mission) => {
          const isCompleted = mission.status === 'completed';
          const rewardLabel = mission.level === 1 ? '1 000' : mission.level === 2 ? '2 500' : '5 000';

          return (
            <div key={mission.level} className="bg-white rounded-[18px] overflow-hidden shadow-sm border border-gray-100">
              {/* Card Header */}
              <div className="gradient-red px-4 py-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 rounded-lg w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="text-white font-black text-xs">Lv{mission.level}</span>
                  </div>
                  <p className="text-white text-xs font-semibold leading-tight">
                    Invitez {mission.objective} investisseurs de niveau {mission.level} pour recevoir:
                    <span className="font-black"> XOF {rewardLabel}</span>
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="px-4 py-3">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: 'Actuel', value: mission.current },
                    { label: 'Objectif', value: mission.objective },
                    { label: 'Progression', value: `${mission.current}/${mission.objective}` },
                  ].map((col) => (
                    <div key={col.label} className="text-center">
                      <p className="text-gray-400 text-[10px] font-medium">{col.label}</p>
                      <p className="font-black text-gray-900 text-sm">{col.value}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (mission.current / mission.objective) * 100)}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full gradient-red rounded-full"
                  />
                </div>

                <button
                  disabled
                  className={`w-full h-10 font-bold text-sm rounded-[12px] flex items-center justify-center gap-1.5 ${
                    isCompleted ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                  }`}
                >
                  {isCompleted ? (
                    <><CheckCircle2 className="w-4 h-4" /> Complété</>
                  ) : 'En cours'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
