'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      // Simulate a successful submission most of the time
      if (Math.random() > 0.1) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setSubmitError(false);
        // Reset form data
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        // Simulate an error
        setIsSubmitting(false);
        setSubmitSuccess(false);
        setSubmitError(true);
        
        // Hide error message after 5 seconds
        setTimeout(() => {
          setSubmitError(false);
        }, 5000);
      }
    }, 1500);
  };
  
  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 pb-12">
          <h1 className="text-4xl font-bold mb-6 text-center text-slate-800">Contact</h1>
          <p className="text-center text-lg mb-8 max-w-2xl mx-auto text-slate-700 font-medium">
            Get in touch with Kiefer for bookings, press inquiries, or general questions.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-slate-800">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-xl font-medium mb-2 text-slate-700">{info.title}</h3>
                    <a 
                      href={`mailto:${info.email}`} 
                      className="text-slate-800 font-medium hover:text-blue-600 transition-colors"
                    >
                      {info.email}
                    </a>
                    <p className="text-slate-600 mt-2">
                      {info.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6 text-slate-800">Social Media</h2>
                <p className="text-slate-600 mb-6">
                  Follow Kiefer on social media for the latest updates, music releases, and tour announcements.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-slate-800">Send a Message</h2>
              
              {submitSuccess ? (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 shadow-sm">
                  <p className="font-medium">Thank you for your message!</p>
                  <p>We&apos;ll get back to you as soon as possible.</p>
                </div>
              ) : submitError ? (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 shadow-sm">
                  <p className="font-medium">There was an error sending your message.</p>
                  <p>Please try again later.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-medium shadow-sm transition-colors ${
                    isSubmitting 
                      ? 'bg-slate-400 text-white cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 