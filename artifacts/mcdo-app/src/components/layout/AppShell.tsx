import React from 'react';
import { useLocation } from 'wouter';
import { BottomNav } from './BottomNav';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const hideNavOnPages = ['/login', '/register'];
  const showNav = !hideNavOnPages.includes(location);

  return (
    <div className="min-h-[100dvh] bg-[#F6F7FB] pb-24 relative flex flex-col">
      <main className="flex-1 w-full max-w-[480px] mx-auto bg-white min-h-[100dvh] relative shadow-2xl">
        {children}
        {showNav && <BottomNav />}
      </main>
    </div>
  );
}