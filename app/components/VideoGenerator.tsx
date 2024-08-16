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
    <div className="w-full max-w-2xl">
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Enter your video script here..."
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={generateVideo}
        disabled={!script || loading}
        className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
      >
        {loading ? 'Generating...' : 'Generate Video'}
      </button>
      {result && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{result.title}</h2>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">Video Description:</h3>
            <p>{result.description}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Captions:</h3>
            <ul className="list-disc pl-5">
              {result.captions.map((caption: string, index: number) => (
                <li key={index}>{caption}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoGenerator