import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';

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
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

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
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
          onClick={() => {}}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <div className="inline-flex items-center pointer-events-none select-none h-5 ml-auto gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </div>
      )}
    </div>
  );
}

export default Item;
