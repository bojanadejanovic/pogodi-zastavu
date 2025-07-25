'use client';

import { useState, useEffect } from 'react';
import GameStart from './components/GameStart';
import FlagQuestion from './components/FlagQuestion';
import GameResults from './components/GameResults';
import LanguageSwitcher from './components/LanguageSwitcher';
import Footer from './components/Footer';
import { getRandomQuestions, FlagQuestion as FlagQuestionType } from './data/flags';
import { europe } from './data/europe';
import { useLanguage } from './contexts/LanguageContext';

type GameState = 'start' | 'playing' | 'results';
type GameMode = 'world' | 'europe';

export default function Home() {
  const { t } = useLanguage();
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<FlagQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<GameMode>('world');

  // Preload flag images
  const preloadImages = (questions: FlagQuestionType[]) => {
    // Preload all flag images for faster transitions
    questions.forEach(question => {
      const img = new Image();
      img.src = question.flagImage;
    });
  };

  const startGame = () => {
    setIsLoading(true);
    let randomQuestions;
    if (mode === 'europe') {
      randomQuestions = getRandomQuestions(10, europe);
    } else {
      randomQuestions = getRandomQuestions(15);
    }
    setQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    
    // Preload images and then start the game
    setTimeout(() => {
      preloadImages(randomQuestions);
      setGameState('playing');
      setIsLoading(false);
    }, 50); // Reduced from 100ms to 50ms
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('results');
    }
  };

  const handleQuit = () => {
    setGameState('start');
  };

  const restartGame = () => {
    setGameState('start');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 flex flex-col">
      <LanguageSwitcher />
      <div className="container mx-auto flex-1">
        {gameState === 'start' && (
          <GameStart onStartGame={startGame} isLoading={isLoading} mode={mode} setMode={setMode} />
        )}
        
        {gameState === 'playing' && questions.length > 0 && (
          <FlagQuestion
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onQuit={handleQuit}
          />
        )}
        
        {gameState === 'results' && (
          <GameResults
            score={score}
            totalQuestions={questions.length}
            onRestart={restartGame}
            mode={mode} // Pass mode to GameResults
          />
        )}
      </div>
      <Footer />
    </main>
  );
} 