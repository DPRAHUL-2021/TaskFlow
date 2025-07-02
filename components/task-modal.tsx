"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Flag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Task, TaskPriority } from "@/types/task"
import { Slider } from "@/components/ui/slider"

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: Partial<Task>) => void
  task?: Task | null
}

const assignees = [
  { name: "Alice Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
  { name: "Bob Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
  { name: "Carol Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" },
  { name: "David Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david" },
  { name: "Eve Brown", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eve" },
]

export function TaskModal({ isOpen, onClose, onSubmit, task }: TaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as TaskPriority,
    assignee: assignees[0],
    progress: 0,
  })

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        assignee: task.assignee,
        progress: task.progress,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        assignee: assignees[0],
        progress: 0,
      })
    }
  }, [task, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    onSubmit(formData)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Compact Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/50"
          >
            {/* Compact Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {task ? "Edit Task" : "New Task"}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Compact Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                  Task Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title..."
                  className="h-10 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-xl backdrop-blur-sm"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your task..."
                  className="min-h-[80px] bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-xl backdrop-blur-sm resize-none"
                />
              </div>

              {/* Priority & Assignee Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block flex items-center gap-1">
                    <Flag className="w-3 h-3" />
                    Priority
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: TaskPriority) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger className="h-10 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-xl backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl border border-white/30 dark:border-slate-700/50 rounded-xl">
                      <SelectItem value="low" className="rounded-lg">
                        🟢 Low
                      </SelectItem>
                      <SelectItem value="medium" className="rounded-lg">
                        🟡 Medium
                      </SelectItem>
                      <SelectItem value="high" className="rounded-lg">
                        🔴 High
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block flex items-center gap-1">
                    <User className="w-3 h-3" />
                    Assignee
                  </Label>
                  <Select
                    value={formData.assignee.name}
                    onValueChange={(value) => {
                      const assignee = assignees.find((a) => a.name === value) || assignees[0]
                      setFormData({ ...formData, assignee })
                    }}
                  >
                    <SelectTrigger className="h-10 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-xl backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl border border-white/30 dark:border-slate-700/50 rounded-xl">
                      {assignees.map((assignee) => (
                        <SelectItem key={assignee.name} value={assignee.name} className="rounded-lg">
                          {assignee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Progress (only for editing) */}
              {task && (
                <div>
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Progress: {formData.progress}%
                  </Label>
                  <div className="bg-white/50 dark:bg-black/30 border border-white/30 dark:border-white/20 rounded-xl p-3 backdrop-blur-sm">
                    <Slider
                      value={[formData.progress]}
                      onValueChange={(value) => setFormData({ ...formData, progress: value[0] })}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* Compact Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-10 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-xl backdrop-blur-sm hover:bg-white/70 dark:hover:bg-black/50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {task ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
