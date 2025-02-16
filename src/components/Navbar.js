"use client"

import { useState } from "react"

import { Link } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"
import { useLanguage } from "../contexts/LanguageContext"
import { SunIcon, MoonIcon, UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid"
import cvIcon from "../images/curriculum-vitae.svg";

const Navbar = ({ toggleDarkMode }) => {
  const { theme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This should be managed by your authentication system

  const handleLogout = () => {
    // Implement logout logic here
    setIsLoggedIn(false)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-8" src={cvIcon} alt="Logo" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  AboutUS
                </Link>
                <Link
                  to="/ai-resume-builder"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  AI Resume Builder
                </Link>
                <Link
                  to="/cover-letter-generator"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cover Letter Generator
                </Link>
                <Link
                  to="/recruiter-dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Recruiter Dashboard
                </Link>
                <Link
                  to="/services"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mr-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

