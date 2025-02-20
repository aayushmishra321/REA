"use client"

import { useState, useRef, useEffect } from "react"
import { useReactToPrint } from "react-to-print"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { saveAs } from "file-saver"
import { Document as DocxDocument, Packer, Paragraph, TextRun } from "docx"
import { LinkedinFilled } from "@ant-design/icons"
import { ArrowDownTrayIcon, SunIcon, MoonIcon, ClipboardIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { debounce } from "lodash"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

// Import resume templates
import ClassicTemplate from "./resumeTemplates/ClassicTemplate"
import MinimalistTemplate from "./resumeTemplates/MinimalistTemplate"
import CreativeTemplate from "./resumeTemplates/CreativeTemplate"
import CorporateTemplate from "./resumeTemplates/CorporateTemplate"
import ModernTemplate from "./resumeTemplates/ModernTemplate"
import ResumeNavigation from "./ResumeNavigation"
import ResumeSectionContent from "./ResumeSectionContent"

const templates = {
  classic: ClassicTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
  corporate: CorporateTemplate,
  modern: ModernTemplate,
}

const colorSchemes = {
  corporateBlue: {
    primary: "#0047AB",
    secondary: "#6495ED",
    text: "#333333",
    background: "#FFFFFF",
  },
  modernBlack: {
    primary: "#000000",
    secondary: "#333333",
    text: "#FFFFFF",
    background: "#1A1A1A",
  },
  elegantGreen: {
    primary: "#2E8B57",
    secondary: "#3CB371",
    text: "#333333",
    background: "#F0FFF0",
  },
  vibrantOrange: {
    primary: "#FF4500",
    secondary: "#FF7F50",
    text: "#333333",
    background: "#FFFAF0",
  },
  softPurple: {
    primary: "#8A2BE2",
    secondary: "#9370DB",
    text: "#333333",
    background: "#F8F4FF",
  },
}

const fonts = ["Montserrat", "Roboto", "Lato", "Open Sans", "Raleway"]

const AIResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalDetails: { name: "", email: "", phone: "", location: "", linkedin: "", github: "" },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    volunteering: [],
    awards: [],
    publications: [],
  })
  const [activeTemplate, setActiveTemplate] = useState("classic")
  const [colorScheme, setColorScheme] = useState("corporateBlue")
  const [font, setFont] = useState("Montserrat")
  const [darkMode, setDarkMode] = useState(false)
  const [showSections, setShowSections] = useState({
    certifications: true,
    volunteering: true,
    awards: true,
    publications: true,
  })
  const [layout, setLayout] = useState("single")
  const [jobDescription, setJobDescription] = useState("")
  const [atsScore, setAtsScore] = useState(0)
  const [missingKeywords, setMissingKeywords] = useState([])
  const [badPractices, setBadPractices] = useState([])
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [savedResumes, setSavedResumes] = useState([])
  const [shareableLink, setShareableLink] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [skillSuggestions, setSkillSuggestions] = useState([])
  const [notification, setNotification] = useState({ message: "", type: "" })
  const [activeSection, setActiveSection] = useState("Professional Summary")

  const resumeRef = useRef()

  useEffect(() => {
    // Load saved resumes from local storage
    const savedResumesData = localStorage.getItem("savedResumes")
    if (savedResumesData) {
      setSavedResumes(JSON.parse(savedResumesData))
    }
  }, [])

  useEffect(() => {
    // Save resumes to local storage whenever savedResumes changes
    localStorage.setItem("savedResumes", JSON.stringify(savedResumes))
  }, [savedResumes])

  const handleInputChange = (section, index, field, value) => {
    setResumeData((prevData) => {
      const newData = { ...prevData }
      if (Array.isArray(newData[section])) {
        newData[section][index][field] = value
      } else {
        newData[section][field] = value
      }
      return newData
    })
  }

  const handleAddItem = (section) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: [
        ...prevData[section],
        section === "experience"
          ? { company: "", position: "", startDate: "", endDate: "", description: "" }
          : section === "education"
            ? { institution: "", degree: "", graduationDate: "" }
            : section === "skills"
              ? { name: "", level: 3 }
              : section === "volunteering"
                ? { organization: "", role: "", duration: "" }
                : section === "awards"
                  ? { name: "", issuer: "", year: "" }
                  : section === "publications"
                    ? { title: "", publisher: "", year: "" }
                    : { name: "", description: "" },
      ],
    }))
  }

  const handleRemoveItem = (section, index) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }))
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result
    const section = source.droppableId

    setResumeData((prevData) => {
      const newData = { ...prevData }
      const [reorderedItem] = newData[section].splice(source.index, 1)
      newData[section].splice(destination.index, 0, reorderedItem)
      return newData
    })
  }

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  })

  const handleExportPDF = async () => {
    try {
      const canvas = await html2canvas(resumeRef.current)
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF()
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("resume.pdf")
      showNotification("Resume exported as PDF successfully", "success")
    } catch (error) {
      console.error("Error exporting PDF:", error)
      showNotification("Failed to export resume as PDF", "error")
    }
  }

  const handleExportDOCX = () => {
    try {
      const doc = new DocxDocument({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun(resumeData.personalDetails.name),
                  new TextRun(resumeData.personalDetails.email),
                  new TextRun(resumeData.personalDetails.phone),
                ],
              }),
              new Paragraph({
                text: "Professional Summary",
                heading: 1,
              }),
              new Paragraph({
                text: resumeData.summary,
              }),
              new Paragraph({
                text: "Experience",
                heading: 1,
              }),
              ...resumeData.experience.map(
                (exp) =>
                  new Paragraph({
                    children: [
                      new TextRun(`${exp.position} at ${exp.company}`),
                      new TextRun(`${exp.startDate} - ${exp.endDate}`),
                      new TextRun(exp.description),
                    ],
                  }),
              ),
              new Paragraph({
                text: "Education",
                heading: 1,
              }),
              ...resumeData.education.map(
                (edu) =>
                  new Paragraph({
                    children: [new TextRun(`${edu.degree}`), new TextRun(`${edu.institution}, ${edu.graduationDate}`)],
                  }),
              ),
              new Paragraph({
                text: "Skills",
                heading: 1,
              }),
              new Paragraph({
                children: resumeData.skills.map((skill) => new TextRun(`${skill.name}, `)),
              }),
              new Paragraph({
                text: "Certifications",
                heading: 1,
              }),
              ...resumeData.certifications.map((cert) => new Paragraph({ text: cert.name })),
              new Paragraph({
                text: "Volunteering",
                heading: 1,
              }),
              ...resumeData.volunteering.map(
                (vol) =>
                  new Paragraph({
                    children: [new TextRun(`${vol.role} at ${vol.organization}`), new TextRun(vol.duration)],
                  }),
              ),
              new Paragraph({
                text: "Awards",
                heading: 1,
              }),
              ...resumeData.awards.map(
                (award) =>
                  new Paragraph({
                    children: [new TextRun(`${award.name}`), new TextRun(`${award.issuer}, ${award.year}`)],
                  }),
              ),
              new Paragraph({
                text: "Publications",
                heading: 1,
              }),
              ...resumeData.publications.map(
                (pub) =>
                  new Paragraph({
                    children: [new TextRun(`${pub.title}`), new TextRun(`${pub.publisher}, ${pub.year}`)],
                  }),
              ),
            ],
          },
        ],
      })

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "resume.docx")
        showNotification("Resume exported as DOCX successfully", "success")
      })
    } catch (error) {
      console.error("Error exporting DOCX:", error)
      showNotification("Failed to export resume as DOCX", "error")
    }
  }

  const handleExportPNG = () => {
    try {
      html2canvas(resumeRef.current).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, "resume.png")
          showNotification("Resume exported as PNG successfully", "success")
        })
      })
    } catch (error) {
      console.error("Error exporting PNG:", error)
      showNotification("Failed to export resume as PNG", "error")
    }
  }

  const handleShareResume = () => {
    const resumeId = Math.random().toString(36).substr(2, 9)
    localStorage.setItem(`sharedResume_${resumeId}`, JSON.stringify(resumeData))
    const link = `${window.location.origin}/shared-resume/${resumeId}`
    setShareableLink(link)
    showNotification("Shareable link generated successfully", "success")
  }

  const handleCopyShareableLink = () => {
    navigator.clipboard.writeText(shareableLink)
    showNotification("Shareable link copied to clipboard", "success")
  }

  const handleSaveResume = () => {
    const newSavedResume = {
      id: Date.now(),
      name: `Resume ${savedResumes.length + 1}`,
      data: resumeData,
    }
    setSavedResumes([...savedResumes, newSavedResume])
    showNotification("Resume saved successfully", "success")
  }

  const handleLoadResume = (id) => {
    const loadedResume = savedResumes.find((resume) => resume.id === id)
    if (loadedResume) {
      setResumeData(loadedResume.data)
      showNotification("Resume loaded successfully", "success")
    } else {
      showNotification("Failed to load resume", "error")
    }
  }

  const handleImportLinkedIn = async () => {
    try {
      // This is a mock API call. In a real application, you would integrate with LinkedIn's API
      const response = await axios.get("https://api.mock-linkedin.com/v2/me")
      const linkedInData = response.data
      setResumeData((prevData) => ({
        ...prevData,
        personalDetails: {
          ...prevData.personalDetails,
          name: linkedInData.firstName + " " + linkedInData.lastName,
          email: linkedInData.emailAddress,
          linkedin: linkedInData.vanityName,
        },
        experience: linkedInData.positions.values.map((position) => ({
          company: position.company.name,
          position: position.title,
          startDate: position.startDate.year + "-" + position.startDate.month,
          endDate: position.isCurrent ? "Present" : position.endDate.year + "-" + position.endDate.month,
          description: position.summary,
        })),
        education: linkedInData.educations.values.map((education) => ({
          institution: education.schoolName,
          degree: education.degree,
          graduationDate: education.endDate.year,
        })),
        skills: linkedInData.skills.values.map((skill) => ({
          name: skill.skill.name,
          level: 3, // Default level, as LinkedIn doesn't provide skill levels
        })),
      }))
      showNotification("LinkedIn data imported successfully", "success")
    } catch (error) {
      console.error("Error importing LinkedIn data:", error)
      showNotification("Failed to import LinkedIn data", "error")
    }
  }

  const handleJobDescriptionChange = debounce((value) => {
    setJobDescription(value)
    analyzeJobDescription(value)
  }, 300)

  const analyzeJobDescription = async (description) => {
    try {
      // This is a mock API call. In a real application, you would call your backend or an AI service
      const response = await axios.post("https://api.example.com/analyze-job", { description, resume: resumeData })
      const { atsScore, missingKeywords, badPractices, suggestions } = response.data
      setAtsScore(atsScore)
      setMissingKeywords(missingKeywords)
      setBadPractices(badPractices)
      setAiSuggestions(suggestions)
    } catch (error) {
      console.error("Error analyzing job description:", error)
      showNotification("Failed to analyze job description", "error")
    }
  }

  const handleAddSkill = () => {
    if (newSkill) {
      setResumeData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, { name: newSkill, level: 3 }],
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill.name !== skillToRemove),
    }))
  }

  const getSkillSuggestions = async (jobTitle) => {
    try {
      // This is a mock API call. In a real application, you would call your backend or an AI service
      const response = await axios.get(`https://api.example.com/skill-suggestions?jobTitle=${jobTitle}`)
      setSkillSuggestions(response.data.skills)
    } catch (error) {
      console.error("Error fetching skill suggestions:", error)
      showNotification("Failed to fetch skill suggestions", "error")
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: "", type: "" }), 3000)
  }

  const TemplateComponent = templates[activeTemplate]

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${darkMode ? "dark" : ""}`}>
        <h1 className="text-3xl font-bold text-center mb-8">AI Resume Builder</h1>
        {notification.message && (
          <div
            className={`mb-4 p-4 rounded-md ${
              notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {notification.message}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
              {Object.keys(resumeData.personalDetails).map((field) => (
                <div key={field} className="mb-4">
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={resumeData.personalDetails[field]}
                    onChange={(e) => handleInputChange("personalDetails", 0, field, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
              <button
                onClick={handleImportLinkedIn}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LinkedinFilled className="mr-2" />
                Import from LinkedIn
              </button>
            </div>

            {/* Skills Section */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    {skill.name}
                    <button
                      onClick={() => handleRemoveSkill(skill.name)}
                      className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter a new skill"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  onClick={handleAddSkill}
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Skill
                </button>
              </div>
              <button
                onClick={() => getSkillSuggestions(resumeData.personalDetails.jobTitle)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Get AI Skill Suggestions
              </button>
              {skillSuggestions.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Suggested Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillSuggestions.map((skill, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setNewSkill(skill)
                          handleAddSkill()
                        }}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-1 px-2 rounded-full text-sm"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other sections */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <ResumeNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
              <ResumeSectionContent
                section={activeSection}
                data={
                  activeSection === "Professional Summary"
                    ? [{ summary: resumeData.summary }]
                    : resumeData[activeSection.toLowerCase()]
                }
                onUpdate={(newData) => {
                  setResumeData((prev) => ({
                    ...prev,
                    [activeSection.toLowerCase()]:
                      activeSection === "Professional Summary" ? newData[0]?.summary || "" : newData,
                  }))
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Resume Preview */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Resume Preview</h2>
              <div className="mb-4">
                <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Template
                </label>
                <select
                  id="template"
                  name="template"
                  value={activeTemplate}
                  onChange={(e) => setActiveTemplate(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {Object.keys(templates).map((template) => (
                    <option key={template} value={template}>
                      {template.charAt(0).toUpperCase() + template.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="colorScheme" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Color Scheme
                </label>
                <select
                  id="colorScheme"
                  name="colorScheme"
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {Object.keys(colorSchemes).map((scheme) => (
                    <option key={scheme} value={scheme}>
                      {scheme.split(/(?=[A-Z])/).join(" ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="font" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Font
                </label>
                <select
                  id="font"
                  name="font"
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {fonts.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="layout" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Layout
                </label>
                <select
                  id="layout"
                  name="layout"
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="single">Single Column</option>
                  <option value="two">Two Columns</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {darkMode ? <SunIcon className="h-5 w-5 mr-2" /> : <MoonIcon className="h-5 w-5 mr-2" />}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <div className="space-x-2">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Print
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    PDF
                  </button>
                  <button
                    onClick={handleExportDOCX}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    DOCX
                  </button>
                  <button
                    onClick={handleExportPNG}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    PNG
                  </button>
                </div>
              </div>
            </div>

            {/* Resume Preview */}
            <div
              ref={resumeRef}
              className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 ${darkMode ? "dark" : ""}`}
            >
              <TemplateComponent
                data={resumeData}
                colorScheme={colorSchemes[colorScheme]}
                font={font}
                layout={layout}
              />
            </div>

            {/* ATS Optimization */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">ATS Optimization</h2>
              <div className="mb-4">
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => handleJobDescriptionChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Paste the job description here..."
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium">ATS Score: {atsScore}%</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${atsScore}%` }}></div>
                </div>
              </div>
              {missingKeywords.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Missing Keywords:</h3>
                  <ul className="list-disc list-inside">
                    {missingKeywords.map((keyword, index) => (
                      <li key={index}>{keyword}</li>
                    ))}
                  </ul>
                </div>
              )}
              {badPractices.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Bad Practices:</h3>
                  <ul className="list-disc list-inside">
                    {badPractices.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                </div>
              )}
              {aiSuggestions.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-medium">AI Suggestions:</h3>
                  <ul className="list-disc list-inside">
                    {aiSuggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Save and Share */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Save and Share</h2>
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveResume}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Resume
                </button>
                <button
                  onClick={handleShareResume}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Share Resume
                </button>
              </div>
              {shareableLink && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Shareable Link:</p>
                  <div className="flex items-center mt-1">
                    <input
                      type="text"
                      value={shareableLink}
                      readOnly
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      onClick={handleCopyShareableLink}
                      className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <ClipboardIcon className="h-5 w-5 mr-1" />
                      Copy
                    </button>
                  </div>
                </div>
              )}
              {savedResumes.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Saved Resumes:</h3>
                  <ul className="space-y-2">
                    {savedResumes.map((resume) => (
                      <li key={resume.id} className="flex items-center justify-between">
                        <span>{resume.name}</span>
                        <button
                          onClick={() => handleLoadResume(resume.id)}
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          Load
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default AIResumeBuilder

