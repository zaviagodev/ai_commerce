import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from './i18n/hooks';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function getTimeAgo(date: Date): string {
  const t = useTranslation();
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
  let interval = seconds / 31536000;
  if (interval > 1) return t.teams.members.timeAgo[Math.floor(interval) === 1 ? "year" : "years"].replace("{{count}}", Math.floor(interval) as any)
  
  interval = seconds / 2592000;
  if (interval > 1) return t.teams.members.timeAgo[Math.floor(interval) === 1 ? "month" : "months"].replace("{{count}}", Math.floor(interval)  as any)

  interval = seconds / 86400;
  if (interval > 1) return t.teams.members.timeAgo[Math.floor(interval) === 1 ? "day" : "days"].replace("{{count}}", Math.floor(interval)  as any)
  
  interval = seconds / 3600;
  if (interval > 1) return t.teams.members.timeAgo[Math.floor(interval) === 1 ? "hour" : "hours"].replace("{{count}}", Math.floor(interval)  as any)
  
  interval = seconds / 60;
  if (interval > 1) return t.teams.members.timeAgo[Math.floor(interval) === 1 ? "minute" : "minutes"].replace("{{count}}", Math.floor(interval)  as any)
  
  // return 'Just now';
  return t.teams.members.timeAgo.justNow
}