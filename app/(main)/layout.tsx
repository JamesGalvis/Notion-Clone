'use client';

import React from 'react';
import { useConvexAuth } from 'convex/react';

import { Spinner } from '@/components/spinner';
import { redirect } from 'next/navigation';
import Navigation from './_components/navigation';

function DocumentsLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect('/');
  }

  return (
    <div className="flex h-full">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}

export default DocumentsLayout;
