"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle, PlusCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and answer field on JSON`

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')

            if (MockJsonResp) {
                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: MockJsonResp,
                        jobPosition: jobPosition,
                        jobDesc: jobDesc,
                        jobExperience: jobExperience,
                        createdAt: moment().format('DD-MM-YYYY')
                    }).returning({ mockId: MockInterview.mockId });

                if (resp) {
                    router.push('/interview/interview/' + resp[0]?.mockId)
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setOpenDialog(false)
        }
    }

    return (
        <div>
            <Button onClick={() => setOpenDialog(true)} className='flex items-center gap-2'>
                <PlusCircle className='h-5 w-5' />
                Add New Interview
            </Button>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Interview</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new mock interview.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit} className='space-y-4'>
                        <div>
                            <label htmlFor="jobPosition" className='text-sm font-medium text-gray-700'>Job Position</label>
                            <Input
                                id="jobPosition"
                                value={jobPosition}
                                onChange={(e) => setJobPosition(e.target.value)}
                                placeholder='e.g. Frontend Developer'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="jobDesc" className='text-sm font-medium text-gray-700'>Job Description</label>
                            <Textarea
                                id="jobDesc"
                                value={jobDesc}
                                onChange={(e) => setJobDesc(e.target.value)}
                                placeholder='Enter job description...'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="jobExperience" className='text-sm font-medium text-gray-700'>Years of Experience</label>
                            <Input
                                id="jobExperience"
                                value={jobExperience}
                                onChange={(e) => setJobExperience(e.target.value)}
                                placeholder='e.g. 2'
                                type='number'
                                required
                            />
                        </div>

                        <Button type='submit' className='w-full' disabled={loading}>
                            {loading ? (
                                <LoaderCircle className='h-5 w-5 animate-spin' />
                            ) : (
                                'Create Interview'
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview