'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FileText, Download, Upload, CheckCircle, AlertCircle, Search, Filter } from 'lucide-react'

const documentTypes = [
  { id: 'birth', name: 'Birth Certificate', price: '$25', processing: '3-5 business days' },
  { id: 'death', name: 'Death Certificate', price: '$25', processing: '3-5 business days' },
  { id: 'marriage', name: 'Marriage Certificate', price: '$30', processing: '2-3 business days' },
  { id: 'divorce', name: 'Divorce Certificate', price: '$30', processing: '5-7 business days' },
  { id: 'passport', name: 'Passport Application', price: '$165', processing: '6-11 weeks' },
  { id: 'ssn', name: 'Social Security Card Replacement', price: 'Free', processing: '10-14 business days' },
  { id: 'driver', name: 'Driver License/ID', price: '$45', processing: '7-10 business days' },
  { id: 'property', name: 'Property Deed', price: '$15', processing: '1-2 business days' }
]

const recentApplications = [
  { id: '12345', type: 'Birth Certificate', status: 'Processing', date: '2025-08-20', applicant: 'John Smith' },
  { id: '12346', type: 'Marriage Certificate', status: 'Approved', date: '2025-08-18', applicant: 'Jane Doe' },
  { id: '12347', type: 'Passport Application', status: 'Under Review', date: '2025-08-15', applicant: 'Mike Johnson' },
  { id: '12348', type: 'Driver License', status: 'Completed', date: '2025-08-12', applicant: 'Sarah Wilson' }
]

export default function DocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showUpload, setShowUpload] = useState(false)
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Application submitted for ${documentTypes.find(doc => doc.id === selectedDocument)?.name}`)
  }

  const filteredApplications = recentApplications.filter(app => {
    const matchesSearch = app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Document Processing Services</h1>
            <p className="text-xl opacity-90">
              Secure, AI-powered document verification and processing for all government documents
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Document Application Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-blue-600" size={28} />
                <h2 className="text-2xl font-bold">Apply for Documents</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Document Type *</label>
                  <select 
                    value={selectedDocument}
                    onChange={(e) => setSelectedDocument(e.target.value)}
                    title="Select document type"
                    aria-label="Select document type"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Document Type</option>
                    {documentTypes.map(doc => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} - {doc.price}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedDocument && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={applicationData.firstName}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={applicationData.lastName}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={applicationData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">SSN (Last 4 digits)</label>
                        <input
                          type="text"
                          name="ssn"
                          maxLength={4}
                          value={applicationData.ssn}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={applicationData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={applicationData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={applicationData.address}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={applicationData.city}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">State *</label>
                        <select
                          name="state"
                          value={applicationData.state}
                          onChange={handleInputChange}
                          title="Select state"
                          aria-label="Select state"
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
                          value={applicationData.zipCode}
                          onChange={handleInputChange}
                          title="Enter ZIP code"
                          aria-label="ZIP code"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="btn-primary px-8 py-3 flex items-center gap-2"
                      >
                        <CheckCircle size={20} />
                        Submit Application
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setShowUpload(true)}
                        className="btn-secondary px-8 py-3 flex items-center gap-2"
                      >
                        <Upload size={20} />
                        Upload Supporting Documents
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>

            {/* Application Status Tracking */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Track Your Applications</h3>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search by application ID, document type, or name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-gray-600" />
                  <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    title="Filter by status"
                    aria-label="Filter applications by status"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="processing">Processing</option>
                    <option value="approved">Approved</option>
                    <option value="completed">Completed</option>
                    <option value="under review">Under Review</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filteredApplications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-blue-600">#{app.id}</span>
                          <span className="font-medium">{app.type}</span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><span className="font-medium">Applicant:</span> {app.applicant}</p>
                          <p><span className="font-medium">Applied:</span> {new Date(app.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 md:mt-0 flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          app.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          app.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {app.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Types */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Available Documents</h3>
              <div className="space-y-3">
                {documentTypes.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-semibold">{doc.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Cost:</span> {doc.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Processing:</span> {doc.processing}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Help & Info */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold">Requirements</h4>
                    <p className="text-sm text-gray-600">Check document-specific requirements before applying</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="text-green-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold">Forms</h4>
                    <p className="text-sm text-gray-600">Download printable application forms</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Customer Support</p>
                <p className="text-sm font-medium">📞 1-800-GOV-HELP</p>
                <p className="text-sm font-medium">✉️ support@egovernance.gov</p>
                <p className="text-sm text-gray-600">Mon-Fri: 8AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
