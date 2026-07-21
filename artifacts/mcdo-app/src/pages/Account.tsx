import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGetProfile, useGetUserStats } from '@workspace/api-client-react';
import { Loader2, LogOut, Info, BookOpen, Clock, Headset, ChevronRight, Settings, ArrowDownToLine, History as HistoryIcon, CalendarCheck } from 'lucide-react';
import { Link } from 'wouter';

export default function Account() {
  const { logout } = useAuth();
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();
  const { data: stats, isLoading: isStatsLoading } = useGetUserStats();

  if (isProfileLoading || isStatsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-mcdo-red" />
      </div>
    );
  }

  const menuItems = [
    { icon: Info, label: 'À propos de nous', href: '/about' },
    { icon: BookOpen, label: 'Règlement', href: '/rules' },
    { icon: Clock, label: 'Historique', href: '/history' },
    { icon: Headset, label: 'Service client', href: '/support' },
    { icon: Settings, label: 'Paramètres du compte', href: '#' },
  ];

  return (
    <div className="pb-24 min-h-[100dvh] bg-[#F6F7FB]">
      {/* Header Profile */}
      <div className="bg-white rounded-b-[32px] pt-8 pb-6 px-6 shadow-sm mb-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-mcdo-red rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-2xl font-black">
                {profile?.phone.slice(0, 1) || 'M'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-900">{profile?.phone}</h2>
                <div className="bg-red-100 text-mcdo-red text-[10px] font-bold px-2 py-0.5 rounded-md">
                  LV{profile?.vipLevel || 1}
                </div>
              </div>
              <p className="text-gray-500 text-sm font-medium">ID: {profile?.id}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 text-mcdo-red rounded-xl hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Balance */}
        <div className="gradient-red rounded-[20px] p-5 text-white shadow-mcdo relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/4" />
          <p className="text-white/80 text-sm font-medium mb-1">Solde Total</p>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold tracking-tight">
              {stats?.balance.toLocaleString('fr-FR')} <span className="text-lg">XOF</span>
            </h2>
            <Link href="/recharge">
              <button className="bg-white text-mcdo-red text-sm font-bold px-4 py-2 rounded-lg shadow-sm">
                Recharger
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-[24px] p-4 shadow-card flex justify-between">
          <Link href="/withdraw" className="flex-1">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <ArrowDownToLine className="w-6 h-6 text-mcdo-red" />
              </div>
              <span className="text-xs font-bold text-gray-700">Retrait</span>
            </div>
          </Link>
          <div className="w-px bg-gray-100" />
          <Link href="/history" className="flex-1">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <HistoryIcon className="w-6 h-6 text-mcdo-red" />
              </div>
              <span className="text-xs font-bold text-gray-700">Historique</span>
            </div>
          </Link>
          <div className="w-px bg-gray-100" />
          <Link href="/checkin" className="flex-1">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <CalendarCheck className="w-6 h-6 text-mcdo-red" />
              </div>
              <span className="text-xs font-bold text-gray-700">Pointage</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="rounded-[20px] overflow-hidden h-24">
          <img src="/images/pack-classic.jpg" alt="Promo" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Menu List */}
      <div className="px-4">
        <div className="bg-white rounded-[24px] overflow-hidden shadow-card">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} href={item.href}>
                <div className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-mcdo-red" />
                    </div>
                    <span className="font-bold text-gray-700">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            );
          })}
          
          <div 
            onClick={logout}
            className="flex items-center justify-between p-4 hover:bg-red-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-mcdo-red" />
              </div>
              <span className="font-bold text-mcdo-red">Déconnexion</span>
            </div>
            <ChevronRight className="w-5 h-5 text-red-300" />
          </div>
        </div>
      </div>
    </div>
  );
}