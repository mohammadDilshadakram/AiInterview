"use client"
import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-5xl font-extrabold text-center text-purple-800 mb-4">Get in Touch</h1>
        <p className="text-xl text-center text-gray-600 mb-12">We'd love to hear from you. Our team is always here to chat.</p>
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-purple-700 p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="mb-8 text-purple-100">
                Fill up the form and our Team will get back to you within 24 hours.
              </p>
              <div className="space-y-6">
                <motion.div whileHover={{ x: 5 }} className="flex items-center">
                  <Mail className="h-6 w-6 mr-4" />
                  <span>ryhnakhtar@gmail.com</span>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center">
                  <Phone className="h-6 w-6 mr-4" />
                  <span>+91 123-4567</span>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center">
                  <MapPin className="h-6 w-6 mr-4" />
                  <span>Techno India University, West Bengal, India</span>
                </motion.div>
              </div>
              <div className="mt-12">
                <p className="text-sm text-purple-200">
                  Our support team is available
                </p>
                <p className="text-sm font-semibold text-purple-100">
                  Monday to Friday from 9am to 5pm
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3">
              <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#A78BFA" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.1,-0.5C88.1,15.3,83.5,30.6,75.2,43.9C66.9,57.3,54.8,68.6,40.9,76.6C26.9,84.5,11.1,89,-4.4,87.7C-19.9,86.4,-39.8,79.3,-53.8,68.5C-67.8,57.7,-75.8,43.3,-79.4,28.5C-83,13.6,-82.2,-1.6,-78.9,-16.2C-75.6,-30.8,-69.8,-44.8,-59.9,-56.2C-50,-67.6,-36,-76.5,-21.5,-79.9C-7,-83.3,8,-81.3,22.4,-77.9C36.8,-74.5,50.6,-69.7,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="md:w-3/5 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-purple-800">Send us a Message</h2>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                required
              />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </motion.button>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg ${
                  submitStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                } flex items-center`}
              >
                {submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Message sent successfully!
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 mr-2" />
                    There was an error sending your message. Please try again.
                  </>
                )}
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  )
}
