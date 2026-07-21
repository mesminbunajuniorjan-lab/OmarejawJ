import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGetProfile, useGetUserStats } from '@workspace/api-client-react';
import {
  Loader2, LogOut, Info, BookOpen, Clock, Headset,
  ArrowDownToLine, History as HistoryIcon, CalendarCheck,
  Download, CreditCard, Key, Gift, ChevronRight,
} from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const PLUS_ROW1 = [
  { icon: Info, label: 'À propos', href: '/about' },
  { icon: BookOpen, label: 'Réglement', href: '/rules' },
  { icon: Clock, label: 'Historique', href: '/history' },
  { icon: Headset, label: 'Service client', href: '/support' },
];
const PLUS_ROW2 = [
  { icon: Download, label: 'Télécharger', href: '#' },
  { icon: CreditCard, label: 'Lier une carte bancaire', href: '/bank-accounts' },
  { icon: Key, label: 'Changer le mot de passe', href: '#' },
  { icon: Gift, label: 'Échanger un cadeau', href: '#' },
];

export default function Account() {
  const { logout } = useAuth();
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: stats, isLoading: statsLoading } = useGetUserStats();

  if (profileLoading || statsLoading) {
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
            { icon: HistoryIcon, label: 'Historique', href: '/history' },
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

        {/* Promo Banner */}
        <Link href="/products">
          <div className="relative h-[70px] rounded-[16px] overflow-hidden cursor-pointer">
            <img src="/images/pack-bigmac.jpg" alt="packs" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-800/80 to-transparent px-4 flex flex-col justify-center">
              <p className="text-white font-black text-sm">Investissez dans nos packs</p>
              <p className="text-white/75 text-[10px]">Générez des revenus quotidiens</p>
            </div>
          </div>
        </Link>

        {/* Plus Section Row 1 */}
        <div>
          <p className="text-xs font-bold text-gray-500 mb-2 px-1">Plus</p>
          <div className="grid grid-cols-4 gap-2 mb-2">
            {PLUS_ROW1.map((item) => (
              <Link key={item.label} href={item.href}>
                <motion.div whileTap={{ scale: 0.92 }} className="bg-white rounded-[14px] py-3 flex flex-col items-center gap-1.5 shadow-sm cursor-pointer">
                  <item.icon className="w-5 h-5 text-mcdo-red" />
                  <span className="text-[9px] font-semibold text-gray-600 text-center leading-tight px-1">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {PLUS_ROW2.map((item) => (
              <Link key={item.label} href={item.href}>
                <motion.div whileTap={{ scale: 0.92 }} className="bg-white rounded-[14px] py-3 flex flex-col items-center gap-1.5 shadow-sm cursor-pointer">
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <span className="text-[9px] font-semibold text-gray-600 text-center leading-tight px-1">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Disconnect */}
        <button
          onClick={logout}
          className="w-full bg-white border border-purple-100 rounded-[16px] py-3 flex items-center justify-between px-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4 text-mcdo-red" />
            <span className="text-mcdo-red font-bold text-sm">Déconnexion</span>
          </div>
          <ChevronRight className="w-4 h-4 text-purple-300" />
        </button>
      </div>
    </div>
  );
}
