import { motion } from "framer-motion";
import { UserGroupIcon, LightBulbIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl text-gray-900 dark:text-white">
            <span className="block">About</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              ResumeAI
            </span>
          </h1>
          <p className="mt-4 max-w-md mx-auto text-lg text-gray-600 dark:text-gray-300 md:max-w-3xl">
            Empowering job seekers with cutting-edge AI technology to create standout resumes.
          </p>
        </motion.div>

        {/* Cards Section */}
        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <UserGroupIcon className="h-12 w-12 text-blue-600 mb-4" />,
              title: "Our Mission",
              text: "Revolutionizing the job application process with AI-driven tools to enhance resumes and increase job placement success.",
            },
            {
              icon: <LightBulbIcon className="h-12 w-12 text-yellow-500 mb-4" />,
              title: "Our Vision",
              text: "To become the go-to platform for job seekers worldwide, bridging the gap between talent and opportunity.",
            },
            {
              icon: <ChartBarIcon className="h-12 w-12 text-green-500 mb-4" />,
              title: "Our Impact",
              text: "Helping thousands of job seekers optimize resumes, leading to a 40% increase in interview callbacks.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
              className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              {item.icon}
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{item.title}</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Our Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Team</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            A diverse group of AI experts, data scientists, and career coaches passionate about your success.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
