export const locales = ["en-US", "th-TH"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en-US";

export const languageNames: Record<
  Locale,
  { native: string; english: string }
> = {
  "en-US": {
    native: "English",
    english: "English",
  },
  "th-TH": {
    native: "ไทย",
    english: "Thai",
  },
};
