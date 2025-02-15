import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const GetStartedPage = () => {
  const features = [
    "AI-powered resume analysis",
    "Personalized improvement suggestions",
    "ATS compatibility check",
    "Industry-specific keyword recommendations",
    "Interview preparation tools",
    "Career coaching sessions",
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">Get Started with</span>
            <span className="block text-primary-600">ResumeAI</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Unlock your career potential with our AI-powered resume analysis and career coaching services.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 backdrop-filter backdrop-blur-lg bg-opacity-50 dark:bg-opacity-50"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Why Choose ResumeAI?</h2>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 backdrop-filter backdrop-blur-lg bg-opacity-50 dark:bg-opacity-50"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Get Started Now</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Take the first step towards your dream career. Sign up now and experience the power of AI-driven career
              advancement.
            </p>
            <div className="space-y-4">
              <Link
                to="/signup"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create an Account
              </Link>
              <Link
                to="/"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Try Demo
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                title: "1. Upload Your Resume",
                description: "Simply upload your current resume in PDF or Word format.",
              },
              {
                title: "2. AI Analysis",
                description: "Our AI engine analyzes your resume for improvements and ATS compatibility.",
              },
              {
                title: "3. Get Personalized Feedback",
                description: "Receive detailed suggestions to enhance your resume and boost your job prospects.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50 dark:bg-opacity-50"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStartedPage;