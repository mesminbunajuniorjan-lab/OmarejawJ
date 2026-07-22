import React from 'react';
import { Link } from 'wouter';
import {
  Bell,
  ArrowDownToLine,
  History,
  Gift,
  Users,
  Eye,
  Plus,
  ArrowRight,
  Shield,
  Zap,
  Star,
  Wallet,
  Layers,
  UserCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetUserStats } from '@workspace/api-client-react';
/* ─── palette tokens ──────────────────────────────────────────── */
const P1 = '#6A3DF0'; // violet principal
const P2 = '#8A5CFF'; // violet secondaire
const YLW = '#FFC72C'; // jaune

export default function Home() {
  const { data: stats } = useGetUserStats();

  const displayName = 'Mohamed';
  const balance = stats?.balance ?? 0;
  const totalEarned = stats?.totalEarned ?? 0;
  const activePacks = stats?.activeProducts ?? 0;
  const teamMembers = stats?.totalInvited ?? 0;
  const rewards = stats?.totalRewards ?? 0;

  /* Quick actions */
  const quickActions = [
    {
      icon: ArrowDownToLine,
      label: 'Retrait',
      sub: 'Disponible 24/7',
      href: '/withdraw',
    },
    {
      icon: History,
      label: 'Historique',
      sub: 'Toutes activités',
      href: '/history',
    },
    {
      icon: Gift,
      label: 'Pointage',
      sub: 'Récompenses',
      href: '/checkin',
    },
    {
      icon: Users,
      label: 'Équipe',
      sub: 'Vos partenaires',
      href: '/team',
    },
  ];

  /* Aperçu stats */
  const apercu = [
    {
      icon: Wallet,
      label: 'Revenu total',
      value: totalEarned.toLocaleString('fr-FR'),
      unit: 'XOF',
      sub: 'Gains cumulés',
      iconBg: 'rgba(106,61,240,0.12)',
      iconColor: P1,
      valueColor: '#111827',
    },
    {
      icon: Layers,
      label: 'Invest. total',
      value: activePacks.toLocaleString('fr-FR'),
      unit: 'Pack(s)',
      sub: 'Packs actifs',
      iconBg: 'rgba(106,61,240,0.12)',
      iconColor: P1,
      valueColor: '#111827',
    },
    {
      icon: Users,
      label: 'Membres équipe',
      value: teamMembers.toLocaleString('fr-FR'),
      unit: '',
      sub: 'Partenaires actifs',
      iconBg: 'rgba(106,61,240,0.12)',
      iconColor: P1,
      valueColor: '#111827',
    },
    {
      icon: Gift,
      label: 'Récompenses',
      value: rewards.toLocaleString('fr-FR'),
      unit: 'XOF',
      sub: 'Bons et primes',
      iconBg: 'rgba(255,199,44,0.15)',
      iconColor: '#F59E0B',
      valueColor: '#F59E0B',
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-32 overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── STATUS BAR ── */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1">
        <span className="text-sm font-semibold text-[#111827]">12:51</span>
        <div className="flex items-center gap-1.5">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="3" width="3" height="9" rx="1" fill="#111827"/>
            <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#111827"/>
            <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#111827"/>
            <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#111827" opacity="0.3"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.4L15.5 4C13.6 1.8 11 0.5 8 0.5C5 0.5 2.4 1.8 0.5 4L1.8 5.4C3.3 3.6 5.5 2.5 8 2.5Z" fill="#111827"/>
            <path d="M8 5.5C9.8 5.5 11.4 6.3 12.5 7.5L13.8 6.2C12.3 4.6 10.3 3.5 8 3.5C5.7 3.5 3.7 4.6 2.2 6.2L3.5 7.5C4.6 6.3 6.2 5.5 8 5.5Z" fill="#111827"/>
            <circle cx="8" cy="10" r="1.5" fill="#111827"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#111827" strokeOpacity="0.35"/>
            <rect x="2" y="2" width="17" height="8" rx="2" fill="#111827"/>
            <path d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z" fill="#111827" opacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="flex items-center justify-between px-5 pt-2 pb-4">
        {/* Avatar + text */}
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${P1} 0%, ${P2} 100%)`,
              boxShadow: '0 4px 14px rgba(106,61,240,0.35)',
            }}
          >
            <span className="text-white font-bold text-base leading-none">M</span>
          </div>
          <div>
            <p className="text-[15px] font-bold text-[#111827] leading-tight">
              Bonjour, {displayName} !
            </p>
            <p className="text-[12px] text-[#6B7280] leading-tight mt-0.5">
              Bienvenue dans votre espace
            </p>
          </div>
        </div>

        {/* Bell */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative w-10 h-10 flex items-center justify-center rounded-2xl bg-white"
          style={{ boxShadow: '0 2px 10px rgba(72,72,120,0.10)' }}
        >
          <Bell className="w-5 h-5 text-[#374151]" strokeWidth={1.8} />
          <span
            className="absolute top-1.5 right-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-white text-[9px] font-bold"
            style={{ background: P1, fontSize: 9 }}
          >
            3
          </span>
        </motion.button>
      </header>

      <div className="px-4 space-y-4">

        {/* ── BALANCE CARD ── */}
        <div
          className="rounded-[30px] px-5 py-5 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #5B21FF 0%, #6A3DF0 40%, #7C3AED 100%)`,
            boxShadow: '0 12px 40px rgba(72,72,120,0.22)',
          }}
        >
          {/* Decorative light blobs */}
          <div
            className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)', transform: 'translate(20%, -30%)' }}
          />
          <div
            className="absolute bottom-0 left-10 w-28 h-28 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #C4B5FD 0%, transparent 70%)', transform: 'translateY(40%)' }}
          />

          <p className="text-white/70 text-[12px] font-medium mb-2">Solde du compte</p>

          <div className="flex items-center justify-between">
            {/* Amount */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-black text-[40px] leading-none">
                  {balance.toLocaleString('fr-FR')}
                </span>
                <span className="text-white/80 font-bold text-[18px] leading-none self-end mb-1">XOF</span>
                <button className="mb-1">
                  <Eye className="w-4 h-4 text-white/60" strokeWidth={1.8} />
                </button>
              </div>
              <p className="text-white/60 text-[12px] font-medium mt-1">Solde disponible</p>
            </div>

            {/* Recharger button */}
            <Link href="/recharge">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-[14px]"
                style={{
                  background: YLW,
                  color: '#111827',
                  boxShadow: '0 4px 16px rgba(255,199,44,0.35)',
                }}
              >
                Recharger
                <span
                  className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                >
                  <Plus className="w-3.5 h-3.5 text-[#111827]" strokeWidth={2.5} />
                </span>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div
                    className="w-full aspect-square rounded-[22px] flex items-center justify-center bg-white"
                    style={{
                      boxShadow: '0 12px 40px rgba(72,72,120,0.10)',
                      border: '1px solid #ECECF4',
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: P1 }}
                      strokeWidth={1.8}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[12px] font-semibold text-[#111827] leading-tight">{action.label}</p>
                    <p className="text-[10px] text-[#6B7280] leading-tight mt-0.5">{action.sub}</p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* ── ADVANTAGES BAR ── */}
        <div
          className="rounded-[22px] bg-white px-4 py-3"
          style={{
            boxShadow: '0 12px 40px rgba(72,72,120,0.09)',
            border: '1px solid #ECECF4',
          }}
        >
          <div className="flex items-stretch">
            {/* Col 1 */}
            <div className="flex-1 flex flex-col items-center justify-center gap-1 text-center">
              <Shield className="w-5 h-5" style={{ color: P1 }} strokeWidth={1.8} />
              <p className="text-[11px] font-semibold text-[#111827] leading-tight">Biens garantis</p>
            </div>

            <div className="w-px bg-[#ECECF4] self-stretch" />

            {/* Col 2 */}
            <div className="flex-1 flex flex-col items-center justify-center gap-1 text-center px-1">
              <Zap className="w-5 h-5" style={{ color: P1 }} strokeWidth={1.8} />
              <p className="text-[11px] font-semibold text-[#111827] leading-tight">Retraits automatiques 24/7</p>
            </div>

            <div className="w-px bg-[#ECECF4] self-stretch" />

            {/* Col 3 */}
            <div className="flex-1 flex flex-col items-center justify-center gap-1 text-center">
              <Star className="w-5 h-5" style={{ color: P1 }} strokeWidth={1.8} />
              <p className="text-[11px] font-semibold text-[#111827] leading-tight">Bonus de bienvenue jusqu'à 50%</p>
            </div>
          </div>
        </div>

        {/* ── MAIN BANNER ── */}
        <Link href="/products">
          <motion.div
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="rounded-[22px] overflow-hidden cursor-pointer relative"
            style={{
              background: `linear-gradient(130deg, #5B21FF 0%, #6A3DF0 50%, #7C3AED 100%)`,
              boxShadow: '0 12px 40px rgba(72,72,120,0.22)',
              minHeight: 160,
            }}
          >
            {/* Purple glow behind burger */}
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(138,92,255,0.5) 0%, transparent 70%)',
                transform: 'translate(20%, -20%)',
              }}
            />

            {/* McDonald's M logo */}
            <div
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: '#DA291C' }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill={YLW}>
                <path d="M2 20V6.5C2 4 3.8 2 6 2s3.5 1.6 4 3.8C10.5 3.6 11.8 2 14 2s4 2 4 4.5V20h-3.5V8c0-.8-.6-1.5-1.5-1.5s-1.5.7-1.5 1.5v12h-2V8c0-.8-.6-1.5-1.5-1.5S6.5 7.2 6.5 8v12H2z"/>
              </svg>
            </div>

            {/* Burger image on right */}
            <div className="absolute right-0 top-0 bottom-0 w-[52%]">
              <img
                src="/images/pack-bigmac.jpg"
                alt="McDonald's Burger"
                className="w-full h-full object-cover object-center"
                style={{ opacity: 1 }}
              />
              {/* left fade */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, #5B21FF 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Text content */}
            <div className="relative z-10 px-5 py-5 w-[58%]">
              <h3 className="text-white font-black text-[22px] leading-[1.15] mb-1">
                Investissez dans nos packs
              </h3>
              <p className="text-white/75 text-[12px] font-medium mb-4">
                Gagnez des revenus quotidiens
              </p>

              <motion.div
                className="inline-flex items-center gap-2 bg-white/95 rounded-full px-4 py-2"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[13px] font-semibold" style={{ color: P1 }}>
                  Découvrir les packs
                </span>
                <ArrowRight className="w-3.5 h-3.5" style={{ color: P1 }} strokeWidth={2.5} />
              </motion.div>
            </div>
          </motion.div>
        </Link>

        {/* ── APERÇU ── */}
        <div>
          <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-3 px-0.5">
            APERÇU
          </p>
          <div className="grid grid-cols-2 gap-3">
            {apercu.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-white rounded-[22px] px-4 py-4 flex items-start gap-3"
                  style={{
                    boxShadow: '0 12px 40px rgba(72,72,120,0.10)',
                    border: '1px solid #ECECF4',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Circular icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: item.iconBg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.iconColor }} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#6B7280] font-medium leading-tight mb-1">
                      {item.label}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="font-black text-[20px] leading-none"
                        style={{ color: item.valueColor }}
                      >
                        {item.value}
                      </span>
                      {item.unit && (
                        <span
                          className="font-bold text-[11px]"
                          style={{ color: item.valueColor }}
                        >
                          {item.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#9CA3AF] font-medium mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
