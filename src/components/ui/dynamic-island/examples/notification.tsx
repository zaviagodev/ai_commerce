import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DynamicIsland,
  DynamicContainer,
  DynamicTitle,
  DynamicDescription,
  DynamicIslandProvider,
  useDynamicIslandSize,
  SIZE_PRESETS,
} from '../';

export function NotificationExample() {
  const [showNotification, setShowNotification] = useState(false);

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <DynamicIslandProvider>
        <DynamicIsland id="notification">
          {showNotification ? <NotificationContent /> : null}
        </DynamicIsland>
        
        <Button onClick={handleShowNotification}>
          <Bell className="mr-2 h-4 w-4" />
          Show Notification
        </Button>
      </DynamicIslandProvider>
    </div>
  );
}

function NotificationContent() {
  const { setSize } = useDynamicIslandSize();

  // Trigger animation when component mounts
  React.useEffect(() => {
    setSize(SIZE_PRESETS.COMPACT_MEDIUM);
    return () => setSize(SIZE_PRESETS.DEFAULT);
  }, [setSize]);

  return (
    <DynamicContainer className="flex h-full w-full items-center justify-between gap-4 px-4 text-main">
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <Bell className="h-4 w-4" />
        </div>
        <div className="flex flex-col gap-0.5">
          <DynamicTitle className="text-sm font-medium">
            New Message
          </DynamicTitle>
          <DynamicDescription className="text-xs text-gray-300">
            John Doe sent you a message
          </DynamicDescription>
        </div>
      </div>
    </DynamicContainer>
  );
}