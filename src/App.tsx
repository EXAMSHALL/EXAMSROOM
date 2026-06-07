import React, { useState } from 'react'
import { useState as useStateMotion } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import { Navbar } from './components/Navbar'
import { AuthScreen } from './components/AuthScreen'
import { QuizInterface } from './components/QuizInterface'
import { ResultsScreen } from './components/ResultsScreen'
import { motion } from 'motion/react'
import type { User, Quiz } from './types'

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentScreen, setCurrentScreen] = useState<'auth' | 'dashboard' | 'quiz' | 'results'>('auth')
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([])
  const [quizTimeSpent, setQuizTimeSpent] = useState(0)

  // Sample quizzes for demonstration
  const sampleQuizzes: Quiz[] = [
    {
      id: '1',
      titleEn: 'General Science - Class 6',
      titleBn: 'সাধারণ বিজ্ঞান - ক্লাস ৬',
      descriptionEn: 'Basic science concepts',
      descriptionBn: 'মৌলিক বিজ্ঞান ধারণা',
      class: 'Class 6',
      subject: 'General Science',
      durationMinutes: 10,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questions: [
        {
          id: '1',
          textEn: 'What is the smallest unit of life?',
          textBn: 'জীবনের ক্ষুদ্রতম একক কী?',
          optionsEn: ['Cell', 'Atom', 'Molecule', 'Organism'],
          optionsBn: ['কোষ', 'পরমাণু', 'অণু', 'জীব'],
          correctAnswer: 0,
          explanationEn: 'The cell is the smallest unit of life and all living things are made of cells.',
          explanationBn: 'কোষ হল জীবনের ক্ষুদ্রতম একক এবং সমস্ত জীবন্ত জিনিস কোষ দিয়ে তৈরি।',
        },
        {
          id: '2',
          textEn: 'Which gas do plants use for photosynthesis?',
          textBn: 'গাছপালা সালোকসংশ্লেষণের জন্য কোন গ্যাস ব্যবহার করে?',
          optionsEn: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
          optionsBn: ['অক্সিজেন', 'কার্বন ডাইঅক্সাইড', 'নাইট্রোজেন', 'হাইড্রোজেন'],
          correctAnswer: 1,
          explanationEn: 'Plants use carbon dioxide from the air for photosynthesis.',
          explanationBn: 'গাছপালা বায়ু থেকে কার্বন ডাইঅক্সাইড সালোকসংশ্লেষণের জন্য ব্যবহার করে।',
        },
      ],
    },
  ]

  const handleLogin = (credentials: any) => {
    const newUser: User = {
      id: Math.random().toString(),
      name: credentials.name || 'Student',
      email: credentials.email,
      role: credentials.role || 'student',
      class: credentials.class,
      createdAt: new Date().toISOString(),
    }
    setCurrentUser(newUser)
    setCurrentScreen('dashboard')
  }

  const handleGuestLogin = () => {
    const guestUser: User = {
      id: 'guest_' + Math.random().toString(),
      name: 'Guest User',
      email: 'guest@examshall.com',
      role: 'guest',
      createdAt: new Date().toISOString(),
    }
    setCurrentUser(guestUser)
    setCurrentScreen('dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentScreen('auth')
    setSelectedQuiz(null)
  }

  const handleQuizStart = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setQuizAnswers(new Array(quiz.questions.length).fill(null))
    setCurrentScreen('quiz')
  }

  const handleQuizComplete = (answers: (number | null)[], timeSpent: number) => {
    setQuizAnswers(answers)
    setQuizTimeSpent(timeSpent)
    setCurrentScreen('results')
  }

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard')
    setSelectedQuiz(null)
  }

  return (
    <LanguageProvider>
      <div className="bg-slate-900 min-h-screen">
        {currentUser && <Navbar user={currentUser} onLogout={handleLogout} />
        }

        {/* Render screens */}
        {currentScreen === 'auth' && (
          <AuthScreen onLogin={handleLogin} onGuestLogin={handleGuestLogin} />
        )}

        {currentScreen === 'dashboard' && currentUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 md:p-8"
          >
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-white mb-8">
                Welcome, {currentUser.name}!
              </h1>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Available Quizzes', value: sampleQuizzes.length },
                  { label: 'Your Score', value: '85%' },
                  { label: 'Rank', value: '#5' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
                  >
                    <p className="text-slate-400 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-indigo-400">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Available Quizzes */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Available Quizzes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleQuizzes.map((quiz, idx) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 hover:border-indigo-500 transition cursor-pointer"
                      onClick={() => handleQuizStart(quiz)}
                    >
                      <h3 className="text-xl font-bold text-white mb-2">
                        {quiz.titleEn}
                      </h3>
                      <p className="text-slate-400 mb-4">{quiz.descriptionEn}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">
                          {quiz.questions.length} questions
                        </span>
                        <span className="text-indigo-400 font-semibold">
                          {quiz.durationMinutes} min
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentScreen === 'quiz' && selectedQuiz && (
          <QuizInterface quiz={selectedQuiz} onComplete={handleQuizComplete} />
        )}

        {currentScreen === 'results' && selectedQuiz && (
          <ResultsScreen
            quiz={selectedQuiz}
            answers={quizAnswers}
            timeSpent={quizTimeSpent}
            onBack={handleBackToDashboard}
            onRetake={() => handleQuizStart(selectedQuiz)}
          />
        )}
      </div>
    </LanguageProvider>
  )
}

export default App
