import { useAuth } from "@/lib/auth/auth-hooks";
import { HelloSvg } from "@/components/hello-svg";

const dayEmojis: Record<string, string[]> = {
  Monday: ['🌅', '☕️', '💪', '🎯'],
  Tuesday: ['🌟', '🚀', '💫', '⭐️'],
  Wednesday: ['🌈', '🎨', '🎭', '🎪'],
  Thursday: ['⚡️', '🔥', '💫', '✨'],
  Friday: ['🎉', '🎊', '🎈', '🥳'],
  Saturday: ['🌞', '🏖️', '🎮', '🎸'],
  Sunday: ['🌅', '🧘', '🎵', '🌺']
};

export function DashboardGreeting() {
  const { user } = useAuth();
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const firstName = user?.fullName?.split(' ')[0] || 'there';
  
  // Get random emoji for the current day
  const emojis = dayEmojis[dayName] || ['✨'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  return (
    <div className="space-y-1.5">
      <div className="flex items-end gap-3">
        <HelloSvg />
        <span className="text-2xl font-semibold tracking-tight translate-y-1">
          {dayName}, {firstName} {randomEmoji}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        Here's what's happening with your store today
      </p>
    </div>
  );
}