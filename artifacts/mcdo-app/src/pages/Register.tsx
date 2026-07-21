import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Lock, Eye, EyeOff, Gift, ChevronDown, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useRegister } from '@workspace/api-client-react';
import { toast } from 'sonner';

const P1 = '#6A3DF0';
const P2 = '#8A5CFF';
const YLW = '#FFC72C';

const COUNTRIES = [
  { code: '+229', flag: '🇧🇯', name: 'Bénin' },
  { code: '+225', flag: '🇨🇮', name: "Côte d'Ivoire" },
  { code: '+237', flag: '🇨🇲', name: 'Cameroun' },
  { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
  { code: '+221', flag: '🇸🇳', name: 'Sénégal' },
  { code: '+223', flag: '🇲🇱', name: 'Mali' },
  { code: '+227', flag: '🇳🇪', name: 'Niger' },
  { code: '+228', flag: '🇹🇬', name: 'Togo' },
  { code: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
];

function AppIcon({ size = 72 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: `linear-gradient(145deg, ${P2} 0%, ${P1} 100%)`,
        boxShadow: `0 12px 32px rgba(106,61,240,0.38)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 40 40" width={size * 0.6} height={size * 0.6} fill="none">
        <path
          d="M20 25.5c-.35 0-.66-.19-.82-.5l-4.9-9.4c-.32-.6-1.15-.63-1.5-.04L7.9 24.5c-.18.3-.49.47-.82.45l-1.08-.07c-.78-.05-1.27-.87-.88-1.54l6.47-10.7c.6-1 1.86-1.12 2.47-.29L18.3 19c.41.56 1.22.56 1.63 0l4.24-6.65c.61-.83 1.87-.71 2.47.29l6.47 10.7c.39.67-.1 1.49-.88 1.54l-1.08.07c-.33.02-.64-.15-.82-.45l-4.88-8.94c-.35-.59-1.18-.56-1.5.04L20.82 25c-.16.31-.47.5-.82.5Z"
          fill={YLW}
        />
        <path
          d="M20 33.5c-.35 0-.66-.19-.82-.5l-4.9-9.4c-.32-.6-1.15-.63-1.5-.04l-4.88 8.94c-.18.3-.49.47-.82.45l-1.08-.07c-.78-.05-1.27-.87-.88-1.54l6.47-10.7c.6-1 1.86-1.12 2.47-.29L18.3 27c.41.56 1.22.56 1.63 0l4.24-6.65c.61-.83 1.87-.71 2.47.29l6.47 10.7c.39.67-.1 1.49-.88 1.54l-1.08.07c-.33.02-.64-.15-.82-.45l-4.88-8.94c-.35-.59-1.18-.56-1.5.04L20.82 33c-.16.31-.47.5-.82.5Z"
          fill={YLW}
          opacity={0.7}
        />
      </svg>
    </div>
  );
}

function InputField({
  icon: Icon,
  iconColor = P1,
  placeholder,
  type = 'text',
  value,
  onChange,
  rightSlot,
}: {
  icon: React.ElementType;
  iconColor?: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center h-[48px] rounded-2xl px-4 gap-3 bg-white"
      style={{ border: '1.5px solid #ECECF4', boxShadow: '0 2px 8px rgba(72,72,120,0.05)' }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" style={{ color: iconColor }} strokeWidth={1.8} />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-[14px] font-medium text-[#111827] placeholder:text-[#9CA3AF]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      />
      {rightSlot}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  link,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  link?: string;
}) {
  return (
    <div className="flex items-start gap-3 cursor-pointer" onClick={onChange}>
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          background: checked ? P1 : 'white',
          border: checked ? `2px solid ${P1}` : '2px solid #D1D5DB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-[13px] font-medium text-[#374151] leading-snug select-none">
        {label}{' '}
        {link && <span className="font-semibold" style={{ color: P1 }}>{link}</span>}
      </span>
    </div>
  );
}

export default function Register() {
  const [, setLocation] = useLocation();
  const { login: setAuthToken } = useAuth();
  const registerMutation = useRegister();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [countryCode, setCountryCode] = useState(COUNTRIES[0].code);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCountrySheet, setShowCountrySheet] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [acceptOffers, setAcceptOffers] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password || !confirmPassword) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      const data = await registerMutation.mutateAsync({
        data: { phone, password, countryCode, referralCode: referralCode || null },
      });
      toast.success('Inscription réussie');
      setAuthToken(data.token);
      setLocation('/');
    } catch {
      toast.error("Erreur lors de l'inscription");
    }
  };

  return (
    <div
      className="h-[100dvh] flex flex-col relative overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif', background: 'white' }}
    >
      {/* ═══════════════════════════════════════════════════════════
          HERO HEADER — restaurant peu flou + 1 burger + badge m centré
          ═══════════════════════════════════════════════════════════ */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ height: 180 }}
      >
        {/* Restaurant background — flou léger */}
        <img
          src="/images/mcdo-restaurant.jpg"
          alt=""
          style={{
            position: 'absolute',
            inset: '-12px',
            width: 'calc(100% + 24px)',
            height: 'calc(100% + 24px)',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            opacity: 0.70,
            filter: 'blur(2px)',
          }}
        />
        {/* Overlay lavande → blanc */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(232,228,255,0.30) 0%, rgba(240,237,255,0.45) 60%, rgba(255,255,255,1) 100%)',
          }}
        />

        {/* Bouton retour */}
        <button
          onClick={() => setLocation('/login')}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white flex items-center justify-center z-20"
          style={{ boxShadow: '0 2px 10px rgba(72,72,120,0.14)', border: '1px solid #ECECF4' }}
        >
          <ArrowLeft className="w-4 h-4 text-[#374151]" strokeWidth={2} />
        </button>

        {/* App icon — milieu gauche */}
        <div className="absolute z-10" style={{ top: '50%', left: 16, transform: 'translateY(-50%)' }}>
          <AppIcon size={68} />
        </div>

        {/* Burger seul — droite, centré verticalement */}
        <img
          src="/images/pack-bigmac.jpg"
          alt="Burger"
          className="absolute z-10"
          style={{
            top: '50%',
            right: 24,
            transform: 'translateY(-55%)',
            width: 110,
            height: 110,
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: 20,
            boxShadow: '0 6px 20px rgba(0,0,0,0.22)',
          }}
        />

        {/* Badge "m" McDonald's — centré horizontalement, bas de l'en-tête */}
        <div
          className="absolute z-20"
          style={{
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 34,
            height: 34,
            borderRadius: 10,
            background: '#DA291C',
            boxShadow: '0 4px 12px rgba(218,41,28,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 24 24" width="19" height="19" fill={YLW}>
            <path d="M2 20V6.5C2 4 3.8 2 6 2s3.5 1.6 4 3.8C10.5 3.6 11.8 2 14 2s4 2 4 4.5V20h-3.5V8c0-.8-.6-1.5-1.5-1.5s-1.5.7-1.5 1.5v12h-2V8c0-.8-.6-1.5-1.5-1.5S6.5 7.2 6.5 8v12H2z" />
          </svg>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          FORMULAIRE — compact pour tenir dans 100dvh
          ═══════════════════════════════════════════════════════════ */}
      <div className="flex-1 px-5 pt-3 pb-4 overflow-y-auto">
        {/* Titre */}
        <div className="mb-3">
          <h1 className="text-[24px] font-black text-[#111827] leading-tight">
            Créer un compte <span>✨</span>
          </h1>
          <p className="text-[12px] text-[#6B7280] font-medium mt-0.5">
            Rejoignez-nous et commencez à investir
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Pays + téléphone */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowCountrySheet(true)}
              className="flex items-center gap-1.5 px-3 h-[48px] rounded-2xl bg-white flex-shrink-0"
              style={{ border: '1.5px solid #ECECF4', boxShadow: '0 2px 8px rgba(72,72,120,0.05)' }}
            >
              <span className="text-[18px] leading-none">{selectedCountry.flag}</span>
              <ChevronDown className="w-3 h-3 text-[#6B7280]" strokeWidth={2.5} />
            </button>
            <div
              className="flex-1 flex items-center h-[48px] rounded-2xl px-3 gap-2 bg-white"
              style={{ border: '1.5px solid #ECECF4', boxShadow: '0 2px 8px rgba(72,72,120,0.05)' }}
            >
              <span className="text-[12px] font-semibold text-[#374151] flex-shrink-0">{selectedCountry.code}</span>
              <div className="w-px h-4 bg-[#ECECF4]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Numéro de téléphone"
                className="flex-1 bg-transparent outline-none text-[13px] font-medium text-[#111827] placeholder:text-[#9CA3AF]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>

          <InputField
            icon={Lock}
            placeholder="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
            rightSlot={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#9CA3AF]">
                {showPassword ? <EyeOff className="w-4 h-4" strokeWidth={1.8} /> : <Eye className="w-4 h-4" strokeWidth={1.8} />}
              </button>
            }
          />

          <InputField
            icon={Lock}
            placeholder="Confirmer le mot de passe"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={setConfirmPassword}
            rightSlot={
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-[#9CA3AF]">
                {showConfirmPassword ? <EyeOff className="w-4 h-4" strokeWidth={1.8} /> : <Eye className="w-4 h-4" strokeWidth={1.8} />}
              </button>
            }
          />

          <InputField
            icon={Gift}
            iconColor={YLW}
            placeholder="Code de parrainage (Optionnel)"
            value={referralCode}
            onChange={setReferralCode}
          />

          {/* Checkboxes */}
          <div className="space-y-2 pt-0.5">
            <Checkbox
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
              label="J'accepte les"
              link="Conditions d'utilisation"
            />
            <Checkbox
              checked={acceptOffers}
              onChange={() => setAcceptOffers(!acceptOffers)}
              label="J'accepte de recevoir des offres et actualités"
            />
          </div>

          {/* Bouton inscription */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full h-[52px] rounded-[16px] flex items-center justify-between px-6 font-bold text-[15px] text-white"
            style={{
              background: `linear-gradient(135deg, ${P1} 0%, ${P2} 100%)`,
              boxShadow: `0 8px 26px rgba(106,61,240,0.40)`,
            }}
          >
            <span className="flex-1 text-center">
              {registerMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "S'inscrire"
              )}
            </span>
            {!registerMutation.isPending && <ArrowRight className="w-5 h-5" strokeWidth={2.5} />}
          </motion.button>
        </form>

        <div className="mt-3 text-center">
          <p className="text-[13px] font-medium text-[#6B7280]">
            Déjà un compte ?{' '}
            <Link href="/login">
              <span className="font-bold" style={{ color: P1 }}>Se connecter</span>
            </Link>
          </p>
        </div>
      </div>

      {/* ── Bottom sheet pays ── */}
      <AnimatePresence>
        {showCountrySheet && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCountrySheet(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[70vh] overflow-hidden flex flex-col"
            >
              <div className="p-4 flex justify-center">
                <div className="w-10 h-1 bg-[#ECECF4] rounded-full" />
              </div>
              <div className="px-5 pb-2">
                <h3 className="text-[17px] font-bold text-[#111827]">Sélectionner un pays</h3>
              </div>
              <div className="overflow-y-auto px-5 pb-8">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => { setCountryCode(country.code); setShowCountrySheet(false); }}
                    className="w-full flex items-center justify-between py-3.5 border-b border-[#F6F7FB] last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="text-[14px] font-semibold text-[#111827]">{country.name}</span>
                    </div>
                    <span className="text-[13px] font-medium text-[#6B7280]">{country.code}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
