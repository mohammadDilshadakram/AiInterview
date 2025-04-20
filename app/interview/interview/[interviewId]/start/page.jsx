"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';

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

function StartInterview({params}) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId))

            const jsonMockResp = JSON.parse(result[0].jsonMockResp);
            setMockInterviewQuestion(jsonMockResp);
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
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto">
                <motion.h1 variants={itemVariants} className="text-4xl font-bold text-center text-purple-800 mb-12">
                    AI Interview Session
                </motion.h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeQuestionIndex}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            <QuestionsSection 
                                mockInterviewQuestion={mockInterviewQuestion}
                                activeQuestionIndex={activeQuestionIndex}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <motion.div variants={itemVariants}>
                        <RecordAnswerSection
                            mockInterviewQuestion={mockInterviewQuestion}
                            activeQuestionIndex={activeQuestionIndex}
                            interviewData={interviewData}
                        />
                    </motion.div>
                </div>
                <motion.div variants={itemVariants} className='flex justify-between mt-10'>
                    <Button 
                        onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                        disabled={activeQuestionIndex === 0}
                        className="flex items-center space-x-2 bg-purple-100 text-purple-700 hover:bg-purple-200"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Previous</span>
                    </Button>
                    {activeQuestionIndex === mockInterviewQuestion?.length - 1 ? (
                        <Link href={'/interview/interview/' + interviewData?.mockId + "/feedback"}>
                            <Button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white">
                                <span>End Interview</span>
                                <Flag className="w-5 h-5" />
                            </Button>
                        </Link>
                    ) : (
                        <Button 
                            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            <span>Next</span>
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    )}
                </motion.div>
            </div>
        </motion.div>
    )
}

export default StartInterview