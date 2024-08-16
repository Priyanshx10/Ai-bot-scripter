'use client'

import { useState, useEffect } from 'react'
import { getVideoStatus } from '@/utils/synthesiaApi'

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

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (result?.videoId && result.status !== 'complete') {
      intervalId = setInterval(async () => {
        try {
          const statusData = await getVideoStatus(result.videoId);
          setResult((prev: any) => ({ ...prev, ...statusData }));

          if (statusData.status === 'complete') {
            if (intervalId) clearInterval(intervalId);
          }
        } catch (error) {
          console.error('Error fetching video status:', error);
        }
      }, 5000); // Check every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [result?.videoId, result?.status]);

  return (
    <div className="w-full max-w-2xl mx-auto text-gray-800">
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Enter your video script here..."
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4 text-gray-800"
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{result.title}</h2>
          <p className="text-gray-700">Video Status: {result.status}</p>
          {result.status === 'complete' && result.download && (
            <div className="mt-4">
              <a href={result.download} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white p-2 rounded inline-block">
                Download Video
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default VideoGenerator