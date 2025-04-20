"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon, Loader2, Briefcase, Code, Clock } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
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

function Interview({params}) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId))
            setInterviewData(result[0]);
        } catch (error) {
            console.error("Failed to fetch interview details:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-white">
                <Loader2 className="w-16 h-16 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <motion.div 
            className='min-h-screen bg-gradient-to-br from-purple-50 to-white py-12'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className='max-w-6xl mx-auto px-4'>
                <motion.h1 variants={itemVariants} className='font-bold text-4xl mb-12 text-center text-purple-800'>Let's Get Started</motion.h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                    <motion.div variants={itemVariants} className='space-y-8'>
                        <div className='bg-white shadow-lg rounded-xl p-8 space-y-6'>
                            <h2 className='text-2xl font-semibold mb-6 text-purple-700'>Job Details</h2>
                            {[
                                { icon: Briefcase, label: 'Job Role', value: interviewData?.jobPosition },
                                { icon: Code, label: 'Tech Stack', value: interviewData?.jobDesc },
                                { icon: Clock, label: 'Experience', value: `${interviewData?.jobExperience} years` }
                            ].map((item, index) => (
                                <div key={index} className='flex items-center space-x-4'>
                                    <div className='bg-purple-100 p-3 rounded-full'>
                                        <item.icon className='h-6 w-6 text-purple-600' />
                                    </div>
                                    <div>
                                        <p className='text-gray-500'>{item.label}</p>
                                        <p className='font-medium text-gray-800'>{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <motion.div 
                            className='bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-md'
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className='flex items-center mb-3'>
                                <Lightbulb className='h-6 w-6 text-yellow-500 mr-3' />
                                <h2 className='font-semibold text-xl text-yellow-800'>Information</h2>
                            </div>
                            <p className='text-yellow-700'>{process.env.NEXT_PUBLIC_INFORMATION}</p>
                        </motion.div>
                    </motion.div>
                    <motion.div variants={itemVariants} className='bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center'>
                        {webCamEnabled ? (
                            <Webcam
                                onUserMedia={() => setWebCamEnabled(true)}
                                onUserMediaError={() => setWebCamEnabled(false)}
                                mirrored={true}
                                className='rounded-lg shadow-md w-full max-w-md'
                            />
                        ) : (
                            <>
                                <WebcamIcon className='h-40 w-40 text-gray-300 mb-6' />
                                <Button 
                                    variant="outline" 
                                    className="w-full max-w-xs bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-300"
                                    onClick={() => setWebCamEnabled(true)}
                                >
                                    Enable Web Cam and Microphone
                                </Button>
                            </>
                        )}
                    </motion.div>
                </div>
                <motion.div 
                    variants={itemVariants}
                    className='mt-12 flex justify-center'
                >
                    <Link href={`/interview/interview/${params.interviewId}/start`}>
                        <Button 
                            className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition duration-300 text-lg shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Interview
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Interview