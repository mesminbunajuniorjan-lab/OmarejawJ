import React, { useState } from 'react';
import { Link } from 'wouter';
import { Phone, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLogin } from '@workspace/api-client-react';
import { toast } from 'sonner';

const P1 = '#6A3DF0';
const P2 = '#8A5CFF';
const YLW = '#FFC72C';

/* ── App icon ── */
function AppIcon({ size = 80 }: { size?: number }) {
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

/* ── Input field ── */
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
      className="flex items-center h-[56px] rounded-2xl px-4 gap-3 bg-white"
      style={{
        border: '1.5px solid #ECECF4',
        boxShadow: '0 2px 8px rgba(72,72,120,0.06)',
      }}
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

export default function Login() {
  const { login: setAuthToken } = useAuth();
  const loginMutation = useLogin();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    try {
      const data = await loginMutation.mutateAsync({ data: { phone, password } });
      toast.success('Connexion réussie');
      setAuthToken(data.token);
    } catch {
      toast.error('Identifiants incorrects');
    }
  };

  return (
    <div
      className="min-h-[100dvh] relative overflow-hidden bg-white flex flex-col"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* ── RESTAURANT PHOTO FLOUE (derrière titre) ── */}
      <div
        className="absolute left-0 right-0 overflow-hidden pointer-events-none select-none"
        style={{ top: 120, height: 220 }}
      >
        {/* Image agrandie pour éviter les bords flous visibles */}
        <img
          src="/images/mcdo-restaurant.jpg"
          alt=""
          className="absolute object-cover object-center"
          style={{
            inset: '-20px',
            width: 'calc(100% + 40px)',
            height: 'calc(100% + 40px)',
            opacity: 0.22,
            filter: 'blur(26px) grayscale(20%)',
          }}
        />
        {/* Dégradé blanc pour lisibilité */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.95) 100%)',
          }}
        />
      </div>

      {/* ── BOTTOM FOOD IMAGES ── */}
      {/* Fries — bottom left */}
      <div className="absolute bottom-0 left-0 w-[130px] h-[160px] pointer-events-none select-none z-0">
        <img
          src="/images/pack-classic.jpg"
          alt="Frites"
          className="w-full h-full object-cover object-top"
          style={{ borderTopRightRadius: 24 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 60%, #ffffff 100%)',
            borderTopRightRadius: 24,
          }}
        />
      </div>
      {/* Burger + cup — bottom right */}
      <div className="absolute bottom-0 right-0 w-[150px] h-[150px] pointer-events-none select-none z-0">
        <img
          src="/images/pack-bigmac.jpg"
          alt="Burger"
          className="w-[110px] h-[110px] object-cover rounded-tl-3xl absolute bottom-0 right-8"
        />
        <img
          src="/images/mcdo-cup.png"
          alt="Coca-Cola"
          className="w-[70px] h-[90px] object-contain absolute bottom-0 right-0"
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-10 pb-8">
        {/* App icon */}
        <div className="flex justify-center mb-6">
          <AppIcon size={88} />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-[30px] font-black text-[#111827] leading-tight mb-2">
            Bon retour <span>👋</span>
          </h1>
          <p className="text-[14px] text-[#6B7280] font-medium">
            Ravi de vous revoir parmi nous
          </p>
        </div>

        {/* Spacer for faded restaurant image */}
        <div className="h-[80px]" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <InputField
            icon={Phone}
            placeholder="Numéro de téléphone"
            type="tel"
            value={phone}
            onChange={setPhone}
          />

          <InputField
            icon={Lock}
            placeholder="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#9CA3AF] hover:text-[#6B7280]"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" strokeWidth={1.8} />
                ) : (
                  <Eye className="w-5 h-5" strokeWidth={1.8} />
                )}
              </button>
            }
          />

          {/* Remember me + forgot */}
          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className="w-5 h-5 rounded-[6px] flex items-center justify-center cursor-pointer"
                style={{
                  background: rememberMe ? P1 : 'white',
                  border: rememberMe ? `2px solid ${P1}` : '2px solid #ECECF4',
                  transition: 'all 0.2s',
                }}
                onClick={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-[13px] font-medium text-[#374151]">Se souvenir de moi</span>
            </label>
            <button type="button" className="text-[13px] font-semibold" style={{ color: P1 }}>
              Mot de passe oublié ?
            </button>
          </div>

          {/* Submit button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full h-[58px] rounded-[18px] flex items-center justify-between px-6 font-bold text-[16px] text-white mt-2"
            style={{
              background: `linear-gradient(135deg, ${P1} 0%, ${P2} 100%)`,
              boxShadow: `0 8px 24px rgba(106,61,240,0.38)`,
            }}
          >
            <span className="flex-1 text-center">
              {loginMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                'Se connecter'
              )}
            </span>
            {!loginMutation.isPending && (
              <ArrowRight className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
            )}
          </motion.button>
        </form>

        {/* ou continuer avec */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#ECECF4]" />
          <span className="text-[12px] font-medium text-[#9CA3AF]">ou continuer avec</span>
          <div className="flex-1 h-px bg-[#ECECF4]" />
        </div>

        {/* Social buttons */}
        <div className="flex items-center justify-center gap-4">
          {/* Google */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center"
            style={{ boxShadow: '0 4px 16px rgba(72,72,120,0.12)', border: '1.5px solid #ECECF4' }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </motion.button>

          {/* Apple */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center"
            style={{ boxShadow: '0 4px 16px rgba(72,72,120,0.12)', border: '1.5px solid #ECECF4' }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#111827">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </motion.button>

          {/* Shield/Auth */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${P1} 0%, ${P2} 100%)`,
              boxShadow: `0 4px 16px rgba(106,61,240,0.3)`,
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </motion.button>
        </div>

        {/* Sign up link */}
        <div className="mt-6 text-center">
          <p className="text-[13px] font-medium text-[#6B7280]">
            Pas encore de compte ?{' '}
            <Link href="/register">
              <span className="font-bold" style={{ color: P1 }}>
                S'inscrire
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
