import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2 } from 'lucide-react';
import { SalesChannelsDialog } from './sales-channels-dialog';
import { cn } from '@/lib/utils';

const CHANNEL_COLORS: Record<string, { bg: string; text: string }> = {
  shopee: { bg: 'bg-orange-100', text: 'text-orange-700' },
  lazada: { bg: 'bg-blue-100', text: 'text-blue-700' },
  lineoa: { bg: 'bg-green-100', text: 'text-green-700' },
  linemyshop: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  tiktok: { bg: 'bg-purple-100', text: 'text-purple-700' },
  website: { bg: 'bg-pink-100', text: 'text-pink-700' },
};

interface SalesChannelsSectionProps {
  activeChannels: string[];
  onChannelsChange: (channels: string[]) => void;
}

export function SalesChannelsSection({
  activeChannels,
  onChannelsChange,
}: SalesChannelsSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChannelToggle = (channelId: string) => {
    const newChannels = activeChannels.includes(channelId)
      ? activeChannels.filter(id => id !== channelId)
      : [...activeChannels, channelId];
    onChannelsChange(newChannels);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {activeChannels.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No sales channels selected
          </p>
        ) : (
          activeChannels.map((channel) => (
            <Badge 
              key={channel} 
              variant="secondary"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1",
                CHANNEL_COLORS[channel]?.bg,
                CHANNEL_COLORS[channel]?.text
              )}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {channel.charAt(0).toUpperCase() + channel.slice(1)}
            </Badge>
          ))
        )}
      </div>

      <Button
        type="button"
        variant="outline" 
        className="w-full mt-4"
        onClick={() => setIsDialogOpen(true)}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Manage Sales Channels
      </Button>

      <SalesChannelsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        activeChannels={activeChannels}
        onChannelToggle={handleChannelToggle}
      />
    </>
  );
}