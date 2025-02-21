"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const linkVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
}

function Header() {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-800 transition-all duration-300"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center">
            <Link to="/">
              <span className="sr-only">Resume Analyzer</span>
              <img className="h-10 w-auto" src="/logo.svg" alt="Logo" />
            </Link>
          </motion.div>
          <div className="ml-10 space-x-4">
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Home
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/about"
                className="inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                About
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header

