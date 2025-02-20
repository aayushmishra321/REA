import ClassicTemplate from "./components/resumeTemplates/ClassicTemplate"
import MinimalistTemplate from "./components/resumeTemplates/MinimalistTemplate"
import CreativeTemplate from "./components/resumeTemplates/CreativeTemplate"
import CorporateTemplate from "./components/resumeTemplates/CorporateTemplate"
import ModernTemplate from "./components/resumeTemplates/ModernTemplate"

export const templates = {
  classic: ClassicTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
  corporate: CorporateTemplate,
  modern: ModernTemplate,
}

export const colorSchemes = {
  corporateBlue: {
    primary: "#0047AB",
    secondary: "#6495ED",
    text: "#333333",
    background: "#FFFFFF",
  },
  modernBlack: {
    primary: "#000000",
    secondary: "#333333",
    text: "#000000",
    background: "#FFFFFF",
  },
  elegantGreen: {
    primary: "#2E8B57",
    secondary: "#3CB371",
    text: "#333333",
    background: "#FFFFFF",
  },
  vibrantOrange: {
    primary: "#FF4500",
    secondary: "#FF7F50",
    text: "#333333",
    background: "#FFFFFF",
  },
  softPurple: {
    primary: "#8A2BE2",
    secondary: "#9370DB",
    text: "#333333",
    background: "#FFFFFF",
  },
}

export const fonts = ["Montserrat", "Roboto", "Lato", "Open Sans", "Raleway"]

