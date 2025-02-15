"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DocumentTextIcon, ChartBarIcon, AcademicCapIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const ServicesPage = () => {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const services = [
    {
      title: "Resume Analysis",
      description: "Get a comprehensive analysis of your resume with AI-powered insights and recommendations.",
      icon: DocumentTextIcon,
      category: "analysis",
    },
    {
      title: "Career Coaching",
      description: "One-on-one sessions with experienced career coaches to guide your professional journey.",
      icon: AcademicCapIcon,
      category: "coaching",
    },
    {
      title: "Interview Preparation",
      description: "Practice interviews with AI and receive feedback to improve your performance.",
      icon: ChartBarIcon,
      category: "preparation",
    },
    {
      title: "Job Market Analysis",
      description: "Get insights into job market trends and opportunities in your field.",
      icon: ChartBarIcon,
      category: "analysis",
    },
    {
      title: "LinkedIn Profile Optimization",
      description: "Enhance your LinkedIn profile to attract recruiters and opportunities.",
      icon: DocumentTextIcon,
      category: "optimization",
    },
    {
      title: "Salary Negotiation Training",
      description: "Learn effective strategies for negotiating your salary and benefits.",
      icon: AcademicCapIcon,
      category: "coaching",
    },
  ]

  const filteredServices = services.filter(
    (service) =>
      (filter === "all" || service.category === filter) &&
      service.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">Our</span>
            <span className="block text-primary-600">Services</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Comprehensive solutions to boost your career and land your dream job.
          </p>
        </motion.div>

        <div className="mt-10 flex justify-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Services</option>
            <option value="analysis">Analysis</option>
            <option value="coaching">Coaching</option>
            <option value="preparation">Preparation</option>
            <option value="optimization">Optimization</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-50 dark:bg-opacity-50"
            >
              <div className="p-6">
                <service.icon className="h-12 w-12 text-primary-600 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{service.title}</h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
