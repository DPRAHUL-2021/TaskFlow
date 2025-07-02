"use client"

import { motion } from "framer-motion"
import { LogOut, Settings, User, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"

interface HeaderProps {
  onSignOut: () => void
}

export function Header({ onSignOut }: HeaderProps) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    onSignOut()
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-30 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-700/50 shadow-lg"
    >
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Premium Logo */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Premium Workspace</p>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            <ThemeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-2xl hover:bg-white/50 dark:hover:bg-slate-800/50"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-white/50 dark:ring-slate-700/50 shadow-lg">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                      {user?.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-2xl rounded-2xl"
                align="end"
                forceMount
              >
                <div className="flex flex-col space-y-2 p-4">
                  <p className="text-lg font-bold leading-none text-slate-800 dark:text-slate-100">
                    {user?.name || "User"}
                  </p>
                  <p className="text-sm leading-none text-slate-500 dark:text-slate-400">
                    {user?.email || "user@taskflow.com"}
                  </p>
                </div>
                <DropdownMenuSeparator className="bg-slate-200/50 dark:bg-slate-700/50" />
                <DropdownMenuItem className="p-3 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 rounded-xl m-1">
                  <User className="mr-3 h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 rounded-xl m-1">
                  <Settings className="mr-3 h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-200/50 dark:bg-slate-700/50" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="p-3 hover:bg-red-100/50 dark:hover:bg-red-900/50 rounded-xl m-1 text-red-600 dark:text-red-400"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span className="font-medium">Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
