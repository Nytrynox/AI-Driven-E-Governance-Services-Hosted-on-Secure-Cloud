'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { AIAssistant } from '@/components/ai/AIAssistant'
import { FileUpload } from '@/components/ui/FileUpload'
import { 
  FileText, 
  Users, 
  CreditCard, 
  Building, 
  Shield, 
  MessageCircle,
  Upload,
  Bot
} from 'lucide-react'

const services = [
  {
    icon: FileText,
    title: 'Document Processing',
    description: 'AI-powered document analysis and verification',
    href: '/services/documents'
  },
  {
    icon: CreditCard,
    title: 'Tax Services',
    description: 'File taxes, check refunds, and manage tax records',
    href: '/services/tax'
  },
  {
    icon: Users,
    title: 'Citizen Registration',
    description: 'Register for government services and update information',
    href: '/services/registration'
  },
  {
    icon: Building,
    title: 'Business Licensing',
    description: 'Apply for business licenses and permits',
    href: '/services/business'
  },
  {
    icon: Shield,
    title: 'Social Security',
    description: 'Manage social security benefits and applications',
    href: '/services/social-security'
  },
  {
    icon: MessageCircle,
    title: 'Support Center',
    description: '24/7 AI-powered customer support',
    href: '/support'
  }
]

export default function HomePage() {
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI-Driven E-Governance Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Secure, intelligent, and citizen-centric government services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowFileUpload(true)}
              className="btn-primary flex items-center gap-2 px-8 py-3 text-lg"
            >
              <Upload size={20} />
              Upload Document
            </button>
            <button 
              onClick={() => setShowAIAssistant(true)}
              className="btn-secondary flex items-center gap-2 px-8 py-3 text-lg"
            >
              <Bot size={20} />
              Ask AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Government Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-gov-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Shield className="text-gov-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure & Compliant</h3>
              <p className="text-gray-600">
                Government-grade security with end-to-end encryption and compliance standards
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gov-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Bot className="text-gov-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered</h3>
              <p className="text-gray-600">
                Intelligent document processing and 24/7 AI assistant for citizen support
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gov-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="text-gov-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Citizen-Centric</h3>
              <p className="text-gray-600">
                Designed with citizens first - simple, accessible, and user-friendly
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Modals */}
      {showAIAssistant && (
        <AIAssistant onClose={() => setShowAIAssistant(false)} />
      )}
      
      {showFileUpload && (
        <FileUpload onClose={() => setShowFileUpload(false)} />
      )}
    </div>
  )
}
