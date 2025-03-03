'use client';

import { useRef } from 'react';
import Image from 'next/image';

interface CarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function Carousel({ images }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  
  // For touch/drag interactions
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);
  
  // Touch/drag event handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDragging.current = true;
    startX.current = 'touches' in e 
      ? e.touches[0].clientX 
      : (e as React.MouseEvent).clientX;
    
    if (trackRef.current) {
      scrollLeft.current = trackRef.current.scrollLeft;
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    
    const currentX = 'touches' in e 
      ? e.touches[0].clientX 
      : (e as React.MouseEvent).clientX;
    
    const diff = currentX - startX.current;
    trackRef.current.scrollLeft = scrollLeft.current - diff;
  };
  
  const handleTouchEnd = () => {
    isDragging.current = false;
  };
  
  return (
    <div className="w-full overflow-hidden">
      <div 
        ref={trackRef}
        className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar cursor-grab active:cursor-grabbing"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="flex-none"
            style={{ width: '280px' }}
          >
            <div className="relative aspect-[4/3] overflow-hidden ">
              <Image 
                src={image.src} 
                alt={image.alt}
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}