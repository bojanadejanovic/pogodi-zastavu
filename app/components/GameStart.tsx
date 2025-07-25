'use client';

import { useLanguage } from '../contexts/LanguageContext';

interface GameStartProps {
  onStartGame: () => void;
  isLoading: boolean;
  mode: 'world' | 'europe';
  setMode: (mode: 'world' | 'europe') => void;
}

export default function GameStart({ onStartGame, isLoading, mode, setMode }: GameStartProps) {
  const { t } = useLanguage();
  
  // Determine the number of questions based on mode
  const questionCount = mode === 'europe' ? 10 : 15;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 flex flex-col">
      {/* Desktop scale wrapper */}
      <div
        className="hidden md:flex justify-center items-start w-full h-screen overflow-hidden"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 10 }}
      >
        <div
          style={{
            transform: 'scale(0.8)',
            transformOrigin: 'top center',
            width: '125vw', // 1/0.8 = 1.25, so 125% to compensate for scale
            height: '125vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
            {/* Mode selector */}
            <div className="flex justify-center mb-6 gap-4">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border-2 transition-all duration-200 ${mode === 'world' ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-primary-500 border-primary-500 hover:bg-primary-50'}`}
                onClick={() => setMode('world')}
                disabled={isLoading}
              >
                <img src="/world.png" alt="World" className="w-5 h-5" />
                {t('mode.world')}
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border-2 transition-all duration-200 ${mode === 'europe' ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-primary-500 border-primary-500 hover:bg-primary-50'}`}
                onClick={() => setMode('europe')}
                disabled={isLoading}
              >
                <img src="/europe.png" alt="Europe" className="w-5 h-5" />
                {t('mode.europe')}
              </button>
            </div>
            <div className="mb-8">
              <div className="text-6xl mb-4">🏁</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {t('game.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                {t('game.subtitle')}
              </p>
              <p className="text-lg text-gray-500">
                {t('game.description')}
              </p>
            </div>

            {/* Leaderboard link */}
            <div className="mb-6">
              <a
                href="/leaderboard"
                className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                🏆 {t('leaderboard.title')}
              </a>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('instructions.title')}</h2>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    1
                  </div>
                  <span className="text-gray-700">{t('instructions.step1', { count: questionCount })}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  <span className="text-gray-700">{t('instructions.step2')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    3
                  </div>
                  <span className="text-gray-700">{t('instructions.step3')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    4
                  </div>
                  <span className="text-gray-700">{t('instructions.step4')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={onStartGame}
                disabled={isLoading}
                className={`w-full py-4 px-8 rounded-lg text-xl font-semibold transition-all duration-200 shadow-lg ${
                  isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-105'
                }`}
              >
                {isLoading ? t('ui.loading') : t('game.start')}
              </button>
              
              <div className="text-sm text-gray-500">
                {t('game.flagsInfo')}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-success-500 rounded-full mr-2"></span>
                  {t('ui.correctAnswer')}
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-error-500 rounded-full mr-2"></span>
                  {t('ui.wrongAnswer')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile fallback: show content normally */}
      <div className="block md:hidden">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
          {/* Mode selector for mobile */}
          <div className="flex justify-center mb-4 gap-4 md:hidden">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border-2 transition-all duration-200 ${mode === 'world' ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-primary-500 border-primary-500 hover:bg-primary-50'}`}
              onClick={() => setMode('world')}
              disabled={isLoading}
            >
              <img src="/world.png" alt="World" className="w-5 h-5" />
              {t('mode.world')}
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border-2 transition-all duration-200 ${mode === 'europe' ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-primary-500 border-primary-500 hover:bg-primary-50'}`}
              onClick={() => setMode('europe')}
              disabled={isLoading}
            >
              <img src="/europe.png" alt="Europe" className="w-5 h-5" />
              {t('mode.europe')}
            </button>
          </div>
          <div className="mb-8">
            <div className="text-6xl mb-4">🏁</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {t('game.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {t('game.subtitle')}
            </p>
            <p className="text-lg text-gray-500">
              {t('game.description')}
            </p>
          </div>

          {/* Leaderboard link */}
          <div className="mb-6">
            <a
              href="/leaderboard"
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🏆 {t('leaderboard.title')}
            </a>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('instructions.title')}</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <span className="text-gray-700">{t('instructions.step1', { count: questionCount })}</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  2
                </div>
                <span className="text-gray-700">{t('instructions.step2')}</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  3
                </div>
                <span className="text-gray-700">{t('instructions.step3')}</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  4
                </div>
                <span className="text-gray-700">{t('instructions.step4')}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={onStartGame}
              disabled={isLoading}
              className={`w-full py-4 px-8 rounded-lg text-xl font-semibold transition-all duration-200 shadow-lg ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-105'
              }`}
            >
              {isLoading ? t('ui.loading') : t('game.start')}
            </button>
            
            <div className="text-sm text-gray-500">
              {t('game.flagsInfo')}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-success-500 rounded-full mr-2"></span>
                {t('ui.correctAnswer')}
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-error-500 rounded-full mr-2"></span>
                {t('ui.wrongAnswer')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 