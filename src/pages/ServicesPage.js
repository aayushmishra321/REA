"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DocumentTextIcon, ChartBarIcon, AcademicCapIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

const cardVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
}

const ServicesPage = () => {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const services = [
    {
      title: "Resume Analysis",
      description: "Get a comprehensive analysis of your resume with AI-powered insights and recommendations.",
      icon: DocumentTextIcon,
      category: "analysis",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Career Coaching",
      description: "One-on-one sessions with experienced career coaches to guide your professional journey.",
      icon: AcademicCapIcon,
      category: "coaching",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Interview Preparation",
      description: "Practice interviews with AI and receive feedback to improve your performance.",
      icon: ChartBarIcon,
      category: "preparation",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Job Market Analysis",
      description: "Get insights into job market trends and opportunities in your field.",
      icon: ChartBarIcon,
      category: "analysis",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "LinkedIn Profile Optimization",
      description: "Enhance your LinkedIn profile to attract recruiters and opportunities.",
      icon: DocumentTextIcon,
      category: "optimization",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Salary Negotiation Training",
      description: "Learn effective strategies for negotiating your salary and benefits.",
      icon: AcademicCapIcon,
      category: "coaching",
      gradient: "from-rose-500 to-pink-500",
    },
  ]

  const filteredServices = services.filter(
    (service) =>
      (filter === "all" || service.category === filter) &&
      service.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-16">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions to boost your career and land your dream job.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full sm:w-80 rounded-xl bg-white/80 light:bg-gray-800/80 border border-gray-400 dark:border-gray-700/50 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
            <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="px-5 py-3 rounded-xl bg-white text-gray-900 border border-gray-400 focus:ring-2 focus:ring-purple-500 transition-all duration-300 w-52"
  >
    <option value="all">All Services</option>
    <option value="analysis">Analysis</option>
    <option value="coaching">Coaching</option>
    <option value="preparation">Preparation</option>
    <option value="optimization">Optimization</option>
  </select>
          </motion.div>
          

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                custom={index}
               
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" />
                <div className="relative bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 h-full transform transition-all duration-300 hover:shadow-2xl">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} mb-6`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose ResumeAI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "AI-Powered Analysis",
                  description: "Cutting-edge AI technology for accurate and insightful resume analysis.",
                },
                {
                  title: "Expert Career Advice",
                  description: "Guidance from experienced professionals in various industries.",
                },
                {
                  title: "Personalized Approach",
                  description: "Tailored solutions to meet your unique career goals and challenges.",
                },
                {
                  title: "Continuous Support",
                  description: "Ongoing assistance throughout your job search and career journey.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ServicesPage

