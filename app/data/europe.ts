import { Country, fetchEuropeCountries } from './countries';

// Fallback static Europe data for backward compatibility
const fallbackEurope: Country[] = [
  { code: 'fr', nameEn: 'France', nameSr: 'Француска', flagFile: 'fr.svg', continent: 'Europe' },
  { code: 'de', nameEn: 'Germany', nameSr: 'Немачка', flagFile: 'de.svg', continent: 'Europe' },
  { code: 'it', nameEn: 'Italy', nameSr: 'Италија', flagFile: 'it.svg', continent: 'Europe' },
  { code: 'es', nameEn: 'Spain', nameSr: 'Шпанија', flagFile: 'es.svg', continent: 'Europe' },
  { code: 'gb', nameEn: 'United Kingdom', nameSr: 'Уједињено Краљевство', flagFile: 'gb.svg', continent: 'Europe' },
  { code: 'at', nameEn: 'Austria', nameSr: 'Аустрија', flagFile: 'at.svg', continent: 'Europe' },
  { code: 'ch', nameEn: 'Switzerland', nameSr: 'Швајцарска', flagFile: 'ch.svg', continent: 'Europe' },
  { code: 'nl', nameEn: 'Netherlands', nameSr: 'Холандија', flagFile: 'nl.svg', continent: 'Europe' },
  { code: 'be', nameEn: 'Belgium', nameSr: 'Белгија', flagFile: 'be.svg', continent: 'Europe' },
  { code: 'pt', nameEn: 'Portugal', nameSr: 'Португалија', flagFile: 'pt.svg', continent: 'Europe' },
  { code: 'gr', nameEn: 'Greece', nameSr: 'Грчка', flagFile: 'gr.svg', continent: 'Europe' },
  { code: 'se', nameEn: 'Sweden', nameSr: 'Шведска', flagFile: 'se.svg', continent: 'Europe' },
  { code: 'no', nameEn: 'Norway', nameSr: 'Норвешка', flagFile: 'no.svg', continent: 'Europe' },
  { code: 'dk', nameEn: 'Denmark', nameSr: 'Данска', flagFile: 'dk.svg', continent: 'Europe' },
  { code: 'fi', nameEn: 'Finland', nameSr: 'Финска', flagFile: 'fi.svg', continent: 'Europe' },
  { code: 'pl', nameEn: 'Poland', nameSr: 'Пољска', flagFile: 'pl.svg', continent: 'Europe' },
  { code: 'cz', nameEn: 'Czech Republic', nameSr: 'Чешка', flagFile: 'cz.svg', continent: 'Europe' },
  { code: 'hu', nameEn: 'Hungary', nameSr: 'Мађарска', flagFile: 'hu.svg', continent: 'Europe' },
  { code: 'ro', nameEn: 'Romania', nameSr: 'Румунија', flagFile: 'ro.svg', continent: 'Europe' },
  { code: 'bg', nameEn: 'Bulgaria', nameSr: 'Бугарска', flagFile: 'bg.svg', continent: 'Europe' },
  { code: 'hr', nameEn: 'Croatia', nameSr: 'Хрватска', flagFile: 'hr.svg', continent: 'Europe' },
  { code: 'rs', nameEn: 'Serbia', nameSr: 'Србија', flagFile: 'rs.svg', continent: 'Europe' },
  { code: 'si', nameEn: 'Slovenia', nameSr: 'Словенија', flagFile: 'si.svg', continent: 'Europe' },
  { code: 'sk', nameEn: 'Slovakia', nameSr: 'Словачка', flagFile: 'sk.svg', continent: 'Europe' },
  { code: 'ee', nameEn: 'Estonia', nameSr: 'Естонија', flagFile: 'ee.svg', continent: 'Europe' },
  { code: 'lv', nameEn: 'Latvia', nameSr: 'Летонија', flagFile: 'lv.svg', continent: 'Europe' },
  { code: 'lt', nameEn: 'Lithuania', nameSr: 'Литванија', flagFile: 'lt.svg', continent: 'Europe' },
  { code: 'ie', nameEn: 'Ireland', nameSr: 'Ирска', flagFile: 'ie.svg', continent: 'Europe' },
];

// Legacy export for backward compatibility - uses fallback data
export const europe = fallbackEurope;

// New function to get Europe countries from API with fallback
export async function getEuropeCountries(): Promise<Country[]> {
  try {
    const countries = await fetchEuropeCountries();
    return countries.length > 0 ? countries : fallbackEurope;
  } catch (error) {
    console.error('Failed to fetch Europe countries, using fallback:', error);
    return fallbackEurope;
  }
} 