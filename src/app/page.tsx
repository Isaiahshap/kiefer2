'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import MailingListSignup from '../components/MailingListSignup';
import { useHero } from '../contexts/HeroContext';



// Define interface for the tour event data structure
interface TourEvent {
  id: string;
  type: string;
  attributes: {
    'venue-name': string;
    'formatted-address': string;
    'starts-at': string;
    'starts-at-short': string;
    'is-sold-out': boolean;
    'details'?: string | null;
  };
}

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [tourData, setTourData] = useState<TourEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showHero, setShowHero } = useHero();

  // Fetch tour data
  useEffect(() => {
    async function fetchTourData() {
      try {
        setIsLoading(true);
        const response = await fetch('https://cdn.seated.com/api/tour/a95fec67-3302-49f3-b0a7-51b1920d9859?include=tour-events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch tour data');
        }
        
        const data = await response.json();
        
        // The tour events are in the "included" array
        const events = data.included || [];
        
        // Get current date
        const now = new Date();
        
        // Filter to get only future events, then sort by date
        const futureEvents = events.filter(event => {
          const eventDate = new Date(event.attributes['starts-at']);
          return eventDate >= now;
        });
        
        // Sort events by date
        const sortedEvents = [...futureEvents].sort((a, b) => {
          const dateA = new Date(a.attributes['starts-at']);
          const dateB = new Date(b.attributes['starts-at']);
          return dateA.getTime() - dateB.getTime();
        });
        
        // Take only the first 3 upcoming events
        setTourData(sortedEvents.slice(0, 3));
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching tour data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    }
    
    fetchTourData();
  }, []);

  useEffect(() => {
    // Mark page as loaded
    setIsPageLoaded(true);
    
    // Show hero on initial page load
    setShowHero(true);
    
    // Very subtle, slow fade-in for a nostalgic feel
    if (showHero && titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        duration: 2.5,
        ease: 'power1.inOut',
      });
    }

    // Add animation for tour dates
    gsap.from('.tour-item', {
      opacity: 0,
      y: 10,
      stagger: 0.05,
      duration: 0.6,
      delay: 1.2,
      ease: 'power1.out',
    });
    
    // Set different background images for each letter
    const images = [
      '/album1.jpeg',
      '/album2.jpeg',
      '/album3.jpg',
      '/album4.jpg',
      '/album5.jpg',
      '/album6.jpg',
    ];
    
    // Apply background images to letters
    setTimeout(() => {
      const letters = document.querySelectorAll('.hover-letter');
      
      letters.forEach((letter, index) => {
        const letterEl = letter as HTMLElement;
        
        // Set the background image directly
        letterEl.style.backgroundImage = `url(${images[index % images.length]})`;
      });
    }, 100); // Small delay to ensure DOM is ready
    
    // Make sure to scroll to top on page load
    window.scrollTo(0, 0);
  }, [showHero, setShowHero]);

  // Format date from API response with Space Mono styling
  const formatDate = (dateString: string) => {
    // Parse the "Mar 19, 2025" format to get just "MAR 19"
    const parts = dateString.split(', ');
    if (parts.length === 2) {
      const datePart = parts[0].split(' ');
      return `${datePart[0].toUpperCase()} ${datePart[1]}`;
    }
    return dateString;
  };

  // Extract location (city) from formatted address
  const extractLocation = (address: string) => {
    return address.split(',')[0];
  };

  return (
    <div className="relative min-h-screen vintage-texture flex flex-col">
      <Header />
      
      {isPageLoaded && (
        <main className="flex-1 flex flex-col items-center justify-between py-24 md:py-36">
          {/* Main title */}
          {showHero && (
            <div className="text-center mb-24 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-b  from-transparent to-background/10 -z-10"></div>
              <div className="absolute inset-0 w-full h-full -z-20 opacity-30">
              </div>
              <h1 
                ref={titleRef} 
                className="main-title text-12xl md:text-14xl lg:text-16xl font-bold tracking-tighter relative"
                style={{ fontSize: "clamp(8rem, 20vw, 18rem)" }}
              >
                <span className="hover-letter inline-block">k</span>
                <span className="hover-letter inline-block">i</span>
                <span className="hover-letter inline-block">e</span>
                <span className="hover-letter inline-block">f</span>
                <span className="hover-letter inline-block">e</span>
                <span className="hover-letter inline-block">r</span>
              </h1>
            </div>
          )}
          
          {/* Dynamic Tour Section */}
          <div className="w-full max-w-4xl mx-auto px-5 mt-24">
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="text-xl font-medium tracking-tight text-gradient">Upcoming Tours</h2>
              <Link href="/tour" className="text-xs uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity hover-underline">
                View All
              </Link>
            </div>
            
            {isLoading ? (
              <div className="py-8 text-center opacity-50">
                <p>Loading tour dates...</p>
              </div>
            ) : error ? (
              <div className="py-8 text-center opacity-50">
                <p>Unable to load tour dates at this time.</p>
              </div>
            ) : tourData.length > 0 ? (
              <div className="space-y-5">
                {tourData.map((event) => {
                  const attributes = event.attributes;
                  return (
                    <div 
                      key={event.id}
                      className="tour-item flex justify-between items-center border-b border-neutral-800/10 pb-4 card-hover p-3 subtle-border soft-glow rounded-sm"
                    >
                      <div className="flex space-x-6 items-baseline">
                        <span className="text-sm font-space-mono opacity-60">
                          {formatDate(attributes['starts-at-short'])}
                        </span>
                        <span className="text-lg font-space-mono">{extractLocation(attributes['formatted-address'])}</span>
                        <span className="text-sm font-space-mono opacity-70">{attributes['venue-name']}</span>
                        {attributes.details && (
                          <span className="text-xs font-space-mono opacity-60 italic">{attributes.details}</span>
                        )}
                      </div>
                      
                      <div>
                        {attributes['is-sold-out'] ? (
                          <span className="text-xs font-space-mono uppercase tracking-wider opacity-50">
                            Sold Out
                          </span>
                        ) : (
                          <Link 
                            href="/tour" 
                            className="text-xs font-space-mono uppercase tracking-wider hover:opacity-70 transition-opacity glass-effect px-3 py-1 rounded-full"
                          >
                            Tickets →
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center opacity-50">
                <p className="font-space-mono">No upcoming tour dates at this time.</p>
              </div>
            )}
          </div>
          
          {/* About Section */}
          <div className="w-full max-w-4xl mx-auto px-5 mt-24">
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="text-xl font-medium tracking-tight text-gradient">About Kiefer</h2>
              <Link 
                href="/about" 
                className="text-xs font-space-mono uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity"
              >
                <span className="hover-underline">Learn More</span>
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <p className="font-space-mono leading-relaxed">
                  Kiefer is a central figure in the diverse independent music scene of Los Angeles. 
                  His sound fuses various modalities of Black American Music, from jazz and R&B to 
                  hip-hop and electronic music.
                </p>
              </div>
            </div>
            
            {/* Carousel */}
            <div className="mt-8">
              <Carousel 
                images={[
                  {
                    src: "/kiefer.jpg",
                    alt: "Kiefer in concert"
                  },
                  {
                    src: "/kiefer1.jpg",
                    alt: "Kiefer in concert"
                  },
                  {
                    src: "/kiefer2.jpg",
                    alt: "Kiefer in recording session"
                  },
                  {
                    src: "/kiefer3.jpg",
                    alt: "Kiefer in recording session"
                  }
                ]}
              />
            </div>
          </div>

          {/* Courses Section */}
          <div className="w-full max-w-4xl mx-auto px-5 mt-24 text-center">
            <h2 className="text-xl font-medium mb-4">Vibes are off? Courses are the move</h2>
            <p className="text-white font-space-mono leading-relaxed mb-6 max-w-2xl mx-auto">
              Learn Kiefer&apos;s unique approach to music production, composition, and jazz piano through his online courses.
            </p>
            <a 
              href="https://courses.kiefermusic.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block font-space-mono uppercase text-sm tracking-wider border-b border-neutral-600 hover:border-white pb-1 transition-colors"
            >
              Explore Courses →
            </a>
          </div>
          
          {/* Mailing List Section */}
          <MailingListSignup />
        </main>
      )}
      
      <Footer />
      
      <style jsx global>{`
        .main-title span {
          display: inline-block;
          cursor: pointer;
          transition: transform 0.2s ease;
          position: relative;
          padding: 0.05em;
        }

        .main-title span:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
