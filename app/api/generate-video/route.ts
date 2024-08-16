import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createVideo } from '@/utils/synthesiaApi'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { script } = await req.json()

    // Generate title using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = `
      Based on the following video script, generate a catchy title for the video:

      Script:
      ${script}

      Respond with just the title, nothing else.
    `
    const result = await model.generateContent(prompt)
    const response = await result.response
    const title = response.text().trim()

    // Create video using Synthesia API
    const videoData = await createVideo(script, title)

    return NextResponse.json({
      title,
      videoId: videoData.id,
      status: videoData.status
    })
  } catch (error) {
    console.error('Error generating video:', error)
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    )
  }
}