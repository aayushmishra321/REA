"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDownTrayIcon, LightBulbIcon, ArrowPathIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline"

import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const ResultsPage = () => {
  const [isEnhancementModalOpen, setIsEnhancementModalOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)
  const resultsRef = useRef(null)

  const mockResults = {
    overallScore: 75,
    atsCompatibility: 80,
    contentQuality: 75,
    readabilityScore: 85,
    keywordOptimization: 70,
    jobMarketMatch: 78,
    grammarSpelling: 90,
    actionVerbUsage: 65,
    resumeLengthFormatting: 85,
    suggestions: [
      "Move Certifications to the Top for Better Visibility",
      "Add more quantifiable achievements in your Work Experience section",
      "Consider adding a Skills section to highlight your technical abilities",
    ],
    keywordAnalysis: [
      { keyword: "project management", count: 5 },
      { keyword: "agile", count: 3 },
      { keyword: "leadership", count: 4 },
      { keyword: "data analysis", count: 2 },
    ],
    jobRoleMatch: [
      { role: "Project Manager", match: 85 },
      { role: "Product Owner", match: 75 },
      { role: "Scrum Master", match: 70 },
    ],
  }

  const pieChartData = [
    { name: "ATS Compatibility", value: mockResults.atsCompatibility },
    { name: "Content Quality", value: mockResults.contentQuality },
    { name: "Keyword Optimization", value: mockResults.keywordOptimization },
    { name: "Action Verb Usage", value: mockResults.actionVerbUsage },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const handleDownloadPDF = async () => {
    const input = resultsRef.current
    const canvas = await html2canvas(input)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF()
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("resume_analysis_report.pdf")
  }

  const faqs = [
    {
      question: "What is ATS compatibility?",
      answer:
        "ATS compatibility refers to how well your resume can be parsed by Applicant Tracking Systems used by employers. A higher score means better chances of your resume being properly read and processed by these systems.",
    },
    {
      question: "How can I improve my resume's keyword optimization?",
      answer:
        "To improve keyword optimization, carefully review the job description and incorporate relevant industry terms and skills throughout your resume. Be sure to use these keywords naturally and in context.",
    },
    {
      question: "What factors contribute to the content quality score?",
      answer:
        "The content quality score considers factors such as the use of action verbs, quantifiable achievements, relevant skills, and overall clarity and conciseness of your resume content.",
    },
    {
      question: "How does AI-powered resume enhancement work?",
      answer:
        "AI-powered enhancement analyzes your resume against industry standards and job market trends. It then provides tailored suggestions to improve your resume's effectiveness, such as rephrasing sentences, reorganizing sections, or adding missing key information.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        Resume Analysis Results
            </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Here's a detailed breakdown of your resume's performance.
        </p>
      </motion.div>

      <div ref={resultsRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Overall Score</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray={`${mockResults.overallScore}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-600 dark:text-white">{mockResults.overallScore}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>ATS Compatibility:</span>
                <span className="font-semibold">{mockResults.atsCompatibility}%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Content Quality:</span>
                <span className="font-semibold">{mockResults.contentQuality}%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Readability:</span>
                <span className="font-semibold">{mockResults.readabilityScore}%</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Keyword Optimization:</span>
                <span className="font-semibold">{mockResults.keywordOptimization}%</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">AI-Powered Suggestions</h3>
          <ul className="space-y-2">
            {mockResults.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`h-5 w-5 transform ${openFAQ === index ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFAQ === index && <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      {isEnhancementModalOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    AI-Powered Resume Enhancement
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Here are some AI-generated suggestions to enhance your resume:
                    </p>
                    <ul className="mt-4 text-left list-disc list-inside">
                      <li>Use more action verbs to describe your achievements</li>
                      <li>Quantify your accomplishments with specific metrics</li>
                      <li>Tailor your skills section to match the job description</li>
                      <li>Improve your resume's ATS compatibility by using industry-standard keywords</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setIsEnhancementModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultsPage
