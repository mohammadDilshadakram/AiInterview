"use client"
import { AtomIcon, Edit, LucideCalendarSearch, ArrowRight } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

function Hero() {
  return (
    <motion.div 
      className="relative min-h-screen bg-gradient-to-b from-purple-50 to-white" 
      id="home"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl mb-8">
              Your Personal <span className="text-primary dark:text-white">AI Interview Coach</span>
            </h1>
            <p className="mt-8 text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI interview platform simulates real interview scenarios, providing personalized feedback to help you improve your performance. Practice and refine your answers with AI-driven insights, boosting your confidence for the real interview.
            </p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <motion.a
                href="/dashboard"
                className="relative flex h-12 items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative text-base font-semibold text-white">Get started</span>
              </motion.a>
              <motion.a
                href="/learn-more"
                className="relative flex h-12 items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative text-base font-semibold text-primary dark:text-white">Learn more</span>
              </motion.a>
            </div>
          </motion.div>
          
          <motion.section variants={itemVariants} className="mt-24 bg-white rounded-3xl shadow-xl p-8 lg:p-16">
            <h2 className="font-bold text-3xl text-center mb-2">Elevate your career with our products</h2>
            <p className="text-md text-gray-500 text-center mb-12">Try for free</p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: AtomIcon,
                  title: "AI Resume Builder",
                  description: "Our resume builder is a user-friendly tool designed to help you craft professional, customized resumes with ease."
                },
                {
                  icon: Edit,
                  title: "AI Generated Quiz",
                  description: "Our AI-generated quiz platform creates personalized quizzes tailored to your chosen topics and difficulty levels."
                },
                {
                  icon: LucideCalendarSearch,
                  title: "AI based career help/guidance",
                  description: "Our AI-based career guidance platform offers personalized advice tailored to your skills, interests, and career goals.",
                  link: "https://career-councellor.vercel.app/"
                }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link || "#"}
                  className="block rounded-xl border bg-white p-8 shadow-lg transition hover:shadow-xl hover:border-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className='h-12 w-12 text-primary mb-4'/>
                  <h3 className="mt-4 text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                </motion.a>
              ))}
            </div>

            <div className="mt-16 text-center">
              <motion.a
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.a>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  )
}

export default Hero