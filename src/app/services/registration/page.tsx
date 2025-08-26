'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { User, Users, FileText, Calendar, MapPin, Phone, Mail, Building, CreditCard, CheckCircle } from 'lucide-react'

const registrationTypes = [
  { 
    id: 'voter', 
    name: 'Voter Registration', 
    description: 'Register to vote in federal, state, and local elections',
    requirements: ['US Citizenship', 'Age 18+', 'Valid Address'],
    fee: 'Free',
    processing: 'Immediate'
  },
  { 
    id: 'birth', 
    name: 'Birth Registration', 
    description: 'Register a birth and obtain birth certificate',
    requirements: ['Hospital Records', 'Parent IDs', 'Proof of Birth'],
    fee: '$25',
    processing: '3-5 business days'
  },
  { 
    id: 'business', 
    name: 'Business Registration', 
    description: 'Register a new business entity',
    requirements: ['Business Name', 'EIN', 'Articles of Incorporation'],
    fee: '$150',
    processing: '5-10 business days'
  },
  { 
    id: 'marriage', 
    name: 'Marriage Registration', 
    description: 'Register marriage and obtain marriage certificate',
    requirements: ['Both Parties Present', 'Valid IDs', 'Marriage License'],
    fee: '$75',
    processing: '1-2 business days'
  },
  { 
    id: 'property', 
    name: 'Property Registration', 
    description: 'Register property ownership and transfers',
    requirements: ['Property Deed', 'Survey Documents', 'Title Insurance'],
    fee: '$200',
    processing: '7-14 business days'
  },
  { 
    id: 'nonprofit', 
    name: 'Non-Profit Registration', 
    description: 'Register as a 501(c)(3) non-profit organization',
    requirements: ['Bylaws', 'Board Members', 'Mission Statement'],
    fee: '$275',
    processing: '30-45 business days'
  }
]

const recentRegistrations = [
  { id: 'REG-2025-001', type: 'Voter Registration', applicant: 'Alice Johnson', status: 'Completed', date: '2025-08-20' },
  { id: 'REG-2025-002', type: 'Business Registration', applicant: 'TechStart LLC', status: 'Under Review', date: '2025-08-18' },
  { id: 'REG-2025-003', type: 'Marriage Registration', applicant: 'John & Mary Smith', status: 'Approved', date: '2025-08-15' }
]

export default function RegistrationPage() {
  const [selectedType, setSelectedType] = useState('')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    ssn: '',
    gender: '',
    citizenship: '',
    
    // Contact Information
    email: '',
    phone: '',
    alternatePhone: '',
    
    // Address Information
    street: '',
    city: '',
    state: '',
    zipCode: '',
    county: '',
    
    // Previous Address (if moved recently)
    previousStreet: '',
    previousCity: '',
    previousState: '',
    previousZip: '',
    
    // Additional Information
    party: '',
    race: '',
    ethnicity: '',
    language: 'English',
    
    // Business Information (if applicable)
    businessName: '',
    businessType: '',
    ein: '',
    businessAddress: '',
    businessPhone: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
    alert(`Registration submitted successfully! Reference ID: REG-${Date.now()}`)
  }

  const getSelectedRegistrationType = () => {
    return registrationTypes.find(type => type.id === selectedType)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Citizen Registration Services</h1>
            <p className="text-xl opacity-90">
              Register to vote, start a business, record vital events, and more - all in one place
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {!selectedType ? (
          // Registration Type Selection
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Choose Registration Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registrationTypes.map((type) => (
                <div key={type.id} className="card p-6 hover:shadow-xl transition-shadow cursor-pointer"
                     onClick={() => setSelectedType(type.id)}>
                  <div className="flex items-center gap-3 mb-4">
                    {type.id === 'voter' && <User className="text-purple-600" size={28} />}
                    {type.id === 'birth' && <Users className="text-blue-600" size={28} />}
                    {type.id === 'business' && <Building className="text-green-600" size={28} />}
                    {type.id === 'marriage' && <Users className="text-pink-600" size={28} />}
                    {type.id === 'property' && <MapPin className="text-orange-600" size={28} />}
                    {type.id === 'nonprofit' && <FileText className="text-teal-600" size={28} />}
                    <h3 className="text-xl font-bold">{type.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><span className="font-semibold">Fee:</span> {type.fee}</p>
                    <p className="text-sm"><span className="font-semibold">Processing:</span> {type.processing}</p>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-sm font-semibold mb-2">Requirements:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {type.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Registration Form
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-4">Registration Progress</h3>
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300'
                    }`}>1</div>
                    <span>Registration Type</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-300'
                    }`}>2</div>
                    <span>Personal Info</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-300'
                    }`}>3</div>
                    <span>Address Info</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 4 ? 'text-purple-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 4 ? 'bg-purple-600 text-white' : 'bg-gray-300'
                    }`}>4</div>
                    <span>Additional Info</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 5 ? 'text-purple-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 5 ? 'bg-purple-600 text-white' : 'bg-gray-300'
                    }`}>5</div>
                    <span>Review & Submit</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <button 
                    onClick={() => setSelectedType('')}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                  >
                    ← Change Registration Type
                  </button>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-3">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-purple-600" size={28} />
                  <div>
                    <h2 className="text-2xl font-bold">{getSelectedRegistrationType()?.name}</h2>
                    <p className="text-gray-600">{getSelectedRegistrationType()?.description}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 2: Personal Information */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Personal Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Middle Name</label>
                          <input
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Gender</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            title="Select gender"
                            aria-label="Select gender"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Citizenship *</label>
                          <select
                            name="citizenship"
                            value={formData.citizenship}
                            onChange={handleInputChange}
                            title="Select citizenship status"
                            aria-label="Citizenship status"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                          >
                            <option value="">Select Citizenship</option>
                            <option value="us_citizen">US Citizen</option>
                            <option value="permanent_resident">Permanent Resident</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Address Information */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Current Address</h3>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2">Street Address *</label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">State *</label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                          >
                            <option value="">Select State</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                            <option value="IL">Illinois</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="OH">Ohio</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">ZIP Code *</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Additional Information (varies by registration type) */}
                  {step === 4 && selectedType === 'voter' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Voter Registration Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Political Party</label>
                          <select
                            name="party"
                            value={formData.party}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">No Party Preference</option>
                            <option value="democratic">Democratic</option>
                            <option value="republican">Republican</option>
                            <option value="independent">Independent</option>
                            <option value="green">Green Party</option>
                            <option value="libertarian">Libertarian</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Preferred Language</label>
                          <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="chinese">Chinese</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Review and Submit */}
                  {step === 5 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Review Your Information</h3>
                      
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Personal Information</h4>
                            <div className="space-y-2 text-sm">
                              <p><span className="font-medium">Name:</span> {formData.firstName} {formData.middleName} {formData.lastName}</p>
                              <p><span className="font-medium">Date of Birth:</span> {formData.dateOfBirth}</p>
                              <p><span className="font-medium">Email:</span> {formData.email}</p>
                              <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Address</h4>
                            <div className="text-sm">
                              <p>{formData.street}</p>
                              <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Please review all information carefully before submitting</li>
                          <li>• You will receive a confirmation email after submission</li>
                          <li>• Processing time: {getSelectedRegistrationType()?.processing}</li>
                          <li>• Fee: {getSelectedRegistrationType()?.fee}</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8 border-t">
                    {step > 2 && (
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
                          onClick={() => {
                            if (step === 1) setStep(2)
                            else handleNext()
                          }}
                          className="btn-primary px-6 py-2"
                        >
                          {step === 1 ? 'Start Registration' : 'Next'}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn-primary px-6 py-2 flex items-center gap-2"
                        >
                          <CheckCircle size={20} />
                          Submit Registration
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Recent Registrations (only show when not in form) */}
        {!selectedType && (
          <div className="mt-12 card p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Registration Activity</h2>
            <div className="space-y-4">
              {recentRegistrations.map((reg) => (
                <div key={reg.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-purple-600">#{reg.id}</p>
                    <p className="font-medium">{reg.type}</p>
                    <p className="text-sm text-gray-600">{reg.applicant} • {new Date(reg.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    reg.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    reg.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reg.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
