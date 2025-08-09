'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import enMessages from '../../messages/en.json';
import srMessages from '../../messages/sr.json';
import { countries, fetchCountries } from '../data/countries';

type Language = 'en' | 'sr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, values?: Record<string, any>) => string;
  countryName: (isoCode: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const messages = {
  en: enMessages,
  sr: srMessages,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [allCountries, setAllCountries] = useState(countries); // Start with fallback data

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'sr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Load countries from API on mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const apiCountries = await fetchCountries();
        if (apiCountries.length > 0) {
          setAllCountries(apiCountries);
        }
      } catch (error) {
        console.error('Failed to load countries from API, using fallback:', error);
        // Keep using the fallback countries
      }
    };
    
    loadCountries();
  }, []);

  // Save language preference to localStorage when it changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string, values?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = messages[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if translation not found
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // Replace placeholders with values
    if (values) {
      return value.replace(/\{(\w+)\}/g, (match, key) => {
        return values[key] !== undefined ? String(values[key]) : match;
      });
    }

    return value;
  };

  // Get country name by ISO code from countries data
  const countryName = (isoCode: string): string => {
    const country = allCountries.find(c => c.code.toLowerCase() === isoCode.toLowerCase());
    if (country) {
      return language === 'en' ? country.nameEn : country.nameSr;
    }
    // Fallback to translation if not found in countries data
    return t(`countries.${isoCode.toLowerCase()}`) || isoCode;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      t,
      countryName,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 