'use client';

import { useState } from 'react';
import GameStart from './components/GameStart';
import FlagQuestion from './components/FlagQuestion';
import GameResults from './components/GameResults';
import LanguageSwitcher from './components/LanguageSwitcher';
import Footer from './components/Footer';
import { getRandomQuestions, FlagQuestion as FlagQuestionType } from './data/flags';

import type { GameMode } from './types';

type GameState = 'start' | 'playing' | 'results';

const CONTINENT_MAP: Record<GameMode, string | undefined> = {
  world: undefined,
  europe: 'Europe',
  africa: 'Africa',
  asia: 'Asia',
  americas: 'Americas',
  oceania: 'Oceania',
};

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<FlagQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<GameMode>('world');

  const preloadImages = (qs: FlagQuestionType[]) => {
    qs.forEach(q => {
      const img = new Image();
      img.src = q.flagImage;
    });
  };

  const startGame = async () => {
    setIsLoading(true);
    try {
      const continent = CONTINENT_MAP[mode];
      const count = continent ? 10 : 15;
      const randomQuestions = await getRandomQuestions(count, continent);
      setQuestions(randomQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnswers([]);
      setStreak(0);
      setTimeout(() => {
        preloadImages(randomQuestions);
        setGameState('playing');
        setIsLoading(false);
      }, 50);
    } catch (error) {
      console.error('Failed to start game:', error);
      setIsLoading(false);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    setAnswers(prev => [...prev, isCorrect]);

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
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <LanguageSwitcher />
      {gameState === 'start' && (
        <GameStart
          onStartGame={startGame}
          isLoading={isLoading}
          mode={mode}
          setMode={setMode}
        />
      )}
      {gameState === 'playing' && questions.length > 0 && (
        <FlagQuestion
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onQuit={handleQuit}
          streak={streak}
        />
      )}
      {gameState === 'results' && (
        <GameResults
          score={score}
          totalQuestions={questions.length}
          onRestart={restartGame}
          mode={mode}
          questions={questions}
          answers={answers}
        />
      )}
    </div>
  );
}
