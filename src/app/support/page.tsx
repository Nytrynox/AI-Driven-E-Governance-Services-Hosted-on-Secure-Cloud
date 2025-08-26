'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MessageCircle, Search, FileText, Phone, Mail, Users, Clock, AlertTriangle, CheckCircle, Star } from 'lucide-react'

const supportCategories = [
  {
    id: 'account',
    name: 'Account Help',
    description: 'Issues with login, password, or account access',
    icon: Users,
    color: 'text-blue-600',
    articles: 15,
    avgResponse: '2 hours'
  },
  {
    id: 'documents',
    name: 'Document Services',
    description: 'Help with document applications and status',
    icon: FileText,
    color: 'text-green-600',
    articles: 23,
    avgResponse: '4 hours'
  },
  {
    id: 'payments',
    name: 'Payments & Fees',
    description: 'Payment issues, refunds, and fee questions',
    icon: MessageCircle,
    color: 'text-purple-600',
    articles: 18,
    avgResponse: '3 hours'
  },
  {
    id: 'technical',
    name: 'Technical Issues',
    description: 'Website problems, errors, and technical support',
    icon: AlertTriangle,
    color: 'text-orange-600',
    articles: 12,
    avgResponse: '1 hour'
  }
]

const faqItems = [
  {
    question: "How long does it take to process my document application?",
    answer: "Processing times vary by document type: Birth certificates (3-5 business days), Passports (6-8 weeks for routine service, 2-3 weeks for expedited), Driver's licenses (Same day at DMV office, 7-10 days by mail), Marriage certificates (1-2 business days), Death certificates (3-5 business days), Business registrations (5-10 business days). You can check your application status online using your reference number.",
    category: "documents",
    views: 1247
  },
  {
    question: "What forms of payment do you accept?",
    answer: "We accept multiple payment methods: Credit cards (Visa, MasterCard, American Express, Discover), Debit cards, Bank transfers (ACH), Money orders, Certified checks, and Cash (for in-person services only). Online payments are processed securely through our payment portal. Note that some services may have specific payment requirements.",
    category: "payments",
    views: 892
  },
  {
    question: "How do I create an account and what are the requirements?",
    answer: "To create an account: Go to the registration page, provide your full name, email address, phone number, date of birth, and create a secure password. You'll need to verify your email address and may need to provide additional identity verification for certain services. Requirements: Must be 18 years or older, valid email address, US phone number, and government-issued ID for identity verification.",
    category: "account",
    views: 756
  },
  {
    question: "Can I get a refund if I cancel my application?",
    answer: "Refund policy varies by service type: Applications not yet processed: Full refund available within 24 hours of submission. Applications in progress: Partial refund may be available, minus processing fees. Completed applications: No refund available for successfully processed applications. Digital services: Full refund if cancelled within 2 hours. To request a refund, contact our support team with your reference number.",
    category: "payments",
    views: 634
  },
  {
    question: "Why can't I access my account or reset my password?",
    answer: "Common account access issues and solutions: Forgot password: Use the 'Forgot Password' link on the login page. Account locked: Wait 30 minutes or contact support. Email not recognized: Check for typos or use the email address you registered with. Browser issues: Clear cache and cookies, try a different browser. Two-factor authentication problems: Contact support with your account details. If none of these solutions work, our support team can help verify your identity and restore access.",
    category: "account",
    views: 543
  },
  {
    question: "What should I do if the website isn't working properly?",
    answer: "If you're experiencing technical issues: First, try refreshing the page or clearing your browser cache. Check if JavaScript is enabled in your browser settings. Try using a different browser (Chrome, Firefox, Safari, Edge). Disable browser extensions temporarily. Check your internet connection. If the problem persists, contact our technical support team with details about your browser, operating system, and the specific error you're encountering.",
    category: "technical",
    views: 445
  }
]

const contactMethods = [
  {
    method: 'Phone',
    icon: Phone,
    details: '1-800-GOV-HELP (1-800-468-4357)',
    hours: 'Monday-Friday: 8:00 AM - 8:00 PM EST',
    description: 'Speak directly with a support representative',
    waitTime: 'Average wait: 12 minutes'
  },
  {
    method: 'Live Chat',
    icon: MessageCircle,
    details: 'Available on this page',
    hours: 'Monday-Friday: 9:00 AM - 6:00 PM EST',
    description: 'Get instant help through live chat',
    waitTime: 'Average response: 3 minutes'
  },
  {
    method: 'Email',
    icon: Mail,
    details: 'support@egovernance.gov',
    hours: '24/7 - Response within 24 hours',
    description: 'Send us detailed questions or issues',
    waitTime: 'Response time: 4-24 hours'
  }
]

const recentTickets = [
  { id: 'TKT-2025-001', subject: 'Document processing delay', status: 'Resolved', date: '2025-08-20', agent: 'Sarah Johnson' },
  { id: 'TKT-2025-002', subject: 'Payment not processing', status: 'In Progress', date: '2025-08-19', agent: 'Mike Rodriguez' },
  { id: 'TKT-2025-003', subject: 'Account locked after password reset', status: 'Resolved', date: '2025-08-18', agent: 'Lisa Chen' }
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    priority: 'medium',
    subject: '',
    message: '',
    attachments: null
  })
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    })
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Support ticket created successfully! Ticket ID: TKT-${Date.now()}`)
    setShowContactForm(false)
    setContactForm({
      name: '',
      email: '',
      phone: '',
      category: '',
      priority: 'medium',
      subject: '',
      message: '',
      attachments: null
    })
  }

  const filteredFAQ = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Help & Support Center</h1>
            <p className="text-xl opacity-90">
              Find answers to your questions and get the help you need
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Search className="text-teal-600" size={28} />
            <h2 className="text-2xl font-bold">Search for Help</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for answers, guides, or help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              />
            </div>
            <div className="md:w-48">
              <label htmlFor="category-filter" className="sr-only">Filter by category</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                title="Filter by category"
                aria-label="Filter FAQ by category"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All Categories</option>
                <option value="account">Account Help</option>
                <option value="documents">Documents</option>
                <option value="payments">Payments</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <button className="btn-primary px-8 py-4">
              Search
            </button>
          </div>
        </div>

        {/* Support Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How Can We Help You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.id} className="card p-6 hover:shadow-xl transition-shadow cursor-pointer"
                     onClick={() => setSelectedCategory(category.id)}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className={category.color} size={28} />
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Articles:</span> {category.articles}</p>
                    <p><span className="font-semibold">Avg Response:</span> {category.avgResponse}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {filteredFAQ.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{faq.views} views</span>
                    <span className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </div>
                </button>
                
                {expandedFaq === index && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-sm text-gray-500">Was this helpful?</span>
                      <button className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1">
                        <CheckCircle size={16} />
                        Yes
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredFAQ.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No FAQ items found matching your search criteria.</p>
              <p className="mt-2">Try different keywords or contact our support team.</p>
            </div>
          )}
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Options */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
            
            <div className="space-y-6">
              {contactMethods.map((contact, index) => {
                const IconComponent = contact.icon
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent className="text-teal-600" size={24} />
                      <h3 className="font-bold text-lg">{contact.method}</h3>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Contact:</span> {contact.details}</p>
                      <p><span className="font-semibold">Hours:</span> {contact.hours}</p>
                      <p><span className="font-semibold">Response:</span> {contact.waitTime}</p>
                      <p className="text-gray-600">{contact.description}</p>
                    </div>
                    
                    {contact.method === 'Live Chat' && (
                      <button className="btn-primary mt-3 w-full">
                        Start Live Chat
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Create Support Ticket</h2>
              <button
                onClick={() => setShowContactForm(!showContactForm)}
                className="btn-primary"
              >
                {showContactForm ? 'Hide Form' : 'Show Form'}
              </button>
            </div>
            
            {showContactForm && (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Category *</label>
                    <select
                      name="category"
                      value={contactForm.category}
                      onChange={handleContactInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="account">Account Help</option>
                      <option value="documents">Document Services</option>
                      <option value="payments">Payments & Fees</option>
                      <option value="technical">Technical Issues</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Priority *</label>
                    <select
                      name="priority"
                      value={contactForm.priority}
                      onChange={handleContactInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    >
                      <option value="low">Low - General question</option>
                      <option value="medium">Medium - Need assistance</option>
                      <option value="high">High - Urgent issue</option>
                      <option value="critical">Critical - Service disruption</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Reference Number</label>
                    <input
                      type="text"
                      name="reference"
                      placeholder="Application or ticket number (optional)"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactInputChange}
                    placeholder="Brief description of your issue"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    placeholder="Please describe your issue in detail..."
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Attachments</label>
                  <input
                    type="file"
                    name="attachments"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Accepted formats: PDF, DOC, DOCX, PNG, JPG (Max 5MB each)
                  </p>
                </div>
                
                <button type="submit" className="btn-primary w-full py-3">
                  Submit Support Ticket
                </button>
              </form>
            )}
            
            {!showContactForm && (
              <div className="text-center py-8">
                <MessageCircle className="mx-auto text-teal-600 mb-4" size={48} />
                <p className="text-gray-600 mb-4">
                  Need personalized assistance? Create a support ticket and our team will help you.
                </p>
                <p className="text-sm text-gray-500">
                  Average response time: 4-24 hours depending on priority
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="card p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Support Activity</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Ticket ID</th>
                  <th className="text-left py-3 px-4">Subject</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Agent</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-teal-600">{ticket.id}</td>
                    <td className="py-3 px-4">{ticket.subject}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(ticket.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{ticket.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Service Hours & Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-teal-600" size={24} />
              <h3 className="text-xl font-bold">Service Hours</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Phone Support:</span>
                <span>Mon-Fri 8AM-8PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Live Chat:</span>
                <span>Mon-Fri 9AM-6PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email Support:</span>
                <span>24/7 (Response in 24hrs)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Emergency Services:</span>
                <span>24/7 for critical issues</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-yellow-500" size={24} />
              <h3 className="text-xl font-bold">Customer Satisfaction</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Rating</span>
                  <span className="text-sm">4.8/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>• 94% of tickets resolved on first contact</p>
                <p>• Average response time: 3.2 hours</p>
                <p>• 99.2% customer satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
