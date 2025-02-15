import { motion } from "framer-motion"
import { UserGroupIcon, LightBulbIcon, ChartBarIcon } from "@heroicons/react/24/outline"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">About</span>
            <span className="block gradient-text">ResumeAI</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Empowering job seekers with cutting-edge AI technology to create standout resumes.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="score-card"
          >
            <UserGroupIcon className="h-12 w-12 text-primary-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Mission</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              To revolutionize the job application process by providing job seekers with powerful AI-driven tools to
              create impactful resumes and increase their chances of landing their dream jobs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="score-card"
          >
            <LightBulbIcon className="h-12 w-12 text-primary-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Vision</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              To become the go-to platform for job seekers worldwide, offering innovative solutions that bridge the gap
              between talent and opportunity in the ever-evolving job market.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="score-card"
          >
            <ChartBarIcon className="h-12 w-12 text-primary-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Impact</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Since our inception, we've helped thousands of job seekers optimize their resumes, resulting in a 40%
              increase in interview callbacks and a 25% higher job placement rate for our users.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Team</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            We're a diverse group of AI experts, data scientists, and career coaches passionate about helping you
            succeed in your job search.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

