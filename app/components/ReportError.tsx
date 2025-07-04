'use client';

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FlagQuestion as FlagQuestionType } from '../data/flags';

interface ReportErrorProps {
  question: FlagQuestionType;
  onClose: () => void;
}

export default function ReportError({ question, onClose }: ReportErrorProps) {
  const { t, countryName } = useLanguage();
  const [userReport, setUserReport] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReport.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/report-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionData: question,
          userReport: userReport.trim(),
          userEmail: userEmail.trim(),
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {t('report.title')} ❓
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">{t('report.questionInfo')}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>{t('report.flag')}:</strong> {question.flagImage}</p>
              <p><strong>{t('report.correctAnswer')}:</strong> {countryName(question.correctAnswer)}</p>
              <p><strong>{t('report.options')}:</strong> {question.options.map(opt => countryName(opt)).join(', ')}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="userReport" className="block text-sm font-medium text-gray-700 mb-2">
                {t('report.description')}
              </label>
              <textarea
                id="userReport"
                value={userReport}
                onChange={(e) => setUserReport(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                placeholder={t('report.placeholder')}
                required
              />
            </div>

            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                {t('report.email')} ({t('report.optional')})
              </label>
              <input
                type="email"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={t('report.emailPlaceholder')}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-3 bg-success-100 text-success-700 rounded-lg text-sm">
                {t('report.success')}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-3 bg-error-100 text-error-700 rounded-lg text-sm">
                {t('report.error')}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('report.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !userReport.trim()}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  isSubmitting || !userReport.trim()
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600'
                }`}
              >
                {isSubmitting ? t('report.sending') : t('report.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 