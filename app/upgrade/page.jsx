"use client"
import React from 'react'
import planData from '@/utils/planData'
import PlanItemCard from './_components/PlanItemCard'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Upgrade() {
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

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-white pt-24 pb-16"
        >
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className='font-extrabold text-5xl text-purple-800 mb-4'>Upgrade Your Interview Skills</h1>
                    <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                        Choose the plan that fits your needs and take your interview preparation to the next level
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {planData.map((plan, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <PlanItemCard plan={plan} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">Why Upgrade?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "Unlimited AI-powered mock interviews",
                            "Personalized feedback and improvement tips",
                            "Access to industry-specific question banks",
                            "Advanced analytics to track your progress",
                            "Priority customer support",
                            "Resume review and optimization"
                        ].map((feature, index) => (
                            <motion.div 
                                key={index} 
                                variants={itemVariants}
                                className="flex items-start space-x-3"
                            >
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <p className="text-gray-700">{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-20 text-center">
                    <h2 className="text-3xl font-bold text-purple-800 mb-4">Still have questions?</h2>
                    <p className="text-xl text-gray-600 mb-8">Our team is here to help you choose the best plan for your needs.</p>
                    <motion.a 
                        href="/contact" 
                        className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Us
                    </motion.a>
                </motion.div>
            </div>
        </motion.div>
    )
}