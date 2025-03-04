'use client';

import { useState, useEffect, FormEvent, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

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

// Post-it note Text Class for black text
const postItTextClass = "text-black font-medium";

export default function Board() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  
  // Track click vs drag - improved for more reliability
  const interactionStartTime = useRef<number>(0);
  const startPos = useRef<{ x: number, y: number } | null>(null);
  const isDragging = useRef<boolean>(false);
  const dragDistance = useRef<number>(0);

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

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kieferBoardNotes', JSON.stringify(notes));
  }, [notes]);

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

  const handleDragEnd = (noteId: string, newPosition: { x: number; y: number }) => {
    // Update the note's position in state
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return { ...note, position: newPosition };
      }
      return note;
    });
    
    setNotes(updatedNotes);
  };

  const calculatePosition = (e: React.MouseEvent | MouseEvent | TouchEvent) => {
    if (!boardRef.current) return;
    
    const boardRect = boardRef.current.getBoundingClientRect();
    
    // Get client coordinates (handle both mouse and touch events)
    const clientX = 'clientX' in e ? e.clientX : ('touches' in e ? e.touches[0].clientX : 0);
    const clientY = 'clientY' in e ? e.clientY : ('touches' in e ? e.touches[0].clientY : 0);
    
    const x = ((clientX - boardRect.left) / boardRect.width) * 100;
    const y = ((clientY - boardRect.top) / boardRect.height) * 100;
    
    // Clamp values to keep notes within board boundaries
    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(5, Math.min(95, y));
    
    return { x: clampedX, y: clampedY };
  };

  // Improved drag vs click detection
  const handleDragStart = (e: MouseEvent | TouchEvent | PointerEvent) => {
    interactionStartTime.current = Date.now();
    isDragging.current = false;
    dragDistance.current = 0;
    
    // Record start position for better drag detection
    if ('clientX' in e && 'clientY' in e) {
      startPos.current = { x: e.clientX, y: e.clientY };
    } else if ('touches' in e && e.touches.length > 0) {
      startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  
  const handleDrag = (e: MouseEvent | TouchEvent | PointerEvent) => {
    if (!startPos.current) return;
    
    let currentX = 0;
    let currentY = 0;
    
    if ('clientX' in e && 'clientY' in e) {
      currentX = e.clientX;
      currentY = e.clientY;
    } else if ('touches' in e && e.touches.length > 0) {
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
    }
    
    // Calculate distance moved
    const dx = currentX - startPos.current.x;
    const dy = currentY - startPos.current.y;
    dragDistance.current = Math.sqrt(dx*dx + dy*dy);
    
    // Consider dragging if moved more than 5px
    if (dragDistance.current > 5) {
      isDragging.current = true;
    }
  };
  
  const handleClick = (note: Note) => {
    // Only consider a click if minimal movement occurred
    if (!isDragging.current || dragDistance.current < 5) {
      setSelectedNote(note);
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
          
          {/* Cork Board - Made larger with full width */}
          <div className="relative w-full flex justify-center mb-12">
            <div 
              ref={boardRef}
              className="relative w-full max-w-4xl aspect-[16/10] shadow-xl overflow-hidden rounded-lg"
            >
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
              
              {/* Smaller, draggable sticky notes */}
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  className={`absolute shadow-lg p-2 w-28 h-28 cursor-move ${note.color}`}
                  style={{
                    left: `${note.position.x}%`,
                    top: `${note.position.y}%`,
                    transform: `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg)`,
                    zIndex: 10,
                  }}
                  drag
                  dragConstraints={boardRef}
                  dragElastic={0.1}
                  dragMomentum={false}
                  onDragStart={handleDragStart}
                  onDrag={handleDrag}
                  onDragEnd={(e) => {
                    const newPosition = calculatePosition(e);
                    if (newPosition) {
                      handleDragEnd(note.id, newPosition);
                    }
                    // Reset after a short delay to allow click events
                    setTimeout(() => {
                      isDragging.current = false;
                    }, 50);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(note);
                  }}
                  whileHover={{ 
                    zIndex: 30, 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="h-full flex flex-col overflow-hidden font-mono text-xs">
                    <p className={`text-xs font-bold mb-1 border-b border-gray-300 pb-1 truncate ${postItTextClass}`}>{note.name}</p>
                    <p className={`flex-1 overflow-hidden line-clamp-4 text-[10px] ${postItTextClass}`}>{note.message}</p>
                    <p className="text-[8px] text-right mt-1 text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
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
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50 text-black"
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
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50 text-black"
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
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50 text-black"
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

        {/* Improved Modal Implementation */}
        {selectedNote && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className={`${selectedNote.color} p-6 rounded-lg shadow-2xl max-w-md w-full`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-black">{selectedNote.name}</h3>
                <button 
                  onClick={() => setSelectedNote(null)}
                  className="text-gray-700 hover:text-gray-900"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-lg mb-4 whitespace-pre-wrap text-black">{selectedNote.message}</p>
              <p className="text-sm text-gray-600 text-right">
                {new Date(selectedNote.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
} 