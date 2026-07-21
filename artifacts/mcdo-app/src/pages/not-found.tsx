import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/layout/PageTransition';

export default function NotFound() {
  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-[100dvh] px-4 text-center">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">🍟</span>
      </div>
      <h1 className="text-4xl font-black text-gray-900 mb-2">404</h1>
      <p className="text-gray-500 mb-8 max-w-[250px]">Oups ! Cette page semble avoir disparu de notre menu.</p>
      
      <Link href="/">
        <Button>Retour à l'accueil</Button>
      </Link>
    </PageTransition>
  );
}