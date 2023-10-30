'use client';

import { ChevronDown, ChevronRight, LucideIcon, Plus } from 'lucide-react';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

interface ItemProps {
  id?: Id<'documents'>;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

function Item({
  icon: Icon,
  label,
  onClick,
  active,
  documentIcon,
  expanded,
  id,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const handleExpanded = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: 'Untitled', parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note.',
    });
  };

  return (
    <div
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
      }}
      onClick={onClick}
      className={cn(
        'group min-h-[35px] w-full flex items-center font-medium text-sm py-2 pr-3 hover:bg-primary/5 text-muted-foreground',
        active && 'bg-primary/5 text-primary'
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm mr-1"
          onClick={handleExpanded}
        >
          <ChevronIcon className="h-5 w-5 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2" />
      )}

      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="inline-flex items-center pointer-events-none select-none h-5 ml-auto gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}

      {!!id && (
        <div
          role="button"
          onClick={onCreate}
          className="ml-auto flex items-center gap-x-2"
        >
          <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm ">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
