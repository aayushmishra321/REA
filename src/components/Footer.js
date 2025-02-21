"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import cvIcon from "../images/curriculum-vitae.svg"

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 mt-auto"
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <motion.div variants={itemVariants} className="space-y-8 xl:col-span-1">
            <motion.img whileHover={{ scale: 1.05 }} className="h-12 w-auto" src={cvIcon} alt="Company name" />
            <p className="text-gray-600 dark:text-gray-300 text-base max-w-md leading-relaxed">
              Making the world a better place through AI-powered resume analysis.
            </p>
            <div className="flex space-x-6">
              {["facebook", "twitter", "github"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-indigo-500 transition-colors duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Social icons remain the same */}
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  {["Resume Analysis", "Career Coaching", "Job Search"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link
                        to="/"
                        className="text-base text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  {["Contact Us", "FAQ", "Privacy Policy"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link
                        to={item === "Contact Us" ? "/contact" : "/"}
                        className="text-base text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  {["About", "Blog", "Careers"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link
                        to={item === "About" ? "/about" : "/"}
                        className="text-base text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link
                        to="/"
                        className="text-base text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div variants={itemVariants} className="mt-12 border-t border-gray-200/50 dark:border-gray-700/50 pt-8">
          <p className="text-base text-gray-400 text-center">&copy; 2025 Resume Analyzer AI. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer

