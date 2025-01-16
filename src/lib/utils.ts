import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
  let interval = seconds / 31536000;
  if (interval > 1) return `${Math.floor(interval)} year${Math.floor(interval) === 1 ? "" : "s"} ago`;
  
  interval = seconds / 2592000;
  if (interval > 1) return `${Math.floor(interval)} month${Math.floor(interval) === 1 ? "" : "s"} ago`;
  
  interval = seconds / 86400;
  if (interval > 1) return `${Math.floor(interval)} day${Math.floor(interval) === 1 ? "" : "s"} ago`;
  
  interval = seconds / 3600;
  if (interval > 1) return `${Math.floor(interval)} hour${Math.floor(interval) === 1 ? "" : "s"} ago`;
  
  interval = seconds / 60;
  if (interval > 1) return `${Math.floor(interval)} minute${Math.floor(interval) === 1 ? "" : "s"} ago`;
  
  return 'Just now';
}

export function hexToHSL(hex: string): string {
  hex = hex.replace(/^#/, '');
  if (![3, 6].includes(hex.length)) {
    throw new Error("Invalid HEX color.");
  }

  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  const r: number = parseInt(hex.substring(0, 2), 16) / 255;
  const g: number = parseInt(hex.substring(2, 4), 16) / 255;
  const b: number = parseInt(hex.substring(4, 6), 16) / 255;

  const max: number = Math.max(r, g, b);
  const min: number = Math.min(r, g, b);
  let h: number = 0, s: number = 0, l: number = (max + min) / 2;

  if (max !== min) {
    const d: number = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0));
        break;
      case g:
        h = ((b - r) / d + 2);
        break;
      case b:
        h = ((r - g) / d + 4);
        break;
    }
    h /= 6;
  }

  const hue: number = Math.round(h * 360);
  const saturation: number = Math.round(s * 100);
  const lightness: number = Math.round(l * 100);

  return `${hue}, ${saturation}%, ${lightness}%`;
}