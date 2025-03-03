'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';
import Carousel from '@/components/Carousel';
import PageLayout from '@/components/PageLayout';

// Returning to using PageLayout but with careful style overrides
export default function AboutPage() {
  const imageRef = useRef<HTMLDivElement>(null);
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
      
      // Subtle animation for the image and content
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
      
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
        });
      }
      
      // Make sure to scroll to top on page load
      window.scrollTo(0, 0);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [pathname]); // Re-run when pathname changes

  return (
    <PageLayout 
      title="About Kiefer"
      subtitle="Pianist, producer, and composer known for a unique blend of jazz, hip-hop, and electronic music."
      className="about-page"
    >
      {/* Custom background style for this page */}
      <style jsx global>{`
        /* Override any unwanted styles */
        .about-page {
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
      `}</style>
      
      {/* Show loading indicator if not loaded */}
      {!isLoaded && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-pulse text-stone-700">Loading...</div>
        </div>
      )}
      
      {/* Main content - show when loaded */}
      {isLoaded && (
        <div className="z-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Image section */}
            <div ref={imageRef} className="relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-stone-300 shadow-md">
                <Image
                  src="/kiefer3.jpg" 
                  alt="Kiefer portrait"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute top-4 left-4 bg-stone-800 px-3 py-1 text-sm font-space-mono text-stone-100 border border-stone-700">
                Based: Los Angeles, CA
              </div>
            </div>

            {/* Text content */}
            <div ref={contentRef} className="space-y-6 font-space-mono text-stone-900 leading-relaxed">
              <p className="font-medium">
                Kiefer is a central figure in the diverse independent music scene of Los Angeles. His sound fuses various modalities of Black American Music, from jazz and R&B to hip-hop and electronic music.
              </p>
              
              <p>
                Kiefer grew up in San Diego, California, immersed in jazz by his father at a young age, and later experimented with hip-hop-inspired beats in high school. While studying jazz piano at UCLA, Kiefer got his education in beats from attending shows at Low End Theory and collaborating with other artists in the scene.
              </p>
              
              <p>
                Hard-hitting beats, complex jazz voicings and sentimental melodies all fed into Kiefer&apos;s debut, Kickinit Alone, released on Leaving Records in 2017. Soon after, Kiefer signed to Stones Throw and released two LPs: &apos;Happysad&apos; (2018), and &apos;When There&apos;s Love Around&apos; (2021). His new full-length record, titled &apos;It&apos;s Ok, B U&apos;, is available everywhere now.
              </p>
              
              <p>
                Outside of his solo work, Kiefer has recorded with artists such as Kaytranada, Sir, and Terrace Martin, and produced for Anderson .Paak on his Grammy Award winning record, &quot;Ventura&quot;.
              </p>
              
              <p>
                Kiefer at his core is both emotional and an optimist, which is why his songs resonate on a wide spectrum of emotion. His ethos is about feeling encouraged, empowered, and full of gratitude, reminding listeners through his music, &quot;this is a beautiful life.&quot;
              </p>
            </div>
          </div>

          {/* Photo carousel */}
          <div className="mt-20">
            <h2 className="text-xl font-medium mb-8 text-stone-900">Gallery</h2>
            <div className="p-5 bg-stone-100 rounded-lg border border-stone-200 shadow-sm">
              <Carousel 
                images={[
                  {
                    src: "/kiefer.jpg",
                    alt: "Kiefer performing live"
                  },
                  {
                    src: "/kiefer1.jpg",
                    alt: "Kiefer at the piano"
                  },
                  {
                    src: "/kiefer2.jpg",
                    alt: "Kiefer in studio session"
                  },
                  {
                    src: "/kiefer3.jpg",
                    alt: "Kiefer recording"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
} 