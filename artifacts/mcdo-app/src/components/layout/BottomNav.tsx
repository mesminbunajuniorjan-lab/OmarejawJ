import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, ShoppingBag, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const PURPLE = '#6A3DF0';

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
      <div
        className="bg-white rounded-[34px] px-6 py-3 flex items-center justify-between"
        style={{
          boxShadow: '0 8px 32px rgba(72,72,120,0.14), 0 2px 8px rgba(72,72,120,0.06)',
          border: '1px solid #ECECF4',
        }}
      >
        {tabs.map((tab) => {
          const isActive = location === tab.href;
          const Icon = tab.icon;

          return (
            <Link key={tab.href} href={tab.href}>
              <div className="flex flex-col items-center gap-1 relative cursor-pointer min-w-[56px] py-1">
                <Icon
                  className="w-6 h-6 transition-colors duration-250"
                  style={{ color: isActive ? PURPLE : '#9CA3AF' }}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span
                  className="text-[10px] font-semibold transition-colors duration-250 leading-none"
                  style={{ color: isActive ? PURPLE : '#9CA3AF' }}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-dot"
                    className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: PURPLE }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
