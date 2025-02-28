'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';

// Navigation categories for the bottom menu
const categories = [
  { letter: 'A', label: 'About', path: '/about' },
  { letter: 'B', label: 'Tour', path: '/tour' },
  { letter: 'C', label: 'Music', path: '/music' },
  { letter: 'D', label: 'Videos', path: '/videos' },
  { letter: 'E', label: 'Course', path: '/course' },
  { letter: 'F', label: 'Contact', path: '/contact' },
];

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
  const [error, setError] = useState<string | null>(null);

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
        
        // Take only the first 3 upcoming events
        setTourData(events.slice(0, 3));
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
    // Very subtle, slow fade-in for a nostalgic feel
    gsap.from(titleRef.current, {
      opacity: 0,
      duration: 2.5,
      ease: 'power1.inOut',
    });

    // Subtle fade for navigation items
    gsap.from('.category-item', {
      opacity: 0,
      y: 10,
      stagger: 0.08,
      duration: 0.8,
      delay: 1,
      ease: 'power1.out',
    });
    
    // Add animation for tour dates
    gsap.from('.tour-item', {
      opacity: 0,
      y: 10,
      stagger: 0.05,
      duration: 0.6,
      delay: 1.2,
      ease: 'power1.out',
    });
  }, []);

  // Format date from API response (using the starts-at-short field)
  const formatDate = (dateString: string) => {
    // Parse the "Mar 19, 2025" format to get just "MAR 19"
    const parts = dateString.split(', ');
    if (parts.length === 2) {
      const datePart = parts[0].split(' ');
      if (datePart.length === 2) {
        const month = datePart[0].toUpperCase();
        const day = datePart[1];
        return `${month} ${day}`;
      }
    }
    return dateString; // Fallback
  };

  // Extract location (city) from formatted address
  const extractLocation = (address: string) => {
    return address.split(',')[0];
  };

  return (
    <div className="relative min-h-screen vintage-texture flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-between py-24 md:py-36">
        {/* Main centered title with nostalgic styling */}
        <div className="flex-1 flex items-center justify-center w-full min-h-[50vh]">
          <h1 
            ref={titleRef} 
            className="main-title text-center transform-gpu"
            style={{ fontSize: "clamp(8rem, 25vw, 20rem)" }}
          >
            kiefer
          </h1>
        </div>
        
        {/* Simple, nostalgic bottom navigation */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-2 mt-12 px-5">
          {categories.map((category) => (
            <Link
              href={category.path}
              key={category.label}
              className="category-item group flex flex-col items-center text-center"
            >
              <span className="nav-letter">{category.letter}.</span>
              <span className="nav-category">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
        
        {/* Dynamic Tour Section */}
        <div className="w-full max-w-4xl mx-auto px-5 mt-24">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-xl font-medium tracking-tight">Upcoming Tours</h2>
            <Link href="/tour" className="text-xs uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity">
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
                    className="tour-item flex justify-between items-center border-b border-neutral-800/10 pb-4"
                  >
                    <div className="flex space-x-6 items-baseline">
                      <span className="text-sm font-mono opacity-60">
                        {formatDate(attributes['starts-at-short'])}
                      </span>
                      <span className="text-lg">{extractLocation(attributes['formatted-address'])}</span>
                      <span className="text-sm opacity-70">{attributes['venue-name']}</span>
                      {attributes.details && (
                        <span className="text-xs opacity-60 italic">{attributes.details}</span>
                      )}
                    </div>
                    
                    <div>
                      {attributes['is-sold-out'] ? (
                        <span className="text-xs uppercase tracking-wider opacity-50">
                          Sold Out
                        </span>
                      ) : (
                        <Link 
                          href="/tour" 
                          className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity"
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
              <p>No upcoming tour dates at this time.</p>
            </div>
          )}
        </div>
        
        {/* About Section */}
        <div className="w-full max-w-4xl mx-auto px-5 mt-24">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-xl font-medium tracking-tight">About Kiefer</h2>
            <Link href="/about" className="text-xs uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity">
              Learn More
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <p className="text-neutral-700 leading-relaxed">
                Kiefer is a central figure in the diverse independent music scene of Los Angeles. 
                His sound fuses various modalities of Black American Music, from jazz and R&B to 
                hip-hop and electronic music.
              </p>
            </div>
          </div>
          
          {/* Replace the polaroid image with the carousel */}
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
      </main>
      
      <Footer />
    </div>
  );
}
