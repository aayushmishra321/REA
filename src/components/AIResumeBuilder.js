"use client"

import { useState } from "react"
import { DocumentTextIcon, PlusIcon } from "@heroicons/react/24/solid"
import jsPDF from "jspdf";

const AIResumeBuilder = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
  })
  const [generatedResume, setGeneratedResume] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", position: "", startDate: "", endDate: "", description: "" }],
    })
  }

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institution: "", degree: "", graduationDate: "" }],
    })
  }

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""],
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate AI-generated resume
    const aiGeneratedResume = `
      ${formData.name}
      ${formData.email} | ${formData.phone}

      Professional Summary:
      ${formData.summary}

      Experience:
      ${formData.experience
        .map(
          (exp) => `
        ${exp.position} at ${exp.company}
        ${exp.startDate} - ${exp.endDate}
        ${exp.description}
      `,
        )
        .join("\n")}

      Education:
      ${formData.education
        .map(
          (edu) => `
        ${edu.degree} from ${edu.institution}
        Graduated: ${edu.graduationDate}
      `,
        )
        .join("\n")}

      Skills:
      ${formData.skills.join(", ")}
    `
    setGeneratedResume(aiGeneratedResume)
    setStep(step + 1)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
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
                />
              </div>
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Professional Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows="4"
                  value={formData.summary}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-medium mb-2">Experience {index + 1}</h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`company-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id={`company-${index}`}
                      name={`company-${index}`}
                      value={exp.company}
                      onChange={(e) => {
                        const newExperience = [...formData.experience]
                        newExperience[index].company = e.target.value
                        setFormData({ ...formData, experience: newExperience })
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`position-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Position
                    </label>
                    <input
                      type="text"
                      id={`position-${index}`}
                      name={`position-${index}`}
                      value={exp.position}
                      onChange={(e) => {
                        const newExperience = [...formData.experience]
                        newExperience[index].position = e.target.value
                        setFormData({ ...formData, experience: newExperience })
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`startDate-${index}`}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        id={`startDate-${index}`}
                        name={`startDate-${index}`}
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExperience = [...formData.experience]
                          newExperience[index].startDate = e.target.value
                          setFormData({ ...formData, experience: newExperience })
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`endDate-${index}`}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        id={`endDate-${index}`}
                        name={`endDate-${index}`}
                        value={exp.endDate}
                        onChange={(e) => {
                          const newExperience = [...formData.experience]
                          newExperience[index].endDate = e.target.value
                          setFormData({ ...formData, experience: newExperience })
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor={`description-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Description
                    </label>
                    <textarea
                      id={`description-${index}`}
                      name={`description-${index}`}
                      rows="3"
                      value={exp.description}
                      onChange={(e) => {
                        const newExperience = [...formData.experience]
                        newExperience[index].description = e.target.value
                        setFormData({ ...formData, experience: newExperience })
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddExperience}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Experience
            </button>
          </div>
        )
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-medium mb-2">Education {index + 1}</h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`institution-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Institution
                    </label>
                    <input
                      type="text"
                      id={`institution-${index}`}
                      name={`institution-${index}`}
                      value={edu.institution}
                      onChange={(e) => {
                        const newEducation = [...formData.education]
                        newEducation[index].institution = e.target.value
                        setFormData({ ...formData, education: newEducation })
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`degree-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Degree
                    </label>
                    <input
                      type="text"
                      id={`degree-${index}`}
                      name={`degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...formData.education]
                        newEducation[index].degree = e.target.value
                        setFormData({ ...formData, education: newEducation })
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`graduationDate-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Graduation Date
                    </label>
                    <input
                      type="date"
                      id={`graduationDate-${index}`}
                      name={`graduationDate-${index}`}
                      value={edu.graduationDate}
                      onChange={(e) => {
                        const newEducation = [...formData.education]
                        newEducation[index].graduationDate = e.target.value
                        setFormData({ ...formData, education: newEducation })
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEducation}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Education
            </button>
          </div>
        )
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            {formData.skills.map((skill, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor={`skill-${index}`}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Skill {index + 1}
                </label>
                <input
                  type="text"
                  id={`skill-${index}`}
                  name={`skill-${index}`}
                  value={skill}
                  onChange={(e) => {
                    const newSkills = [...formData.skills]
                    newSkills[index] = e.target.value
                    setFormData({ ...formData, skills: newSkills })
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSkill}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Skill
            </button>
          </div>
        )
      case 5:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Review and Generate</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please review your information. Once you're ready, click the "Generate Resume" button to create your
              AI-powered resume.
            </p>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Generate Resume
            </button>
          </div>
        )
      case 6:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your AI-Generated Resume</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300">
                {generatedResume}
              </pre>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Start Over
              </button>
              <button
  onClick={() => {
    const doc = new jsPDF();

    // Add resume content to the PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("AI-Generated Resume", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const textContent = generatedResume || "No resume data available";
    
    // Split text into lines for better formatting
    const pageWidth = doc.internal.pageSize.getWidth() - 40;
    const splitText = doc.splitTextToSize(textContent, pageWidth);

    doc.text(splitText, 20, 40);

    // Save the PDF
    doc.save("AI_Generated_Resume.pdf");
  }}
  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
>
  Download Resume
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">AI Resume Builder</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {renderStep()}
            <div className="mt-8 flex justify-between">
              {step > 1 && step < 6 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Previous
                </button>
              )}
              {step < 5 && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AIResumeBuilder

