'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { FileText, Calculator, UserCheck, Building, Shield, Phone, ArrowRight, Clock, DollarSign, Users } from 'lucide-react'

const services = [
  {
    id: 'documents',
    name: 'Document Services',
    description: 'Apply for official documents including passports, birth certificates, driver\'s licenses, and more.',
    icon: FileText,
    href: '/services/documents',
    color: 'from-blue-500 to-blue-600',
    features: ['Passport Applications', 'Birth Certificates', 'Driver\'s Licenses', 'Marriage Certificates'],
    processingTime: '3-15 business days',
    startingPrice: '$25'
  },
  {
    id: 'tax',
    name: 'Tax Services',
    description: 'File tax returns, calculate taxes, track refunds, and access tax forms with our comprehensive tax center.',
    icon: Calculator,
    href: '/services/tax',
    color: 'from-green-500 to-green-600',
    features: ['Tax Calculator', 'E-Filing', 'Refund Tracking', '2025 Tax Forms'],
    processingTime: '24-48 hours',
    startingPrice: 'Free'
  },
  {
    id: 'registration',
    name: 'Registration Services',
    description: 'Register to vote, start a business, get married, and complete other important life registrations.',
    icon: UserCheck,
    href: '/services/registration',
    color: 'from-purple-500 to-purple-600',
    features: ['Voter Registration', 'Business Registration', 'Marriage Registration', 'Birth Registration'],
    processingTime: '1-10 business days',
    startingPrice: '$50'
  },
  {
    id: 'business',
    name: 'Business Services',
    description: 'Start your business, get licenses, permits, and access comprehensive business support services.',
    icon: Building,
    href: '/services/business',
    color: 'from-orange-500 to-orange-600',
    features: ['Business Formation', 'Licensing', 'Permits', 'EIN Registration'],
    processingTime: '2-10 business days',
    startingPrice: '$75'
  },
  {
    id: 'social-security',
    name: 'Social Security',
    description: 'Apply for benefits, calculate retirement income, update records, and manage your Social Security account.',
    icon: Shield,
    href: '/services/social-security',
    color: 'from-teal-500 to-teal-600',
    features: ['Benefits Calculator', 'Card Replacement', 'Retirement Planning', 'Disability Claims'],
    processingTime: '2-8 weeks',
    startingPrice: 'Free'
  },
  {
    id: 'support',
    name: 'Support Center',
    description: 'Get help with any government service, access FAQs, contact support, and track your applications.',
    icon: Phone,
    href: '/support',
    color: 'from-indigo-500 to-indigo-600',
    features: ['24/7 Support', 'Live Chat', 'FAQ Database', 'Application Tracking'],
    processingTime: 'Immediate',
    startingPrice: 'Free'
  }
]

const stats = [
  { label: 'Services Available', value: '50+', icon: FileText },
  { label: 'Applications Processed', value: '2.3M+', icon: Users },
  { label: 'Average Processing Time', value: '5 days', icon: Clock },
  { label: 'Customer Satisfaction', value: '98%', icon: Shield }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Government Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access all essential government services in one secure platform. From document applications 
            to business registration, we make government services simple, fast, and accessible to everyone.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div key={service.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className={`bg-gradient-to-r ${service.color} p-6`}>
                  <IconComponent className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-blue-100 text-sm">{service.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-semibold text-gray-900">{service.processingTime}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Starting Price:</span>
                      <span className="font-semibold text-green-600">{service.startingPrice}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href={service.href}
                    className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group-hover:scale-105 font-semibold"
                  >
                    Access Service
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Secure & Encrypted</strong>
                    <p className="text-gray-600 text-sm">Your data is protected with bank-level security</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Fast Processing</strong>
                    <p className="text-gray-600 text-sm">Applications processed faster than traditional methods</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Expert Support</strong>
                    <p className="text-gray-600 text-sm">24/7 customer support from government service experts</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <DollarSign className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Transparent Pricing</strong>
                    <p className="text-gray-600 text-sm">No hidden fees, clear pricing for all services</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you navigate any government service. 
                Get answers to common questions or speak with a specialist.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/support"
                  className="flex items-center justify-center w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Support
                </Link>
                <div className="text-center text-sm text-gray-500">
                  Available 24/7 • Average response time: 2 minutes
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
