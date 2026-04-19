'use client';

import { useLanguage } from '../contexts/LanguageContext';
import Confetti from './Confetti';
import { useEffect, useState, useRef } from 'react';
import { getOrCreateUserId } from '../utils/user';
import type { FlagQuestion } from '../data/flags';
import type { GameMode } from '../types';

interface GameResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  mode: GameMode;
  questions: FlagQuestion[];
  answers: boolean[];
}

export default function GameResults({
  score,
  totalQuestions,
  onRestart,
  mode,
  questions,
  answers,
}: GameResultsProps) {
  const { t, countryName } = useLanguage();
  const percentage = Math.round((score / totalQuestions) * 100);

  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [history, setHistory] = useState<{ score: number; totalQuestions: number; createdAt: string; name?: string | null }[]>([]);
  const hasSaved = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem('pogodi-best');
    const prev = stored ? parseInt(stored, 10) : 0;
    if (score > prev) localStorage.setItem('pogodi-best', String(score));
  }, [score]);

  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;
    const userId = getOrCreateUserId();
    fetch(`/api/get-scores?userId=${userId}`)
      .then(r => r.json())
      .then(data => setHistory(data.scores || []))
      .catch(() => {});
  }, []);

  const saveScore = async () => {
    if (!playerName.trim()) return;
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      const userId = getOrCreateUserId();
      const res = await fetch('/api/save-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, score, totalQuestions, name: playerName.trim(), mode }),
      });
      if (res.ok) {
        setSaveStatus('success');
        const data = await fetch(`/api/get-scores?userId=${userId}`).then(r => r.json());
        setHistory(data.scores || []);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const isPerfect = mode === 'world' ? score >= 14 : score === totalQuestions;

  const resultLabel =
    percentage >= 90 ? t('results.perfect') :
    percentage >= 70 ? t('results.excellent') :
    percentage >= 50 ? t('results.good') :
    percentage >= 30 ? t('results.notBad') :
    t('results.keepStudying');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 60 }}>
      <Confetti trigger={isPerfect} />

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '72px 20px 0', textAlign: 'center' }}>

        {/* Label */}
        <div style={{
          fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--ink-3)', marginBottom: 12,
        }}>
          {t('game.results')}
        </div>

        {/* Result message */}
        <h2 style={{
          fontSize: 'clamp(28px, 8vw, 44px)',
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'var(--accent-ink)',
          margin: '0 0 8px',
          letterSpacing: '-0.01em',
        }}>
          {resultLabel}
        </h2>

        {/* Big score */}
        <div style={{
          fontSize: 'clamp(56px, 16vw, 80px)',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          margin: '20px 0',
          color: 'var(--ink)',
        }}>
          {score}
          <span style={{ color: 'var(--ink-3)' }}>/{totalQuestions}</span>
        </div>

        <div style={{
          fontFamily: "'Geist Mono', ui-monospace, monospace",
          color: 'var(--ink-2)', fontSize: 13, marginBottom: 36,
        }}>
          {t('ui.percentage', { percentage })}
        </div>

        {/* Dot grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(totalQuestions, 10)}, 1fr)`,
          gap: 5,
          maxWidth: 300,
          margin: '0 auto 36px',
        }}>
          {answers.map((a, i) => (
            <div key={i} style={{
              aspectRatio: '1',
              borderRadius: 4,
              background: a ? 'var(--good)' : 'var(--bad)',
              opacity: 0.85,
            }} />
          ))}
        </div>

        {/* Save score */}
        {saveStatus === 'idle' && (
          <div style={{
            background: 'var(--card)', border: '1px solid var(--line)',
            borderRadius: 14, padding: 20, marginBottom: 24, textAlign: 'left',
          }}>
            <label htmlFor="playerName" style={{ display: 'block', fontSize: 13, color: 'var(--ink-2)', marginBottom: 8 }}>
              {t('ui.nameLabel')}
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') saveScore(); }}
              placeholder={t('ui.namePlaceholder')}
              maxLength={50}
              autoComplete="off"
              style={{
                width: '100%', padding: '10px 12px',
                border: '1.5px solid var(--line)', borderRadius: 10,
                fontSize: 14, color: 'var(--ink)', background: 'var(--bg)',
                outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--line)'; }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button
                onClick={saveScore}
                disabled={isSaving || !playerName.trim()}
                style={{
                  flex: 1,
                  background: playerName.trim() ? 'var(--ink)' : 'var(--line)',
                  color: playerName.trim() ? 'var(--bg)' : 'var(--ink-3)',
                  border: 'none', borderRadius: 10, padding: '10px 16px',
                  fontSize: 13, fontWeight: 600,
                  cursor: isSaving || !playerName.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {isSaving ? t('ui.saving') : t('ui.saveScore')}
              </button>
              <button
                onClick={() => setSaveStatus('success')}
                style={{
                  background: 'transparent', color: 'var(--ink-3)',
                  border: '1px solid var(--line)', borderRadius: 10, padding: '10px 16px',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}
              >
                {t('ui.skipSaving')}
              </button>
            </div>
          </div>
        )}

        {saveStatus === 'success' && (
          <div style={{
            background: 'var(--good-soft)', border: '1px solid var(--good)',
            borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13,
            color: 'var(--ink)',
          }}>
            {t('ui.scoreSaved')}
          </div>
        )}
        {saveStatus === 'error' && (
          <div style={{
            background: 'var(--bad-soft)', border: '1px solid var(--bad)',
            borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13,
            color: 'var(--ink)',
          }}>
            {t('ui.scoreSaveError')}
          </div>
        )}

        {/* Play again — always visible */}
        <button
          onClick={onRestart}
          style={{
            background: 'var(--ink)', color: 'var(--bg)',
            border: 'none', borderRadius: 12, padding: '13px 24px',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
            marginBottom: 24, width: '100%', maxWidth: 280,
          }}
        >
          {t('game.playAgain')}
        </button>

        {/* Review list */}
        {questions.length > 0 && (
          <div style={{ marginTop: 40, textAlign: 'left' }}>
            <div style={{
              fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase',
              letterSpacing: '0.08em', marginBottom: 12,
            }}>
              Преглед
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {questions.map((q, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px',
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 10,
                }}>
                  <div style={{
                    width: 40, height: 27, borderRadius: 4, overflow: 'hidden',
                    boxShadow: '0 0 0 1px var(--line)', flexShrink: 0,
                  }}>
                    <img
                      src={q.flagImage}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <span style={{
                    fontFamily: "'Geist Mono', ui-monospace, monospace",
                    fontSize: 11, color: 'var(--ink-3)', width: 20, flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ flex: 1, fontSize: 14, color: 'var(--ink)' }}>
                    {countryName(q.correctAnswer)}
                  </span>
                  <span style={{
                    fontSize: 13, fontWeight: 700,
                    color: answers[i] ? 'var(--good)' : 'var(--bad)',
                  }}>
                    {answers[i] ? '✓' : '✕'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score history */}
        {history.length > 0 && (
          <div style={{ marginTop: 40, textAlign: 'left' }}>
            <div style={{
              fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase',
              letterSpacing: '0.08em', marginBottom: 12,
            }}>
              {t('ui.previousScores')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {history.slice(0, 10).map((h, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 12px',
                  background: 'var(--card)', border: '1px solid var(--line)',
                  borderRadius: 10, fontSize: 13,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 600 }}>{h.score}/{h.totalQuestions}</span>
                    {h.name && (
                      <span style={{
                        fontSize: 11, background: 'var(--accent-soft)',
                        color: 'var(--accent-ink)', padding: '2px 8px',
                        borderRadius: 999, fontWeight: 500,
                      }}>
                        {h.name}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>
                    {new Date(h.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
