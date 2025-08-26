'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Building, CreditCard, FileText, Calendar, MapPin, Phone, Mail, Users, CheckCircle, AlertTriangle } from 'lucide-react'

const businessTypes = [
  { 
    id: 'llc', 
    name: 'Limited Liability Company (LLC)', 
    description: 'Flexible business structure with liability protection',
    fee: '$150',
    processing: '5-7 business days',
    requirements: ['Articles of Organization', 'Operating Agreement', 'EIN']
  },
  { 
    id: 'corp', 
    name: 'Corporation', 
    description: 'Formal business structure with stock shares',
    fee: '$200',
    processing: '7-10 business days',
    requirements: ['Articles of Incorporation', 'Corporate Bylaws', 'EIN', 'Stock Certificates']
  },
  { 
    id: 'partnership', 
    name: 'Partnership', 
    description: 'Business owned by two or more people',
    fee: '$100',
    processing: '3-5 business days',
    requirements: ['Partnership Agreement', 'EIN', 'Partner Information']
  },
  { 
    id: 'sole', 
    name: 'Sole Proprietorship', 
    description: 'Simple business structure for individual owners',
    fee: '$75',
    processing: '2-3 business days',
    requirements: ['DBA Filing', 'Business License', 'EIN (optional)']
  },
  { 
    id: 'nonprofit', 
    name: 'Non-Profit Organization', 
    description: '501(c)(3) tax-exempt organization',
    fee: '$275',
    processing: '30-45 business days',
    requirements: ['Articles of Incorporation', 'Bylaws', 'IRS Form 1023', 'Board of Directors']
  }
]

const licenseTypes = [
  { 
    id: 'general', 
    name: 'General Business License', 
    description: 'Basic license required for most businesses',
    fee: '$125',
    validity: '1 year'
  },
  { 
    id: 'food', 
    name: 'Food Service License', 
    description: 'Required for restaurants, cafes, and food vendors',
    fee: '$200',
    validity: '1 year'
  },
  { 
    id: 'retail', 
    name: 'Retail Sales License', 
    description: 'For businesses selling products to consumers',
    fee: '$100',
    validity: '2 years'
  },
  { 
    id: 'professional', 
    name: 'Professional Services License', 
    description: 'For consulting, legal, medical, and other professional services',
    fee: '$175',
    validity: '2 years'
  },
  { 
    id: 'construction', 
    name: 'Construction Contractor License', 
    description: 'Required for construction and contracting work',
    fee: '$300',
    validity: '3 years'
  },
  { 
    id: 'liquor', 
    name: 'Liquor License', 
    description: 'For businesses selling alcoholic beverages',
    fee: '$500',
    validity: '1 year'
  }
]

const recentApplications = [
  { id: 'BUS-2025-001', type: 'LLC Registration', business: 'TechStart Solutions', status: 'Approved', date: '2025-08-20', fee: '$150' },
  { id: 'BUS-2025-002', type: 'Food Service License', business: 'Cafe Delights', status: 'Under Review', date: '2025-08-18', fee: '$200' },
  { id: 'BUS-2025-003', type: 'Retail License', business: 'Fashion Boutique', status: 'Pending Payment', date: '2025-08-15', fee: '$100' }
]

export default function BusinessPage() {
  const [selectedService, setSelectedService] = useState('')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    businessStructure: '',
    industry: '',
    description: '',
    
    // Contact Information
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    businessPhone: '',
    businessEmail: '',
    website: '',
    
    // Business Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    county: '',
    
    // Mailing Address (if different)
    mailingSame: true,
    mailingStreet: '',
    mailingCity: '',
    mailingState: '',
    mailingZip: '',
    
    // Business Details
    startDate: '',
    employeeCount: '',
    annualRevenue: '',
    federalEIN: '',
    stateID: '',
    
    // License Information
    licenseType: '',
    businessHours: '',
    hasEmployees: false,
    sellsProducts: false,
    servesFood: false,
    sellsAlcohol: false,
    
    // Financial Information
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    
    // Additional Information
    previousBusiness: false,
    bankruptcyHistory: false,
    criminalHistory: false
  })

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Business application submitted successfully! Reference ID: BUS-${Date.now()}`)
  }

  const getServiceInfo = () => {
    if (selectedService === 'registration') {
      return businessTypes.find(type => type.id === formData.businessStructure)
    } else {
      return licenseTypes.find(type => type.id === formData.licenseType)
    }
  }

  const filteredLicenses = licenseTypes.filter(license => 
    license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Business Services</h1>
            <p className="text-xl opacity-90">
              Start your business, obtain licenses, and manage compliance - all in one place
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {!selectedService ? (
          // Service Selection
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Business Registration */}
              <div className="card p-8 hover:shadow-xl transition-shadow cursor-pointer"
                   onClick={() => setSelectedService('registration')}>
                <div className="flex items-center gap-4 mb-6">
                  <Building className="text-green-600" size={32} />
                  <h3 className="text-2xl font-bold">Business Registration</h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Register your business entity (LLC, Corporation, Partnership, etc.) with the state
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {businessTypes.slice(0, 4).map((type) => (
                    <div key={type.id} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold text-sm">{type.name}</p>
                      <p className="text-xs text-gray-600">{type.fee}</p>
                    </div>
                  ))}
                </div>
                
                <button className="btn-primary w-full">
                  Start Business Registration
                </button>
              </div>

              {/* Business Licensing */}
              <div className="card p-8 hover:shadow-xl transition-shadow cursor-pointer"
                   onClick={() => setSelectedService('licensing')}>
                <div className="flex items-center gap-4 mb-6">
                  <CreditCard className="text-blue-600" size={32} />
                  <h3 className="text-2xl font-bold">Business Licensing</h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Apply for required business licenses and permits for your industry
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {licenseTypes.slice(0, 4).map((type) => (
                    <div key={type.id} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold text-sm">{type.name}</p>
                      <p className="text-xs text-gray-600">{type.fee}</p>
                    </div>
                  ))}
                </div>
                
                <button className="btn-primary w-full">
                  Apply for Licenses
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="card p-6 text-center">
                <Building className="mx-auto text-green-600 mb-3" size={32} />
                <p className="text-2xl font-bold text-gray-900">2,847</p>
                <p className="text-sm text-gray-600">Businesses Registered This Month</p>
              </div>
              <div className="card p-6 text-center">
                <FileText className="mx-auto text-blue-600 mb-3" size={32} />
                <p className="text-2xl font-bold text-gray-900">1,524</p>
                <p className="text-sm text-gray-600">Licenses Issued</p>
              </div>
              <div className="card p-6 text-center">
                <Calendar className="mx-auto text-purple-600 mb-3" size={32} />
                <p className="text-2xl font-bold text-gray-900">5.2 days</p>
                <p className="text-sm text-gray-600">Average Processing Time</p>
              </div>
              <div className="card p-6 text-center">
                <Users className="mx-auto text-orange-600 mb-3" size={32} />
                <p className="text-2xl font-bold text-gray-900">98.7%</p>
                <p className="text-sm text-gray-600">Customer Satisfaction</p>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Business Applications</h2>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-green-600">#{app.id}</p>
                      <p className="font-medium">{app.type}</p>
                      <p className="text-sm text-gray-600">{app.business} • {new Date(app.date).toLocaleDateString()} • {app.fee}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Application Form
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4">Application Progress</h3>
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300'
                    }`}>1</div>
                    <span>Service Type</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300'
                    }`}>2</div>
                    <span>Business Info</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-300'
                    }`}>3</div>
                    <span>Contact & Address</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 4 ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 4 ? 'bg-green-600 text-white' : 'bg-gray-300'
                    }`}>4</div>
                    <span>Additional Details</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 5 ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 5 ? 'bg-green-600 text-white' : 'bg-gray-300'
                    }`}>5</div>
                    <span>Payment & Submit</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <button 
                    onClick={() => setSelectedService('')}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    ← Change Service Type
                  </button>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-3">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  {selectedService === 'registration' ? (
                    <Building className="text-green-600" size={28} />
                  ) : (
                    <CreditCard className="text-blue-600" size={28} />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedService === 'registration' ? 'Business Registration' : 'Business Licensing'}
                    </h2>
                    <p className="text-gray-600">
                      {selectedService === 'registration' 
                        ? 'Register your business entity with the state'
                        : 'Apply for required business licenses and permits'
                      }
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Service Type Selection */}
                  {step === 1 && selectedService === 'registration' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Choose Business Structure</h3>
                      
                      <div className="space-y-4">
                        {businessTypes.map((type) => (
                          <label key={type.id} className="block">
                            <input
                              type="radio"
                              name="businessStructure"
                              value={type.id}
                              checked={formData.businessStructure === type.id}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                              formData.businessStructure === type.id 
                                ? 'border-green-600 bg-green-50' 
                                : 'border-gray-300 hover:border-green-300'
                            }`}>
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-lg">{type.name}</h4>
                                <span className="text-green-600 font-semibold">{type.fee}</span>
                              </div>
                              <p className="text-gray-600 mb-3">{type.description}</p>
                              <p className="text-sm text-gray-500">Processing: {type.processing}</p>
                              <div className="mt-3">
                                <p className="text-sm font-medium mb-1">Required Documents:</p>
                                <ul className="text-sm text-gray-600">
                                  {type.requirements.map((req, index) => (
                                    <li key={index}>• {req}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && selectedService === 'licensing' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Choose License Type</h3>
                      
                      <div className="mb-4">
                        <label htmlFor="license-search" className="block text-sm font-medium text-gray-700 mb-2">
                          Search License Types
                        </label>
                        <input
                          id="license-search"
                          type="text"
                          placeholder="Search license types..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          title="Search for license types"
                          aria-label="Search for license types"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        {filteredLicenses.map((license) => (
                          <label key={license.id} className="block">
                            <input
                              type="radio"
                              name="licenseType"
                              value={license.id}
                              checked={formData.licenseType === license.id}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                              formData.licenseType === license.id 
                                ? 'border-blue-600 bg-blue-50' 
                                : 'border-gray-300 hover:border-blue-300'
                            }`}>
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-lg">{license.name}</h4>
                                <div className="text-right">
                                  <p className="text-blue-600 font-semibold">{license.fee}</p>
                                  <p className="text-sm text-gray-500">Valid {license.validity}</p>
                                </div>
                              </div>
                              <p className="text-gray-600">{license.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Business Information */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Business Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Business Name *</label>
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            placeholder="Enter your business name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Industry *</label>
                          <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            title="Select business industry"
                            required
                          >
                            <option value="">Select Industry</option>
                            <option value="technology">Technology</option>
                            <option value="retail">Retail</option>
                            <option value="food_service">Food Service</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="construction">Construction</option>
                            <option value="professional_services">Professional Services</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2">Business Description *</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Describe your business activities and services"
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Start Date</label>
                          <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Number of Employees</label>
                          <select
                            name="employeeCount"
                            value={formData.employeeCount}
                            onChange={handleInputChange}
                            title="Select number of employees"
                            aria-label="Number of employees"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="">Select</option>
                            <option value="1">Just me (1)</option>
                            <option value="2-10">2-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="200+">200+ employees</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Expected Annual Revenue</label>
                          <select
                            name="annualRevenue"
                            value={formData.annualRevenue}
                            onChange={handleInputChange}
                            title="Select expected annual revenue"
                            aria-label="Expected annual revenue"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="">Select</option>
                            <option value="0-50k">$0 - $50,000</option>
                            <option value="50k-100k">$50,000 - $100,000</option>
                            <option value="100k-500k">$100,000 - $500,000</option>
                            <option value="500k-1m">$500,000 - $1,000,000</option>
                            <option value="1m+">$1,000,000+</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact & Address */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Contact Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Owner/Contact Name *</label>
                          <input
                            type="text"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleInputChange}
                            placeholder="Full name of business owner"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Owner Email *</label>
                          <input
                            type="email"
                            name="ownerEmail"
                            value={formData.ownerEmail}
                            onChange={handleInputChange}
                            placeholder="owner@business.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Owner Phone *</label>
                          <input
                            type="tel"
                            name="ownerPhone"
                            value={formData.ownerPhone}
                            onChange={handleInputChange}
                            placeholder="(555) 123-4567"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Business Phone</label>
                          <input
                            type="tel"
                            name="businessPhone"
                            value={formData.businessPhone}
                            onChange={handleInputChange}
                            placeholder="(555) 123-4567"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold mt-8 mb-4">Business Address</h4>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2">Street Address *</label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          placeholder="123 Main Street"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold mb-2">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">State *</label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            title="Select state"
                            aria-label="Select state"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          >
                            <option value="">Select State</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                            <option value="IL">Illinois</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">ZIP Code *</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="12345"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Additional Details */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Additional Business Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Federal EIN</label>
                          <input
                            type="text"
                            name="federalEIN"
                            value={formData.federalEIN}
                            onChange={handleInputChange}
                            placeholder="12-3456789"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <p className="text-sm text-gray-500 mt-1">Leave blank if you don&apos;t have one yet</p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Business Hours</label>
                          <input
                            type="text"
                            name="businessHours"
                            value={formData.businessHours}
                            onChange={handleInputChange}
                            placeholder="Mon-Fri 9AM-5PM"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold">Business Activities (Check all that apply)</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              name="hasEmployees"
                              checked={formData.hasEmployees}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-green-600"
                            />
                            <span>Will have employees</span>
                          </label>
                          
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              name="sellsProducts"
                              checked={formData.sellsProducts}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-green-600"
                            />
                            <span>Will sell products</span>
                          </label>
                          
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              name="servesFood"
                              checked={formData.servesFood}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-green-600"
                            />
                            <span>Will serve food</span>
                          </label>
                          
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              name="sellsAlcohol"
                              checked={formData.sellsAlcohol}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-green-600"
                            />
                            <span>Will sell alcohol</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Payment & Submit */}
                  {step === 5 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Review & Payment</h3>
                      
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold mb-4">Application Summary</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p><span className="font-medium">Service:</span> {selectedService === 'registration' ? 'Business Registration' : 'Business Licensing'}</p>
                            <p><span className="font-medium">Type:</span> {getServiceInfo()?.name}</p>
                            <p><span className="font-medium">Business Name:</span> {formData.businessName}</p>
                            <p><span className="font-medium">Owner:</span> {formData.ownerName}</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Processing Time:</span> {
                              selectedService === 'registration' 
                                ? (getServiceInfo() as { processing?: string })?.processing 
                                : (getServiceInfo() as { validity?: string })?.validity
                            }</p>
                            <p><span className="font-medium">Fee:</span> {getServiceInfo()?.fee}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-6">
                        <h4 className="font-semibold mb-4">Payment Method</h4>
                        
                        <div className="space-y-4">
                          <label className="flex items-center gap-3">
                            <input
                              type="radio"
                              value="card"
                              checked={paymentMethod === 'card'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-green-600"
                            />
                            <CreditCard size={20} />
                            <span>Credit/Debit Card</span>
                          </label>
                          
                          <label className="flex items-center gap-3">
                            <input
                              type="radio"
                              value="bank"
                              checked={paymentMethod === 'bank'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-green-600"
                            />
                            <Building size={20} />
                            <span>Bank Transfer</span>
                          </label>
                        </div>
                        
                        {paymentMethod === 'card' && (
                          <div className="mt-6 space-y-4">
                            <div>
                              <label className="block text-sm font-semibold mb-2">Card Number</label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold mb-2">CVV</label>
                                <input
                                  type="text"
                                  placeholder="123"
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="text-blue-600 mt-1" size={20} />
                          <div className="text-sm">
                            <p className="font-medium text-blue-800 mb-1">Important Information</p>
                            <ul className="text-blue-700 space-y-1">
                              <li>• All information will be verified by state authorities</li>
                              <li>• You will receive email updates on your application status</li>
                              <li>• Additional documents may be requested during processing</li>
                              <li>• Fees are non-refundable once processing begins</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8 border-t">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Previous
                      </button>
                    )}
                    
                    <div className="ml-auto">
                      {step < 5 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="btn-primary px-6 py-2"
                          disabled={
                            (step === 1 && !formData.businessStructure && !formData.licenseType) ||
                            (step === 2 && (!formData.businessName || !formData.industry))
                          }
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn-primary px-6 py-2 flex items-center gap-2"
                        >
                          <CheckCircle size={20} />
                          Submit Application & Pay {getServiceInfo()?.fee}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
