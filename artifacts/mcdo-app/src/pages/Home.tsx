import React from 'react';
import { Link } from 'wouter';
import {
  ArrowDownToLine,
  History,
  CalendarCheck2,
  Info,
  BookOpen,
  Clock,
  Headphones,
  Download,
  CreditCard,
  KeyRound,
  Gift,
  Shield,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useGetUserStats } from '@workspace/api-client-react';
import { useAuth } from '../context/AuthContext';

const P1 = '#6A3DF0';
const YLW = '#FFC72C';
const DARK_BG = '#0C0C18';

/* ─── Shield decorative (balance card right side) ─── */
function ShieldDecor() {
  return (
    <div style={{ position: 'relative', width: 90, height: 90, flexShrink: 0 }}>
      {/* Card behind-left */}
      <div style={{
        position: 'absolute', top: 4, left: 0,
        width: 72, height: 48, borderRadius: 10,
        background: 'rgba(255,255,255,0.10)',
        transform: 'rotate(-12deg)',
      }} />
      {/* Card behind-right */}
      <div style={{
        position: 'absolute', top: 12, left: 10,
        width: 72, height: 48, borderRadius: 10,
        background: 'rgba(255,255,255,0.08)',
        transform: 'rotate(-4deg)',
      }} />
      {/* Shield + checkmark */}
      <div style={{
        position: 'absolute', bottom: 0, left: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 56, height: 56,
      }}>
        <svg viewBox="0 0 56 56" width="56" height="56" fill="none">
          <path
            d="M28 4L8 12V28C8 39.05 16.82 49.35 28 52C39.18 49.35 48 39.05 48 28V12L28 4Z"
            fill="rgba(255,255,255,0.18)"
            stroke="rgba(255,255,255,0.30)"
            strokeWidth="1.5"
          />
          <path
            d="M19 28L24.5 33.5L37 21"
            stroke="rgba(255,255,255,0.70)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ─── Service card ─── */
function ServiceCard({
  icon: Icon,
  label,
  sub,
  iconBg,
  iconColor,
  href = '#',
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  iconBg: string;
  iconColor: string;
  href?: string;
}) {
  return (
    <Link href={href}>
      <div style={{
        background: 'white',
        borderRadius: 16,
        padding: '14px 6px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        boxShadow: '0 2px 12px rgba(72,72,120,0.08)',
        border: '1px solid #F0F0F6',
        cursor: 'pointer',
        minHeight: 100,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon style={{ width: 20, height: 20, color: iconColor }} strokeWidth={1.8} />
        </div>
        <p style={{
          fontSize: 11, fontWeight: 700, color: '#111827',
          textAlign: 'center', lineHeight: 1.3, margin: 0,
        }}>{label}</p>
        <p style={{
          fontSize: 10, color: '#9CA3AF',
          textAlign: 'center', lineHeight: 1.3, margin: 0,
        }}>{sub}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  const { data: stats } = useGetUserStats();
  const { logout } = useAuth();

  const balance = stats?.balance ?? 0;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#F5F5FA', minHeight: '100vh', paddingBottom: 110 }}>

      {/* ══════════════════════════════════════════
          DARK TOP SECTION
          ══════════════════════════════════════════ */}
      <div style={{ background: DARK_BG }}>

        {/* Status bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px 4px',
        }}>
          <span style={{ color: 'white', fontSize: 15, fontWeight: 600 }}>06:43</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {/* Signal bars */}
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
              <rect x="0" y="7" width="3" height="6" rx="1" fill="white"/>
              <rect x="5" y="5" width="3" height="8" rx="1" fill="white"/>
              <rect x="10" y="2.5" width="3" height="10.5" rx="1" fill="white"/>
              <rect x="15" y="0" width="3" height="13" rx="1" fill="white" opacity="0.3"/>
            </svg>
            <span style={{ color: 'white', fontSize: 10, fontWeight: 600 }}>3G</span>
            <span style={{ color: 'white', fontSize: 10, fontWeight: 600 }}>4G</span>
            {/* Battery */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: 24, height: 12, borderRadius: 3,
                border: '1.5px solid rgba(255,255,255,0.55)',
                display: 'flex', alignItems: 'center', padding: '1.5px 1.5px',
              }}>
                <div style={{ width: 16, height: 7, background: 'white', borderRadius: 1.5 }} />
              </div>
              <div style={{
                position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)',
                width: 2.5, height: 5, background: 'rgba(255,255,255,0.5)', borderRadius: '0 1px 1px 0',
              }} />
              {/* Red badge */}
              <div style={{
                marginLeft: 4,
                width: 20, height: 14, borderRadius: 4,
                background: '#E53E3E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontSize: 9, fontWeight: 700 }}>20</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header: Lv1 + Déconnexion */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 20px 14px',
        }}>
          {/* Lv1 badge */}
          <div style={{
            background: P1, borderRadius: 22,
            padding: '6px 18px',
          }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Lv1</span>
          </div>

          {/* Déconnexion */}
          <button
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              color: 'white', fontWeight: 600, fontSize: 14,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            Déconnexion
            <LogOut style={{ width: 16, height: 16 }} strokeWidth={2} />
          </button>
        </div>

        {/* Balance Card */}
        <div style={{ padding: '0 14px 20px' }}>
          <div style={{
            borderRadius: 22,
            padding: '18px 18px 16px',
            background: 'linear-gradient(135deg, #4B1CC8 0%, #5930E8 30%, #6A3DF0 60%, #8050FF 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 36px rgba(75,28,200,0.50)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Sparkle top */}
            <span style={{
              position: 'absolute', top: 16, right: 108,
              color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1,
            }}>✦</span>
            <span style={{
              position: 'absolute', top: 32, right: 140,
              color: 'rgba(255,255,255,0.25)', fontSize: 8, lineHeight: 1,
            }}>✦</span>

            {/* Solde du compte */}
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 500, margin: '0 0 6px' }}>
              Solde du compte
            </p>

            {/* Amount row + Recharger */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              {/* Left: amount */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: 50, lineHeight: 1 }}>
                  {balance === 0 ? '0' : balance.toLocaleString('fr-FR')}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.80)', fontWeight: 700, fontSize: 17, lineHeight: 1 }}>
                  FCFA
                </span>
              </div>

              {/* Recharger button */}
              <Link href="/recharge">
                <button style={{
                  background: YLW,
                  borderRadius: 50,
                  padding: '11px 20px',
                  display: 'flex', alignItems: 'center', gap: 4,
                  color: '#111827', fontWeight: 700, fontSize: 14,
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(255,199,44,0.45)',
                  whiteSpace: 'nowrap',
                }}>
                  Recharger
                  <ChevronRight style={{ width: 16, height: 16, strokeWidth: 2.5 }} />
                </button>
              </Link>
            </div>

            {/* Niveau */}
            <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: 11, fontWeight: 500, margin: 0 }}>
              Niveau 1 · Compte Standard
            </p>

            {/* Decorative shield (absolute right) */}
            <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-52%)' }}>
              <ShieldDecor />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          WHITE BODY
          ══════════════════════════════════════════ */}
      <div style={{ background: 'white' }}>

        {/* ── Quick Actions ── */}
        <div style={{ padding: '16px 14px 0' }}>
          <div style={{
            background: 'white',
            borderRadius: 20,
            padding: '18px 0',
            boxShadow: '0 4px 24px rgba(72,72,120,0.10)',
            border: '1px solid #F0F0F6',
          }}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>

              {/* Retrait */}
              <Link href="/withdraw" style={{ flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '0 8px' }}>
                  <ArrowDownToLine style={{ width: 26, height: 26, color: P1 }} strokeWidth={1.8} />
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', textAlign: 'center', margin: 0 }}>Retrait</p>
                  <p style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', margin: 0 }}>Retirer vos gains</p>
                </div>
              </Link>

              {/* Divider */}
              <div style={{ width: 1, background: '#F0F0F6', alignSelf: 'stretch', margin: '4px 0' }} />

              {/* Historique */}
              <Link href="/history" style={{ flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '0 8px' }}>
                  <History style={{ width: 26, height: 26, color: P1 }} strokeWidth={1.8} />
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', textAlign: 'center', margin: 0 }}>Historique</p>
                  <p style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', margin: 0 }}>Voir vos transactions</p>
                </div>
              </Link>

              {/* Divider */}
              <div style={{ width: 1, background: '#F0F0F6', alignSelf: 'stretch', margin: '4px 0' }} />

              {/* Pointage */}
              <Link href="/checkin" style={{ flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '0 8px' }}>
                  <CalendarCheck2 style={{ width: 26, height: 26, color: P1 }} strokeWidth={1.8} />
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', textAlign: 'center', margin: 0 }}>Pointage</p>
                  <p style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', margin: 0 }}>Vos activités</p>
                </div>
              </Link>

            </div>
          </div>
        </div>

        {/* ── Banner ── */}
        <div style={{ padding: '14px 14px 0' }}>
          <div style={{
            borderRadius: 20,
            overflow: 'hidden',
            background: '#111118',
            position: 'relative',
            minHeight: 168,
          }}>
            {/* Text content */}
            <div style={{ padding: '22px 20px 20px', position: 'relative', zIndex: 2, width: '55%' }}>
              <h3 style={{
                color: 'white', fontWeight: 900, fontSize: 19,
                lineHeight: 1.25, margin: '0 0 6px',
              }}>
                Investissez dans nos packs
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.72)', fontSize: 12, fontWeight: 500,
                margin: '0 0 18px',
              }}>
                Générez des revenus quotidiens
              </p>
              <Link href="/products">
                <button style={{
                  background: YLW,
                  borderRadius: 50,
                  padding: '10px 18px',
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  color: '#111827', fontWeight: 700, fontSize: 13,
                  border: 'none', cursor: 'pointer',
                }}>
                  Découvrir
                  <ChevronRight style={{ width: 14, height: 14, strokeWidth: 2.5 }} />
                </button>
              </Link>
            </div>

            {/* Burger image */}
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '52%' }}>
              <img
                src="/images/pack-bigmac.jpg"
                alt="Burger"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
              {/* Dark left fade */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, #111118 0%, rgba(17,17,24,0.55) 50%, transparent 100%)',
              }} />
            </div>

            {/* Pagination dot */}
            <div style={{
              position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
              width: 8, height: 8, borderRadius: '50%', background: 'white',
            }} />
          </div>
        </div>

        {/* ── Plus de services ── */}
        <div style={{ padding: '20px 14px 10px' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>
            Plus de services
          </h2>
        </div>

        {/* Service Grid Row 1 */}
        <div style={{ padding: '0 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
            <ServiceCard icon={Info}       label="À propos"       sub="En savoir plus"        iconBg="rgba(106,61,240,0.12)" iconColor={P1}      href="/about" />
            <ServiceCard icon={BookOpen}   label="Règlement"      sub="Lire les règles"       iconBg="rgba(106,61,240,0.12)" iconColor={P1}      href="/rules" />
            <ServiceCard icon={Clock}      label="Historique"     sub="Activités du compte"   iconBg="rgba(106,61,240,0.12)" iconColor={P1}      href="/history" />
            <ServiceCard icon={Headphones} label="Service client" sub="Assistance 24/7"       iconBg="rgba(106,61,240,0.12)" iconColor={P1}      href="/support" />
          </div>

          {/* Service Grid Row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            <ServiceCard icon={Download}   label="Télécharger"              sub="Télécharger l'app"     iconBg="rgba(34,197,94,0.12)"  iconColor="#22C55E" href="#" />
            <ServiceCard icon={CreditCard} label="Lier une carte bancaire"  sub="Sécurisez vos retraits" iconBg="rgba(59,130,246,0.12)" iconColor="#3B82F6" href="#" />
            <ServiceCard icon={KeyRound}   label="Changer le mot de passe"  sub="Sécurisez votre compte" iconBg="rgba(245,158,11,0.12)" iconColor="#F59E0B" href="#" />
            <ServiceCard icon={Gift}       label="Échanger un cadeau"       sub="Utilisez votre code"   iconBg="rgba(239,68,68,0.12)"  iconColor="#EF4444" href="#" />
          </div>
        </div>

        {/* ── Security Banner ── */}
        <div style={{ padding: '20px 14px 0' }}>
          <div style={{
            background: '#151528',
            borderRadius: 18,
            padding: '16px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}>
            {/* Left: icon + text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'rgba(106,61,240,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Shield style={{ width: 20, height: 20, color: P1 }} strokeWidth={1.8} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ color: 'white', fontWeight: 700, fontSize: 13, margin: '0 0 2px', lineHeight: 1.3 }}>
                  Votre sécurité, notre priorité
                </p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, margin: 0, lineHeight: 1.3 }}>
                  Gardez vos informations en sécurité
                </p>
              </div>
            </div>

            {/* Right: Déconnexion button */}
            <button
              onClick={logout}
              style={{
                background: P1,
                borderRadius: 50,
                padding: '10px 16px',
                display: 'flex', alignItems: 'center', gap: 5,
                color: 'white', fontWeight: 600, fontSize: 13,
                border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              Déconnexion
              <LogOut style={{ width: 14, height: 14 }} strokeWidth={2} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
