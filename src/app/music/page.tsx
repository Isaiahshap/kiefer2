'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

// Sample music data
const musicData = {
  albums: [
    {
      id: 1,
      title: "It's Ok, B U",
      year: "2023",
      cover: "https://images.unsplash.com/photo-1520190282873-afe1285c9a2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      tracks: [
        { title: "Track 1", duration: "3:42" },
        { title: "Track 2", duration: "4:15" },
        { title: "Track 3", duration: "3:28" },
        { title: "Track 4", duration: "5:01" },
        { title: "Track 5", duration: "3:56" },
      ],
      links: {
        spotify: "https://open.spotify.com",
        apple: "https://music.apple.com",
        bandcamp: "https://bandcamp.com",
      }
    },
    {
      id: 2,
      title: "Between Days",
      year: "2019",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      tracks: [
        { title: "Track 1", duration: "4:22" },
        { title: "Track 2", duration: "3:47" },
        { title: "Track 3", duration: "2:59" },
        { title: "Track 4", duration: "4:33" },
        { title: "Track 5", duration: "3:12" },
      ],
      links: {
        spotify: "https://open.spotify.com",
        apple: "https://music.apple.com",
        bandcamp: "https://bandcamp.com",
      }
    },
    {
      id: 3,
      title: "Happysad",
      year: "2018",
      cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      tracks: [
        { title: "Track 1", duration: "3:52" },
        { title: "Track 2", duration: "4:05" },
        { title: "Track 3", duration: "3:18" },
        { title: "Track 4", duration: "4:41" },
        { title: "Track 5", duration: "3:36" },
      ],
      links: {
        spotify: "https://open.spotify.com",
        apple: "https://music.apple.com",
        bandcamp: "https://bandcamp.com",
      }
    },
  ],
  singles: [
    {
      id: 1,
      title: "Single 1",
      year: "2023",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      duration: "3:42",
      links: {
        spotify: "https://open.spotify.com",
        apple: "https://music.apple.com",
        bandcamp: "https://bandcamp.com",
      }
    },
    {
      id: 2,
      title: "Single 2",
      year: "2022",
      cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      duration: "4:15",
      links: {
        spotify: "https://open.spotify.com",
        apple: "https://music.apple.com",
        bandcamp: "https://bandcamp.com",
      }
    },
  ],
};

export default function MusicPage() {
  const [activeAlbum, setActiveAlbum] = useState(musicData.albums[0].id);
  
  // Get the current active album
  const selectedAlbum = musicData.albums.find(album => album.id === activeAlbum);
  
  return (
    <PageLayout 
      title="Music"
      subtitle="Explore Kiefer's discography, including albums, singles, and featured tracks."
    >
      {/* Album section */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Albums</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Album covers */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
            {musicData.albums.map(album => (
              <button
                key={album.id}
                onClick={() => setActiveAlbum(album.id)}
                className={`relative overflow-hidden rounded-md transition-transform ${
                  activeAlbum === album.id ? 'ring-2 ring-neutral-900 scale-[1.02]' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="relative aspect-square">
                  <Image 
                    src={album.cover} 
                    alt={album.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">{album.title}</p>
                  <p className="text-white/70 text-xs">{album.year}</p>
                </div>
              </button>
            ))}
          </div>
          
          {/* Album details */}
          {selectedAlbum && (
            <div className="bg-neutral-100 p-6 rounded-md">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-semibold">{selectedAlbum.title}</h3>
                  <p className="text-neutral-600">{selectedAlbum.year}</p>
                </div>
                
                <div className="flex space-x-3">
                  <Link 
                    href={selectedAlbum.links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-neutral-900 text-neutral-100 rounded-md text-sm hover:bg-neutral-800 transition-colors"
                  >
                    Spotify
                  </Link>
                  <Link 
                    href={selectedAlbum.links.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-neutral-900 text-neutral-100 rounded-md text-sm hover:bg-neutral-800 transition-colors"
                  >
                    Apple Music
                  </Link>
                  <Link 
                    href={selectedAlbum.links.bandcamp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-neutral-900 text-neutral-100 rounded-md text-sm hover:bg-neutral-800 transition-colors"
                  >
                    Bandcamp
                  </Link>
                </div>
              </div>
              
              {/* Tracklist */}
              <ul className="space-y-3">
                {selectedAlbum.tracks.map((track, index) => (
                  <li key={index} className="flex justify-between p-3 bg-neutral-200 rounded-md hover:bg-neutral-300 transition-colors">
                    <span className="font-medium">{track.title}</span>
                    <span className="text-neutral-600">{track.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Singles section */}
      <div>
        <h2 className="text-2xl font-semibold mb-8">Singles</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {musicData.singles.map(single => (
            <div key={single.id} className="bg-neutral-100 rounded-md overflow-hidden">
              <div className="relative aspect-square">
                <Image 
                  src={single.cover} 
                  alt={single.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{single.title}</h3>
                    <p className="text-neutral-600 text-sm">{single.year} • {single.duration}</p>
                  </div>
                  <button className="p-2 bg-neutral-900 text-neutral-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    href={single.links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-neutral-200 text-neutral-800 rounded text-xs hover:bg-neutral-300 transition-colors"
                  >
                    Spotify
                  </Link>
                  <Link 
                    href={single.links.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-neutral-200 text-neutral-800 rounded text-xs hover:bg-neutral-300 transition-colors"
                  >
                    Apple
                  </Link>
                  <Link 
                    href={single.links.bandcamp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-neutral-200 text-neutral-800 rounded text-xs hover:bg-neutral-300 transition-colors"
                  >
                    Bandcamp
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
} 