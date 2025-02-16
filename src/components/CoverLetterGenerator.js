"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DocumentTextIcon } from "@heroicons/react/24/solid"
import jsPDF from "jspdf";


const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    keyPoints: ["", "", ""],
  })
  const [generatedLetter, setGeneratedLetter] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleKeyPointChange = (index, value) => {
    const newKeyPoints = [...formData.keyPoints]
    newKeyPoints[index] = value
    setFormData({ ...formData, keyPoints: newKeyPoints })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate AI-generated cover letter
    const aiGeneratedLetter = `
Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.position} position at ${formData.company}. As a passionate and skilled professional, I believe I would be a valuable asset to your team.

${formData.keyPoints[0]}

${formData.keyPoints[1]}

${formData.keyPoints[2]}

I am excited about the opportunity to bring my unique skills and experiences to ${formData.company} and would welcome the chance to discuss how I can contribute to your team's success.

Thank you for your time and consideration.

Sincerely,
${formData.name}
${formData.email} | ${formData.phone}
    `
    setGeneratedLetter(aiGeneratedLetter)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">AI Cover Letter Generator</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Position Applied For
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Key Points (3 main qualifications or experiences)
                </label>
                {formData.keyPoints.map((point, index) => (
                  <textarea
                    key={index}
                    value={point}
                    onChange={(e) => handleKeyPointChange(index, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="2"
                    placeholder={`Key Point ${index + 1}`}
                    required
                  ></textarea>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Generate Cover Letter
              </button>
            </div>
          </form>
        </div>
      </div>
      {generatedLetter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Generated Cover Letter</h2>
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300">
              {generatedLetter}
            </pre>
            <div className="mt-4">
            <button
  onClick={() => {
    const doc = new jsPDF();

    // Add title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("AI-Generated Cover Letter", 20, 20);

    // Set normal font
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const textContent = generatedLetter || "No cover letter data available";

    // Wrap text for proper formatting
    const pageWidth = doc.internal.pageSize.getWidth() - 40;
    const splitText = doc.splitTextToSize(textContent, pageWidth);

    doc.text(splitText, 20, 40);

    // Save the PDF
    doc.save("AI_Generated_Cover_Letter.pdf");
  }}
  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
>
  Download Cover Letter
</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CoverLetterGenerator

