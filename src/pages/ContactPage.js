"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement form submission logic here
    console.log("Form submitted:", formData)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          We're here to help. Reach out to us for any questions or support.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPinIcon className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">123 AI Street, San Francisco, CA 94105</span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <EnvelopeIcon className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-gray-700 dark:text-gray-300">support@resumeanalyzer.ai</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Office Hours</h3>
            <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
            <p className="text-gray-700 dark:text-gray-300">Saturday - Sunday: Closed</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactPage

