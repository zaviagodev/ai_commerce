import { cn } from '@/lib/utils';

interface StatusTabsProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  counts: Record<string, number>;
}

const STATUSES = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
] as const;

export function StatusTabs({
  selectedStatus,
  onStatusChange,
  counts,
}: StatusTabsProps) {
  return (
    <div className="flex space-x-1 rounded-lg bg-muted p-1 w-fit">
      {STATUSES.map((status) => (
        <button
          key={status.value}
          onClick={() => onStatusChange(status.value)}
          className={cn(
            'relative flex-1 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all',
            'hover:bg-background/50',
            selectedStatus === status.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground'
          )}
        >
          {status.label}
          {status.value === 'all' ? (
            <span
              className={cn(
                'ml-1.5 rounded-full px-1.5 text-xs',
                selectedStatus === status.value
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted-foreground/20 text-muted-foreground'
              )}
            >
              {Object.values(counts).reduce((a, b) => a + b, 0)}
            </span>
          ) : (
            counts[status.value] > 0 && (
              <span
                className={cn(
                  'ml-1.5 rounded-full px-1.5 text-xs',
                  selectedStatus === status.value
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted-foreground/20 text-muted-foreground'
                )}
              >
                {counts[status.value]}
              </span>
            )
          )}
        </button>
      ))}
    </div>
  );
}
