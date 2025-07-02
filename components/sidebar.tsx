"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  User,
  Settings,
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { ExportButton } from "@/components/export-button"
import { Button } from "@/components/ui/button"
import type { Task } from "@/types/task"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  tasks?: Task[]
  isCollapsed: boolean
  onToggle: () => void
}

const menuItems = [
  { id: "board", label: "Dashboard", icon: LayoutDashboard, color: "from-blue-500 to-indigo-600" },
  { id: "analytics", label: "Analytics", icon: TrendingUp, color: "from-purple-500 to-pink-600" },
  { id: "reports", label: "Reports", icon: BarChart3, color: "from-emerald-500 to-teal-600" },
  { id: "activity", label: "Activity Logs", icon: Activity, color: "from-orange-500 to-red-600" },
  { id: "profile", label: "Profile", icon: User, color: "from-cyan-500 to-blue-600" },
  { id: "settings", label: "Settings", icon: Settings, color: "from-slate-500 to-slate-600" },
]

export function Sidebar({ currentPage, onPageChange, tasks, isCollapsed, onToggle }: SidebarProps) {
  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        width: isCollapsed ? "80px" : "256px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-r border-white/20 dark:border-slate-700/50 shadow-2xl relative"
    >
      {/* Toggle Button */}
      <Button
        onClick={onToggle}
        variant="ghost"
        size="sm"
        className="absolute -right-3 top-6 z-10 w-6 h-6 p-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:shadow-xl"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </Button>

      <div className="p-6">
        {/* Logo */}
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Premium Workspace</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r " + item.color + " text-white shadow-lg"
                    : "hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-white/20"
                      : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium text-sm whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </nav>

        {/* Export Button */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="mt-8"
            >
              <ExportButton tasks={tasks || []} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
