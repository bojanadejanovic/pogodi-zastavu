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
  const [history, setHistory] = useState<{score: number, totalQuestions: number, createdAt: string, name?: string | null}[]>([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const hasSaved = useRef(false);

  async function fetchScores(userId: string) {
    const res = await fetch(`/api/get-scores?userId=${userId}`);
    const data = await res.json();
    setHistory(data.scores || []);
  }

  const saveScore = async (name?: string) => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const userId = getOrCreateUserId();
      const response = await fetch('/api/save-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, score, totalQuestions, name }),
      });
      
      if (response.ok) {
        setSaveStatus('success');
        // Fetch updated history
        fetchScores(userId);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving score:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;

    // Don't auto-save anymore, let user choose
    const userId = getOrCreateUserId();
    // Just fetch history
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
        {/* Save Score Section */}
        {saveStatus === 'idle' && !showNameInput && (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm text-gray-600 mb-3">{t('ui.saveScoreDescription')}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setShowNameInput(true)}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                {t('ui.saveScoreWithName')}
              </button>
              <button
                onClick={() => saveScore()}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
              >
                {t('ui.saveScore')}
              </button>
              <button
                onClick={() => setSaveStatus('success')}
                className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200"
              >
                {t('ui.skipSaving')}
              </button>
            </div>
          </div>
        )}

        {/* Name Input Section */}
        {showNameInput && (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('ui.nameLabel')}
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t('ui.namePlaceholder')}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white text-base"
              maxLength={50}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="words"
            />
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <button
                onClick={() => saveScore(playerName)}
                disabled={isSaving}
                className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? t('ui.saving') : t('ui.saveScore')}
              </button>
              <button
                onClick={() => {
                  setShowNameInput(false);
                  setPlayerName('');
                }}
                disabled={isSaving}
                className="flex-1 bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('ui.skipSaving')}
              </button>
            </div>
          </div>
        )}

        {/* Save Status Messages */}
        {saveStatus === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            {t('ui.scoreSaved')}
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {t('ui.scoreSaveError')}
          </div>
        )}

        {/* Play Again Button - only show after save decision */}
        {(saveStatus === 'success' || saveStatus === 'error') && (
          <button
            onClick={onRestart}
            className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transform hover:scale-105 transition-all duration-200"
          >
            {t('game.playAgain')}
          </button>
        )}
        
        <div className="text-sm text-gray-500">
          {t('game.challenge')}
        </div>

        {/* Score history */}
        {history.length > 0 && (
          <div className="mt-6 text-left">
            <div className="font-semibold mb-2 text-gray-800">{t('ui.previousScores')}</div>
            <ul className="space-y-2 text-sm">
              {history.slice(0, 10).map((h, i) => (
                <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium text-base text-gray-900">{h.score}/{h.totalQuestions}</span>
                    {h.name && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {h.name}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm break-all">{new Date(h.createdAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 