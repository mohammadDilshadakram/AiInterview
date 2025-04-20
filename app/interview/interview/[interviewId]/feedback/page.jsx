"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Star, Home, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

function Feedback({params}) {
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, [])

    const GetFeedback = async () => {
        try {
            const result = await db.select()
                .from(UserAnswer)
                .where(eq(UserAnswer.mockIdRef, params.interviewId))
                .orderBy(UserAnswer.id);

            console.log(result);
            setFeedbackList(result);
        } catch (error) {
            console.error("Error fetching feedback:", error);
            toast.error("Failed to fetch feedback. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const calculateOverallRating = () => {
        if (feedbackList.length === 0) return 0;
        const totalRating = feedbackList.reduce((sum, item) => sum + Number(item.rating), 0);
        return (totalRating / feedbackList.length).toFixed(1);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <motion.div 
            className='p-10 max-w-4xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {feedbackList.length === 0 ? (
                <motion.h2 
                    className='font-bold text-xl text-gray-500 text-center'
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    No Interview Feedback Record Found
                </motion.h2>  
            ) : (
                <>
                    <motion.h2 
                        className='text-4xl font-bold text-green-500 mb-4'
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        Congratulations!
                    </motion.h2>
                    <motion.h2 
                        className='font-bold text-2xl mb-6'
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        Here is your interview feedback
                    </motion.h2>
                    <motion.div 
                        className='flex items-center justify-center mb-8 bg-primary text-white p-4 rounded-lg shadow-lg'
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <Star className="w-6 h-6 mr-2 text-yellow-300" />
                        <span className='text-xl font-bold'>Your overall interview rating: {calculateOverallRating()}/10</span>
                    </motion.div>
                    <motion.h2 
                        className='text-sm text-gray-500 mb-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        Find below interview questions with correct answers, your answers, and feedback for improvement
                    </motion.h2>
                    <AnimatePresence>
                        {feedbackList.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Collapsible className='mb-4 border rounded-lg shadow-sm'>
                                    <CollapsibleTrigger className='p-4 bg-gray-50 rounded-t-lg flex justify-between items-center w-full text-left hover:bg-gray-100 transition-colors duration-200'>
                                        <span className="font-semibold">{item.question}</span>
                                        <ChevronsUpDown className='h-5 w-5 text-gray-500' />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className='p-4'>
                                        <div className='flex flex-col gap-3'>
                                            <div className='p-3 border rounded-lg bg-yellow-50'>
                                                <strong className="text-yellow-700">Rating:</strong> 
                                                <span className="ml-2 text-yellow-600">{item.rating ? `${item.rating}/10` : 'N/A'}</span>
                                            </div>
                                            <div className='p-3 border rounded-lg bg-red-50'>
                                                <strong className="text-red-700">Your Answer:</strong> 
                                                <p className="mt-1 text-sm text-red-600">{item.userAns}</p>
                                            </div>
                                            <div className='p-3 border rounded-lg bg-green-50'>
                                                <strong className="text-green-700">Correct Answer:</strong> 
                                                <p className="mt-1 text-sm text-green-600">{item.correctAns}</p>
                                            </div>
                                            <div className='p-3 border rounded-lg bg-blue-50'>
                                                <strong className="text-blue-700">Feedback:</strong> 
                                                <p className="mt-1 text-sm text-blue-600">{item.feedback}</p>
                                            </div>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </>
            )}
            <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
            >
                <Button 
                    onClick={() => router.replace('/dashboard')}
                    className="flex items-center space-x-2"
                >
                    <Home className="w-4 h-4" />
                    <span>Go Home</span>
                </Button>
            </motion.div>
        </motion.div>
    )
}

export default Feedback