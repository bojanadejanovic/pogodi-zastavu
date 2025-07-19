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

export function getRandomQuestions(count: number = 15, countryList: Country[] = countries): FlagQuestion[] {
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