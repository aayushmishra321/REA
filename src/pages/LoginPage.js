"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { CloudArrowUpIcon, DocumentCheckIcon, SparklesIcon } from "@heroicons/react/24/outline"

export default function HomePage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0]
    handleFile(selectedFile)
  }

  const handleFile = async (file) => {
    if (file && (file.type === "application/pdf" || file.type.includes("word"))) {
      setFile(file)
      setIsLoading(true)
      // Simulate file processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsLoading(false)
      navigate("/results", { state: { fileName: file.name } })
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">AI-Powered</span>
              <span className="block gradient-text">Resume Analyzer</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get instant feedback on your resume. Our AI-powered tool analyzes your resume for ATS compatibility,
              formatting, and content optimization.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10 max-w-3xl mx-auto"
          >
            <div
              className={`upload-zone ${isDragging ? "dragging" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="sr-only"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInput}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="space-y-4 text-center">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <CloudArrowUpIcon className="h-12 w-12" />
                  </div>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <span className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                      Upload a file
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF or Word up to 10MB</p>
                </div>
              </label>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="score-card">
                <DocumentCheckIcon className="h-8 w-8 text-primary-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">ATS Compatible</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Ensure your resume passes through Applicant Tracking Systems.
                </p>
              </div>
              <div className="score-card">
                <SparklesIcon className="h-8 w-8 text-primary-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Analysis</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Get intelligent suggestions to improve your resume content.
                </p>
              </div>
              <div className="score-card">
                <DocumentCheckIcon className="h-8 w-8 text-primary-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Instant Results</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Receive detailed feedback and scoring within seconds.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
          >
            <div className="glass p-8 rounded-xl flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-900 dark:text-white">Analyzing your resume...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

