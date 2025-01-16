import { dashboard } from './features/dashboard';

export const translations = {
  en: {
    dashboard: dashboard.en,
  },
  th: {
    dashboard: dashboard.th,
  },
} as const;

export type Language = keyof typeof translations;