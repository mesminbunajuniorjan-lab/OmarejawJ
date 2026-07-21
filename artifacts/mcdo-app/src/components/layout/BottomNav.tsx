import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, ShoppingBag, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function BottomNav() {
  const [location] = useLocation();

  const tabs = [
    { href: '/', icon: Home, label: 'Accueil' },
    { href: '/products', icon: ShoppingBag, label: 'Produits' },
    { href: '/team', icon: Users, label: 'Équipe' },
    { href: '/account', icon: User, label: 'Compte' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[448px] px-4 z-50">
      <div className="bg-white/90 backdrop-blur-xl rounded-[28px] shadow-2xl border border-gray-100/50 px-6 py-4 flex items-center justify-between">
        {tabs.map((tab) => {
          const isActive = location === tab.href;
          const Icon = tab.icon;

          return (
            <Link key={tab.href} href={tab.href}>
              <div className="flex flex-col items-center gap-1 relative cursor-pointer group">
                <div className={cn(
                  "p-2 rounded-xl transition-colors duration-300",
                  isActive ? "text-mcdo-red" : "text-gray-400 group-hover:text-gray-600 group-hover:bg-gray-50"
                )}>
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={cn(
                  "text-[10px] font-semibold transition-colors duration-300",
                  isActive ? "text-mcdo-red" : "text-gray-400 group-hover:text-gray-600"
                )}>
                  {tab.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="bottom-nav-indicator"
                    className="absolute -bottom-2 w-1 h-1 bg-mcdo-red rounded-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}