'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { GameMode } from '../types';
import Footer from './Footer';

interface GameStartProps {
  onStartGame: () => void;
  isLoading: boolean;
  mode: GameMode;
  setMode: (mode: GameMode) => void;
}

const MODES: GameMode[] = ['world', 'europe', 'africa', 'asia', 'americas', 'oceania'];

export default function GameStart({ onStartGame, isLoading, mode, setMode }: GameStartProps) {
  const { t } = useLanguage();
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('pogodi-best');
    if (stored) setBest(parseInt(stored, 10));
  }, []);

  const questionCount = mode === 'world' ? 15 : 10;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, maxWidth: 560, margin: '0 auto', padding: '80px 24px 48px', textAlign: 'center', width: '100%' }}>

        {/* Caption */}
        <div style={{
          fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--ink-3)', marginBottom: 12,
        }}>
          {t('game.subtitle')}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(40px, 10vw, 60px)',
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          margin: '0 0 16px',
          fontWeight: 600,
          color: 'var(--ink)',
        }}>
          {t('home.titleMain')}{' '}
          <span style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--accent-ink)',
          }}>
            {t('home.titleAccent')}
          </span>
          {' '}
          🚩
        </h1>

        <p style={{
          color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.6,
          maxWidth: 380, margin: '0 auto 40px',
        }}>
          {t('game.description')}
        </p>

        {/* Continent selector */}
        <div style={{
          fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--ink-3)', fontWeight: 500, marginBottom: 10,
        }}>
          {t('home.chooseRegion')}
        </div>
        <div style={{ marginBottom: 32, overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-2)',
            border: '1px solid var(--line)',
            borderRadius: 999,
            padding: 3,
            gap: 2,
          }}>
            {MODES.map(m => {
              const active = m === mode;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  disabled={isLoading}
                  style={{
                    padding: '7px 14px',
                    fontSize: 13,
                    fontWeight: 500,
                    border: 'none',
                    borderRadius: 999,
                    background: active ? 'var(--card)' : 'transparent',
                    color: active ? 'var(--ink)' : 'var(--ink-2)',
                    boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06), 0 0 0 1px var(--line)' : 'none',
                    transition: 'all 150ms ease',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t(`mode.${m}`)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onStartGame}
          disabled={isLoading}
          style={{
            background: isLoading ? 'var(--bg-2)' : 'var(--ink)',
            color: isLoading ? 'var(--ink-3)' : 'var(--bg)',
            border: 'none',
            borderRadius: 14,
            padding: '16px 28px',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            width: '100%',
            maxWidth: 320,
            boxShadow: isLoading ? 'none' : '0 4px 14px rgba(0,0,0,0.12)',
            transition: 'all 120ms ease',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
          onMouseDown={e => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)'; }}
          onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
        >
          {isLoading ? t('ui.loading') : `${t('game.start')} →`}
        </button>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          maxWidth: 380,
          margin: '56px auto 0',
        }}>
          {[
            { k: String(questionCount), v: t('home.stat.questions') },
            { k: '200+', v: t('home.stat.countries') },
            { k: best !== null ? `${best}/${questionCount}` : '—', v: t('home.stat.best') },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '16px 12px',
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 12,
            }}>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                {s.k}
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Answer legend */}
        <div style={{
          marginTop: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 20, fontSize: 12, color: 'var(--ink-3)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--good)', display: 'inline-block' }} />
            {t('ui.correctAnswer')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--bad)', display: 'inline-block' }} />
            {t('ui.wrongAnswer')}
          </div>
        </div>

        {/* Leaderboard link */}
        <div style={{ marginTop: 28 }}>
          <a
            href="/leaderboard"
            style={{
              fontSize: 13,
              color: 'var(--accent-ink)',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid var(--accent-soft)',
              paddingBottom: 1,
            }}
          >
            🏆 {t('leaderboard.title')}
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
