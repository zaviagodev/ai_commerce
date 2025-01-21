import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/hooks';

interface StatusTabsProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  counts: Record<string, number>;
}

const STATUSES = [
  { value: 'all', label: 'All', className:'!bg-gray-100 !text-gray-800' },
  { value: 'pending', label: 'Pending', className:'!bg-yellow-100 !text-yellow-800' },
  { value: 'processing', label: 'Processing', className:'!bg-blue-100 !text-blue-800' },
  { value: 'shipped', label: 'Shipped', className:'!bg-purple-100 !text-purple-800' },
  { value: 'delivered', label: 'Delivered', className:'!bg-green-100 !text-green-800' },
  { value: 'cancelled', label: 'Cancelled', className:'!bg-red-100 !text-red-800' },
] as const;

export function StatusTabs({
  selectedStatus,
  onStatusChange,
  counts,
}: StatusTabsProps) {
  const t = useTranslation();

  return (
    <div className="flex space-x-1 rounded-lg bg-muted p-1 w-full lg:w-fit">
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
          {t.orders.orders.status[status.value]}
          {status.value === 'all' ? (
            <span
              className={cn(
                'ml-1.5 rounded-full px-1.5 text-xs',
                selectedStatus === status.value
                  ? status.className
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
                    ? status.className
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
