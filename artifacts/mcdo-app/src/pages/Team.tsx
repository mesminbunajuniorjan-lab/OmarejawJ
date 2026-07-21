import React from 'react';
import { PageHeader } from '../components/shared/PageHeader';
import { useGetTeam, useGetUserStats } from '@workspace/api-client-react';
import { Loader2, Copy, Users, Wallet, Target, ArrowDownToLine, History, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Link } from 'wouter';

export default function Team() {
  const { data: team, isLoading: isTeamLoading } = useGetTeam();
  const { data: stats, isLoading: isStatsLoading } = useGetUserStats();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié dans le presse-papier');
  };

  if (isTeamLoading || isStatsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      <PageHeader 
        title="Mon Équipe" 
        rightAction={
          <Link href="/missions">
            <button className="text-mcdo-red font-bold text-xs bg-red-50 px-3 py-1.5 rounded-lg whitespace-nowrap">
              Missions &gt;
            </button>
          </Link>
        }
      />

      <div className="px-4 py-4">
        {/* Balance Card */}
        <div className="gradient-red rounded-[24px] p-6 text-white shadow-mcdo mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          <p className="text-white/80 font-medium mb-1">Commissions d'équipe</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">
            {stats?.totalRewards.toLocaleString('fr-FR') || 0} <span className="text-xl">XOF</span>
          </h2>
          <div className="flex gap-4">
            <Link href="/recharge">
              <button className="px-6 py-2.5 bg-mcdo-yellow text-black font-bold rounded-xl shadow-sm text-sm">
                Recharger
              </button>
            </Link>
            <Link href="/withdraw">
              <button className="px-6 py-2.5 bg-white/20 text-white font-bold rounded-xl text-sm hover:bg-white/30 transition-colors">
                Retrait
              </button>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Link href="/withdraw">
            <div className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <ArrowDownToLine className="w-5 h-5 text-mcdo-red" />
              </div>
              <span className="text-xs font-semibold text-gray-700">Retrait</span>
            </div>
          </Link>
          <Link href="/history">
            <div className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <History className="w-5 h-5 text-mcdo-red" />
              </div>
              <span className="text-xs font-semibold text-gray-700">Historique</span>
            </div>
          </Link>
          <Link href="/checkin">
            <div className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 text-mcdo-red" />
              </div>
              <span className="text-xs font-semibold text-gray-700">Pointage</span>
            </div>
          </Link>
        </div>

        {/* Invitation Link */}
        <div className="bg-white rounded-[24px] p-5 shadow-card mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-mcdo-red" />
            Mon lien d'invitation
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Code d'invitation</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-12 bg-[#F6F7FB] rounded-xl flex items-center px-4 font-bold text-mcdo-red tracking-wider">
                  {team?.referralCode}
                </div>
                <button 
                  onClick={() => handleCopy(team?.referralCode || '')}
                  className="w-12 h-12 bg-red-50 text-mcdo-red rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Lien d'invitation</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-12 bg-[#F6F7FB] rounded-xl flex items-center px-4 text-sm text-gray-600 truncate">
                  {team?.referralLink}
                </div>
                <button 
                  onClick={() => handleCopy(team?.referralLink || '')}
                  className="w-12 h-12 gradient-red text-white rounded-xl flex items-center justify-center shadow-sm"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="bg-white rounded-[24px] p-5 shadow-card mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-mcdo-red" />
            Statistiques d'équipe
          </h3>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-gray-500 mb-3 px-2">
            <div>Niveau 1</div>
            <div>Niveau 2</div>
            <div>Niveau 3</div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center text-sm font-bold text-mcdo-red mb-4 px-2">
            <div>36%</div>
            <div>1%</div>
            <div>1%</div>
          </div>

          <div className="space-y-3">
            <div className="bg-[#F6F7FB] p-3 rounded-[16px] flex justify-between items-center text-sm">
              <span className="font-medium text-gray-600 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" /> Taille de l'équipe
              </span>
              <div className="flex gap-4 font-bold text-gray-900">
                <span className="w-8 text-center">{team?.vip1.users}</span>
                <span className="w-8 text-center">{team?.vip2.users}</span>
                <span className="w-8 text-center">{team?.vip3.users}</span>
              </div>
            </div>
            
            <div className="bg-[#F6F7FB] p-3 rounded-[16px] flex justify-between items-center text-sm">
              <span className="font-medium text-gray-600 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-gray-400" /> Commissions
              </span>
              <div className="flex gap-4 font-bold text-green-600">
                <span className="w-8 text-center">{team?.vip1.rewards}</span>
                <span className="w-8 text-center">{team?.vip2.rewards}</span>
                <span className="w-8 text-center">{team?.vip3.rewards}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Image */}
        <div className="rounded-[24px] overflow-hidden shadow-card h-[160px] relative mt-8">
          <img src="/images/pointage-reward.jpg" alt="McDonalds Fries" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 flex flex-col justify-end">
            <h3 className="text-white font-bold text-lg mb-1">Invitez vos amis</h3>
            <p className="text-white/80 text-sm font-medium">Gagnez jusqu'à 36% de commission</p>
          </div>
        </div>

      </div>
    </div>
  );
}