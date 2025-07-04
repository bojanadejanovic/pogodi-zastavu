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
}

export default function FlagQuestion({ question, onAnswer, questionNumber, totalQuestions, onQuit }: FlagQuestionProps) {
  const { t, countryName } = useLanguage();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Preload the flag image when component mounts
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = question.flagImage;
  }, [question.flagImage]);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    setIsAnswered(true);
    setShowResult(true);
    
    // Show result for 2 seconds before moving to next question
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer('');
      setIsAnswered(false);
      setShowResult(false);
    }, 2000);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Header with progress and quit button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{t('ui.questionOf', { current: questionNumber, total: totalQuestions })}</span>
              <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
          <button
            onClick={onQuit}
            className="ml-4 px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            {t('ui.quit')}
          </button>
        </div>

        {/* Flag image */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            {!imageLoaded && !imageError && (
              <div className="w-64 h-40 bg-gray-200 border-2 border-gray-300 rounded-lg shadow-md flex items-center justify-center">
                <div className="text-gray-500">Loading flag...</div>
              </div>
            )}
            {imageError && (
              <div className="w-64 h-40 bg-gray-200 border-2 border-gray-300 rounded-lg shadow-md flex items-center justify-center">
                <div className="text-gray-500">Flag not available</div>
              </div>
            )}
            {imageLoaded && (
              <img
                src={question.flagImage}
                alt={`Flag of ${countryName(question.countryCode)}`}
                className="w-64 h-40 object-cover border-2 border-gray-300 rounded-lg shadow-md"
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
            )}
            {showResult && imageLoaded && (
              <div className={`absolute inset-0 flex items-center justify-center rounded-lg ${
                isCorrect ? 'bg-success-500 bg-opacity-20' : 'bg-error-500 bg-opacity-20'
              }`}>
                <span className={`text-2xl font-bold ${
                  isCorrect ? 'text-success-600' : 'text-error-600'
                }`}>
                  {isCorrect ? '✓' : '✗'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
          {t('game.question')}
        </h2>

        {/* Answer options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedAnswer === option
                  ? isAnswered
                    ? option === question.correctAnswer
                      ? 'border-success-500 bg-success-50'
                      : 'border-error-500 bg-error-50'
                    : 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${isAnswered ? 'cursor-default' : 'hover:bg-gray-50'}`}
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelect(option)}
                disabled={isAnswered}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedAnswer === option
                  ? isAnswered
                    ? option === question.correctAnswer
                      ? 'border-success-500 bg-success-500'
                      : 'border-error-500 bg-error-500'
                    : 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === option && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className={`font-medium ${
                selectedAnswer === option && isAnswered
                  ? option === question.correctAnswer
                    ? 'text-success-700'
                    : 'text-error-700'
                  : 'text-gray-700'
              }`}>
                {countryName(option)}
              </span>
            </label>
          ))}
        </div>

        {/* Submit button and report button */}
        <div className="text-center space-y-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer || isAnswered || !imageLoaded}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              !selectedAnswer || isAnswered || !imageLoaded
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-105'
            }`}
          >
            {!imageLoaded ? t('ui.loading') : isAnswered ? t('game.moving') : t('game.submit')}
          </button>
          
          <button
            onClick={() => setShowReportModal(true)}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            {t('ui.reportError')} ❓
          </button>
        </div>

        {/* Result message */}
        {showResult && (
          <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
            isCorrect 
              ? 'bg-success-100 text-success-700' 
              : 'bg-error-100 text-error-700'
          }`}>
            {isCorrect 
              ? t('game.correct')
              : t('game.incorrect', { country: countryName(question.correctAnswer) })
            }
          </div>
        )}
      </div>

      {/* Report Error Modal */}
      {showReportModal && (
        <ReportError
          question={question}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </>
  );
} 