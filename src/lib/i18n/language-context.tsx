import { createContext, useContext, useEffect, useState } from "react";
import { defaultLocale, type Locale, locales } from "./config";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    // Try to get from localStorage first
    const saved = localStorage.getItem("language") as Locale;
    // Check if saved value is valid
    if (saved && locales.includes(saved)) {
      return saved;
    }

    // Try to get from browser settings
    const browserLang = navigator.language;
    const matchedLocale = locales.find((loc) =>
      browserLang.startsWith(loc.split("-")[0]),
    );

    return matchedLocale || defaultLocale;
  });

  useEffect(() => {
    // Update localStorage and document lang when locale changes
    localStorage.setItem("language", locale);
    document.documentElement.lang = locale;

    // Update text direction if needed
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
