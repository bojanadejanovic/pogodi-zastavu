export interface Country {
  code: string;
  nameEn: string;
  nameSr: string;
  flagFile: string;
  continent?: string; // Optional for backward compatibility
}

export type Continent = 'Europe' | 'North America' | 'South America' | 'Africa' | 'Asia' | 'Australia';

// Fallback static data (smaller subset for initial compatibility)
const fallbackCountries: Country[] = [
  { code: 'us', nameEn: 'United States', nameSr: 'Сједињене Америчке Државе', flagFile: 'us.svg', continent: 'North America' },
  { code: 'fr', nameEn: 'France', nameSr: 'Француска', flagFile: 'fr.svg', continent: 'Europe' },
  { code: 'de', nameEn: 'Germany', nameSr: 'Немачка', flagFile: 'de.svg', continent: 'Europe' },
  { code: 'it', nameEn: 'Italy', nameSr: 'Италија', flagFile: 'it.svg', continent: 'Europe' },
  { code: 'es', nameEn: 'Spain', nameSr: 'Шпанија', flagFile: 'es.svg', continent: 'Europe' },
  { code: 'gb', nameEn: 'United Kingdom', nameSr: 'Уједињено Краљевство', flagFile: 'gb.svg', continent: 'Europe' },
  { code: 'ca', nameEn: 'Canada', nameSr: 'Канада', flagFile: 'ca.svg', continent: 'North America' },
  { code: 'au', nameEn: 'Australia', nameSr: 'Аустралија', flagFile: 'au.svg', continent: 'Australia' },
  { code: 'br', nameEn: 'Brazil', nameSr: 'Бразил', flagFile: 'br.svg', continent: 'South America' },
  { code: 'cn', nameEn: 'China', nameSr: 'Кина', flagFile: 'cn.svg', continent: 'Asia' },
  { code: 'jp', nameEn: 'Japan', nameSr: 'Јапан', flagFile: 'jp.svg', continent: 'Asia' },
  { code: 'kr', nameEn: 'South Korea', nameSr: 'Јужна Кореја', flagFile: 'kr.svg', continent: 'Asia' },
  { code: 'in', nameEn: 'India', nameSr: 'Индија', flagFile: 'in.svg', continent: 'Asia' },
  { code: 'ru', nameEn: 'Russia', nameSr: 'Русија', flagFile: 'ru.svg', continent: 'Europe' },
  { code: 'mx', nameEn: 'Mexico', nameSr: 'Мексико', flagFile: 'mx.svg', continent: 'North America' },
  { code: 'ar', nameEn: 'Argentina', nameSr: 'Аргентина', flagFile: 'ar.svg', continent: 'South America' },
  { code: 'za', nameEn: 'South Africa', nameSr: 'Јужна Африка', flagFile: 'za.svg', continent: 'Africa' },
  { code: 'eg', nameEn: 'Egypt', nameSr: 'Египат', flagFile: 'eg.svg', continent: 'Africa' },
  { code: 'ng', nameEn: 'Nigeria', nameSr: 'Нигерија', flagFile: 'ng.svg', continent: 'Africa' },
  { code: 'rs', nameEn: 'Serbia', nameSr: 'Србија', flagFile: 'rs.svg', continent: 'Europe' },
];

// Cache for countries data
let countriesCache: Country[] | null = null;
let europeCache: Country[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Service to fetch countries from PocketBase API with fallback
export async function fetchCountries(continent?: string): Promise<Country[]> {
  try {
    // Check cache first
    const now = Date.now();
    if (countriesCache && now - lastFetchTime < CACHE_DURATION) {
      if (continent) {
        return countriesCache.filter(c => c.continent === continent);
      }
      return countriesCache;
    }

    let url = '/api/countries';
    if (continent) {
      url += `?continent=${encodeURIComponent(continent)}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    
    const data = await response.json();
    const countries = data.countries || [];
    
    // Update cache if we got all countries
    if (!continent && countries.length > 0) {
      countriesCache = countries;
      lastFetchTime = now;
    }
    
    return countries;
  } catch (error) {
    console.error('Error fetching countries from API, using fallback:', error);
    
    // Return fallback data filtered by continent if specified
    if (continent) {
      return fallbackCountries.filter(c => c.continent === continent);
    }
    return fallbackCountries;
  }
}

// Utility function to get Europe countries specifically
export async function fetchEuropeCountries(): Promise<Country[]> {
  return fetchCountries('Europe');
}

// Legacy export for backward compatibility - uses the fallback data
export const countries = fallbackCountries;