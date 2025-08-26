'use client'

import { useState, useRef } from 'react'
import { X, Upload, File } from 'lucide-react'

interface FileUploadProps {
  onClose: () => void
}

export function FileUpload({ onClose }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = async (files: File[]) => {
    setUploading(true)
    
    // Simulate upload process
    setTimeout(() => {
      setUploadedFiles(prev => [...prev, ...files])
      setUploading(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-96 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Upload Documents</h3>
          <button onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-gov-blue-500 bg-gov-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <h4 className="text-lg font-semibold mb-2">Drop files here or click to upload</h4>
            <p className="text-gray-600 mb-4">
              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary"
            >
              Select Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          
          {uploading && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-600">Processing documents with AI...</span>
              </div>
            </div>
          )}
          
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Uploaded Files:</h5>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <File size={16} />
                    <span className="flex-1 text-sm">{file.name}</span>
                    <span className="text-sm text-green-600">✓ Processed</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
