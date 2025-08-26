'use client'

import { useState } from 'react'
import { Menu, X, User } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="gov-header">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">E-Gov Portal</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-blue-200 transition-colors">Home</a>
            <a href="/services" className="hover:text-blue-200 transition-colors">Services</a>
            <a href="/support" className="hover:text-blue-200 transition-colors">Support</a>
            <a href="/about" className="hover:text-blue-200 transition-colors">About</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
              <User size={16} />
              <span>Sign In</span>
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-700 pt-4 pb-2">
            <nav className="flex flex-col space-y-2">
              <a href="/" className="py-2 hover:text-blue-200 transition-colors">Home</a>
              <a href="/services" className="py-2 hover:text-blue-200 transition-colors">Services</a>
              <a href="/support" className="py-2 hover:text-blue-200 transition-colors">Support</a>
              <a href="/about" className="py-2 hover:text-blue-200 transition-colors">About</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
