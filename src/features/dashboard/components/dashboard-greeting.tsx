import { useAuth } from "@/lib/auth/auth-hooks";
import { HelloSvg } from "@/components/hello-svg";
import { useTranslation } from '@/lib/i18n/hooks';

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
  const t = useTranslation();
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const firstName = user?.fullName?.split(' ')[0] || 'there';
  
  // Get random emoji for the current day
  const emojis = dayEmojis[dayName] || ['✨'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  return (
    <div className="space-y-1.5">
      <div className="flex items-end gap-3 -mx-6 py-3 px-6 sticky top-0 z-10 pt-14">
        <HelloSvg />
        <span className="text-2xl font-semibold tracking-tight translate-y-1">
          {t.dashboard.greeting.greeting.replace('{name}', firstName)} {randomEmoji}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        {t.dashboard.greeting.subtitle}
      </p>
    </div>
  );
}
