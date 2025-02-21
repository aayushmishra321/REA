"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"
import { useLanguage } from "../contexts/LanguageContext"
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import cvIcon from "../images/curriculum-vitae.svg"

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

const linkVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
}

const Navbar = ({ toggleDarkMode }) => {
  const { theme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex-shrink-0">
              <img className="h-10 w-10" src={cvIcon || "/placeholder.svg"} alt="Logo" />
            </Link>
          </motion.div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {[
                { to: "/", text: "Home" },
                { to: "/about", text: "About" },
                { to: "/airesumebuilder", text: "AI Resume Builder" },
                { to: "/cover-letter-generator", text: "Cover Letter" },
                { to: "/recruiter-dashboard", text: "Recruiter Dashboard" },
                { to: "/services", text: "Services" },
                { to: "/contact", text: "Contact" },
              ].map((link) => (
                <motion.div key={link.to} variants={linkVariants} whileHover="hover">
                  <Link
                    to={link.to}
                    className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 font-medium transition-all duration-300"
                  >
                    {link.text}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              {theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

