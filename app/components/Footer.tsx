'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer style={{
      padding: '24px',
      textAlign: 'center',
      fontSize: 12,
      color: 'var(--ink-3)',
      borderTop: '1px solid var(--line)',
      marginTop: 'auto',
    }}>
      {language === 'sr' ? 'Направљено с ❤️ — Ања и мама' : 'Built with ❤️ by Anja and mom'}
    </footer>
  );
}
