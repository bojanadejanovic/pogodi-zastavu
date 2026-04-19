'use client';

import { useState, useEffect } from 'react';
import { FlagQuestion as FlagQuestionType } from '../data/flags';
import { useLanguage } from '../contexts/LanguageContext';
import ReportError from './ReportError';

interface FlagQuestionProps {
  question: FlagQuestionType;
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
  onQuit: () => void;
  streak: number;
}

export default function FlagQuestion({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  onQuit,
  streak,
}: FlagQuestionProps) {
  const { t, countryName } = useLanguage();
  const [selected, setSelected] = useState<string>('');
  const [confirmed, setConfirmed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    setSelected('');
    setConfirmed(false);
    setImageLoaded(false);
    setImageError(false);
  }, [question.flagImage]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = question.flagImage;
    if (img.complete) setImageLoaded(true);
    return () => { img.onload = null; img.onerror = null; };
  }, [question.flagImage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (confirmed) {
        const isCorrect = selected === question.correctAnswer;
        if (!isCorrect && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleNext();
        }
        return;
      }
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) setSelected(question.options[n - 1]);
      if (e.key === 'Enter' && selected) handleConfirm();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, confirmed, question]);

  const handleConfirm = () => {
    if (!selected || confirmed) return;
    setConfirmed(true);
    const isCorrect = selected === question.correctAnswer;
    if (isCorrect) {
      setTimeout(() => onAnswer(true), 1000);
    }
  };

  const handleNext = () => {
    onAnswer(false);
  };

  const progress = ((questionNumber - 1) / totalQuestions) * 100;

  return (
    <>
      <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 48 }}>
        {/* Top bar */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          padding: '14px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
          zIndex: 20,
        }}>
          {/* Logo + streak */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--ink)',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                background: 'var(--ink)', color: 'var(--bg)',
                display: 'grid', placeItems: 'center',
                fontSize: 11, fontWeight: 700,
              }}>П</div>
              <span>Погоди заставу</span>
            </div>
            {streak >= 2 && (
              <div style={{
                fontSize: 12, fontFamily: "'Geist Mono', ui-monospace, monospace",
                padding: '3px 8px', borderRadius: 999,
                background: 'var(--accent-soft)', color: 'var(--accent-ink)',
                fontWeight: 500,
              }}>
                🔥 {streak} {t('ui.streak')}
              </div>
            )}
          </div>

          {/* Quit (lang switcher is fixed at top-right already) */}
          <button
            onClick={onQuit}
            style={{
              background: 'transparent',
              border: '1px solid var(--line)',
              padding: '5px 12px',
              borderRadius: 999,
              fontSize: 12,
              color: 'var(--ink-2)',
              fontWeight: 500,
              marginRight: 90,
            }}
          >
            {t('ui.quit')}
          </button>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '80px 20px 0' }}>
          {/* Progress */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: 8, fontSize: 12,
            }}>
              <span style={{
                fontFamily: "'Geist Mono', ui-monospace, monospace",
                color: 'var(--ink-2)', fontWeight: 500,
              }}>
                {String(questionNumber).padStart(2, '0')}
                <span style={{ color: 'var(--ink-3)' }}> / {String(totalQuestions).padStart(2, '0')}</span>
              </span>
              <span style={{
                fontFamily: "'Geist Mono', ui-monospace, monospace",
                color: 'var(--ink-3)',
              }}>
                {Math.round((questionNumber / totalQuestions) * 100)}%
              </span>
            </div>
            <div style={{ height: 3, background: 'var(--line)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: `${progress}%`,
                background: 'var(--ink)',
                transition: 'width 300ms cubic-bezier(.4,0,.2,1)',
              }} />
            </div>
          </div>

          {/* Flag */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{
              width: 240, height: 160,
              borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 32px -8px rgba(20,20,30,0.18), 0 0 0 1px var(--line)',
              background: 'var(--card)',
              transition: 'transform 300ms ease',
              transform: confirmed ? 'scale(0.96)' : 'scale(1)',
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {!imageLoaded && !imageError && (
                <div style={{ color: 'var(--ink-3)', fontSize: 13 }}>{t('ui.loading')}</div>
              )}
              {imageError && (
                <div style={{ color: 'var(--ink-3)', fontSize: 13 }}>—</div>
              )}
              {imageLoaded && (
                <img
                  src={question.flagImage}
                  alt={`Flag`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
            </div>
          </div>

          {/* Question */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 style={{
              fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em',
              margin: 0, lineHeight: 1.3, color: 'var(--ink)',
            }}>
              {t('game.question')}
            </h2>
          </div>

          {/* Answer grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 8,
            marginBottom: 20,
          }}>
            {question.options.map((opt, i) => {
              const isPicked = selected === opt;
              const isCorrect = opt === question.correctAnswer;
              let bg = 'var(--card)';
              let border = 'var(--line)';
              let color = 'var(--ink)';

              if (confirmed) {
                if (isCorrect) { bg = 'var(--good-soft)'; border = 'var(--good)'; }
                else if (isPicked) { bg = 'var(--bad-soft)'; border = 'var(--bad)'; }
                else { color = 'var(--ink-3)'; }
              } else if (isPicked) {
                bg = 'var(--accent-soft)'; border = 'var(--accent)';
              }

              return (
                <button
                  key={opt}
                  onClick={() => { if (!confirmed) setSelected(opt); }}
                  disabled={confirmed}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', textAlign: 'left',
                    padding: '13px 14px',
                    background: bg,
                    border: `1.5px solid ${border}`,
                    borderRadius: 12,
                    fontSize: 14, fontWeight: 500, color,
                    cursor: confirmed ? 'default' : 'pointer',
                    transition: 'all 150ms ease',
                    transform: confirmed && isCorrect ? 'scale(1.01)' : 'scale(1)',
                  }}
                >
                  <span style={{
                    flexShrink: 0,
                    width: 20, height: 20,
                    display: 'grid', placeItems: 'center',
                    borderRadius: 5,
                    fontSize: 11, fontWeight: 600,
                    fontFamily: "'Geist Mono', ui-monospace, monospace",
                    background: isPicked && !confirmed ? 'var(--accent)' : 'var(--bg-2)',
                    color: isPicked && !confirmed ? '#fff' : 'var(--ink-3)',
                    border: '1px solid var(--line)',
                    transition: 'all 150ms ease',
                  }}>{i + 1}</span>
                  <span style={{ flex: 1 }}>{countryName(opt)}</span>
                  {confirmed && isCorrect && (
                    <span style={{ color: 'var(--good)', fontSize: 15, fontWeight: 700 }}>✓</span>
                  )}
                  {confirmed && isPicked && !isCorrect && (
                    <span style={{ color: 'var(--bad)', fontSize: 15, fontWeight: 700 }}>✕</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Confirm / Next */}
          <div style={{ textAlign: 'center' }}>
            {!confirmed ? (
              <button
                onClick={handleConfirm}
                disabled={!selected || !imageLoaded}
                style={{
                  background: selected && imageLoaded ? 'var(--ink)' : 'var(--line)',
                  color: selected && imageLoaded ? 'var(--bg)' : 'var(--ink-3)',
                  border: 'none', borderRadius: 12,
                  padding: '14px 28px', fontSize: 14, fontWeight: 600,
                  width: '100%', maxWidth: 280,
                  cursor: selected && imageLoaded ? 'pointer' : 'not-allowed',
                  transition: 'all 150ms ease',
                }}
              >
                {!imageLoaded ? t('ui.loading') : t('game.submit')}
              </button>
            ) : selected !== question.correctAnswer ? (
              <button
                onClick={handleNext}
                autoFocus
                style={{
                  background: 'var(--ink)', color: 'var(--bg)',
                  border: 'none', borderRadius: 12,
                  padding: '14px 28px', fontSize: 14, fontWeight: 600,
                  width: '100%', maxWidth: 280,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                }}
              >
                {questionNumber === totalQuestions ? t('game.seeResults') : t('game.moving')} →
              </button>
            ) : null}

            {/* Feedback / report link */}
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-3)', minHeight: 18 }}>
              {confirmed ? (
                selected === question.correctAnswer ? (
                  <span style={{ color: 'var(--good)', fontWeight: 500 }}>{t('game.correct')}</span>
                ) : (
                  <span style={{ color: 'var(--bad)', fontWeight: 500 }}>
                    {t('game.incorrect', { country: countryName(question.correctAnswer) })}
                  </span>
                )
              ) : (
                <button
                  onClick={() => setShowReport(true)}
                  style={{
                    background: 'none', border: 'none', padding: 0,
                    fontSize: 12, color: 'var(--ink-3)', cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {t('ui.reportError')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showReport && (
        <ReportError question={question} onClose={() => setShowReport(false)} />
      )}
    </>
  );
}
