"use client"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"

interface FloatingActionButtonProps {
  onClick: () => void
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-50 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Plus className="w-7 h-7" />

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Add New Task
        <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-100"></div>
      </div>
    </motion.button>
  )
}
