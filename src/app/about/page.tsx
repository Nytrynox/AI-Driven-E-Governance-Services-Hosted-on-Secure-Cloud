'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Shield, Users, Globe, Award, Clock, Heart, Target, Zap, CheckCircle } from 'lucide-react'

const mission = {
  title: "Our Mission",
  description: "To revolutionize government services by making them accessible, efficient, and user-friendly for every citizen. We believe that interacting with government should be as simple as online shopping.",
  icon: Target
}

const vision = {
  title: "Our Vision", 
  description: "A future where all government services are available 24/7, processed instantly, and accessible to everyone regardless of location, ability, or technical expertise.",
  icon: Globe
}

const values = [
  {
    title: "Security First",
    description: "We implement military-grade encryption and follow the highest security standards to protect your sensitive information.",
    icon: Shield
  },
  {
    title: "Citizen-Centered",
    description: "Every feature we build is designed with citizens in mind, prioritizing ease of use and accessibility.",
    icon: Users
  },
  {
    title: "Innovation",
    description: "We leverage cutting-edge AI and technology to streamline processes and reduce bureaucratic delays.",
    icon: Zap
  },
  {
    title: "Transparency",
    description: "Clear pricing, processing times, and status updates keep you informed every step of the way.",
    icon: CheckCircle
  }
]

const stats = [
  { label: "Citizens Served", value: "2.3M+", icon: Users },
  { label: "Applications Processed", value: "15M+", icon: Clock },
  { label: "Average Processing Time Reduced", value: "75%", icon: Zap },
  { label: "Customer Satisfaction", value: "98.2%", icon: Heart },
  { label: "Government Partnerships", value: "150+", icon: Globe },
  { label: "Security Certifications", value: "12", icon: Shield }
]

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Technology Officer",
    bio: "Former Google engineer with 15+ years in government tech solutions.",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Government Relations",
    bio: "Former state official with deep expertise in public service digitization.",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Dr. Aisha Patel",
    role: "Chief Security Officer",
    bio: "Cybersecurity expert with DoD clearance and 20+ years experience.",
    image: "/api/placeholder/150/150"
  },
  {
    name: "James Thompson",
    role: "Director of Accessibility",
    bio: "Ensuring our platform is accessible to all citizens, including those with disabilities.",
    image: "/api/placeholder/150/150"
  }
]

const timeline = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to modernize government services during the pandemic."
  },
  {
    year: "2021", 
    title: "First Government Partnership",
    description: "Launched pilot program with state DMV, reducing wait times by 60%."
  },
  {
    year: "2022",
    title: "National Expansion",
    description: "Expanded to 25 states, processing over 1 million applications."
  },
  {
    year: "2023",
    title: "AI Integration",
    description: "Launched AI-powered document processing, improving accuracy by 95%."
  },
  {
    year: "2024",
    title: "Security Certification",
    description: "Achieved FedRAMP High certification for federal government services."
  },
  {
    year: "2025",
    title: "Full Service Platform",
    description: "Comprehensive platform serving all major government services nationwide."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About Our Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're transforming how citizens interact with government services, making them faster, 
            more secure, and accessible to everyone. Our mission is to bridge the gap between 
            technology and public service.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <mission.icon className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">{mission.title}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{mission.description}</p>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <vision.icon className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">{vision.title}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{vision.description}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
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

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>
            {timeline.map((event, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}>
                <div className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 w-5/12 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-600 text-white text-sm font-bold py-1 px-3 rounded-full">
                      {event.year}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">GovTech Excellence Award 2024</h3>
              <p className="text-gray-600 text-sm">Recognized for outstanding innovation in digital government services</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cybersecurity Excellence 2024</h3>
              <p className="text-gray-600 text-sm">Award for maintaining the highest security standards</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Accessibility Leadership Award</h3>
              <p className="text-gray-600 text-sm">Recognized for making government services accessible to all citizens</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Better Government Services?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join millions of citizens who have already made their government interactions faster, 
            easier, and more secure with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/services" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Explore Services
            </a>
            <a href="/support" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
