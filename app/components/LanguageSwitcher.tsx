'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center space-x-2 bg-white rounded-lg shadow-lg p-2 border">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            language === 'en'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('sr')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            language === 'sr'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          СР
        </button>
      </div>
    </div>
  );
} 