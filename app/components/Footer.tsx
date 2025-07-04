'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  const footerText = language === 'sr' 
    ? 'Направљено с ❤️ - Aња и мама'
    : 'Built with ❤️ by Anja and mom';

  return (
    <footer className="py-4 text-center text-gray-600 text-sm">
      {footerText}
    </footer>
  );
} 