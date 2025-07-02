"use client"

import { motion } from "framer-motion"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Edit2, Trash2, Clock, Star } from "lucide-react"
import type { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  isDragging?: boolean
}

const priorityConfig = {
  low: {
    color:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700/50",
    icon: "🟢",
  },
  medium: {
    color:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700/50",
    icon: "🟡",
  },
  high: {
    color: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700/50",
    icon: "🔴",
  },
}

export function TaskCard({ task, onEdit, onDelete, isDragging = false }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (isDragging || isSortableDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl border-2 border-blue-400/50 backdrop-blur-sm rotate-3 scale-105"
      >
        <TaskCardContent task={task} onEdit={onEdit} onDelete={onDelete} />
      </div>
    )
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/60 dark:border-slate-700/60 cursor-grab active:cursor-grabbing group hover:shadow-lg hover:border-slate-300/80 dark:hover:border-slate-600/80 transition-all duration-200 mb-4"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <TaskCardContent task={task} onEdit={onEdit} onDelete={onDelete} />
    </motion.div>
  )
}

function TaskCardContent({ task, onEdit, onDelete }: Omit<TaskCardProps, "isDragging">) {
  const priorityInfo = priorityConfig[task.priority]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <Badge className={`text-xs font-medium px-2.5 py-1 border ${priorityInfo.color}`}>
              <span className="mr-1.5">{priorityInfo.icon}</span>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            {task.priority === "high" && <Star className="w-4 h-4 text-amber-500 fill-current flex-shrink-0" />}
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base leading-snug line-clamp-2 pr-2">
            {task.title}
          </h3>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ml-3 flex-shrink-0">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(task)
            }}
            className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
          >
            <Edit2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(task.id)
            }}
            className="h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
          </Button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">{task.description}</p>
      )}

      {/* Progress Bar */}
      {task.progress > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Progress</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
              {task.progress}%
            </span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center space-x-2.5">
          <Avatar className="w-7 h-7 ring-2 ring-white dark:ring-slate-700 shadow-sm">
            <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
            <AvatarFallback className="text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {task.assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium truncate">{task.assignee.name}</span>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2.5 py-1.5 rounded-lg">
          <Clock className="w-3 h-3" />
          <span>{task.updatedAt.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}
