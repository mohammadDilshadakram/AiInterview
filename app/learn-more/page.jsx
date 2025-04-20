"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Cpu, LayoutGrid, Database, Palette, Key, Wind, Mic, FileCheck, ClipboardList, CheckCircle } from 'lucide-react'

const technologies = [
  { name: 'Gemini AI', description: 'Used for generating interview questions and responses', icon: Cpu },
  { name: 'Next.js', description: 'React framework for building the web application', icon: LayoutGrid },
  { name: 'Drizzle', description: 'ORM for database management', icon: Database },
  { name: 'shadcn/ui', description: 'UI component library for sleek design', icon: Palette },
  { name: 'Clerk', description: 'Authentication and user management', icon: Key },
  { name: 'Tailwind CSS', description: 'Utility-first CSS framework for styling', icon: Wind },
]

const features = [
  { name: 'AI Interview Practice', description: 'Simulate real interview scenarios with our AI-powered system, receiving instant feedback to improve your performance.', icon: Mic },
  { name: 'AI-Generated Quizzes', description: 'Test your knowledge with customized quizzes tailored to your field and experience level.', icon: ClipboardList },
  { name: 'AI Resume Review', description: 'Get detailed feedback on your resume from our AI, ensuring it stands out to potential employers.', icon: FileCheck },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
}

export default function LearnMore() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-purple-100 to-white pt-24 pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 variants={itemVariants} className="text-5xl font-bold text-center text-primary mb-12">Elevate Your Job Search</motion.h1>
        
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-purple-600 mb-8">Our Cutting-Edge Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg border border-purple-200 shadow-md p-6 hover:shadow-xl transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Why Choose Us?</h2>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-indigo-500"></div>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Our AI-powered platform is designed to give you the edge in your job search. By combining cutting-edge technology with proven interview techniques, we provide a comprehensive solution to help you land your dream job.
            </p>
            <ul className="space-y-4">
              {[ 
                "Personalized feedback to improve your interview skills",
                "Industry-specific questions and quizzes to boost your knowledge",
                "AI-driven resume analysis to maximize your chances of getting noticed",
                "24/7 access to practice and improve at your own pace",
                "Constantly updated content to keep you ahead of the curve"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  variants={itemVariants}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Technologies We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              >
                <tech.icon className="w-12 h-12 text-purple-600 mb-6" />
                <h3 className="text-2xl font-semibold text-purple-800 mb-4">{tech.name}</h3>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="text-center">
          <Link href="/" passHref>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
            >
              Back to Home
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
