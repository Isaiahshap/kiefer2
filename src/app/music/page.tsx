'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';
import PageLayout from '@/components/PageLayout';

// Album data with local images
const albums = [
  {
    id: 1,
    title: "It's Ok, B U",
    year: "2023",
    cover: "/album1.jpeg",
    buyLink: "https://kiefer.bandcamp.com"
  },
  {
    id: 2,
    title: "Between Days",
    year: "2022",
    cover: "/album2.jpeg",
    buyLink: "https://kiefer.bandcamp.com"
  },
  {
    id: 3,
    title: "When There's Love Around",
    year: "2021",
    cover: "/album3.jpg",
    buyLink: "https://kiefer.bandcamp.com"
  },
  {
    id: 4,
    title: "Bridges",
    year: "2020",
    cover: "/album4.jpg",
    buyLink: "https://kiefer.bandcamp.com"
  },
  {
    id: 5,
    title: "Happysad",
    year: "2018",
    cover: "/album5.jpg",
    buyLink: "https://kiefer.bandcamp.com"
  },
  {
    id: 6,
    title: "Kickinit Alone",
    year: "2017",
    cover: "/album6.jpg",
    buyLink: "https://kiefer.bandcamp.com"
  }
];

export default function MusicPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  // Reset loaded state when component mounts or pathname changes
  useEffect(() => {
    // Ensure we're starting fresh on each navigation
    setIsLoaded(false);
    
    // Use a small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Animate albums in with a stagger effect
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.8,
          ease: 'power2.out',
        });
        
        gsap.from('.album-item', {
          opacity: 0,
          y: 15,
          stagger: 0.08,
          duration: 0.7,
          delay: 0.3,
          ease: 'power1.out',
        });
      }
      
      // Make sure to scroll to top on page load
      window.scrollTo(0, 0);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [pathname]);
  
  return (
    <PageLayout 
      title="Music"
      subtitle="Explore Kiefer's discography of albums from across his career."
      className="music-page"
    >
      {/* Custom background style for this page */}
      <style jsx global>{`
        /* Override any unwanted styles */
        .music-page {
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
        
        /* Album hover effects */
        .album-item {
          transition: all 0.3s ease;
        }
        
        .album-item:hover {
          transform: translateY(-10px);
        }
        
        .album-item .buy-now {
          transition: all 0.2s ease;
          opacity: 0;
          transform: translateY(10px);
        }
        
        .album-item:hover .buy-now {
          opacity: 1;
          transform: translateY(0);
        }
        
        .album-item .album-overlay {
          transition: all 0.3s ease;
          opacity: 0;
        }
        
        .album-item:hover .album-overlay {
          opacity: 1;
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album) => (
              <div key={album.id} className="album-item">
                <div className="relative rounded-md overflow-hidden shadow-md border border-stone-300">
                  {/* Album cover */}
                  <div className="relative aspect-square">
                    <Image
                      src={album.cover}
                      alt={album.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      priority={album.id <= 3} // Prioritize loading first 3 images
                    />
                    {/* Overlay with info */}
                    <div className="album-overlay absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4">
                      <h3 className="text-white text-xl font-medium mb-1">{album.title}</h3>
                      <p className="text-white text-opacity-80 mb-4">{album.year}</p>
                      <Link 
                        href={album.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-now bg-stone-100 text-stone-900 py-2 px-4 rounded-full font-medium text-sm inline-block text-center hover:bg-white transition-colors"
                      >
                        Buy Now →
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Title below the image for accessibility */}
                <div className="mt-3 text-center">
                  <h3 className="font-medium text-stone-800">{album.title}</h3>
                  <p className="text-stone-600 text-sm">{album.year}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="mt-16 p-8 bg-stone-100 rounded-md shadow-sm border border-stone-200 text-center">
            <h2 className="text-2xl font-medium mb-4 text-stone-800">Listen to Kiefer's Complete Discography</h2>
            <p className="text-stone-600 mb-6 font-space-mono max-w-2xl mx-auto">
              Stream all of Kiefer's music on your favorite platform or purchase directly to support the artist.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="https://open.spotify.com/artist/3v2Gh5cZQggKURNBXU68Yu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-stone-800 text-stone-100 rounded-md font-medium hover:bg-stone-700 transition-colors"
              >
                Spotify
              </Link>
              <Link 
                href="https://music.apple.com/us/artist/kiefer/257078743"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-stone-800 text-stone-100 rounded-md font-medium hover:bg-stone-700 transition-colors"
              >
                Apple Music
              </Link>
              <Link 
                href="https://kiefer.bandcamp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-stone-800 text-stone-100 rounded-md font-medium hover:bg-stone-700 transition-colors"
              >
                Bandcamp
              </Link>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
} 