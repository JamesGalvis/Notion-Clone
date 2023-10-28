'use client';

import { ArrowRight } from 'lucide-react';
import { useConvexAuth } from 'convex/react';
import { SignInButton } from '@clerk/clerk-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';
import Link from 'next/link';

function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl">
        Your Ideas, Documents, & Plans. Unified. Welcome to{' '}
        <span className="underline">Notion</span>
      </h1>
      <h3 className="font-medium text-base sm:text-xl md:text-2xl">
        Notion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notion free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">Enter to Notion</Link>
        </Button>
      )}
    </div>
  );
}

export default Heading;
