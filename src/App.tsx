import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">EXAMSROOM</h1>
        <p className="text-gray-600 mb-6">Academic and Jobs MCQ Test Platform</p>
        <button
          onClick={() => setCount(count + 1)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Count: {count}
        </button>
        <p className="text-gray-500 text-sm mt-4 text-center">
          Click the button to get started
        </p>
      </div>
    </div>
  )
}