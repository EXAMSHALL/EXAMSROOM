import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { motion } from 'motion/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Check, X, Clock } from 'lucide-react'

interface ResultsScreenProps {
  quiz: any
  answers: (number | null)[]
  timeSpent: number
  onBack: () => void
  onRetake: () => void
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  quiz,
  answers,
  timeSpent,
  onBack,
  onRetake,
}) => {
  const { language, t } = useLanguage()

  const calculateResults = () => {
    let correct = 0
    let incorrect = 0
    let skipped = 0

    answers.forEach((answer, idx) => {
      if (answer === null) {
        skipped++
      } else if (answer === quiz.questions[idx].correctAnswer) {
        correct++
      } else {
        incorrect++
      }
    })

    const percentage = (correct / quiz.questions.length) * 100
    return { correct, incorrect, skipped, percentage }
  }

  const { correct, incorrect, skipped, percentage } = calculateResults()
  const minutes = Math.floor(timeSpent / 60)
  const seconds = timeSpent % 60

  const chartData = [
    { name: t('result.correct'), value: correct, fill: '#10b981' },
    { name: t('result.incorrect'), value: incorrect, fill: '#ef4444' },
    { name: t('result.skipped'), value: skipped, fill: '#6b7280' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-500 mb-4 mx-auto">
            <span className="text-4xl font-bold text-white">
              {percentage > 70 ? '🎉' : percentage > 50 ? '👍' : '📚'}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('result.score')}</h1>
          <p className="text-6xl font-bold text-indigo-400 mb-4">
            {correct}/{quiz.questions.length}
          </p>
          <p className="text-2xl text-slate-300">
            {percentage.toFixed(1)}%
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: <Check className="text-green-400" />,
              label: t('result.correct'),
              value: correct,
              color: 'bg-green-500/10 border-green-500/30',
            },
            {
              icon: <X className="text-red-400" />,
              label: t('result.incorrect'),
              value: incorrect,
              color: 'bg-red-500/10 border-red-500/30',
            },
            {
              icon: <Clock className="text-blue-400" />,
              label: t('result.timeSpent'),
              value: `${minutes}:${seconds.toString().padStart(2, '0')}`,
              color: 'bg-blue-500/10 border-blue-500/30',
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${stat.color} border rounded-lg p-6 text-center`}
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <p className="text-slate-300 text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">{t('result.review')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            {t('result.backToDashboard')}
          </button>
          <button
            onClick={onRetake}
            className="px-8 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition"
          >
            {t('result.requestRetake')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
