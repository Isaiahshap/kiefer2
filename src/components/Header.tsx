'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { usePathname, useRouter } from 'next/navigation';
import { useHero } from '@/contexts/HeroContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Tour', path: '/tour' },
  { label: 'Music', path: '/music' },
  { label: 'Course', path: 'https://courses.kiefermusic.com/', isExternal: true },
  { label: 'Board', path: '/board' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setShowHero, toggleHero } = useHero();
  const pathname = usePathname();
  const router = useRouter();
  
  // Determine if we're on home page or another page to adjust text colors
  const isHomePage = pathname === '/';
  
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
  
  const handleLogoClick = () => {
    if (pathname === '/') {
      // If already on home page, toggle hero
      toggleHero();
    } else {
      // If navigating to home, show hero
      setShowHero(true);
      router.push('/');
    }
  };

  const handleNavigation = (path: string, e: React.MouseEvent, isExternal?: boolean) => {
    // If it's an external link, let the default browser behavior handle it
    if (isExternal) {
      return;
    }
    
    // Only handle navigation if path is different
    if (path !== pathname) {
      e.preventDefault();
      
      if (path === '/') {
        // If navigating to home, ensure hero is shown
        setShowHero(true);
      } else {
        // For other pages, prepare context as needed
        setShowHero(false);
      }
      
      // Programmatically navigate to ensure page state resets properly
      router.push(path);
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
      toggleMenu();
    }
  };
  
  // Format number with leading zeros
  const formatNumber = (num: number) => {
    return num.toString().padStart(3, '0');
  };
  
  // Text color classes based on current page
  const logoTextClass = isHomePage 
    ? "text-neutral-100 hover:opacity-80" 
    : "text-stone-800 hover:opacity-80";
    
  const navItemTextClass = isHomePage 
    ? "text-neutral-100 hover:opacity-70" 
    : "text-stone-800 hover:opacity-70";
    
  const navIndexClass = isHomePage 
    ? "text-neutral-400" 
    : "text-stone-500";
    
  const mobileMenuBgClass = isHomePage 
    ? "bg-neutral-900/95" 
    : "bg-stone-800/95";
    
  const hamburgerLineClass = isHomePage 
    ? "bg-neutral-100" 
    : "bg-stone-800";
  
  return (
    <header className="fixed top-0 w-full z-50 p-4">
      {isLoaded && (
        <>
          <div className="container mx-auto flex justify-between items-start">
            <div className="z-50">
              <Link 
                href="/" 
                className={`text-xl tracking-tighter font-medium transition-opacity ${logoTextClass}`}
                onClick={handleLogoClick}
              >
                K.
              </Link>
            </div>
            
            {/* Desktop Navigation - Now in vertical column */}
            <nav className="hidden md:flex flex-col space-y-1 items-end">
              {navItems.map((item, index) => (
                <Link 
                  key={item.label} 
                  href={item.path}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className={`nav-item group flex items-baseline space-x-2 px-1 py-0.5 text-xs uppercase tracking-wider transition-opacity ${navItemTextClass}`}
                  onClick={(e) => handleNavigation(item.path, e, item.isExternal)}
                >
                  <span className={`font-mono ${navIndexClass}`}>{formatNumber(index + 1)}</span>
                  <span className="hover-underline">{item.label}</span>
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
                  className={`block h-px transition-all transform duration-200 ${
                    isMenuOpen ? 'w-5 rotate-45 translate-y-1' : 'w-5'
                  } ${hamburgerLineClass}`} 
                />
                <span 
                  className={`block h-px transition-all duration-150 ${
                    isMenuOpen ? 'opacity-0 w-5' : 'w-3 opacity-100'
                  } ${hamburgerLineClass}`} 
                />
                <span 
                  className={`block h-px transition-all transform duration-200 ${
                    isMenuOpen ? 'w-5 -rotate-45 -translate-y-1' : 'w-4'
                  } ${hamburgerLineClass}`} 
                />
              </div>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <div 
            className={`mobile-menu fixed inset-0 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 transform ${
              isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            } ${mobileMenuBgClass}`}
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
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="text-xl uppercase tracking-widest text-neutral-100 hover:opacity-70 transition-opacity"
                  onClick={(e) => handleNavigation(item.path, e, item.isExternal)}
                >
                  <span className="hover-underline">{item.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </header>
  );
} 