'use client';

import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';

import { cn } from '@/lib/utils';
import { useScrollTop } from '@/hooks/use-scroll-top';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

import Logo from './logo';
import { Spinner } from '@/components/spinner';
import Link from 'next/link';

function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        'flex items-center w-full px-6 py-4 top-0 fixed bg-background/60 z-50 backdrop-blur-lg',
        scrolled && 'border-b'
      )}
    >
      <Logo />
      <div className="flex justify-between sm:justify-end items-center w-full gap-x-2 md:ml-auto">
        <ModeToggle />
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <div className="flex gap-x-3">
            <SignInButton mode="modal">
              <Button size="sm">Get Notion free</Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button variant="ghost">Log in</Button>
            </SignInButton>
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <div className="flex gap-x-3">
            <Button size="sm" asChild>
              <Link href="/documents">Enter to Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
