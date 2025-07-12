'use client';

import { useLanguage } from '../contexts/LanguageContext';
import Confetti from './Confetti';
import { useEffect, useState, useRef } from 'react';
import { getOrCreateUserId } from '../utils/user';

interface GameResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  mode: 'world' | 'europe'; // Add mode prop
}

export default function GameResults({ score, totalQuestions, onRestart, mode }: GameResultsProps) {
  const { t } = useLanguage();
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // --- Persistence logic ---
  const [history, setHistory] = useState<{score: number, totalQuestions: number, createdAt: string}[]>([]);
  const hasSaved = useRef(false);

  async function fetchScores(userId: string) {
    const res = await fetch(`/api/get-scores?userId=${userId}`);
    const data = await res.json();
    setHistory(data.scores || []);
  }

  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;

    const userId = getOrCreateUserId();
    // Save current score
    fetch('/api/save-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, score, totalQuestions }),
    });
    // Fetch history
    fetchScores(userId);
  }, [score, totalQuestions]);
  // --- End persistence logic ---

  const getMessage = () => {
    if (percentage === 100) return t('results.perfect');
    if (percentage >= 80) return t('results.excellent');
    if (percentage >= 60) return t('results.good');
    if (percentage >= 40) return t('results.notBad');
    return t('results.keepStudying');
  };

  const getEmoji = () => {
    if (percentage === 100) return "🏆";
    if (percentage >= 80) return "🌟";
    if (percentage >= 60) return "👍";
    if (percentage >= 40) return "📚";
    return "💪";
  };

  // Show confetti for 14/15 or 15/15 in world mode, or 10/10 in europe mode
  const isPerfectScore = (mode === 'world' && score >= 14) || (mode === 'europe' && score === 10);

  return (
    <div className="mt-4 max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
      <Confetti trigger={isPerfectScore} />
      <div className="mb-8">
        <div className="text-6xl mb-4">{getEmoji()}</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('game.results')}</h1>
        <p className="text-lg text-gray-600 mb-6">{getMessage()}</p>
      </div>

      <div className={`p-6 rounded-lg mb-8 ${
        isPerfectScore 
          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 animate-pulse' 
          : 'bg-gradient-to-r from-primary-50 to-blue-50'
      }`}>
        <div className={`text-4xl font-bold mb-2 ${
          isPerfectScore ? 'text-yellow-600' : 'text-primary-600'
        }`}>
          {score}/{totalQuestions}
        </div>
        <div className="text-xl text-gray-600 mb-4">
          {t('ui.percentage', { percentage })}
        </div>
        
        {/* Score visualization */}
        <div className="flex justify-center space-x-1 mb-4">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < score
                  ? 'bg-success-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {i < score ? '✓' : '✗'}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={onRestart}
          className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transform hover:scale-105 transition-all duration-200"
        >
          {t('game.playAgain')}
        </button>
        
        <div className="text-sm text-gray-500">
          {t('game.challenge')}
        </div>

        {/* Score history */}
        {history.length > 0 && (
          <div className="mt-6 text-left">
            <div className="font-semibold mb-2">{t('ui.previousScores')}</div>
            <ul className="space-y-2 text-sm">
              {history.slice(0, 10).map((h, i) => (
                <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                  <span className="font-medium text-base">{h.score}/{h.totalQuestions}</span>
                  <span className="text-gray-400 text-xs sm:text-sm break-all">{new Date(h.createdAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 