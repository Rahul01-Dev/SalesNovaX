import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Tailwind is working 🎉</h1>
        <p className="text-sm">If this looks styled, you're good to go.</p>
        <button className="mt-4 px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-100">
          Test Button
        </button>
      </div>

    </>
  )
}

export default App
