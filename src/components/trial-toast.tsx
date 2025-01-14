import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { X, Zap } from 'lucide-react';
import { addDays, format, differenceInDays } from 'date-fns';

export function TrialToast() {
  useEffect(() => {
    const trialEndDate = addDays(new Date(), 14);
    const formattedDate = format(trialEndDate, 'MMMM d, yyyy');
    const daysLeft = differenceInDays(trialEndDate, new Date());

    // Create a persistent toast
    toast.custom(
      ({ id }) => (
        <div className="relative rounded-2xl overflow-hidden">
          {/* Rainbow gradient border - perfectly clipped */}
          <div className="absolute inset-0 bg-[conic-gradient(from_var(--angle),#FF0080,#FF4ECD,#7928CA,#4364FF,#0070F3,#00DFD8,#FF0080)] animate-border" />
          
          {/* Space black background with perfect clipping */}
          <div className="absolute inset-[1px] rounded-[15px] bg-[#1C1C1E] shadow-[0_8px_32px_rgb(0_0_0/0.12)]" />
          
          {/* Content */}
          <div className="relative p-4">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start justify-between">
                <div className="font-semibold text-main">
                  You have {daysLeft} days left in your trial
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0 rounded-full hover:bg-zinc-800 -mr-2 -mt-2"
                  onClick={() => toast.dismiss(id)}
                >
                  <X className="h-4 w-4 text-zinc-400" />
                </Button>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Your trial ends on <span className="font-semibold">{formattedDate}</span>. Select a plan to get your <span className="font-semibold">first month for $1</span>.
              </p>
              <Button 
                size="sm" 
                className="w-full bg-[#FFB800] hover:bg-[#FFC933] active:bg-[#E6A600] text-black font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all duration-200"
              >
                <Zap className="mr-2 h-4 w-4" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      ),
      {
        id: 'trial-warning',
        duration: Infinity,
        position: 'bottom-right',
      }
    );

    // Cleanup function
    return () => {
      toast.dismiss('trial-warning');
    };
  }, []);

  return null;
}