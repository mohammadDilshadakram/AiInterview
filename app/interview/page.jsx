"use client"
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import { PlusCircle, List, TrendingUp, Clock, Award, ChevronRight } from 'lucide-react'
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

function interview() {
  return (
    <motion.div 
      className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white py-12'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div className='mb-12' variants={itemVariants}>
         
          <p className='text-gray-600 text-xl'>Ready to ace your next interview?</p>
        </motion.div>

        <motion.div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12' variants={itemVariants}>
          {[ 
            { icon: TrendingUp, color: 'purple', label: 'Total Interviews', value: '24' },
            { icon: Clock, color: 'blue', label: 'Practice Time', value: '12 hours' },
            { icon: Award, color: 'green', label: 'Skill Level', value: 'Intermediate' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className='bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl transition-all duration-300'
              whileHover={{ scale: 1.05 }}
            >
              <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
              <div>
                <p className='text-gray-500'>{stat.label}</p>
                <p className={`text-2xl font-bold text-${stat.color}-800`}>{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className='bg-white rounded-xl shadow-lg p-8 mb-12' variants={itemVariants}>
          <h2 className='font-bold text-3xl text-purple-800 mb-6 flex items-center'>
            <PlusCircle className="w-8 h-8 mr-3" />
            Start a New Interview
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <AddNewInterview />
            <div className='md:col-span-2 bg-purple-50 rounded-xl p-8'>
              <h3 className='font-semibold text-xl text-purple-700 mb-4'>Why Practice with AI?</h3>
              <ul className='space-y-2'>
                {[ 
                  'Personalized feedback on your responses',
                  'Practice anytime, anywhere',
                  'Diverse range of interview questions',
                  'Improve your confidence and performance'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className='flex items-start space-x-2 text-gray-600'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ChevronRight className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div 
                className='mt-6'
                whileHover={{ x: 5 }}
              >
                <Link href="/learn-more" className='inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold'>
                  Learn more about our AI interviews
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div className='bg-white rounded-xl shadow-lg p-8' variants={itemVariants}>
          <h2 className='font-bold text-3xl text-purple-800 mb-6 flex items-center'>
            <List className="w-8 h-8 mr-3" />
            Your Interview History
          </h2>
          <InterviewList />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default interview