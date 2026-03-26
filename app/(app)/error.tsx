'use client'
import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container-app py-24 text-center max-w-md mx-auto">
      <AlertTriangle size={48} className="text-yellow-400 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
      <p className="text-gray-500 mb-8">An unexpected error occurred. Please try again.</p>
      <button onClick={reset} className="btn-primary">Try Again</button>
    </div>
  )
}
