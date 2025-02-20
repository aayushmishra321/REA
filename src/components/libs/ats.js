export const calculateATSScore = (resumeData, jobDescription) => {
    if (!jobDescription) return 0
  
    const jobKeywords = extractKeywords(jobDescription.toLowerCase())
    const resumeContent = getResumeContent(resumeData).toLowerCase()
    const resumeKeywords = extractKeywords(resumeContent)
  
    let matchedKeywords = 0
    const totalKeywords = jobKeywords.length
  
    jobKeywords.forEach((keyword) => {
      if (resumeContent.includes(keyword)) {
        matchedKeywords++
      }
    })
  
    // Calculate base score from keyword matches
    let score = (matchedKeywords / totalKeywords) * 100
  
    // Adjust score based on resume structure and content
    score += calculateStructureScore(resumeData)
    score += calculateContentScore(resumeData)
  
    // Ensure score doesn't exceed 100
    return Math.min(Math.round(score), 100)
  }
  
  const extractKeywords = (text) => {
    // Remove common words and punctuation
    const commonWords = new Set([
      "the",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "with",
      "by",
      "from",
      "up",
      "about",
      "into",
      "over",
      "after",
    ])
  
    const words = text
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !commonWords.has(word))
  
    return [...new Set(words)] // Remove duplicates
  }
  
  const getResumeContent = (resumeData) => {
    const sections = [
      resumeData.summary,
      ...resumeData.experience.map((exp) => `${exp.position} ${exp.company} ${exp.description}`),
      ...resumeData.education.map((edu) => `${edu.degree} ${edu.institution}`),
      ...resumeData.skills.map((skill) => skill.name),
      ...resumeData.certifications.map((cert) => cert.name),
      ...resumeData.volunteering.map((vol) => `${vol.role} ${vol.organization} ${vol.description}`),
      ...resumeData.awards.map((award) => `${award.name} ${award.description}`),
      ...resumeData.publications.map((pub) => `${pub.title} ${pub.publisher}`),
    ]
  
    return sections.filter(Boolean).join(" ")
  }
  
  const calculateStructureScore = (resumeData) => {
    let score = 0
  
    // Check for essential sections
    if (resumeData.summary) score += 5
    if (resumeData.experience.length > 0) score += 5
    if (resumeData.education.length > 0) score += 5
    if (resumeData.skills.length > 0) score += 5
  
    // Check for additional sections
    if (resumeData.certifications.length > 0) score += 2
    if (resumeData.volunteering.length > 0) score += 2
    if (resumeData.awards.length > 0) score += 2
    if (resumeData.publications.length > 0) score += 2
  
    return score
  }
  
  const calculateContentScore = (resumeData) => {
    let score = 0
  
    // Check experience descriptions
    const hasQuantifiableResults = resumeData.experience.some((exp) => /\d+%|\d+x|\$\d+|\d+/.test(exp.description))
    if (hasQuantifiableResults) score += 5
  
    // Check for action verbs
    const actionVerbs = [
      "achieved",
      "developed",
      "implemented",
      "created",
      "managed",
      "led",
      "increased",
      "decreased",
      "improved",
      "designed",
    ]
    const hasActionVerbs = resumeData.experience.some((exp) =>
      actionVerbs.some((verb) => exp.description.toLowerCase().includes(verb)),
    )
    if (hasActionVerbs) score += 5
  
    return score
  }
  
  