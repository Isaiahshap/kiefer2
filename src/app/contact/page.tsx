'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';

const contactInfo = [
  {
    title: 'General Inquiries',
    email: 'info@kiefermusic.com',
    description: 'For general questions, press requests, or other inquiries.',
  },
  {
    title: 'Booking',
    email: 'booking@kiefermusic.com',
    description: 'For booking Kiefer for live performances, festivals, or events.',
  },
  {
    title: 'Management',
    email: 'management@kiefermusic.com',
    description: 'For management, business, and collaboration inquiries.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form data
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <PageLayout 
      title="Contact"
      subtitle="Get in touch with Kiefer for bookings, press inquiries, or general questions."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          
          <div className="space-y-8">
            {contactInfo.map((info, i) => (
              <div key={i} className="bg-neutral-100 p-6 rounded-md">
                <h3 className="text-xl font-medium mb-2">{info.title}</h3>
                <a 
                  href={`mailto:${info.email}`} 
                  className="text-neutral-900 font-medium hover:underline"
                >
                  {info.email}
                </a>
                <p className="text-neutral-600 mt-2">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Social Media</h2>
            <p className="text-neutral-600 mb-4">
              Follow Kiefer on social media for the latest updates, music releases, and tour announcements.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900 text-neutral-100 rounded-md hover:bg-neutral-800 transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900 text-neutral-100 rounded-md hover:bg-neutral-800 transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900 text-neutral-100 rounded-md hover:bg-neutral-800 transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
          
          {submitSuccess ? (
            <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6">
              Thank you for your message! We'll get back to you as soon as possible.
            </div>
          ) : submitError ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
              There was an error sending your message. Please try again later.
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Booking Request">Booking Request</option>
                <option value="Press Inquiry">Press Inquiry</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md font-medium transition-colors ${
                isSubmitting 
                  ? 'bg-neutral-400 text-neutral-100 cursor-not-allowed' 
                  : 'bg-neutral-900 text-neutral-100 hover:bg-neutral-800'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
} 