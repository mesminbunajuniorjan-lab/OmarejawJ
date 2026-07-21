import React from 'react';
import { useGetTeam, useGetUserStats, useGetProfile } from '@workspace/api-client-react';
import { Loader2, Copy, ArrowDownToLine, History, CalendarCheck, LogOut, Users, Wallet, Trophy } from 'lucide-react';
import { Link } from 'wouter';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { PageHeader } from '../components/shared/PageHeader';

export default function Team() {
  const { data: team, isLoading: isTeamLoading } = useGetTeam();
  const { data: stats } = useGetUserStats();
  const { data: profile } = useGetProfile();
  const { logout } = useAuth();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié !');
  };

  if (isTeamLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-7 h-7 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24 bg-[#F6F7FB]">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-sm">{profile?.phone}</span>
          <span className="bg-mcdo-red text-white text-[9px] font-black px-1.5 py-0.5 rounded">Lv{profile?.vipLevel ?? 1}</span>
        </div>
        <Link href="/missions">
          <span className="text-mcdo-red text-xs font-bold">Aller au Centre des missions &gt;</span>
        </Link>
        <button onClick={logout} className="text-mcdo-red text-xs font-bold">Déconnexion</button>
      </div>

      <div className="px-4 pt-3 space-y-3">
        {/* Balance Card */}
        <div className="gradient-red rounded-[18px] px-4 py-3 text-white flex items-center justify-between shadow-mcdo">
          <div>
            <p className="text-white/70 text-[10px] font-medium">Solde du compte</p>
            <p className="text-2xl font-black">{(stats?.balance ?? 0).toLocaleString('fr-FR')}</p>
          </div>
          <Link href="/recharge">
            <button className="bg-mcdo-yellow text-black text-xs font-bold px-4 py-2 rounded-xl">
              Recharger &gt;
            </button>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-[16px] py-3 flex justify-around shadow-sm">
          {[
            { icon: ArrowDownToLine, label: 'Retrait', href: '/withdraw' },
            { icon: History, label: 'Historique', href: '/history' },
            { icon: CalendarCheck, label: 'Pointage', href: '/checkin' },
          ].map((a) => (
            <Link key={a.label} href={a.href}>
              <div className="flex flex-col items-center gap-1">
                <a.icon className="w-5 h-5 text-mcdo-red" />
                <span className="text-[10px] font-semibold text-gray-600">{a.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* VIP Commission Table */}
        <div className="bg-white rounded-[18px] overflow-hidden shadow-sm">
          <div className="px-4 py-2 border-b border-gray-50">
            <p className="text-xs font-bold text-gray-500">Mes commissions</p>
          </div>
          <table className="w-full text-center text-xs">
            <thead>
              <tr className="border-b border-gray-50">
                <td className="py-2 px-2 text-gray-400 font-medium"></td>
                <td className="py-2 px-2 text-gray-700 font-bold">VIP1</td>
                <td className="py-2 px-2 text-gray-700 font-bold">VIP2</td>
                <td className="py-2 px-2 text-gray-700 font-bold">VIP3</td>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50">
                <td className="py-2 px-2 text-gray-500 font-medium text-left pl-4 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-mcdo-yellow inline" /> Commission
                </td>
                <td className="py-2 text-mcdo-red font-black">36%</td>
                <td className="py-2 text-mcdo-red font-black">1%</td>
                <td className="py-2 text-mcdo-red font-black">1%</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-2 px-2 text-gray-500 font-medium text-left pl-4">
                  <Users className="w-3 h-3 text-gray-400 inline mr-1" />Utilisateurs
                </td>
                <td className="py-2 text-gray-900 font-bold">{team?.vip1.users ?? 0}</td>
                <td className="py-2 text-gray-900 font-bold">{team?.vip2.users ?? 0}</td>
                <td className="py-2 text-gray-900 font-bold">{team?.vip3.users ?? 0}</td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-gray-500 font-medium text-left pl-4">
                  <Wallet className="w-3 h-3 text-gray-400 inline mr-1" />Récompenses
                </td>
                <td className="py-2 text-gray-900 font-bold">{team?.vip1.rewards ?? 0}</td>
                <td className="py-2 text-gray-900 font-bold">{team?.vip2.rewards ?? 0}</td>
                <td className="py-2 text-gray-900 font-bold">{team?.vip3.rewards ?? 0}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Invite Section */}
        <div className="bg-white rounded-[18px] px-4 py-3 shadow-sm space-y-2">
          <p className="text-xs font-bold text-gray-700">Inviter des amis</p>
          {/* Code */}
          <div className="flex items-center justify-between bg-[#F6F7FB] rounded-[12px] px-3 py-2">
            <div>
              <p className="text-[10px] text-gray-400 font-medium">Code d'invitation</p>
              <p className="font-black text-gray-900 text-sm">{team?.referralCode ?? '—'}</p>
            </div>
            <button
              onClick={() => handleCopy(team?.referralCode ?? '')}
              className="bg-mcdo-red text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> COPIER
            </button>
          </div>
          {/* Link */}
          <div className="flex items-center justify-between bg-[#F6F7FB] rounded-[12px] px-3 py-2">
            <div className="flex-1 min-w-0 mr-2">
              <p className="text-[10px] text-gray-400 font-medium">Lien d'invitation</p>
              <p className="font-medium text-gray-700 text-[11px] truncate">{team?.referralLink ?? '—'}</p>
            </div>
            <button
              onClick={() => handleCopy(team?.referralLink ?? '')}
              className="bg-mcdo-red text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"
            >
              <Copy className="w-3 h-3" /> COPIER
            </button>
          </div>
        </div>

        {/* Ma Progression */}
        <div className="bg-white rounded-[18px] px-4 py-3 shadow-sm">
          <p className="text-xs font-bold text-gray-700 mb-2">Ma progression</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#F6F7FB] rounded-[12px] px-3 py-2 text-center">
              <p className="font-black text-gray-900 text-lg">{team?.totalInvited ?? 0}</p>
              <p className="text-[10px] text-gray-400 font-medium">Total des invités</p>
            </div>
            <div className="bg-[#F6F7FB] rounded-[12px] px-3 py-2 text-center">
              <p className="font-black text-gray-900 text-lg">{(team?.totalRewards ?? 0).toLocaleString('fr-FR')}</p>
              <p className="text-[10px] text-gray-400 font-medium">Récompenses obtenues</p>
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="relative h-[80px] rounded-[16px] overflow-hidden">
          <img src="/images/pointage-reward.jpg" alt="frites" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-700/80 to-transparent px-4 flex flex-col justify-center">
            <p className="text-white font-black text-sm">Invitez vos amis</p>
            <p className="text-white/80 text-xs">Gagnez jusqu'à 36% de commission</p>
          </div>
        </div>
      </div>
    </div>
  );
}
