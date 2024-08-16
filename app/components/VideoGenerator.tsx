'use client'

import { useState } from 'react'

const VideoGenerator = () => {
  const [script, setScript] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const generateVideo = async () => {
    if (!script) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate video')
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error generating video:', error)
      setResult({ error: 'Failed to generate video. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Enter your video script here..."
        className="w-full h-40 p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        onClick={generateVideo}
        disabled={!script || loading}
        className={`w-full p-3 rounded-lg text-white transition duration-300 
          ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Generating...' : 'Generate Video'}
      </button>
      {result && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Video Description:</h3>
            <p className="text-gray-700">{result.description}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Captions:</h3>
            {result.captions ? (
              <ul className="list-disc pl-5 text-gray-700">
                {result.captions.map((caption: string, index: number) => (
                  <li key={index} className="mb-1">{caption}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No captions available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoGenerator