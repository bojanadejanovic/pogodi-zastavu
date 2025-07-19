'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../components/Footer';
import Link from 'next/link';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  createdAt: string;
}

export default function LeaderboardPage() {
  const { t } = useLanguage();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/leaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  const getMedal = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${position}`;
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage === 100) return 'text-yellow-600';
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 flex flex-col">
      <LanguageSwitcher />
      <div className="container mx-auto flex-1">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🏆 {t('leaderboard.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {t('leaderboard.subtitle')}
            </p>
            
            {/* Return to home button */}
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transform hover:scale-105 transition-all duration-200"
            >
              ← {t('leaderboard.backToHome')}
            </Link>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-2xl mb-4">⏳</div>
                <p className="text-gray-600">{t('leaderboard.loading')}</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-2xl mb-4">❌</div>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchLeaderboard}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                >
                  {t('leaderboard.tryAgain')}
                </button>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-2xl mb-4">📊</div>
                <p className="text-gray-600 mb-2">{t('leaderboard.noScores')}</p>
                <p className="text-sm text-gray-500">{t('leaderboard.playToAppear')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                      index === 0 
                        ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50' 
                        : index === 1 
                        ? 'border-gray-300 bg-gradient-to-r from-gray-50 to-slate-50'
                        : index === 2
                        ? 'border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    {/* Position and Medal */}
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-gray-700 min-w-[40px]">
                        {getMedal(index + 1)}
                      </div>
                      
                      {/* Player Info */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-lg text-gray-800">
                          {entry.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(entry.createdAt).toLocaleDateString()} {new Date(entry.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(entry.percentage)}`}>
                        {entry.score}/{entry.totalQuestions}
                      </div>
                      <div className="text-sm text-gray-600">
                        {entry.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>{t('leaderboard.footer')}</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 