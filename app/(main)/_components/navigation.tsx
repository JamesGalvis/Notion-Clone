'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ElementRef, useRef, useState, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { toast } from 'sonner';
import {
  ChevronsLeft,
  ChevronsRight,
  PlusCircle,
  Search,
  Settings,
} from 'lucide-react';

import { api } from '@/convex/_generated/api';
import { useQuery, useMutation } from 'convex/react';

import UserItem from './user-item';
import Item from './item';
import DocumentList from './document-list';

function Navigation() {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  // const documents = useQuery(api.documents.getAll);
  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 400) newWidth = 400;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty(
        'width',
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)'
      );
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '100%');
      navbarRef.current.style.setProperty('left', '0');

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const onCreate = () => {
    const promise = create({ title: 'Untitled' });

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note.',
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-full bg-secondary overflow-y-auto relative flex  flex-col w-60',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div
          onClick={collapse}
          className={cn(
            'h-6 w-6 text-muted-foreground rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-4 right-2 opacity-0 group-hover/sidebar:opacity-100 transition cursor-pointer',
            isMobile && 'opacity-100'
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={() => {}} />
          <Item label="Settings" icon={Settings} onClick={() => {}} />
          <Item label="New note" icon={PlusCircle} onClick={onCreate} />
        </div>

        <div className="mt-4">
          <DocumentList />
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
      >
        <nav className="bg-transparent w-full px-3 py-2">
          {isCollapsed && (
            <ChevronsRight
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
}

export default Navigation;
