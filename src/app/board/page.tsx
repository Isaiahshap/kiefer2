'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define the interface for a note
interface Note {
  id: string;
  name: string;
  message: string;
  color: string;
  position: {
    x: number;
    y: number;
  };
  createdAt: number;
}

export default function Board() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('kieferBoardNotes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (err) {
        console.error('Error parsing saved notes:', err);
        // If there's an error parsing, just start with an empty array
        localStorage.setItem('kieferBoardNotes', JSON.stringify([]));
      }
    } else {
      // Initialize empty notes array if none exists
      localStorage.setItem('kieferBoardNotes', JSON.stringify([]));
    }
  }, []);

  // Generate a random color for the sticky note
  const getRandomColor = () => {
    const colors = [
      'bg-yellow-200',
      'bg-blue-200',
      'bg-green-200',
      'bg-pink-200',
      'bg-purple-200',
      'bg-orange-200',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Generate a random position within the board area
  const getRandomPosition = () => {
    // Define board boundaries (percent of board width/height)
    // We'll keep positions within 10-90% of the board area
    return {
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 80) + 10,
    };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Simple validation
    if (!name || !email || !message) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Create a new note
    const newNote: Note = {
      id: Date.now().toString(),
      name,
      message,
      color: getRandomColor(),
      position: getRandomPosition(),
      createdAt: Date.now(),
    };

    try {
      // Add the new note to the array
      const updatedNotes = [...notes, newNote];
      
      // Save to localStorage
      localStorage.setItem('kieferBoardNotes', JSON.stringify(updatedNotes));
      
      // Update state
      setNotes(updatedNotes);
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving note:', err);
      setError('Failed to save your note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-amber-50">
        <div className="container mx-auto px-4 pb-12">
          <h1 className="text-4xl font-bold mb-6 text-center text-stone-900">Kiefer Board</h1>
          <p className="text-center text-lg mb-8 max-w-2xl mx-auto text-stone-800 font-medium">
            Leave a note for Kiefer and the community! Your message will appear as a sticky note on the board.
          </p>
          
          {/* Cork Board */}
          <div className="relative w-full flex justify-center mb-12">
            <div className="relative w-full max-w-5xl aspect-[16/9] shadow-xl overflow-hidden">
              <Image
                src="/board.png"
                alt="Cork Board"
                fill
                className="object-cover"
                priority
              />
              
              {/* Pushpins for decoration */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-red-500 rounded-full shadow-md z-20"></div>
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full shadow-md z-20"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-green-500 rounded-full shadow-md z-20"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-yellow-500 rounded-full shadow-md z-20"></div>
              
              {/* Sticky notes on the board */}
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`absolute shadow-lg p-3 w-40 h-40 transform transition-transform hover:rotate-0 hover:z-30 hover:scale-110 ${note.color}`}
                  style={{
                    left: `${note.position.x}%`,
                    top: `${note.position.y}%`,
                    transform: `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg)`,
                    zIndex: 10,
                  }}
                >
                  <div className="h-full flex flex-col overflow-hidden font-mono text-sm">
                    <p className="text-sm font-bold mb-1 border-b border-gray-300 pb-1">{note.name}</p>
                    <p className="flex-1 overflow-auto">{note.message}</p>
                    <p className="text-[10px] text-right mt-2 text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-amber-200">
            <h2 className="text-xl font-semibold mb-4 text-amber-800">Post Your Message</h2>
            
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
                <p className="font-medium">Your message has been posted!</p>
                <p className="text-sm">Check the board to see your sticky note.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your email will not be displayed publicly.
                </p>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50"
                  required
                  maxLength={200}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum 200 characters
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg transition-all'
                }`}
              >
                {isSubmitting ? 'Posting...' : 'Post to Board'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 