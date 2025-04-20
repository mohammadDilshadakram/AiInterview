import React from 'react'
import Header from './_components/Header'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-[var(--header-height)]">
        {children}
      </main>
    </div>
  )
}