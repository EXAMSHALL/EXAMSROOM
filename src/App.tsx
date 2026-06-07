import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/genai'
import { Loader, Send, RefreshCw } from 'lucide-react'

interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export default function App() {
  const [screen, setScreen] = useState<'home' | 'generate' | 'quiz'>('home')
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState('')
  const [numQuestions, setNumQuestions] = useState('5')
  const [error, setError] = useState('')

  const generateQuizzes = async () => {
    if (!subject.trim()) {
      setError('Please enter a subject')
      return
    }

    setLoading(true)
    setError('')

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) {
        setError('Gemini API key not configured. Please set VITE_GEMINI_API_KEY')
        setLoading(false)
        return
      }

      const client = new GoogleGenerativeAI({ apiKey })
      const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' })

      const prompt = `Generate exactly ${numQuestions} multiple choice quiz questions about "${subject}" for an academic exam. 
      
Return ONLY valid JSON in this exact format (no markdown, no code blocks, just raw JSON):
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "Brief explanation of why this is correct."
  }
]

Make sure:
- Each question has exactly 4 options
- One option must be the correct answer
- The correctAnswer field must match one of the options exactly
- Questions are educational and appropriate for interviews/exams
- Provide good explanations`

      const result = await model.generateContent(prompt)
      const responseText = result.response.text()

      // Parse the JSON response
      let parsedQuizzes: Quiz[] = []
      try {
        // Try to extract JSON from the response
        const jsonMatch = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/)
        if (jsonMatch) {
          parsedQuizzes = JSON.parse(jsonMatch[0])
        } else {
          parsedQuizzes = JSON.parse(responseText)
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        setError('Failed to parse quiz data. Please try again.')
        setLoading(false)
        return
      }

      // Validate and add IDs
      const validatedQuizzes: Quiz[] = parsedQuizzes
        .filter(
          (q: any) =>
            q.question &&
            Array.isArray(q.options) &&
            q.options.length === 4 &&
            q.correctAnswer &&
            q.explanation
        )
        .map((q: any, i: number) => ({
          ...q,
          id: `quiz-${i}`,
        }))

      if (validatedQuizzes.length === 0) {
        setError('No valid quizzes generated. Please try again.')
        setLoading(false)
        return
      }

      setQuizzes(validatedQuizzes)
      setCurrentQuizIndex(0)
      setScore(0)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setScreen('quiz')
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Failed to generate quizzes'}`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(option)
      if (option === quizzes[currentQuizIndex].correctAnswer) {
        setScore(score + 1)
      }
      setShowExplanation(true)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setScreen('home')
    }
  }

  const resetApp = () => {
    setScreen('home')
    setQuizzes([])
    setCurrentQuizIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setSubject('')
    setNumQuestions('5')
    setError('')
  }

  // Home Screen
  if (screen === 'home' && quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">EXAMSROOM</h1>
          <p className="text-gray-600 mb-8">AI-Powered MCQ Test Platform</p>
          <button
            onClick={() => setScreen('generate')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mb-4"
          >
            Generate Quiz with AI
          </button>
          <p className="text-gray-500 text-sm text-center">
            Powered by Google Gemini AI
          </p>
        </div>
      </div>
    )
  }

  // Generate Screen
  if (screen === 'generate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Quiz</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Subject/Topic
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., JavaScript, Biology, History"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Number of Questions
            </label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="3">3 Questions</option>
              <option value="5">5 Questions</option>
              <option value="10">10 Questions</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            onClick={generateQuizzes}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                <Send size={20} />
                Generate Quiz
              </>
            )}
          </button>

          <button
            onClick={resetApp}
            disabled={loading}
            className="w-full mt-4 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  // Quiz Screen
  if (screen === 'quiz' && quizzes.length > 0) {
    const currentQuiz = quizzes[currentQuizIndex]
    const isAnswered = selectedAnswer !== null
    const isCorrect = selectedAnswer === currentQuiz.correctAnswer
    const progress = ((currentQuizIndex + 1) / quizzes.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 font-semibold">
                Question {currentQuizIndex + 1} of {quizzes.length}
              </span>
              <span className="text-gray-600 font-semibold">
                Score: {score}/{quizzes.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <h3 className="text-xl font-bold text-gray-800 mb-6">{currentQuiz.question}</h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuiz.options.map((option, idx) => {
              const isSelected = selectedAnswer === option
              const isCorrectOption = option === currentQuiz.correctAnswer
              let bgColor = 'bg-gray-50 hover:bg-gray-100'
              let borderColor = 'border-gray-300'

              if (isAnswered) {
                if (isCorrectOption) {
                  bgColor = 'bg-green-50'
                  borderColor = 'border-green-500'
                } else if (isSelected && !isCorrect) {
                  bgColor = 'bg-red-50'
                  borderColor = 'border-red-500'
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 border-2 rounded-lg transition duration-200 text-left font-semibold ${bgColor} ${borderColor} ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isAnswered
                          ? isCorrectOption
                            ? 'bg-green-500 border-green-500'
                            : isSelected
                              ? 'bg-red-500 border-red-500'
                              : 'border-gray-300'
                          : 'border-gray-300'
                      }`}
                    >
                      {isAnswered && (isCorrectOption || isSelected) && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div
              className={`mb-6 p-4 rounded-lg border-2 ${
                isCorrect
                  ? 'bg-green-50 border-green-500'
                  : 'bg-red-50 border-red-500'
              }`}
            >
              <p className="font-semibold text-gray-800 mb-2">
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-gray-700">{currentQuiz.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          {isAnswered && (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              {currentQuizIndex === quizzes.length - 1
                ? `Finish - Final Score: ${score}/${quizzes.length}`
                : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    )
  }

  // Results/Final Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete! 🎉</h2>
        <p className="text-5xl font-bold text-blue-600 mb-4">
          {score}/{quizzes.length}
        </p>
        <p className="text-gray-600 mb-2">
          Percentage: {Math.round((score / quizzes.length) * 100)}%
        </p>
        <p className="text-gray-600 mb-8">
          {score === quizzes.length
            ? 'Perfect Score! Outstanding!'
            : score >= quizzes.length * 0.8
              ? 'Great Job!'
              : score >= quizzes.length * 0.6
                ? 'Good Effort!'
                : 'Keep Practicing!'}
        </p>
        <button
          onClick={resetApp}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} />
          Try Another Quiz
        </button>
      </div>
    </div>
  )
}
