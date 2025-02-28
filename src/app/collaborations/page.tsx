'use client';

import PageLayout from '@/components/PageLayout';
import Link from 'next/link';

export default function CollaborationsPage() {
  return (
    <PageLayout 
      title="Collaborations"
      subtitle="Explore Kiefer's collaborative work with other artists, producers, and musicians."
    >
      <div className="text-center py-20">
        <p className="text-neutral-600 mb-6">
          This page is currently under construction. Check back soon to explore Kiefer's collaborations with other artists.
        </p>
        <Link 
          href="/music" 
          className="px-6 py-3 bg-neutral-900 text-neutral-100 rounded-md font-medium hover:bg-neutral-800 transition-colors inline-block"
        >
          Go to Music Page
        </Link>
      </div>
    </PageLayout>
  );
} 