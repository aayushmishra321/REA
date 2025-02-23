"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { CloudArrowUpIcon, FunnelIcon, ArrowsUpDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const RecruiterDashboardPage = () => {
  const [files, setFiles] = useState([])
  const [rankings, setRankings] = useState([])
  const [filterCriteria, setFilterCriteria] = useState("all")
  const [sortCriteria, setSortCriteria] = useState("score")
  const [searchTerm, setSearchTerm] = useState("")
  const [dashboardData, setDashboardData] = useState({
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
      id: index,
      candidateName: `Candidate ${index + 1}`,
      fileName: file.name,
      score: Math.floor(Math.random() * 41) + 60,
      experience: Math.floor(Math.random() * 10) + 1,
      skills: ["JavaScript", "React", "Node.js"].slice(0, Math.floor(Math.random() * 3) + 1).join(", "),
    }))
    setRankings(simulatedRankings.sort((a, b) => b.score - a.score))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const filteredAndSortedRankings = rankings
    .filter((resume) => {
      if (filterCriteria === "all") return true
      if (filterCriteria === "highScore") return resume.score >= 80
      if (filterCriteria === "experienced") return resume.experience >= 5
      return true
    })
    .filter(
      (resume) =>
        resume.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.candidateName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortCriteria === "score") return b.score - a.score
      if (sortCriteria === "experience") return b.experience - a.experience
      return 0
    })

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        Recruiter Dashboard
            </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Efficiently screen and rank resumes with AI-powered insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 mb-12">
        {/* Bulk Resume Upload Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Bulk Resume Upload</h2>
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

        {/* Candidate Scores Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Candidate Scores</h2>
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

        {/* ATS Rankings Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">ATS Rankings</h2>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex items-center">
              <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="all">All Resumes</option>
                <option value="highScore">High Scores (80+)</option>
                <option value="experienced">Experienced (5+ years)</option>
              </select>
            </div>
            <div className="flex items-center">
              <ArrowsUpDownIcon className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="score">Sort by Score</option>
                <option value="experience">Sort by Experience</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                type="text"
                placeholder="Search resumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Table View for ATS Rankings */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ATS Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Top Skills
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedRankings.map((resume) => (
                  <tr key={resume.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {resume.candidateName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resume.fileName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{resume.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resume.experience} years</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resume.skills}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterDashboardPage
