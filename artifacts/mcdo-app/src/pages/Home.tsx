import React from 'react';
import { useLocation, Link } from 'wouter';
import { Bell, Wallet, ArrowDownToLine, History, CalendarCheck, Users, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetUserStats } from '@workspace/api-client-react';

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: stats, isLoading } = useGetUserStats();

  const quickActions = [
    { icon: ArrowDownToLine, label: 'Retrait', href: '/withdraw', color: 'text-mcdo-red' },
    { icon: History, label: 'Historique', href: '/history', color: 'text-mcdo-red' },
    { icon: CalendarCheck, label: 'Pointage', href: '/checkin', color: 'text-mcdo-red' },
    { icon: Users, label: 'Équipe', href: '/team', color: 'text-mcdo-red' },
  ];

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <Loader2 className="w-8 h-8 animate-spin text-mcdo-red" />
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-xl z-30 px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="w-10 h-10 bg-mcdo-red rounded-xl flex items-center justify-center shadow-md transform rotate-3">
          <span className="text-mcdo-yellow font-bold text-xl leading-none transform -rotate-3">M</span>
        </div>
        
        <Link href="/recharge">
          <div className="flex items-center gap-2 bg-red-50 text-mcdo-red px-3 py-2 rounded-xl font-semibold cursor-pointer hover:bg-red-100 transition-colors">
            <Wallet className="w-4 h-4" />
            <span>{stats.balance.toLocaleString('fr-FR')} XOF</span>
          </div>
        </Link>
      </header>

      {/* Hero Banner */}
      <div className="px-4 py-4">
        <div className="relative h-[220px] rounded-3xl overflow-hidden shadow-card">
          <img 
            src="/images/hero-mcdo.jpg" 
            alt="McDonald's Hero" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero opacity-80 mix-blend-multiply" />
          
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-white/90 text-sm font-medium tracking-wide uppercase mb-1">
                BONJOUR DANS VOTRE ESPACE
              </h2>
              <h1 className="text-white text-2xl font-extrabold leading-tight w-[80%]">
                L'IMAGINATION EST VOTRE SEULE LIMITE
              </h1>
            </div>
            
            <Link href="/recharge">
              <motion.button 
                whileTap={{ scale: 0.97 }}
                className="self-start px-6 py-3 bg-mcdo-yellow text-black font-bold rounded-xl shadow-lg flex items-center gap-2"
              >
                Recharger maintenant
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-4 mb-6">
        <div className="gradient-red rounded-[24px] p-6 text-white shadow-mcdo relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          
          <p className="text-white/80 font-medium mb-1">Solde du compte (XOF)</p>
          <h2 className="text-4xl font-extrabold mb-6 tracking-tight">
            {stats.balance.toLocaleString('fr-FR')}
          </h2>
          
          <div className="flex gap-3">
            <Link href="/recharge" className="flex-1">
              <motion.button 
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 bg-white text-mcdo-red font-bold rounded-xl shadow-sm"
              >
                Recharger
              </motion.button>
            </Link>
            <Link href="/withdraw" className="flex-1">
              <motion.button 
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors"
              >
                Retrait
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-8">
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={i} href={action.href}>
                <motion.div 
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className="w-[60px] h-[60px] bg-red-50 rounded-[20px] flex items-center justify-center">
                    <Icon className={`w-7 h-7 ${action.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{action.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-mcdo-red overflow-hidden py-3 mb-8 shadow-sm">
        <div className="whitespace-nowrap flex text-white font-semibold text-sm">
          <motion.div
            animate={{ x: [0, -1035] }}
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
            className="flex items-center gap-4"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <React.Fragment key={i}>
                <span>Investissez dans nos packs</span>
                <span className="w-1.5 h-1.5 bg-mcdo-yellow rounded-full mx-2" />
                <span>Générez des revenus quotidiens</span>
                <span className="w-1.5 h-1.5 bg-mcdo-yellow rounded-full mx-2" />
                <span>Retraits automatiques</span>
                <span className="w-1.5 h-1.5 bg-mcdo-yellow rounded-full mx-2" />
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Banner Pack */}
      <div className="px-4 mb-8">
        <Link href="/products">
          <div className="relative h-[120px] rounded-2xl overflow-hidden bg-mcdo-red cursor-pointer shadow-card">
            <div className="absolute right-0 top-0 bottom-0 w-1/2">
              <img src="/images/pack-bigmac.jpg" className="w-full h-full object-cover opacity-80" alt="Packs" />
              <div className="absolute inset-0 bg-gradient-to-r from-mcdo-red via-mcdo-red/80 to-transparent" />
            </div>
            <div className="absolute inset-0 p-5 flex flex-col justify-center">
              <h3 className="text-white font-bold text-lg mb-1 relative z-10">Investissez dans nos packs</h3>
              <p className="text-white/80 text-sm relative z-10">Revenus garantis chaque jour</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="px-4">
        <h3 className="font-bold text-gray-900 mb-4 px-1">Aperçu du compte</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-[20px] shadow-card border border-gray-50">
            <p className="text-gray-500 text-xs font-medium mb-1">Revenus totaux</p>
            <p className="text-gray-900 font-bold text-lg">{stats.totalEarned.toLocaleString('fr-FR')} XOF</p>
          </div>
          <div className="bg-white p-4 rounded-[20px] shadow-card border border-gray-50">
            <p className="text-gray-500 text-xs font-medium mb-1">Investissement</p>
            <p className="text-mcdo-red font-bold text-lg">{stats.activeProducts} Pack(s)</p>
          </div>
          <div className="bg-white p-4 rounded-[20px] shadow-card border border-gray-50">
            <p className="text-gray-500 text-xs font-medium mb-1">Membres équipe</p>
            <p className="text-gray-900 font-bold text-lg">{stats.totalInvited}</p>
          </div>
          <div className="bg-white p-4 rounded-[20px] shadow-card border border-gray-50">
            <p className="text-gray-500 text-xs font-medium mb-1">Récompenses</p>
            <p className="text-mcdo-yellow font-bold text-lg drop-shadow-sm">{stats.totalRewards.toLocaleString('fr-FR')} XOF</p>
          </div>
        </div>
      </div>
    </div>
  );
}