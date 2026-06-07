import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { motion } from 'motion/react'
import { Clock, CheckCircle, XCircle, Skip } from 'lucide-react'
import { Quiz, Question } from '../types'

interface QuizInterfaceProps {
  quiz: Quiz
  onComplete: (answers: (number | null)[], timeSpent: number) => void
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({ quiz, onComplete }) => {
  const { language, t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null))
  const [timeRemaining, setTimeRemaining] = useState(quiz.durationMinutes * 60)
  const [showExplanation, setShowExplanation] = useState(false)
  const [startTime] = useState(Date.now())

  const currentQuestion: Question = quiz.questions[currentIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quiz.questions.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = optionIndex
    setAnswers(newAnswers)
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowExplanation(false)
    }
  }

  const handleSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000)
    onComplete(answers, timeSpent)
  }

  const options = language === 'en' ? currentQuestion.optionsEn : currentQuestion.optionsBn
  const questionText = language === 'en' ? currentQuestion.textEn : currentQuestion.textBn
  const explanation = language === 'en' ? currentQuestion.explanationEn : currentQuestion.explanationBn
  const selectedAnswer = answers[currentIndex]
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  const progress = ((currentIndex + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 mb-6 border border-white/20">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              {language === 'en' ? quiz.titleEn : quiz.titleBn}
            </h1>
            <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-2">
              <Clock className="text-red-400" size={20} />
              <span className="font-mono text-xl font-bold text-white">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-slate-300 mb-2">
              <span>
                {t('quiz.question')} {currentIndex + 1} {t('quiz.of')} {quiz.questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-indigo-500 h-2 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-xl p-8 border border-white/20 mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-8">{questionText}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {options.map((option, idx) => {
              const isSelected = selectedAnswer === idx
              const optionIsCorrect = idx === currentQuestion.correctAnswer
              const showCorrect = showExplanation && optionIsCorrect
              const showIncorrect = showExplanation && isSelected && !isCorrect

              return (
                <motion.button
                  key={idx}
                  onClick={() => !showExplanation && handleAnswerSelect(idx)}
                  disabled={showExplanation}
                  whileHover={{ scale: showExplanation ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-lg border-2 transition text-left font-medium ${
                    showCorrect
                      ? 'bg-green-500/20 border-green-500 text-white'
                      : showIncorrect
                        ? 'bg-red-500/20 border-red-500 text-white'
                        : isSelected && !showExplanation
                          ? 'bg-indigo-500/30 border-indigo-500 text-white'
                          : 'bg-slate-800/50 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showCorrect
                          ? 'bg-green-500 border-green-500'
                          : showIncorrect
                            ? 'bg-red-500 border-red-500'
                            : isSelected
                              ? 'bg-indigo-500 border-indigo-500'
                              : 'border-slate-500'
                      }`}
                    >
                      {showCorrect || (showIncorrect && <span className="text-white">✓</span>)}
                    </div>
                    <span>{option}</span>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border-2 ${
                isCorrect
                  ? 'bg-green-500/10 border-green-500 text-green-100'
                  : 'bg-red-500/10 border-red-500 text-red-100'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                <div>
                  <p className="font-semibold mb-2">{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</p>
                  <p>{explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-3 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition"
          >
            {t('quiz.previous')}
          </button>

          {currentIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition"
            >
              {t('quiz.submit')}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition"
            >
              {t('quiz.next')}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
