import { countries, Country, fetchCountries } from './countries';
import { getContinent } from './continents';

export interface FlagQuestion {
  id: number;
  flagImage: string;
  correctAnswer: string;
  options: string[];
  countryCode: string;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function getRandomQuestions(
  count: number = 15,
  continent?: string
): Promise<FlagQuestion[]> {
  // Always fetch the full list; filter client-side using the hardcoded continent map
  // so we're not dependent on PocketBase having the continent field populated.
  let allCountries: Country[];
  try {
    allCountries = await fetchCountries();
  } catch {
    allCountries = countries;
  }

  let pool = continent
    ? allCountries.filter(c => getContinent(c.code) === continent)
    : allCountries;

  // If the filtered pool is empty (unknown continent or no matching codes), use everything
  if (pool.length === 0) pool = allCountries;

  const actualCount = Math.min(count, pool.length);

  const shuffled = shuffleArray(pool);
  const selected = shuffled.slice(0, actualCount);
  // Wrong answers drawn from the full list so options are always plausible
  const wrongPool = shuffleArray(allCountries);

  return selected.map((country, index) => {
    const wrongAnswers: Country[] = [];
    for (let i = 0; wrongAnswers.length < 3; i++) {
      const candidate = wrongPool[(index * 3 + i) % wrongPool.length];
      if (candidate.code !== country.code) wrongAnswers.push(candidate);
    }
    const options = shuffleArray([country.code, ...wrongAnswers.map(c => c.code)]);
    return {
      id: index + 1,
      flagImage: `/flags_svg/${country.flagFile}`,
      correctAnswer: country.code,
      options,
      countryCode: country.code,
    };
  });
}
