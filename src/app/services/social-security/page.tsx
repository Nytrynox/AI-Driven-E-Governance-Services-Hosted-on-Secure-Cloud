'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Users, CreditCard, FileText, Calendar, Phone, Mail, Shield, AlertTriangle, CheckCircle, Calculator } from 'lucide-react'

const ssServices = [
  { 
    id: 'benefits', 
    name: 'Apply for Social Security Benefits', 
    description: 'Apply for retirement, disability, or survivor benefits',
    processing: '3-5 months',
    requirements: ['Social Security Number', 'Birth Certificate', 'Tax Records', 'Medical Records (if applying for disability)']
  },
  { 
    id: 'card', 
    name: 'Replace Social Security Card', 
    description: 'Get a replacement for lost, stolen, or damaged card',
    processing: '10-14 business days',
    requirements: ['Photo ID', 'Proof of US Citizenship or Immigration Status']
  },
  { 
    id: 'namechange', 
    name: 'Change Name on Record', 
    description: 'Update your name due to marriage, divorce, or legal name change',
    processing: '2-3 weeks',
    requirements: ['Court Order or Marriage/Divorce Certificate', 'Photo ID', 'Current Social Security Card']
  },
  { 
    id: 'disability', 
    name: 'Disability Claim', 
    description: 'Apply for Social Security Disability Insurance (SSDI)',
    processing: '3-6 months',
    requirements: ['Medical Records', 'Work History', 'Doctor Statements', 'Tax Records']
  },
  { 
    id: 'appeal', 
    name: 'Appeal a Decision', 
    description: 'Request reconsideration of a denied claim',
    processing: '60-90 days',
    requirements: ['Original Denial Letter', 'Additional Evidence', 'Appeal Form']
  },
  { 
    id: 'statement', 
    name: 'Get Earnings Statement', 
    description: 'View your Social Security earnings record and benefit estimates',
    processing: 'Immediate (online)',
    requirements: ['my Social Security account', 'Photo ID']
  }
]

const benefitTypes = [
  { type: 'Retirement Benefits', age: '62+', fullAge: '67', monthlyMax: '$4,873' },
  { type: 'Disability Benefits', age: 'Any', fullAge: 'N/A', monthlyMax: '$3,822' },
  { type: 'Survivor Benefits', age: 'Varies', fullAge: 'N/A', monthlyMax: '$4,873' },
  { type: 'Family Benefits', age: 'Varies', fullAge: 'N/A', monthlyMax: '$2,437' }
]

const recentApplications = [
  { id: 'SS-2025-001', type: 'Card Replacement', applicant: 'John Smith', status: 'Approved', date: '2025-08-20' },
  { id: 'SS-2025-002', type: 'Disability Claim', applicant: 'Mary Johnson', status: 'Under Review', date: '2025-08-15' },
  { id: 'SS-2025-003', type: 'Name Change', applicant: 'Sarah Wilson', status: 'Completed', date: '2025-08-10' }
]

export default function SocialSecurityPage() {
  const [selectedService, setSelectedService] = useState('')
  const [step, setStep] = useState(1)
  const [showCalculator, setShowCalculator] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    middleName: '',
    ssn: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
    citizenship: '',
    
    // Contact Information
    email: '',
    phone: '',
    alternatePhone: '',
    
    // Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Mailing Address (if different)
    mailingSame: true,
    mailingStreet: '',
    mailingCity: '',
    mailingState: '',
    mailingZip: '',
    
    // Parents Information (for new SS number)
    fatherName: '',
    fatherSSN: '',
    motherName: '',
    motherSSN: '',
    motherMaidenName: '',
    
    // Work Information
    currentlyWorking: false,
    employer: '',
    occupation: '',
    workStart: '',
    workEnd: '',
    monthlyIncome: '',
    
    // Medical Information (for disability)
    hasDisability: false,
    disabilityType: '',
    doctorName: '',
    doctorPhone: '',
    hospitalName: '',
    treatmentDate: '',
    
    // Marital Information
    maritalStatus: '',
    spouseName: '',
    spouseSSN: '',
    marriageDate: '',
    
    // Banking Information
    hasDirectDeposit: false,
    bankName: '',
    accountType: '',
    routingNumber: '',
    accountNumber: '',
    
    // Reason for application
    reason: '',
    previousApplication: false
  })

  const [calculatorData, setCalculatorData] = useState({
    currentAge: '',
    retirementAge: '67',
    currentIncome: '',
    yearsWorked: '',
    estimatedBenefits: 0
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleCalculatorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCalculatorData({
      ...calculatorData,
      [e.target.name]: e.target.value
    })
  }

  const calculateBenefits = () => {
    const income = parseFloat(calculatorData.currentIncome) || 0
    const years = parseFloat(calculatorData.yearsWorked) || 0
    const age = parseFloat(calculatorData.currentAge) || 0
    const retireAge = parseFloat(calculatorData.retirementAge) || 67
    
    // Simplified calculation (real calculation is much more complex)
    let monthlyBenefit = (income * 0.4) / 12 // Rough estimate of 40% replacement
    
    // Adjust for early/late retirement
    if (retireAge < 67) {
      monthlyBenefit *= 0.75 // Reduction for early retirement
    } else if (retireAge > 67) {
      monthlyBenefit *= 1.08 // Increase for delayed retirement
    }
    
    // Cap at maximum benefit
    monthlyBenefit = Math.min(monthlyBenefit, 4873)
    
    setCalculatorData({
      ...calculatorData,
      estimatedBenefits: Math.round(monthlyBenefit)
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
    alert(`Social Security application submitted successfully! Reference ID: SS-${Date.now()}`)
  }

  const getSelectedService = () => {
    return ssServices.find(service => service.id === selectedService)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Social Security Services</h1>
            <p className="text-xl opacity-90">
              Apply for benefits, replace your card, and manage your Social Security account
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {!selectedService ? (
          <div>
            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {ssServices.map((service) => (
                <div key={service.id} className="card p-6 hover:shadow-xl transition-shadow cursor-pointer"
                     onClick={() => setSelectedService(service.id)}>
                  <div className="flex items-center gap-3 mb-4">
                    {service.id === 'benefits' && <Users className="text-blue-600" size={28} />}
                    {service.id === 'card' && <CreditCard className="text-green-600" size={28} />}
                    {service.id === 'namechange' && <FileText className="text-purple-600" size={28} />}
                    {service.id === 'disability' && <Shield className="text-red-600" size={28} />}
                    {service.id === 'appeal' && <AlertTriangle className="text-orange-600" size={28} />}
                    {service.id === 'statement' && <FileText className="text-teal-600" size={28} />}
                    <h3 className="text-lg font-bold">{service.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><span className="font-semibold">Processing:</span> {service.processing}</p>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-sm font-semibold mb-2">Required Documents:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.requirements.slice(0, 2).map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                      {service.requirements.length > 2 && (
                        <li className="text-blue-600">• +{service.requirements.length - 2} more...</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits Calculator */}
            <div className="card p-6 mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Calculator className="text-blue-600" size={28} />
                  <h2 className="text-2xl font-bold">Social Security Benefits Calculator</h2>
                </div>
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="btn-primary"
                >
                  {showCalculator ? 'Hide Calculator' : 'Open Calculator'}
                </button>
              </div>

              {showCalculator && (
                <div className="border-t pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Current Age</label>
                      <input
                        type="number"
                        name="currentAge"
                        value={calculatorData.currentAge}
                        onChange={handleCalculatorChange}
                        placeholder="30"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Planned Retirement Age</label>
                      <select
                        name="retirementAge"
                        value={calculatorData.retirementAge}
                        onChange={handleCalculatorChange}
                        title="Select planned retirement age"
                        aria-label="Planned retirement age"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="62">62 (Early retirement)</option>
                        <option value="67">67 (Full retirement)</option>
                        <option value="70">70 (Delayed retirement)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Current Annual Income</label>
                      <input
                        type="number"
                        name="currentIncome"
                        value={calculatorData.currentIncome}
                        onChange={handleCalculatorChange}
                        placeholder="75000"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Years Worked</label>
                      <input
                        type="number"
                        name="yearsWorked"
                        value={calculatorData.yearsWorked}
                        onChange={handleCalculatorChange}
                        placeholder="35"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <button
                      onClick={calculateBenefits}
                      className="btn-primary"
                    >
                      Calculate Benefits
                    </button>
                    
                    {calculatorData.estimatedBenefits > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                        <p className="font-semibold text-blue-800">
                          Estimated Monthly Benefit: ${calculatorData.estimatedBenefits.toLocaleString()}
                        </p>
                        <p className="text-sm text-blue-600">
                          This is an estimate. Actual benefits may vary.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Benefit Types Overview */}
            <div className="card p-6 mb-12">
              <h2 className="text-2xl font-bold mb-6">Social Security Benefit Types</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Benefit Type</th>
                      <th className="text-left py-3 px-4">Eligible Age</th>
                      <th className="text-left py-3 px-4">Full Retirement Age</th>
                      <th className="text-left py-3 px-4">Maximum Monthly (2025)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benefitTypes.map((benefit, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{benefit.type}</td>
                        <td className="py-3 px-4">{benefit.age}</td>
                        <td className="py-3 px-4">{benefit.fullAge}</td>
                        <td className="py-3 px-4 font-semibold text-green-600">{benefit.monthlyMax}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Applications</h2>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-blue-600">#{app.id}</p>
                      <p className="font-medium">{app.type}</p>
                      <p className="text-sm text-gray-600">{app.applicant} • {new Date(app.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === 'Completed' || app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
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
                  <div className={`flex items-center gap-3 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'
                    }`}>1</div>
                    <span>Personal Info</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'
                    }`}>2</div>
                    <span>Contact & Address</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'
                    }`}>3</div>
                    <span>Additional Info</span>
                  </div>
                  <div className={`flex items-center gap-3 ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-300'
                    }`}>4</div>
                    <span>Review & Submit</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <button 
                    onClick={() => setSelectedService('')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
                  <Users className="text-blue-600" size={28} />
                  <div>
                    <h2 className="text-2xl font-bold">{getSelectedService()?.name}</h2>
                    <p className="text-gray-600">{getSelectedService()?.description}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
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
                            placeholder="Enter first name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            placeholder="Middle name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter last name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Social Security Number</label>
                          <input
                            type="text"
                            name="ssn"
                            value={formData.ssn}
                            onChange={handleInputChange}
                            placeholder="XXX-XX-XXXX"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <p className="text-sm text-gray-500 mt-1">Leave blank if applying for a new number</p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Gender</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Place of Birth *</label>
                          <input
                            type="text"
                            name="placeOfBirth"
                            value={formData.placeOfBirth}
                            onChange={handleInputChange}
                            placeholder="City, State or Country"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">US Citizenship Status *</label>
                          <select
                            name="citizenship"
                            value={formData.citizenship}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select Status</option>
                            <option value="us_citizen">US Citizen</option>
                            <option value="permanent_resident">Permanent Resident</option>
                            <option value="conditionally_admitted">Conditionally Admitted</option>
                            <option value="other">Other Qualified Alien</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contact & Address */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Contact Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            placeholder="(555) 123-4567"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold mt-8 mb-4">Current Address</h4>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2">Street Address *</label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          placeholder="123 Main Street"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">State *</label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Additional Information (varies by service) */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Additional Information</h3>
                      
                      {/* Common fields for all services */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Reason for Application *</label>
                        <select
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select Reason</option>
                          {selectedService === 'card' && (
                            <>
                              <option value="lost">Lost card</option>
                              <option value="stolen">Stolen card</option>
                              <option value="damaged">Damaged card</option>
                              <option value="never_received">Never received card</option>
                            </>
                          )}
                          {selectedService === 'benefits' && (
                            <>
                              <option value="retirement">Retirement benefits</option>
                              <option value="disability">Disability benefits</option>
                              <option value="survivor">Survivor benefits</option>
                              <option value="family">Family benefits</option>
                            </>
                          )}
                          {selectedService === 'namechange' && (
                            <>
                              <option value="marriage">Marriage</option>
                              <option value="divorce">Divorce</option>
                              <option value="court_order">Court order</option>
                              <option value="other_legal">Other legal name change</option>
                            </>
                          )}
                          {selectedService === 'disability' && (
                            <>
                              <option value="unable_work">Unable to work due to disability</option>
                              <option value="blind">Blindness</option>
                              <option value="severe_disability">Severe disability</option>
                            </>
                          )}
                        </select>
                      </div>
                      
                      {/* Marital Status */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Marital Status</label>
                          <select
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                            <option value="separated">Separated</option>
                          </select>
                        </div>
                        
                        {formData.maritalStatus === 'married' && (
                          <div>
                            <label className="block text-sm font-semibold mb-2">Spouse Name</label>
                            <input
                              type="text"
                              name="spouseName"
                              value={formData.spouseName}
                              onChange={handleInputChange}
                              placeholder="Spouse full name"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Work Information for benefits/disability */}
                      {(selectedService === 'benefits' || selectedService === 'disability') && (
                        <div className="space-y-4">
                          <h4 className="font-semibold">Work Information</h4>
                          
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              name="currentlyWorking"
                              checked={formData.currentlyWorking}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-blue-600"
                            />
                            <span>Currently working</span>
                          </label>
                          
                          {formData.currentlyWorking && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold mb-2">Current Employer</label>
                                <input
                                  type="text"
                                  name="employer"
                                  value={formData.employer}
                                  onChange={handleInputChange}
                                  placeholder="Company name"
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold mb-2">Monthly Income</label>
                                <input
                                  type="number"
                                  name="monthlyIncome"
                                  value={formData.monthlyIncome}
                                  onChange={handleInputChange}
                                  placeholder="5000"
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Banking Information for benefits */}
                      {selectedService === 'benefits' && (
                        <div className="space-y-4">
                          <h4 className="font-semibold">Direct Deposit Information (Optional)</h4>
                          
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              name="hasDirectDeposit"
                              checked={formData.hasDirectDeposit}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-blue-600"
                            />
                            <span>Set up direct deposit</span>
                          </label>
                          
                          {formData.hasDirectDeposit && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold mb-2">Bank Name</label>
                                <input
                                  type="text"
                                  name="bankName"
                                  value={formData.bankName}
                                  onChange={handleInputChange}
                                  placeholder="Bank name"
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold mb-2">Account Type</label>
                                <select
                                  name="accountType"
                                  value={formData.accountType}
                                  onChange={handleInputChange}
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="">Select Type</option>
                                  <option value="checking">Checking</option>
                                  <option value="savings">Savings</option>
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Review and Submit */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold border-b pb-2">Review Your Application</h3>
                      
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Personal Information</h4>
                            <div className="space-y-2 text-sm">
                              <p><span className="font-medium">Name:</span> {formData.firstName} {formData.middleName} {formData.lastName}</p>
                              <p><span className="font-medium">Date of Birth:</span> {formData.dateOfBirth}</p>
                              <p><span className="font-medium">SSN:</span> {formData.ssn || 'Not provided'}</p>
                              <p><span className="font-medium">Email:</span> {formData.email}</p>
                              <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Application Details</h4>
                            <div className="space-y-2 text-sm">
                              <p><span className="font-medium">Service:</span> {getSelectedService()?.name}</p>
                              <p><span className="font-medium">Reason:</span> {formData.reason}</p>
                              <p><span className="font-medium">Processing Time:</span> {getSelectedService()?.processing}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="text-blue-600 mt-1" size={20} />
                          <div className="text-sm">
                            <p className="font-medium text-blue-800 mb-1">Important Information</p>
                            <ul className="text-blue-700 space-y-1">
                              <li>• All information provided must be accurate and truthful</li>
                              <li>• You may need to provide supporting documents</li>
                              <li>• Processing times may vary based on current workload</li>
                              <li>• You will receive email updates on your application status</li>
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
                      {step < 4 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="btn-primary px-6 py-2"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn-primary px-6 py-2 flex items-center gap-2"
                        >
                          <CheckCircle size={20} />
                          Submit Application
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
