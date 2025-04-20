"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetInterviews();
    }, [])

    const GetInterviews = async () => {
        try {
            const result = await db.select()
                .from(MockInterview)
                .orderBy(desc(MockInterview.createdAt));
            setInterviews(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white p-6 rounded-xl shadow-md">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview) => (
                <InterviewItemCard key={interview.mockId} interview={interview} />
            ))}
        </div>
    )
}

export default InterviewList