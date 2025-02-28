'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

// Sample tour dates
const tourDates = [
  {
    id: 1,
    date: 'JUN 15, 2024',
    venue: 'Blue Note',
    city: 'New York, NY',
    country: 'USA',
    ticketLink: 'https://www.bluenote.net',
    soldOut: false,
  },
  {
    id: 2,
    date: 'JUN 22, 2024',
    venue: 'Jazz Cafe',
    city: 'London',
    country: 'UK',
    ticketLink: 'https://thejazzcafelondon.com',
    soldOut: false,
  },
  {
    id: 3,
    date: 'JUL 5, 2024',
    venue: 'New Morning',
    city: 'Paris',
    country: 'France',
    ticketLink: 'https://www.newmorning.com',
    soldOut: false,
  },
  {
    id: 4,
    date: 'JUL 10, 2024',
    venue: 'Bimhuis',
    city: 'Amsterdam',
    country: 'Netherlands',
    ticketLink: 'https://www.bimhuis.nl',
    soldOut: true,
  },
  {
    id: 5,
    date: 'JUL 15, 2024',
    venue: 'Jazzkeller',
    city: 'Frankfurt',
    country: 'Germany',
    ticketLink: 'https://www.jazzkeller.com',
    soldOut: false,
  },
  {
    id: 6,
    date: 'JUL 22, 2024',
    venue: 'Le Réservoir',
    city: 'Brussels',
    country: 'Belgium',
    ticketLink: 'https://lereservoir.brussels',
    soldOut: false,
  },
  {
    id: 7,
    date: 'AUG 8, 2024',
    venue: 'SF Jazz Center',
    city: 'San Francisco, CA',
    country: 'USA',
    ticketLink: 'https://www.sfjazz.org',
    soldOut: false,
  },
  {
    id: 8,
    date: 'AUG 14, 2024',
    venue: 'The Lodge Room',
    city: 'Los Angeles, CA',
    country: 'USA',
    ticketLink: 'https://lodgeroomhlp.com',
    soldOut: false,
  },
];

export default function TourPage() {
  const [filter, setFilter] = useState('all');
  
  // Get unique countries for filtering
  const countries = ['all', ...new Set(tourDates.map(date => date.country))];
  
  // Filter tour dates based on selected country
  const filteredDates = filter === 'all' 
    ? tourDates 
    : tourDates.filter(date => date.country === filter);
  
  return (
    <PageLayout 
      title="Tour Dates"
      subtitle="Join Kiefer on tour and experience his unique blend of jazz, hip-hop, and electronic music live."
    >
      {/* Country filter */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3">
          {countries.map(country => (
            <button
              key={country}
              onClick={() => setFilter(country)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filter === country 
                  ? 'bg-neutral-900 text-neutral-100' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {country === 'all' ? 'All Countries' : country}
            </button>
          ))}
        </div>
      </div>

      {/* Tour dates */}
      <div className="space-y-6">
        {filteredDates.length > 0 ? (
          filteredDates.map(event => (
            <div 
              key={event.id} 
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 p-6 border border-neutral-200 rounded-md hover:border-neutral-300 transition-colors"
            >
              <div>
                <p className="text-xl font-medium">{event.date}</p>
                <p className="text-neutral-600">{event.country}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium">{event.venue}</h3>
                <p className="text-neutral-600">{event.city}</p>
              </div>
              
              <div className="md:text-right self-center">
                {event.soldOut ? (
                  <span className="inline-block px-4 py-2 bg-neutral-100 text-neutral-500 rounded-md text-sm font-medium">
                    Sold Out
                  </span>
                ) : (
                  <Link
                    href={event.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 bg-neutral-900 text-neutral-100 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Tickets
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-neutral-600">No tour dates available for the selected filter.</p>
          </div>
        )}
      </div>
      
      {/* Get notified section */}
      <div className="mt-16 p-8 bg-neutral-100 rounded-md">
        <h2 className="text-2xl font-medium mb-4">Get Notified About New Tour Dates</h2>
        <p className="text-neutral-600 mb-6">
          Sign up to receive email notifications when new tour dates are announced in your area.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-neutral-900 text-neutral-100 rounded-md font-medium hover:bg-neutral-800 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </PageLayout>
  );
} 