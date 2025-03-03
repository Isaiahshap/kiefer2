'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

interface HeroContextType {
  showHero: boolean;
  setShowHero: (show: boolean) => void;
  toggleHero: () => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export function HeroProvider({ children }: { children: ReactNode }) {
  const [showHero, setShowHero] = useState(true);
  
  const toggleHero = () => setShowHero(!showHero);
  
  return (
    <HeroContext.Provider value={{ showHero, setShowHero, toggleHero }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error('useHero must be used within a HeroProvider');
  }
  return context;
} 