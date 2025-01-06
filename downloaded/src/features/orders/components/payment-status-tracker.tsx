import { Badge } from '@/components/ui/badge'; 
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';

const PAYMENT_STATUSES = [
  { id: 'unpaid', label: 'Unpaid' },
  { id: 'pending', label: 'Pending' },
  { id: 'paid', label: 'Paid' },
] as const;

interface PaymentStatusTrackerProps {
  currentStatus: 'unpaid' | 'pending' | 'paid';
}

export function PaymentStatusTracker({ currentStatus }: PaymentStatusTrackerProps) {
  const currentIndex = PAYMENT_STATUSES.findIndex(status => status.id === currentStatus);
  const nextStatus = PAYMENT_STATUSES[currentIndex + 1];
  const currentStatusData = PAYMENT_STATUSES[currentIndex];

  if (!currentStatusData) return null;

  return (
    <div className="relative flex items-center justify-between w-[240px] h-8">
      {/* Connecting Line */}
      <div className="absolute left-[calc(25%+24px)] right-[calc(25%+24px)] top-1/2 h-[2px] -translate-y-1/2">
        <div className="relative h-full">
          {/* Background line */}
          <div className="absolute inset-0 bg-muted" />
          
          {/* Animated progress line */}
          {nextStatus && (
            <div className="absolute h-full w-full bg-gray-100">
              <div 
                className="absolute h-full w-8 animate-[shimmer_2s_infinite]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(156,163,175,0.3), transparent)',
                }}
              />
            </div>
          )}
        </div>
        
        {/* Chevron Icon */}
        {nextStatus && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full border p-1 border-gray-200">
            <ChevronRight className="h-2.5 w-2.5 text-gray-400 animate-pulse" />
          </div>
        )}
      </div>

      {/* Current Status */}
      <div className="relative z-10">
        <Badge 
          variant={currentStatus === 'unpaid' ? 'outline' : 'default'}
          className={cn("flex items-center gap-1.5", {
            "border-yellow-500/50 bg-yellow-50 text-yellow-700": currentStatus === 'unpaid',
            "bg-primary text-primary-foreground": currentStatus === 'paid'
          })}
        >
          {currentStatus === 'unpaid' && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
            </span>
          )}
          {currentStatusData.label}
        </Badge>
      </div>

      {/* Next Status */}
      {nextStatus && (
        <div className="relative z-10">
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1.5 bg-gray-100/50 text-gray-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gray-300/50"></span>
            </span>
            {nextStatus.label}
          </Badge>
        </div>
      )}
    </div>
  );
}