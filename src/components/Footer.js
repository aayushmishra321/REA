"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { XMarkIcon } from "@heroicons/react/24/outline"
import cvIcon from "../images/curriculum-vitae.svg"

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
}

const Modal = ({ isOpen, onClose, title, content }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <div className="space-y-4">{content}</div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

const Footer = () => {
  const { t } = useTranslation()
  const [modalContent, setModalContent] = useState({ isOpen: false, title: "", content: null })

  const modalData = {
    solutions: {
      title: "Our Solutions",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Resume Analysis</h4>
            <p className="text-gray-600 dark:text-gray-300">
              AI-powered resume analysis to help you stand out in the job market.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Career Coaching</h4>
            <p className="text-gray-600 dark:text-gray-300">One-on-one sessions with experienced career coaches.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Job Search</h4>
            <p className="text-gray-600 dark:text-gray-300">Advanced job matching and application tracking system.</p>
          </div>
        </div>
      ),
    },
    support: {
      title: "Support Center",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contact Us</h4>
            <p className="text-gray-600 dark:text-gray-300">24/7 support via email, chat, or phone.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">FAQ</h4>
            <p className="text-gray-600 dark:text-gray-300">Find answers to commonly asked questions.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy Policy</h4>
            <p className="text-gray-600 dark:text-gray-300">Learn how we protect your data and privacy.</p>
          </div>
        </div>
      ),
    },
    company: {
      title: "About Our Company",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">About</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Our mission and vision for the future of career development.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Blog</h4>
            <p className="text-gray-600 dark:text-gray-300">Latest insights and trends in the job market.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Careers</h4>
            <p className="text-gray-600 dark:text-gray-300">Join our team and help shape the future of work.</p>
          </div>
        </div>
      ),
    },
    legal: {
      title: "Legal Information",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Terms of Service</h4>
            <p className="text-gray-600 dark:text-gray-300">Our terms and conditions for using our services.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy Policy</h4>
            <p className="text-gray-600 dark:text-gray-300">How we collect, use, and protect your data.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cookie Policy</h4>
            <p className="text-gray-600 dark:text-gray-300">Information about how we use cookies on our website.</p>
          </div>
        </div>
      ),
    },
    social: {
      title: "Connect With Us",
      content: (
        <div className="space-y-6">
          <div className="border dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Social Media</h4>
            <div className="grid grid-cols-1 gap-4">
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="bg-blue-500 p-2 rounded-full">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {/* Facebook icon */}
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Facebook</p>
                  <p className="text-sm text-gray-500">Follow us for daily updates</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="bg-blue-400 p-2 rounded-full">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {/* Twitter icon */}
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Twitter</p>
                  <p className="text-sm text-gray-500">Latest news and announcements</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="bg-gray-900 p-2 rounded-full">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {/* GitHub icon */}
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">GitHub</p>
                  <p className="text-sm text-gray-500">Check out our open source projects</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      ),
    },
  }

  const openModal = (type) => {
    setModalContent({
      isOpen: true,
      title: modalData[type].title,
      content: modalData[type].content,
    })
  }

  const closeModal = () => {
    setModalContent({ isOpen: false, title: "", content: null })
  }

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="relative bg-gradient-to-b from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-800/20 mt-auto transition-colors duration-300 ease-in-out"
    >
      <Modal
        isOpen={modalContent.isOpen}
        onClose={closeModal}
        title={modalContent.title}
        content={modalContent.content}
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <motion.div variants={footerVariants} className="space-y-8 xl:col-span-1">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="h-12 w-auto filter dark:brightness-90"
              src={cvIcon}
              alt="Company name"
            />
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
              Making the world a better place through AI-powered resume analysis and career advancement solutions.
            </p>
            <div className="flex space-x-6">
              {["facebook", "twitter", "github"].map((social) => (
                <motion.button
                  key={social}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal("social")}
                  className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Social icons remain the same */}
                  </svg>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div variants={footerVariants}>
                <button
                  onClick={() => openModal("solutions")}
                  className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 hover:opacity-80 transition-opacity"
                >
                  Solutions
                </button>
                <ul className="mt-4 space-y-4">
                  {["Resume Analysis", "Career Coaching", "Job Search"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} className="text-base text-gray-600 dark:text-gray-300">
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={footerVariants} className="mt-12 md:mt-0">
                <button
                  onClick={() => openModal("support")}
                  className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 hover:opacity-80 transition-opacity"
                >
                  Support
                </button>
                <ul className="mt-4 space-y-4">
                  {["Contact Us", "FAQ", "Privacy Policy"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} className="text-base text-gray-600 dark:text-gray-300">
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div variants={footerVariants}>
                <button
                  onClick={() => openModal("company")}
                  className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 hover:opacity-80 transition-opacity"
                >
                  Company
                </button>
                <ul className="mt-4 space-y-4">
                  {["About", "Blog", "Careers"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} className="text-base text-gray-600 dark:text-gray-300">
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={footerVariants} className="mt-12 md:mt-0">
                <button
                  onClick={() => openModal("legal")}
                  className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 hover:opacity-80 transition-opacity"
                >
                  Legal
                </button>
                <ul className="mt-4 space-y-4">
                  {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} className="text-base text-gray-600 dark:text-gray-300">
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          variants={footerVariants}
          className="mt-12 pt-8 border-t border-gray-200/20 dark:border-gray-800/20"
        >
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Resume Analyzer AI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer

