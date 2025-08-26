import { NextRequest, NextResponse } from 'next/server'
import { AzureOpenAI } from 'openai'

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiVersion: "2024-02-01"
})

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 })
    }

    const response = await client.chat.completions.create({
      model: "gpt-35-turbo", // Use your deployed model name
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant for a government e-services platform. 
          You can help citizens with:
          - Document processing and requirements
          - Tax filing information
          - Business licensing procedures
          - Social security services
          - General government service inquiries
          
          Always provide accurate, helpful, and professional responses.`
        },
        {
          role: "user", 
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    const aiMessage = response.choices[0]?.message?.content || "I'm sorry, I couldn't process your request."

    return NextResponse.json({ 
      message: aiMessage,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json({ 
      message: "I'm experiencing technical difficulties. Please try again later or contact support.",
      error: true
    }, { status: 500 })
  }
}
