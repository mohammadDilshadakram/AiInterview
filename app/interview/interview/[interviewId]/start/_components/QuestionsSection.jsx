"use client"
import React, { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Lightbulb, Volume2, HelpCircle, Pause, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

const containerVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { 
		opacity: 1, 
		y: 0,
		transition: { 
			type: "spring",
			stiffness: 100,
			damping: 15,
			staggerChildren: 0.1,
			delayChildren: 0.2
		}
	}
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 }
}

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
	const [isSpeaking, setIsSpeaking] = useState(false)

	const textToSpeech = useCallback((text) => {
		if ('speechSynthesis' in window) {
			window.speechSynthesis.cancel() // Cancel any ongoing speech
			const speech = new SpeechSynthesisUtterance(text)
			speech.lang = 'en-US'
			speech.rate = 0.9
			speech.onstart = () => setIsSpeaking(true)
			speech.onend = () => setIsSpeaking(false)
			window.speechSynthesis.speak(speech)
		} else {
			toast.error('Sorry, your browser does not support text to speech')
		}
	}, [])

	const handleSpeechControl = useCallback(() => {
		if (isSpeaking) {
			window.speechSynthesis.pause()
			setIsSpeaking(false)
		} else {
			if (window.speechSynthesis.paused) {
				window.speechSynthesis.resume()
			} else {
				textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
			}
			setIsSpeaking(true)
		}
	}, [isSpeaking, mockInterviewQuestion, activeQuestionIndex, textToSpeech])

	const questionButtons = useMemo(() => 
		mockInterviewQuestion?.map((question, index) => (
			<motion.div key={index} variants={itemVariants}>
				<Button
					variant={activeQuestionIndex === index ? "default" : "outline"}
					className={`p-2 rounded-full text-xs md:text-sm ${
						activeQuestionIndex === index ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-purple-600 hover:bg-purple-100'
					}`}
				>
					Q{index + 1}
				</Button>
			</motion.div>
		)),
		[mockInterviewQuestion, activeQuestionIndex]
	)

	if (!mockInterviewQuestion) return null

	return (
		<motion.div 
			className='p-6 border rounded-xl bg-white shadow-lg'
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div 
				className='flex flex-wrap gap-3 mb-6 justify-center'
				variants={itemVariants}
			>
				{questionButtons}
			</motion.div>
			<AnimatePresence mode="wait">
				<motion.div 
					key={activeQuestionIndex}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ type: "spring", stiffness: 100 }}
					className='space-y-4'
				>
					<h2 className='my-5 text-xl md:text-2xl font-bold text-purple-800'>
						<HelpCircle className="inline-block mr-2 h-6 w-6 text-purple-600" />
						{mockInterviewQuestion[activeQuestionIndex]?.question}
					</h2>
					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							size="sm"
							className='flex items-center text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-300'
							onClick={handleSpeechControl}
							aria-label={isSpeaking ? "Pause speech" : "Listen to question"}
						>
							{isSpeaking ? <Pause className='mr-2 h-4 w-4' /> : <Play className='mr-2 h-4 w-4' />}
							{isSpeaking ? 'Pause' : 'Listen to Question'}
						</Button>
						{isSpeaking && (
							<motion.div 
								className="w-4 h-4 bg-purple-600 rounded-full"
								animate={{ scale: [1, 1.2, 1] }}
								transition={{ repeat: Infinity, duration: 1 }}
							/>
						)}
					</div>
				</motion.div>
			</AnimatePresence>
			<motion.div 
				className='border rounded-lg p-5 bg-gradient-to-r from-blue-50 to-purple-50 mt-8'
				variants={itemVariants}
			>
				<h2 className='flex gap-2 items-center text-blue-600 mb-2'> 
					<Lightbulb className='h-5 w-5'/>
					<strong>Note:</strong>
				</h2>
				<p className='text-sm text-blue-700 leading-relaxed'>
					{process.env.NEXT_PUBLIC_QUESTION_NOTE}
				</p>
			</motion.div>
		</motion.div>
	)
}

export default QuestionsSection