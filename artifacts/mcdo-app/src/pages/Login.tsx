import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Phone, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLogin } from '@workspace/api-client-react';
import { toast } from 'sonner';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login: setAuthToken } = useAuth();
  const loginMutation = useLogin();
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      const data = await loginMutation.mutateAsync({
        data: { phone, password }
      });
      toast.success('Connexion réussie');
      setAuthToken(data.token);
      setLocation('/');
    } catch (error: any) {
      toast.error(error.message || 'Identifiants incorrects');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[100dvh] flex flex-col px-6 py-12"
    >
      <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-mcdo-red rounded-[32px] flex items-center justify-center shadow-mcdo transform rotate-3">
            <svg viewBox="0 0 36 36" fill="none" className="w-14 h-14 text-mcdo-yellow transform -rotate-3" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.0004 22.8465C17.7011 22.8465 17.4357 22.6841 17.2917 22.418L13.1098 14.8055C12.8394 14.3129 12.0837 14.288 11.785 14.7645L7.24072 22.0163C7.08639 22.2625 6.80918 22.4042 6.51659 22.3854L5.61435 22.3276C4.94528 22.2847 4.54228 21.5309 4.88568 20.9634L10.3704 11.8967C10.8715 11.0682 11.9701 10.9576 12.5186 11.6811L16.5925 17.0601C16.9416 17.5212 17.6593 17.5212 18.0084 17.0601L22.0823 11.6811C22.6308 10.9576 23.7294 11.0682 24.2305 11.8967L29.7152 20.9634C30.0586 21.5309 29.6556 22.2847 28.9866 22.3276L28.0843 22.3854C27.7917 22.4042 27.5145 22.2625 27.3602 22.0163L22.8159 14.7645C22.5172 14.288 21.7615 14.3129 21.4911 14.8055L17.3092 22.418C17.1652 22.6841 16.8998 22.8465 16.6004 22.8465H18.0004Z" fill="currentColor"/>
              <path d="M18.0004 29.8465C17.7011 29.8465 17.4357 29.6841 17.2917 29.418L13.1098 21.8055C12.8394 21.3129 12.0837 21.288 11.785 21.7645L7.24072 29.0163C7.08639 29.2625 6.80918 29.4042 6.51659 29.3854L5.61435 29.3276C4.94528 29.2847 4.54228 28.5309 4.88568 27.9634L10.3704 18.8967C10.8715 18.0682 11.9701 17.9576 12.5186 18.6811L16.5925 24.0601C16.9416 24.5212 17.6593 24.5212 18.0084 24.0601L22.0823 18.6811C22.6308 17.9576 23.7294 18.0682 24.2305 18.8967L29.7152 27.9634C30.0586 28.5309 29.6556 29.2847 28.9866 29.3276L28.0843 29.3854C27.7917 29.4042 27.5145 29.2625 27.3602 29.0163L22.8159 21.7645C22.5172 21.288 21.7615 21.3129 21.4911 21.8055L17.3092 29.418C17.1652 29.6841 16.8998 29.8465 16.6004 29.8465H18.0004Z" fill="currentColor"/>
            </svg>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Bon retour !</h1>
          <p className="text-gray-500 font-medium">Connectez-vous pour investir</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-mcdo-red" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full pl-12 pr-4 h-[56px] bg-[#F6F7FB] border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-mcdo-red transition-all font-medium"
              placeholder="Numéro de téléphone"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-mcdo-red" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-12 pr-12 h-[56px] bg-[#F6F7FB] border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-mcdo-red transition-all font-medium"
              placeholder="Mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="pt-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full flex items-center justify-center h-[58px] rounded-[18px] gradient-red text-white font-bold text-lg shadow-mcdo disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "Se connecter"}
            </motion.button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 font-medium">
            Pas encore de compte ?{' '}
            <Link href="/register">
              <span className="text-mcdo-red font-bold hover:underline cursor-pointer">
                S'inscrire
              </span>
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}