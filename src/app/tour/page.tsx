'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import PageLayout from '@/components/PageLayout';

// Define interface for the tour event data structure from Seated API
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
    'url'?: string;
  };
}

// Helper function to extract city and state from formatted address
function extractLocation(address: string): string {
  // Split by commas and take the relevant parts
  const parts = address.split(',');
  if (parts.length >= 2) {
    // Return city and state/country
    return parts[0].trim();
  }
  return address;
}

// Helper function to format the date
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return dateStr.toUpperCase();
}

export default function TourPage() {
  const [tourData, setTourData] = useState<TourEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
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
        setTourData(events);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching tour data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    }
    
    fetchTourData();
  }, []);
  
  // Animation and page load effect
  useEffect(() => {
    // Ensure we're starting fresh on each navigation
    setIsLoaded(false);
    
    // Use a small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Animate content in
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
      
      // Animate tour items
      gsap.from('.tour-item', {
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.6,
        delay: 0.6,
        ease: 'power1.out',
      });
      
      // Make sure to scroll to top on page load
      window.scrollTo(0, 0);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [pathname]);
  
  // Get unique countries for filtering
  const countries = ['all', ...new Set(tourData.map(event => {
    const address = event.attributes['formatted-address'];
    const parts = address.split(',');
    return parts.length > 1 ? parts[parts.length - 1].trim() : 'Unknown';
  }))];
  
  // Filter tour dates based on selected country
  const filteredDates = filter === 'all' 
    ? tourData 
    : tourData.filter(event => {
        const address = event.attributes['formatted-address'];
        const parts = address.split(',');
        const country = parts.length > 1 ? parts[parts.length - 1].trim() : '';
        return country === filter;
      });
  
  // Sort tour dates chronologically
  const sortedDates = [...filteredDates].sort((a, b) => {
    const dateA = new Date(a.attributes['starts-at']);
    const dateB = new Date(b.attributes['starts-at']);
    return dateA.getTime() - dateB.getTime();
  });
  
  return (
    <PageLayout 
      title="Tour Dates"
      subtitle="Join Kiefer on tour and experience his unique blend of jazz, hip-hop, and electronic music live."
      className="tour-page"
    >
      {/* Custom background style for this page */}
      <style jsx global>{`
        /* Override any unwanted styles */
        .tour-page {
          background-color: #eae7e0;
        }
        
        /* Fix z-index to ensure header navigation works */
        header {
          position: fixed;
          z-index: 100;
          pointer-events: auto;
        }
        
        /* Ensure all links in header are clickable */
        header a, 
        header button,
        .nav-item {
          pointer-events: auto !important;
          position: relative;
          z-index: 101;
        }
        
        /* Ensure no overlay interferes with content */
        .paper-texture::before,
        .vintage-texture::before {
          opacity: 0.03;
          z-index: -1;
          pointer-events: none;
        }
        
        /* Make content fully opaque */
        .page-title, 
        .page-subtitle, 
        .page-content,
        .page-content p {
          color: #1a1a18 !important;
          opacity: 1 !important;
        }

        /* Add styles for tour items */
        .tour-item {
          transition: all 0.2s ease-out;
        }
        
        .tour-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        /* Button styles */
        .filter-button.active {
          background-color: #1a1a18;
          color: #eae7e0;
        }

        .filter-button {
          transition: all 0.2s ease;
        }

        .filter-button:hover:not(.active) {
          background-color: #dedbd4;
        }

        .tickets-button {
          background-color: #1a1a18;
          color: #eae7e0;
          transition: all 0.2s ease;
        }

        .tickets-button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .sold-out {
          opacity: 0.6;
        }
      `}</style>
      
      {/* Show loading indicator if not loaded */}
      {!isLoaded && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse text-stone-700">Loading...</div>
        </div>
      )}
      
      {/* Main content - show when loaded */}
      {isLoaded && (
        <div className="z-20 relative" ref={contentRef}>
          {/* Country filter */}
          <div className="mb-12">
            <h3 className="text-stone-700 mb-4 font-medium font-space-mono">Filter by country:</h3>
            <div className="flex flex-wrap gap-3">
              {countries.map(country => (
                <button
                  key={country}
                  onClick={() => setFilter(country)}
                  className={`filter-button px-4 py-2 text-sm rounded-full font-space-mono ${
                    filter === country ? 'active' : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {country === 'all' ? 'All Countries' : country}
                </button>
              ))}
            </div>
          </div>

          {/* Tour dates */}
          <div className="space-y-5 mb-16">
            {isLoading ? (
              <div className="py-8 text-center opacity-50">
                <p className="font-space-mono">Loading tour dates...</p>
              </div>
            ) : error ? (
              <div className="py-8 text-center opacity-50">
                <p className="font-space-mono">Unable to load tour dates at this time.</p>
              </div>
            ) : sortedDates.length > 0 ? (
              sortedDates.map((event) => {
                const attributes = event.attributes;
                return (
                  <div 
                    key={event.id}
                    className="tour-item flex justify-between items-center border-b border-stone-300 pb-4 p-4 rounded-md bg-stone-50 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 sm:items-baseline">
                      <span className="text-sm font-space-mono text-stone-600">
                        {formatDate(attributes['starts-at-short'])}
                      </span>
                      <span className="text-lg font-space-mono text-stone-800">{extractLocation(attributes['formatted-address'])}</span>
                      <span className="text-sm font-space-mono text-stone-600">{attributes['venue-name']}</span>
                      {attributes.details && (
                        <span className="text-xs font-space-mono text-stone-500 italic">{attributes.details}</span>
                      )}
                    </div>
                    
                    <div>
                      {attributes['is-sold-out'] ? (
                        <span className="text-xs font-space-mono uppercase tracking-wider sold-out px-3 py-1 border border-stone-300 rounded-full bg-stone-100 text-stone-500">
                          Sold Out
                        </span>
                      ) : (
                        <Link 
                          href={attributes.url || '#'} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-space-mono uppercase tracking-wider tickets-button px-4 py-2 rounded-full"
                        >
                          Tickets →
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-stone-600 bg-stone-100 rounded-md p-6">
                <p className="font-space-mono">No tour dates available for the selected filter.</p>
              </div>
            )}
          </div>
          
          {/* Get notified section */}
          <div className="mt-16 p-8 bg-stone-100 rounded-md shadow-sm border border-stone-200">
            <h2 className="text-2xl font-medium mb-4 text-stone-800">Get Notified About New Tour Dates</h2>
            <p className="text-stone-600 mb-6 font-space-mono">
              Sign up to receive email notifications when new tour dates are announced in your area.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white"
                required
              />
              <button
                type="submit"
                className="tickets-button px-6 py-3 rounded-md font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
} 