'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Tour', path: '/tour' },
  { label: 'Music', path: '/music' },
  { label: 'Course', path: '/course' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Make sure DOM is ready before animating
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length) {
      gsap.from(navItems, {
        opacity: 0,
        y: -10,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, []);
  
  useEffect(() => {
    // Mark component as loaded after a short delay
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Open animation
      gsap.to('.mobile-menu', {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      // Close animation
      gsap.to('.mobile-menu', {
        y: -10,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  };
  
  // Format number with leading zeros
  const formatNumber = (num: number) => {
    return num.toString().padStart(3, '0');
  };
  
  return (
    <header className="fixed top-0 w-full z-50 p-4">
      {isLoaded && (
        <>
          <div className="container mx-auto flex justify-between items-start">
            <div className="z-50">
              <Link href="/" className="text-xl tracking-tighter font-medium text-neutral-100 hover:opacity-80 transition-opacity">
                K.
              </Link>
            </div>
            
            {/* Desktop Navigation - Now in vertical column */}
            <nav className="hidden md:flex flex-col space-y-1 items-end">
              {navItems.map((item, index) => (
                <Link 
                  key={item.label} 
                  href={item.path} 
                  className="nav-item group flex items-baseline space-x-2 px-1 py-0.5 text-xs uppercase tracking-wider text-neutral-100 hover:opacity-70 transition-opacity"
                >
                  <span className="text-neutral-400 font-mono">{formatNumber(index + 1)}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden z-50 p-2 focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col items-end space-y-1">
                <span 
                  className={`block h-px bg-neutral-100 transition-all transform duration-200 ${
                    isMenuOpen ? 'w-5 rotate-45 translate-y-1' : 'w-5'
                  }`} 
                />
                <span 
                  className={`block h-px bg-neutral-100 transition-all duration-150 ${
                    isMenuOpen ? 'opacity-0 w-5' : 'w-3 opacity-100'
                  }`} 
                />
                <span 
                  className={`block h-px bg-neutral-100 transition-all transform duration-200 ${
                    isMenuOpen ? 'w-5 -rotate-45 -translate-y-1' : 'w-4'
                  }`} 
                />
              </div>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <div 
            className={`mobile-menu fixed inset-0 bg-neutral-900/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 transform ${
              isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{ 
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
              visibility: isMenuOpen ? 'visible' : 'hidden' 
            }}
          >
            {navItems.map((item, index) => (
              <div key={item.label} className="flex items-baseline space-x-3">
                <span className="text-neutral-500 font-mono text-sm">{formatNumber(index + 1)}</span>
                <Link 
                  href={item.path} 
                  className="text-xl uppercase tracking-widest text-neutral-100 hover:opacity-70 transition-opacity"
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </header>
  );
} 