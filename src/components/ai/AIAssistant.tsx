'use client'

import { useState } from 'react'
import { X, Send, Bot } from 'lucide-react'

interface AIAssistantProps {
  onClose: () => void
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI government assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'I can help you with document processing, tax inquiries, and general government services.',
        'For document verification, please upload your files using the document upload feature.',
        'Tax deadlines are typically April 15th. Would you like help with tax filing?',
        'I can guide you through the citizen registration process step by step.'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl h-96 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <Bot className="text-gov-blue-600" size={24} />
            <h3 className="text-lg font-semibold">AI Government Assistant</h3>
          </div>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-gov-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about government services..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-blue-500"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="btn-primary px-4 py-2 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
