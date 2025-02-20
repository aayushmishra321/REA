"use client"

import { useState, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { DocumentTextIcon, PencilIcon, ArrowDownTrayIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

// Import cover letter templates
import ModernTemplate from "./coverLetterTemplates/ModernTemplate"
import ClassicTemplate from "./coverLetterTemplates/ClassicTemplate"
import CreativeTemplate from "./coverLetterTemplates/CreativeTemplate"

const CoverLetterGenerator = () => {
  const [coverLetterData, setCoverLetterData] = useState({
    personalDetails: { name: "", email: "", phone: "", location: "" },
    recipientDetails: { name: "", company: "", address: "" },
    letterContent: {
      opening: "",
      body: "",
      closing: "",
    },
    jobDescription: "",
  })

  const [activeTemplate, setActiveTemplate] = useState("modern")
  const [theme, setTheme] = useState("light")
  const [view, setView] = useState("form")

  const coverLetterRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => coverLetterRef.current,
    onError: (error) => {
      console.error("Error printing:", error)
      alert("Failed to print. Please try again.")
    },
  })

  const handleInputChange = (section, field, value) => {
    setCoverLetterData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }))
  }

  const generateAICoverLetter = async () => {
    // This is a placeholder for AI-generated content
    // In a real application, you would call an AI API here
    const aiGeneratedContent = `Dear ${coverLetterData.recipientDetails.name},

I am writing to express my strong interest in the [Job Title] position at ${coverLetterData.recipientDetails.company}. With my background in [relevant field] and passion for [industry/company focus], I believe I would be a valuable addition to your team.

[AI-generated paragraph based on job description and personal details]

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to ${coverLetterData.recipientDetails.company}'s success.

Sincerely,
${coverLetterData.personalDetails.name}`

    setCoverLetterData((prevData) => ({
      ...prevData,
      letterContent: {
        opening: aiGeneratedContent.split("\n\n")[0],
        body: aiGeneratedContent.split("\n\n")[1],
        closing: aiGeneratedContent.split("\n\n")[2] + "\n\n" + aiGeneratedContent.split("\n\n")[3],
      },
    }))
  }

  const handleDownloadPDF = async () => {
    try {
      const content = coverLetterRef.current
      const canvas = await html2canvas(content, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 30

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save("cover_letter.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    }
  }

  const renderForm = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Details</h3>
        <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          {Object.keys(coverLetterData.personalDetails).map((field) => (
            <div key={field} className="sm:col-span-3">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                id={field}
                value={coverLetterData.personalDetails[field]}
                onChange={(e) => handleInputChange("personalDetails", field, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recipient Details</h3>
        <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          {Object.keys(coverLetterData.recipientDetails).map((field) => (
            <div key={field} className="sm:col-span-3">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                id={field}
                value={coverLetterData.recipientDetails[field]}
                onChange={(e) => handleInputChange("recipientDetails", field, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Job Description</h3>
        <div className="mt-2">
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows={4}
            value={coverLetterData.jobDescription}
            onChange={(e) => handleInputChange("jobDescription", "jobDescription", e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Paste the job description here..."
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Letter Content</h3>
        <div className="mt-2 space-y-4">
          {Object.keys(coverLetterData.letterContent).map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {field}
              </label>
              <textarea
                id={field}
                name={field}
                rows={field === "body" ? 6 : 3}
                value={coverLetterData.letterContent[field]}
                onChange={(e) => handleInputChange("letterContent", field, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={generateAICoverLetter}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate AI Cover Letter
        </button>
      </div>
    </div>
  )

  const renderPreview = () => {
    const TemplateComponent = {
      modern: ModernTemplate,
      classic: ClassicTemplate,
      creative: CreativeTemplate,
    }[activeTemplate]

    return (
      <div ref={coverLetterRef} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <TemplateComponent data={coverLetterData} theme={theme} />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Cover Letter Generator</h1>
      <div className="flex justify-between mb-4">
        <div>
          <button
            onClick={() => setView(view === "form" ? "preview" : "form")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {view === "form" ? (
              <>
                <DocumentTextIcon className="mr-2 h-5 w-5" />
                Preview
              </>
            ) : (
              <>
                <PencilIcon className="mr-2 h-5 w-5" />
                Edit
              </>
            )}
          </button>
        </div>
        <div className="flex space-x-4">
          <select
            value={activeTemplate}
            onChange={(e) => setActiveTemplate(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="modern">Modern Template</option>
            <option value="classic">Classic Template</option>
            <option value="creative">Creative Template</option>
          </select>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            {theme === "light" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </button>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ArrowDownTrayIcon className="mr-2 h-5 w-5" />
            Download PDF
          </button>
        </div>
      </div>
      <div className="mt-8">{view === "form" ? renderForm() : renderPreview()}</div>
    </div>
  )
}

export default CoverLetterGenerator

