'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
      <div style={{
        display: 'inline-flex',
        background: 'var(--bg-2)',
        border: '1px solid var(--line)',
        borderRadius: 999,
        padding: 3,
        gap: 2,
      }}>
        {(['en', 'sr'] as const).map(lang => {
          const active = language === lang;
          return (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              style={{
                padding: '4px 10px',
                fontSize: 12,
                fontWeight: 500,
                border: 'none',
                borderRadius: 999,
                background: active ? 'var(--card)' : 'transparent',
                color: active ? 'var(--ink)' : 'var(--ink-2)',
                boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06), 0 0 0 1px var(--line)' : 'none',
                transition: 'all 150ms ease',
                cursor: 'pointer',
              }}
            >
              {lang === 'en' ? 'EN' : 'СР'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
