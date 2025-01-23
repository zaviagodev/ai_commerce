import { useLanguage } from "./language-context";
import { translations } from "./translations";

export function useTranslation() {
  const { locale } = useLanguage();
  return translations[locale];
}

export function useFormatNumber() {
  const { locale } = useLanguage();

  return {
    format: (value: number, options?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(locale, options).format(value);
    },
    formatCurrency: (value: number, currency = "USD") => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(value);
    },
  };
}

export function useFormatDate() {
  const { locale } = useLanguage();

  return {
    format: (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const d = typeof date === "string" ? new Date(date) : date;
      return new Intl.DateTimeFormat(locale, options).format(d);
    },
    relative: (date: Date | string) => {
      const d = typeof date === "string" ? new Date(date) : date;
      return new Intl.RelativeTimeFormat(locale).format(
        Math.round((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        "day",
      );
    },
  };
}
