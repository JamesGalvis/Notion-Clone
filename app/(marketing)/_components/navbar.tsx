'use client';

import { cn } from '@/lib/utils';
import { useScrollTop } from '@/hooks/use-scroll-top';

import Logo from './logo';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

function Navbar() {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        'flex items-center w-full px-6 py-4 top-0 fixed bg-background z-50',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className="flex justify-end items-center w-full gap-x-2 md:ml-auto">
        <ModeToggle />
        <Button>Login</Button>
      </div>
    </div>
  );
}

export default Navbar;
