"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { DocumentArrowDownIcon, LightBulbIcon, ArrowPathIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const ResultsPage = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEnhancementModalOpen, setIsEnhancementModalOpen] = useState(false)
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

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {mockResults.overallScore}%
                    </span>
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
        )
      case "detailed":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Resume Composition</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Job Role Match</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockResults.jobRoleMatch}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="role" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="match" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      case "suggestions":
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Resume Analysis Results</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Here's a detailed breakdown of your resume's performance.
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="overview">Overview</option>
            <option value="detailed">Detailed Analysis</option>
            <option value="suggestions">Suggestions</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {["overview", "detailed", "suggestions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-gray-700"
                } px-3 py-2 font-medium text-sm rounded-md`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div ref={resultsRef}>{renderActiveTabContent()}</div>

      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
          Download PDF Report
        </button>
        <button
          onClick={() => setIsEnhancementModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          AI-Powered Enhancement
        </button>
        <button
          onClick={() => {
            /* Implement version comparison logic */
          }}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
          Compare Versions
        </button>
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

