import React from 'react';
import { Link } from 'wouter';
import { Bell, ArrowDownToLine, History, CalendarCheck, Users, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetUserStats } from '@workspace/api-client-react';

export default function Home() {
  const { data: stats, isLoading } = useGetUserStats();

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-7 h-7 animate-spin text-mcdo-red" />
      </div>
    );
  }

  const quickActions = [
    { icon: ArrowDownToLine, label: 'Retrait', href: '/withdraw' },
    { icon: History, label: 'Historique', href: '/history' },
    { icon: CalendarCheck, label: 'Pointage', href: '/checkin' },
    { icon: Users, label: 'Équipe', href: '/team' },
  ];

  return (
    <div className="pb-24 bg-white">
      {/* Header */}
      <header className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium">Bonjour !</p>
          <p className="text-xs text-gray-400">Bienvenue dans votre espace</p>
        </div>
        <div className="w-8 h-8 bg-mcdo-red rounded-lg flex items-center justify-center">
          <span className="text-mcdo-yellow font-black text-base leading-none">M</span>
        </div>
        <button className="w-8 h-8 flex items-center justify-center text-gray-500 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-mcdo-red rounded-full" />
        </button>
      </header>

      <div className="px-4 space-y-3 mt-2">
        {/* Balance Card */}
        <div className="gradient-red rounded-[20px] px-4 py-3 text-white shadow-mcdo flex items-center justify-between">
          <div>
            <p className="text-white/75 text-xs font-medium">Solde du compte</p>
            <p className="text-2xl font-black tracking-tight">
              {stats.balance.toLocaleString('fr-FR')} <span className="text-sm font-bold">XOF</span>
            </p>
          </div>
          <Link href="/recharge">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-mcdo-yellow text-black text-sm font-bold px-4 py-2 rounded-xl"
            >
              Recharger
            </motion.button>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 py-1">
          {quickActions.map((action) => (
            <Link href={action.href} key={action.label}>
              <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 gradient-red rounded-[14px] flex items-center justify-center shadow-sm">
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[11px] font-semibold text-gray-700">{action.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Marquee */}
        <div className="bg-mcdo-red rounded-[14px] overflow-hidden py-2.5 px-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-mcdo-yellow rounded-full shrink-0 animate-pulse" />
          <div className="overflow-hidden flex-1">
            <motion.div
              animate={{ x: [0, -800] }}
              transition={{ ease: 'linear', duration: 18, repeat: Infinity }}
              className="whitespace-nowrap text-white text-xs font-semibold inline-block"
            >
              Investissez dans nos packs &nbsp;·&nbsp; Revenus quotidiens garantis &nbsp;·&nbsp; Retraits automatiques 24/7 &nbsp;·&nbsp; Bonus de bienvenue 500 XOF &nbsp;·&nbsp; Invitez vos amis &nbsp;·&nbsp;
            </motion.div>
          </div>
        </div>

        {/* Pack Banner */}
        <Link href="/products">
          <div className="relative h-[90px] rounded-[18px] overflow-hidden bg-mcdo-red cursor-pointer">
            <div className="absolute right-0 top-0 bottom-0 w-2/5">
              <img src="/images/pack-bigmac.jpg" className="w-full h-full object-cover" alt="Packs" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-transparent" />
            </div>
            <div className="absolute inset-0 px-4 flex flex-col justify-center">
              <p className="text-white font-black text-sm leading-tight">Investissez dans nos packs</p>
              <p className="text-white/70 text-xs mt-0.5">Gagnez des revenus quotidiens</p>
            </div>
          </div>
        </Link>

        {/* Aperçu */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Aperçu</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Revenu total', value: stats.totalEarned, unit: 'XOF', color: 'text-mcdo-red' },
              { label: 'Invest. total', value: stats.activeProducts, unit: 'Pack(s)', color: 'text-gray-900' },
              { label: 'Membres équipe', value: stats.totalInvited, unit: '', color: 'text-gray-900' },
              { label: 'Récompenses', value: stats.totalRewards, unit: 'XOF', color: 'text-mcdo-yellow' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[16px] px-3 py-2.5 shadow-sm">
                <p className="text-gray-400 text-[10px] font-medium mb-0.5">{item.label}</p>
                <p className={`font-black text-base ${item.color}`}>
                  {typeof item.value === 'number' ? item.value.toLocaleString('fr-FR') : item.value}
                  {item.unit && <span className="text-[10px] font-bold ml-1">{item.unit}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
