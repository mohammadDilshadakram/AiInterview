import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Calendar, Briefcase } from 'lucide-react'

function InterviewItemCard({interview}) {
    const router = useRouter();

    const onStart = () => {
        router.push('/interview/interview/' + interview?.mockId)
    }

    const onFeedbackPress = () => {
        router.push('/interview/interview/' + interview.mockId + "/feedback")
    }
    
    return (
        <div className='bg-white border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300'>
            <div className='flex flex-col h-full'>
                <div className='flex-grow'>
                    <h2 className='font-bold text-xl text-purple-700 mb-2'>{interview?.jobPosition}</h2>
                    <div className='space-y-2 mb-4'>
                        <div className='flex items-center text-gray-600'>
                            <Briefcase className='w-4 h-4 mr-2' />
                            <span className='text-sm'>{interview?.jobExperience} Years of Experience</span>
                        </div>
                        <div className='flex items-center text-gray-500'>
                            <Calendar className='w-4 h-4 mr-2' />
                            <span className='text-xs'>Created: {interview.createdAt}</span>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between gap-4 mt-4'>
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:text-purple-800"
                        onClick={onFeedbackPress}
                    >
                        Feedback
                    </Button>
                    <Button 
                        size="sm" 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={onStart}
                    >
                        Start
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewItemCard