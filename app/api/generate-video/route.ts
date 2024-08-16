import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { script } = await req.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
      Based on the following video script, generate:
      1. A catchy title for the video
      2. A brief description of what the video would contain
      3. A list of 5 key captions that would appear in the video

      Script:
      ${script}

      Respond in the following JSON format:
      {
        "title": "Video Title",
        "description": "Brief description of the video content",
        "captions": ["Caption 1", "Caption 2", "Caption 3", "Caption 4", "Caption 5"]
      }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    const videoData = JSON.parse(text)

    return NextResponse.json(videoData)
  } catch (error) {
    console.error('Error generating video:', error)
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    )
  }
}