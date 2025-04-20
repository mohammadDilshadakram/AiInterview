"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle, Camera, AlertCircle, Loader2, CheckCircle, User, Keyboard } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import moment from 'moment'
import { motion, AnimatePresence } from 'framer-motion'

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [webcamReady, setWebcamReady] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
        speechRecognitionProperties: {
            interimResults: true,
            continuous: true
        }
    });

    useEffect(() => {
        if (results.length > 0) {
            const newAnswer = results.map(result => result.transcript).join(' ');
            setUserAnswer(prevAns => prevAns + ' ' + newAnswer);
            setResults([]); // Clear results to avoid duplication
        }
    }, [results, setResults]);

    const StartStopRecording = useCallback(() => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            setUserAnswer('');
            startSpeechToText();
        }
        setIsTyping(false);
    }, [isRecording, startSpeechToText, stopSpeechToText]);

    const toggleInputMethod = () => {
        if (isRecording) {
            stopSpeechToText();
        }
        setIsTyping(!isTyping);
    };

    const UpdateUserAnswer = useCallback(async () => {
        try {
            setLoading(true);
            const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depends on question and user answer for give interview question please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            const JsonFeedbackResp = JSON.parse(mockJsonResp);

            const resp = await db.insert(UserAnswer)
                .values({
                    mockIdRef: interviewData?.mockId,
                    question: mockInterviewQuestion[activeQuestionIndex]?.question,
                    correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                    userAns: userAnswer,
                    feedback: JsonFeedbackResp?.feedback,
                    rating: JsonFeedbackResp?.rating,
                    createdAt: moment().format('DD-MM-YYYY')
                });

            if (resp) {
                setFeedback(JsonFeedbackResp);
                setShowFeedback(true);
                toast.success('Answer recorded successfully');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to record answer');
        } finally {
            setLoading(false);
        }
    }, [mockInterviewQuestion, activeQuestionIndex, userAnswer, interviewData?.mockId]);

    return (
        <motion.div 
            className='flex items-center justify-center flex-col bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className='relative w-full aspect-video bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg overflow-hidden shadow-inner mb-6'
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {!webcamReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <User className="w-16 h-16 mb-4" />
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <p className="mt-2 text-sm">Preparing your camera...</p>
                    </div>
                )}
                <Webcam
                    mirrored={true}
                    audio={false}
                    onUserMedia={() => setWebcamReady(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${webcamReady ? 'opacity-100' : 'opacity-0'}`}
                    aria-label="User webcam feed"
                />
                <motion.div 
                    className='absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Camera className='w-4 h-4 mr-1' />
                    Live
                </motion.div>
                {isRecording && (
                    <motion.div 
                        className='absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                        Recording
                    </motion.div>
                )}
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.div 
                        className='mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <AlertCircle className='w-5 h-5 mr-2' />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='w-full space-y-4'>
                {isTyping ? (
                    <Textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full min-h-[150px] p-4"
                    />
                ) : (
                    <div className="relative min-h-[150px] p-4 border rounded-lg bg-gray-50">
                        <p className="whitespace-pre-wrap">{userAnswer || "Your answer will appear here..."}</p>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <div className="space-x-2">
                        <Button
                            onClick={StartStopRecording}
                            variant={isRecording ? "destructive" : "default"}
                            className="flex items-center gap-2"
                        >
                            {isRecording ? (
                                <>
                                    <StopCircle className="h-4 w-4" />
                                    Stop Recording
                                </>
                            ) : (
                                <>
                                    <Mic className="h-4 w-4" />
                                    Start Recording
                                </>
                            )}
                        </Button>
                        <Button
                            onClick={toggleInputMethod}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Keyboard className="h-4 w-4" />
                            {isTyping ? "Switch to Voice" : "Switch to Typing"}
                        </Button>
                    </div>
                    <Button
                        onClick={UpdateUserAnswer}
                        disabled={loading || !userAnswer.trim()}
                        className="flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="h-4 w-4" />
                                Submit Answer
                            </>
                        )}
                    </Button>
                </div>

                {showFeedback && feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-gray-50 rounded-lg border"
                    >
                        <h3 className="font-semibold mb-2">Feedback:</h3>
                        <p>{feedback.feedback}</p>
                        <div className="mt-2">
                            <span className="font-medium">Rating: </span>
                            <span className="text-purple-600">{feedback.rating}/10</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export default RecordAnswerSection