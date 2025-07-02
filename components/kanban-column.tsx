"use client"

import { motion } from "framer-motion"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { TaskCard } from "@/components/task-card"
import type { Task, TaskStatus } from "@/types/task"
import { Plus, Sparkles } from "lucide-react"

interface KanbanColumnProps {
  id: TaskStatus
  title: string
  color: string
  gradient: string
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

export function KanbanColumn({ id, title, color, gradient, tasks, onEditTask, onDeleteTask }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <motion.div
      ref={setNodeRef}
      className={`relative rounded-2xl p-3 transition-all duration-500 h-full flex flex-col ${
        isOver
          ? "ring-4 ring-blue-400/50 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 scale-105 shadow-2xl"
          : "shadow-xl hover:shadow-2xl"
      }`}
      style={{
        background: `linear-gradient(135deg, ${gradient.includes("dark:") ? gradient.split("dark:")[0] : gradient})`,
      }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-white/10"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* More Compact Column Header */}
        <div className="mb-3">
          <div className={`bg-gradient-to-r ${color} rounded-xl p-3 mb-3 shadow-lg`}>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-white" />
              <h2 className="text-white font-bold text-base text-center">{title}</h2>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex items-center justify-between bg-white/60 dark:bg-black/30 rounded-xl p-2 backdrop-blur-sm">
            <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
            <div
              className={`w-6 h-6 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}
            >
              {tasks.length}
            </div>
          </div>
        </div>

        {/* Tasks Container with better spacing */}
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 flex-1 overflow-y-auto max-h-[calc(100vh-400px)]">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <TaskCard task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
              </motion.div>
            ))}

            {tasks.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 text-slate-500 dark:text-slate-400"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center mb-3 shadow-lg">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold mb-1">No tasks yet</p>
                <p className="text-xs text-center max-w-xs">Drag tasks here or create new ones</p>
              </motion.div>
            )}
          </div>
        </SortableContext>
      </div>
    </motion.div>
  )
}
