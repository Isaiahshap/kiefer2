'use client';

import PageLayout from '@/components/PageLayout';
import Link from 'next/link';

export default function DiscographyPage() {
  return (
    <PageLayout 
      title="Discography"
      subtitle="A comprehensive collection of Kiefer's music releases over the years."
    >
      <div className="text-center py-20">
        <p className="text-neutral-600 mb-6">
          This page is currently under construction. In the meantime, you can explore Kiefer's music on the main music page.
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