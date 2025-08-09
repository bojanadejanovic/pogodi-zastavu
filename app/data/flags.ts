import { countries, Country, fetchCountries } from './countries';

export interface FlagQuestion {
  id: number;
  flagImage: string;
  correctAnswer: string;
  options: string[];
  countryCode: string; // ISO country code
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Updated function to support async country fetching
export async function getRandomQuestions(
  count: number = 15, 
  continent?: string
): Promise<FlagQuestion[]> {
  let countryList: Country[];
  
  try {
    // Try to fetch from API first
    if (continent) {
      countryList = await fetchCountries(continent);
    } else {
      countryList = await fetchCountries();
    }
    
    // Fallback to static data if API returns empty
    if (countryList.length === 0) {
      countryList = countries;
    }
  } catch (error) {
    console.error('Failed to fetch countries, using fallback:', error);
    countryList = countries;
  }

  // Ensure we have enough countries for the requested count
  if (countryList.length < count) {
    console.warn(`Not enough countries (${countryList.length}) for requested count (${count})`);
    count = countryList.length;
  }

  // Shuffle all countries once and take the first 'count' as questions
  const shuffledCountries = shuffleArray(countryList);
  const selectedCountries = shuffledCountries.slice(0, count);
  
  // Pre-shuffle remaining countries for wrong answers to avoid repeated shuffling
  const remainingCountries = shuffledCountries.slice(count);
  const shuffledRemaining = shuffleArray(remainingCountries);
  
  return selectedCountries.map((country, index) => {
    // Get 3 random wrong answers from the pre-shuffled remaining countries
    // Use modulo to cycle through if we run out of countries
    const wrongAnswers = [];
    for (let i = 0; i < 3; i++) {
      const wrongIndex = (index * 3 + i) % shuffledRemaining.length;
      wrongAnswers.push(shuffledRemaining[wrongIndex]);
    }
    
    // Create options array with correct answer and 3 wrong answers
    const options = shuffleArray([country.code, ...wrongAnswers.map(c => c.code)]);
    
    return {
      id: index + 1,
      flagImage: `/flags_svg/${country.flagFile}`,
      correctAnswer: country.code,
      options: options,
      countryCode: country.code
    };
  });
}

// Legacy function for backward compatibility - synchronous version
export function getRandomQuestionsSync(count: number = 15, countryList: Country[] = countries): FlagQuestion[] {
  // Shuffle all countries once and take the first 'count' as questions
  const shuffledCountries = shuffleArray(countryList);
  const selectedCountries = shuffledCountries.slice(0, count);
  
  // Pre-shuffle remaining countries for wrong answers to avoid repeated shuffling
  const remainingCountries = shuffledCountries.slice(count);
  const shuffledRemaining = shuffleArray(remainingCountries);
  
  return selectedCountries.map((country, index) => {
    // Get 3 random wrong answers from the pre-shuffled remaining countries
    // Use modulo to cycle through if we run out of countries
    const wrongAnswers = [];
    for (let i = 0; i < 3; i++) {
      const wrongIndex = (index * 3 + i) % shuffledRemaining.length;
      wrongAnswers.push(shuffledRemaining[wrongIndex]);
    }
    
    // Create options array with correct answer and 3 wrong answers
    const options = shuffleArray([country.code, ...wrongAnswers.map(c => c.code)]);
    
    return {
      id: index + 1,
      flagImage: `/flags_svg/${country.flagFile}`,
      correctAnswer: country.code,
      options: options,
      countryCode: country.code
    };
  });
} 