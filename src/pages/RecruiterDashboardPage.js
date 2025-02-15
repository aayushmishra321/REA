"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { CloudArrowUpIcon, DocumentDuplicateIcon, ArrowDownTrayIcon, StarIcon } from "@heroicons/react/24/outline"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const RecruiterDashboardPage = () => {
  const [files, setFiles] = useState([])
  const [rankings, setRankings] = useState([])
  const [selectedResumes, setSelectedResumes] = useState([])
  const [dashboardData, setDashboardData] = useState({
    skillsDistribution: [
      { name: "JavaScript", value: 30 },
      { name: "Python", value: 25 },
      { name: "Java", value: 20 },
      { name: "C++", value: 15 },
      { name: "Ruby", value: 10 },
    ],
    candidateScores: [
      { name: "90-100", count: 10 },
      { name: "80-89", count: 25 },
      { name: "70-79", count: 35 },
      { name: "60-69", count: 20 },
      { name: "<60", count: 10 },
    ],
  })

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
    // Simulate ATS score calculation and ranking
    const simulatedRankings = acceptedFiles.map((file, index) => ({
      name: file.name,
      score: Math.floor(Math.random() * 41) + 60, // Random score between 60 and 100
      keywords: ["JavaScript", "React", "Node.js"].slice(0, Math.floor(Math.random() * 3) + 1),
    }))
    setRankings(simulatedRankings.sort((a, b) => b.score - a.score))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const handleCompare = () => {
    // Implement comparison logic
    console.log("Comparing selected resumes:", selectedResumes)
  }

  const handleExport = () => {
    // Implement export logic
    console.log("Exporting rankings")
  }

  const handleShortlist = () => {
    // Implement shortlist logic
    console.log("Shortlisting selected candidates")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Recruiter Dashboard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Efficiently screen and rank resumes with AI-powered insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Bulk Resume Upload</h2>
          <div
            {...getRootProps()}
            className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
            }`}
          >
            <input {...getInputProps()} />
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Drag & drop resumes here, or click to select files
            </p>
          </div>
          {files.length > 0 && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {files.length} {files.length === 1 ? "file" : "files"} uploaded
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">ATS Rankings</h2>
          <ul className="space-y-2">
            {rankings.map((resume, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{resume.name}</span>
                <span className="font-semibold">{resume.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Skills Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.skillsDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dashboardData.skillsDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Candidate Scores</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.candidateScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-12">
        <button
          onClick={handleCompare}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
          Compare Selected
        </button>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Export Rankings
        </button>
        <button
          onClick={handleShortlist}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          <StarIcon className="h-5 w-5 mr-2" />
          Shortlist Candidates
        </button>
      </div>
    </div>
  )
}

export default RecruiterDashboardPage

