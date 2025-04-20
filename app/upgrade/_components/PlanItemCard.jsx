"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

function PlanItemCard({ plan }) {
    return (
        <div className={`bg-white p-8 rounded-2xl shadow-lg border-2 ${plan.popular ? 'border-purple-500' : 'border-gray-200'}`}>
            {plan.popular && (
                <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                    Most Popular
                </div>
            )}
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-gray-500 mt-2">{plan.description}</p>
            <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-500">/month</span>
            </div>
            <ul className="mt-8 space-y-4">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-purple-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                    </li>
                ))}
            </ul>
            <Button className="w-full mt-8">
                Get Started
            </Button>
        </div>
    )
}

export default PlanItemCard