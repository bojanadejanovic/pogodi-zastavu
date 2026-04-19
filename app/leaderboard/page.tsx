'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../components/Footer';
import Link from 'next/link';
import { REGIONS } from '../data/regions';
import type { GameMode } from '../types';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  createdAt: string;
}

// Include "All" as the first tab
const TABS = [{ mode: null as GameMode | null, label: 'All' }, ...REGIONS.map(r => ({ mode: r.mode, label: r.name }))];

export default function LeaderboardPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<GameMode | null>(null);
  const [cache, setCache] = useState<Record<string, LeaderboardEntry[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = activeTab ?? 'all';
  const leaderboard = cache[cacheKey] ?? [];

  useEffect(() => {
    if (cache[cacheKey] !== undefined) return;
    fetchLeaderboard(activeTab);
  }, [activeTab]);

  const fetchLeaderboard = async (mode: GameMode | null) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = mode ? `/api/leaderboard?region=${mode}` : '/api/leaderboard';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCache(prev => ({ ...prev, [mode ?? 'all']: data.leaderboard || [] }));
    } catch {
      setError('Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  const getMedal = (i: number) =>
    i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <LanguageSwitcher />

      <div style={{ flex: 1, maxWidth: 600, margin: '0 auto', padding: '72px 20px 0', width: '100%' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--ink-3)', marginBottom: 12,
          }}>
            {t('leaderboard.subtitle')}
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 7vw, 44px)',
            fontWeight: 600, letterSpacing: '-0.03em',
            margin: '0 0 24px', color: 'var(--ink)',
          }}>
            {t('leaderboard.title')}
          </h1>
          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 500, color: 'var(--ink-2)',
              textDecoration: 'none', padding: '8px 16px',
              border: '1px solid var(--line)', borderRadius: 999,
              background: 'var(--card)', transition: 'border-color 150ms ease',
            }}
          >
            ← {t('leaderboard.backToHome')}
          </Link>
        </div>

        {/* Region tabs */}
        <div style={{ overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }}>
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-2)',
            border: '1px solid var(--line)',
            borderRadius: 999,
            padding: 3,
            gap: 2,
            minWidth: 'max-content',
          }}>
            {TABS.map(tab => {
              const active = activeTab === tab.mode;
              const label = tab.mode ? t(`mode.${tab.mode}`) : 'All / Све';
              return (
                <button
                  key={tab.mode ?? 'all'}
                  onClick={() => setActiveTab(tab.mode)}
                  style={{
                    padding: '6px 14px',
                    fontSize: 13, fontWeight: 500,
                    border: 'none', borderRadius: 999,
                    background: active ? 'var(--card)' : 'transparent',
                    color: active ? 'var(--ink)' : 'var(--ink-2)',
                    boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06), 0 0 0 1px var(--line)' : 'none',
                    transition: 'all 150ms ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Board */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--line)',
          borderRadius: 16, overflow: 'hidden', marginBottom: 16,
        }}>
          {isLoading ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--ink-3)', fontSize: 13 }}>
              {t('leaderboard.loading')}
            </div>
          ) : error ? (
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
              <div style={{ color: 'var(--bad)', fontSize: 13, marginBottom: 16 }}>{error}</div>
              <button
                onClick={() => fetchLeaderboard(activeTab)}
                style={{
                  background: 'var(--ink)', color: 'var(--bg)',
                  border: 'none', borderRadius: 10, padding: '10px 20px',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >
                {t('leaderboard.tryAgain')}
              </button>
            </div>
          ) : leaderboard.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 8 }}>
                {t('leaderboard.noScores')}
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                {t('leaderboard.playToAppear')}
              </div>
            </div>
          ) : (
            leaderboard.map((entry, i) => {
              const medal = getMedal(i);
              const isTop3 = i < 3;
              return (
                <div
                  key={entry.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 18px',
                    borderBottom: i < leaderboard.length - 1 ? '1px solid var(--line)' : 'none',
                    background: i === 0 ? 'oklch(0.97 0.015 80)' : 'var(--card)',
                  }}
                >
                  {/* Rank */}
                  <div style={{
                    width: 32, textAlign: 'center', flexShrink: 0,
                    fontSize: isTop3 ? 20 : 13,
                    fontFamily: isTop3 ? 'inherit' : "'Geist Mono', ui-monospace, monospace",
                    color: 'var(--ink-3)', fontWeight: isTop3 ? 400 : 500,
                  }}>
                    {medal ?? `${i + 1}`}
                  </div>

                  {/* Name + time */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 15, fontWeight: 600, color: 'var(--ink)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {entry.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>
                      {new Date(entry.createdAt).toLocaleDateString()}{' '}
                      {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{
                      fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em',
                      color: entry.percentage === 100 ? 'var(--accent-ink)'
                        : entry.percentage >= 80 ? 'var(--good)'
                        : 'var(--ink)',
                    }}>
                      {entry.score}/{entry.totalQuestions}
                    </div>
                    <div style={{
                      fontSize: 11, color: 'var(--ink-3)', marginTop: 1,
                      fontFamily: "'Geist Mono', ui-monospace, monospace",
                    }}>
                      {entry.percentage}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--ink-3)', paddingBottom: 8 }}>
          {t('leaderboard.footer')}
        </div>
      </div>

      <Footer />
    </div>
  );
}
