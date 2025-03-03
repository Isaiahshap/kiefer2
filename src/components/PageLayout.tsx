'use client';

import { useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageLayout({ children, title, subtitle, className = '' }: PageLayoutProps) {
  useEffect(() => {
    // Simplified animations for a more subtle effect
    gsap.from('.page-title', {
      opacity: 0,
      y: -15,
      duration: 0.6,
      ease: 'power2.out',
    });
    
    gsap.from('.page-subtitle', {
      opacity: 0,
      y: -10,
      duration: 0.5,
      delay: 0.1,
      ease: 'power2.out',
    });
    
    gsap.from('.page-content', {
      opacity: 0,
      y: 10,
      duration: 0.5,
      delay: 0.2,
      ease: 'power2.out',
    });
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className={`relative min-h-screen ${className}`}>
      <Header />
      
      <main className="container mx-auto px-5 pt-28 pb-16 relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title text-3xl md:text-4xl font-medium mb-3 tracking-tight relative z-20">{title}</h1>
          {subtitle && (
            <p className="page-subtitle text-base md:text-lg mb-10 max-w-2xl relative z-20">
              {subtitle}
            </p>
          )}
          <div className="page-content space-y-6 relative z-20">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 