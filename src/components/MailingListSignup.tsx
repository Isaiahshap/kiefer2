'use client';

import { useState } from 'react';

export default function MailingListSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This would normally connect to your mailing list API
    // For now we'll just simulate a successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setEmail('');
      
      // Reset status message after a delay
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-5 mt-24 text-center">
      <h2 className="text-xl font-medium mb-4">Join the Kiefer Mailing List</h2>
      <p className="text-white font-space-mono leading-relaxed mb-6 max-w-2xl mx-auto">
        Sign up to receive news, exclusive content, and updates directly from Kiefer.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 bg-neutral-100 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-neutral-900 text-neutral-100 rounded-md font-medium hover:bg-neutral-800 transition-colors whitespace-nowrap disabled:opacity-70"
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      
      {submitStatus === 'success' && (
        <p className="mt-4 text-green-500 font-space-mono">
          Thanks for signing up!
        </p>
      )}
      
      {submitStatus === 'error' && (
        <p className="mt-4 text-red-500 font-space-mono">
          There was an error. Please try again.
        </p>
      )}
    </div>
  );
} 