'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Calculator, FileText, Calendar, DollarSign, Download, Upload, AlertCircle, CheckCircle } from 'lucide-react'

const taxForms = [
  { id: '1040', name: 'Form 1040 - Individual Income Tax Return', category: 'Individual', due: 'April 15, 2026' },
  { id: '1040ez', name: 'Form 1040EZ - Simple Tax Return', category: 'Individual', due: 'April 15, 2026' },
  { id: '1065', name: 'Form 1065 - Partnership Return', category: 'Business', due: 'March 15, 2026' },
  { id: '1120', name: 'Form 1120 - Corporate Income Tax Return', category: 'Business', due: 'April 15, 2026' },
  { id: 'schedule-c', name: 'Schedule C - Business Income/Loss', category: 'Business', due: 'April 15, 2026' },
  { id: 'w-2', name: 'Form W-2 - Wage and Tax Statement', category: 'Employment', due: 'January 31, 2026' }
]

const taxCalculatorData = {
  standardDeduction: {
    single: 14600,
    marriedJoint: 29200,
    marriedSeparate: 14600,
    headOfHousehold: 21900
  },
  taxBrackets: [
    { rate: 0.10, min: 0, max: 11000 },
    { rate: 0.12, min: 11001, max: 44725 },
    { rate: 0.22, min: 44726, max: 95375 },
    { rate: 0.24, min: 95376, max: 182050 },
    { rate: 0.32, min: 182051, max: 231250 },
    { rate: 0.35, min: 231251, max: 578125 },
    { rate: 0.37, min: 578126, max: Infinity }
  ]
}

const refundStatus = [
  { refundId: 'R2025001234', taxpayer: 'John Smith', amount: '$2,450', status: 'Processed', expectedDate: '2025-09-15' },
  { refundId: 'R2025001235', taxpayer: 'Jane Doe', amount: '$1,825', status: 'In Process', expectedDate: '2025-09-20' },
  { refundId: 'R2025001236', taxpayer: 'Mike Johnson', amount: '$3,100', status: 'Approved', expectedDate: '2025-09-10' }
]

export default function TaxServicesPage() {
  const [activeTab, setActiveTab] = useState('calculator')
  const [taxData, setTaxData] = useState({
    income: '',
    filingStatus: 'single',
    deductions: '',
    refundId: '',
    ssn: ''
  })
  const [calculatedTax, setCalculatedTax] = useState<number | null>(null)
  const [selectedForm, setSelectedForm] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTaxData({
      ...taxData,
      [e.target.name]: e.target.value
    })
  }

  const calculateTax = () => {
    const income = parseFloat(taxData.income)
    const standardDed = taxCalculatorData.standardDeduction[taxData.filingStatus as keyof typeof taxCalculatorData.standardDeduction]
    const taxableIncome = Math.max(0, income - standardDed)
    
    let tax = 0
    let remainingIncome = taxableIncome
    
    for (const bracket of taxCalculatorData.taxBrackets) {
      if (remainingIncome <= 0) break
      
      const taxableAtThisBracket = Math.min(remainingIncome, bracket.max - bracket.min + 1)
      tax += taxableAtThisBracket * bracket.rate
      remainingIncome -= taxableAtThisBracket
    }
    
    setCalculatedTax(Math.round(tax))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Tax return filed successfully! You will receive a confirmation email.')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Tax Services</h1>
            <p className="text-xl opacity-90">
              File taxes, track refunds, and access tax calculators - all in one secure platform
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'calculator' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
            }`}
          >
            <Calculator className="inline mr-2" size={20} />
            Tax Calculator
          </button>
          <button 
            onClick={() => setActiveTab('file')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'file' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
            }`}
          >
            <FileText className="inline mr-2" size={20} />
            File Taxes
          </button>
          <button 
            onClick={() => setActiveTab('refund')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'refund' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
            }`}
          >
            <DollarSign className="inline mr-2" size={20} />
            Track Refund
          </button>
          <button 
            onClick={() => setActiveTab('forms')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'forms' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
            }`}
          >
            <Download className="inline mr-2" size={20} />
            Tax Forms
          </button>
        </div>

        {/* Tax Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="text-green-600" />
                Tax Calculator 2025
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Annual Income</label>
                  <input
                    type="number"
                    name="income"
                    value={taxData.income}
                    onChange={handleInputChange}
                    placeholder="Enter your annual income"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Filing Status</label>
                  <select
                    name="filingStatus"
                    value={taxData.filingStatus}
                    onChange={handleInputChange}
                    title="Select filing status"
                    aria-label="Filing status"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="single">Single</option>
                    <option value="marriedJoint">Married Filing Jointly</option>
                    <option value="marriedSeparate">Married Filing Separately</option>
                    <option value="headOfHousehold">Head of Household</option>
                  </select>
                </div>
                
                <button 
                  onClick={calculateTax}
                  disabled={!taxData.income}
                  className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Tax
                </button>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-6">Tax Calculation Results</h3>
              
              {calculatedTax !== null && taxData.income ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span>Annual Income:</span>
                      <span className="font-semibold">${parseFloat(taxData.income).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Standard Deduction:</span>
                      <span className="font-semibold">
                        ${taxCalculatorData.standardDeduction[taxData.filingStatus as keyof typeof taxCalculatorData.standardDeduction].toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Taxable Income:</span>
                      <span className="font-semibold">
                        ${Math.max(0, parseFloat(taxData.income) - taxCalculatorData.standardDeduction[taxData.filingStatus as keyof typeof taxCalculatorData.standardDeduction]).toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-green-300 pt-2 mt-2">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Estimated Federal Tax:</span>
                        <span className="font-bold text-green-700">${calculatedTax.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">* This is an estimate for federal taxes only.</p>
                    <p>* State taxes, FICA taxes, and other deductions not included.</p>
                    <p>* Consult a tax professional for comprehensive tax planning.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Enter your income to calculate estimated taxes</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* File Taxes Tab */}
        {activeTab === 'file' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 card p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FileText className="text-green-600" />
                File Your Tax Return
              </h2>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Select Tax Form</label>
                  <select
                    value={selectedForm}
                    onChange={(e) => setSelectedForm(e.target.value)}
                    title="Select tax form"
                    aria-label="Select tax form"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Choose a form</option>
                    {taxForms.map(form => (
                      <option key={form.id} value={form.id}>
                        {form.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedForm && (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="text-blue-600 mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold text-blue-800">Required Documents</h4>
                          <ul className="text-sm text-blue-700 mt-2 space-y-1">
                            <li>• W-2 forms from all employers</li>
                            <li>• 1099 forms (interest, dividends, etc.)</li>
                            <li>• Social Security cards for all family members</li>
                            <li>• Prior year tax return (if available)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Taxpayer Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Social Security Number"
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <input
                          type="date"
                          placeholder="Date of Birth"
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                        <h4 className="text-lg font-semibold mb-2">Upload Tax Documents</h4>
                        <p className="text-gray-600 mb-4">Drag and drop your W-2s, 1099s, and other tax documents</p>
                        <button type="button" className="btn-secondary">
                          Select Files
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button type="submit" className="btn-primary px-8 py-3 flex items-center gap-2">
                        <CheckCircle size={20} />
                        File Tax Return
                      </button>
                      <button type="button" className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg">
                        Save Draft
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
            
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Important Dates</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-red-500" size={20} />
                    <div>
                      <p className="font-semibold">April 15, 2026</p>
                      <p className="text-sm text-gray-600">Individual Tax Filing Deadline</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-orange-500" size={20} />
                    <div>
                      <p className="font-semibold">March 15, 2026</p>
                      <p className="text-sm text-gray-600">Partnership Tax Filing Deadline</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Get Help</h3>
                <div className="space-y-3 text-sm">
                  <p>📞 <strong>Tax Help Line:</strong> 1-800-TAX-HELP</p>
                  <p>💬 <strong>Live Chat:</strong> Available 24/7</p>
                  <p>📧 <strong>Email Support:</strong> taxes@egovernance.gov</p>
                  <p className="text-gray-600 pt-2">Free tax preparation assistance available for qualifying taxpayers</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Refund Tracking Tab */}
        {activeTab === 'refund' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <DollarSign className="text-green-600" />
                Track Your Refund
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Refund ID or SSN</label>
                  <input
                    type="text"
                    name="refundId"
                    value={taxData.refundId}
                    onChange={handleInputChange}
                    placeholder="Enter refund ID or SSN"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <button className="w-full btn-primary py-3">
                  Check Refund Status
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Recent Refunds</h3>
                <div className="space-y-3">
                  {refundStatus.map((refund) => (
                    <div key={refund.refundId} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-green-600">#{refund.refundId}</p>
                          <p className="text-sm text-gray-600">{refund.taxpayer}</p>
                          <p className="font-semibold text-lg">{refund.amount}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          refund.status === 'Processed' ? 'bg-green-100 text-green-800' :
                          refund.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {refund.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Expected: {new Date(refund.expectedDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-6">Refund Information</h3>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Refund Processing Times</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• E-file with direct deposit: 1-3 weeks</li>
                    <li>• E-file with check: 3-4 weeks</li>
                    <li>• Paper filing: 6-8 weeks</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Direct Deposit Benefits</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Faster refund processing</li>
                    <li>• More secure than checks</li>
                    <li>• No risk of lost mail</li>
                    <li>• Automatic deposit to your account</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Refunds are processed in the order received</li>
                    <li>• Additional processing time may be needed for complex returns</li>
                    <li>• Contact us if your refund is significantly delayed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tax Forms Tab */}
        {activeTab === 'forms' && (
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Download className="text-green-600" />
              Tax Forms & Documents
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {taxForms.map((form) => (
                <div key={form.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <FileText className="text-green-600 mt-1" size={24} />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      form.category === 'Individual' ? 'bg-blue-100 text-blue-800' :
                      form.category === 'Business' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {form.category}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{form.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">Due: {form.due}</p>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 btn-primary py-2 text-sm">
                      Download PDF
                    </button>
                    <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 text-sm rounded-lg">
                      Instructions
                    </button>
                  </div>
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
