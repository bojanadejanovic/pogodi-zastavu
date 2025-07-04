import { countries, Country } from './countries';

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

export function getRandomQuestions(count: number = 10): FlagQuestion[] {
  // Shuffle all countries and take the first 'count' as questions
  const shuffledCountries = shuffleArray(countries);
  const selectedCountries = shuffledCountries.slice(0, count);
  
  return selectedCountries.map((country, index) => {
    // Get 3 random wrong answers from the remaining countries
    const remainingCountries = shuffledCountries.slice(count);
    const wrongAnswers = shuffleArray(remainingCountries).slice(0, 3);
    
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