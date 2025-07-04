'use client';

import { useLanguage } from '../contexts/LanguageContext';

interface GameStartProps {
  onStartGame: () => void;
}

export default function GameStart({ onStartGame }: GameStartProps) {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
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

      <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('instructions.title')}</h2>
        <div className="space-y-3 text-left">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
              1
            </div>
            <span className="text-gray-700">{t('instructions.step1')}</span>
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
          className="w-full bg-primary-500 text-white py-4 px-8 rounded-lg text-xl font-semibold hover:bg-primary-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          {t('game.start')}
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
  );
} 