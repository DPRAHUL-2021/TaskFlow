"use client"

import { useState, useEffect } from "react"
import { KanbanBoard } from "@/components/kanban-board"
import { AuthFlow } from "@/components/auth-flow"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    setIsAuthenticated(authStatus === "true")
    setIsLoading(false)
  }, [])

  const handleSignIn = (userData: any) => {
    setIsAuthenticated(true)
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main>
        {isAuthenticated ? <KanbanBoard onSignOut={handleSignOut} /> : <AuthFlow onSignIn={handleSignIn} />}
        <Toaster position="top-right" />
      </main>
    </ThemeProvider>
  )
}
