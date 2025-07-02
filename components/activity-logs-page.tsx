"use client"

import { motion } from "framer-motion"
import { Activity, Clock, Edit, Plus, Trash, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/types/task"

interface ActivityLogsPageProps {
  tasks: Task[]
}

interface ActivityLog {
  id: string
  type: "created" | "updated" | "completed" | "deleted" | "moved"
  user: {
    name: string
    avatar: string
  }
  task: string
  timestamp: Date
  details?: string
}

export function ActivityLogsPage({ tasks }: ActivityLogsPageProps) {
  // Generate mock activity logs based on tasks
  const generateActivityLogs = (): ActivityLog[] => {
    const logs: ActivityLog[] = []
    const users = [
      { name: "Alice Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
      { name: "Bob Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
      { name: "Carol Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" },
    ]

    tasks.forEach((task, index) => {
      const user = users[index % users.length]

      // Task created
      logs.push({
        id: `${task.id}-created`,
        type: "created",
        user,
        task: task.title,
        timestamp: task.createdAt,
        details: `Created new task with ${task.priority} priority`,
      })

      // Task updated (if progress > 0)
      if (task.progress > 0 && task.progress < 100) {
        logs.push({
          id: `${task.id}-updated`,
          type: "updated",
          user,
          task: task.title,
          timestamp: new Date(task.updatedAt.getTime() - 1000 * 60 * 30), // 30 minutes ago
          details: `Updated progress to ${task.progress}%`,
        })
      }

      // Task completed
      if (task.status === "done") {
        logs.push({
          id: `${task.id}-completed`,
          type: "completed",
          user,
          task: task.title,
          timestamp: task.updatedAt,
          details: "Marked task as completed",
        })
      }

      // Task moved
      if (task.status === "in-progress") {
        logs.push({
          id: `${task.id}-moved`,
          type: "moved",
          user,
          task: task.title,
          timestamp: new Date(task.updatedAt.getTime() - 1000 * 60 * 60), // 1 hour ago
          details: "Moved from To Do to In Progress",
        })
      }
    })

    return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  const activityLogs = generateActivityLogs()

  const getActivityIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "created":
        return <Plus className="w-4 h-4" />
      case "updated":
        return <Edit className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "deleted":
        return <Trash className="w-4 h-4" />
      case "moved":
        return <Activity className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: ActivityLog["type"]) => {
    switch (type) {
      case "created":
        return "from-blue-500 to-indigo-600"
      case "updated":
        return "from-amber-500 to-orange-600"
      case "completed":
        return "from-emerald-500 to-green-600"
      case "deleted":
        return "from-red-500 to-red-600"
      case "moved":
        return "from-purple-500 to-pink-600"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  const getActivityBadge = (type: ActivityLog["type"]) => {
    switch (type) {
      case "created":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Created</Badge>
      case "updated":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Updated</Badge>
      case "completed":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            Completed
          </Badge>
        )
      case "deleted":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Deleted</Badge>
      case "moved":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">Moved</Badge>
      default:
        return <Badge>Activity</Badge>
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
  }

  return (
    <div className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
            Activity Logs
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Track all team activities and task changes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 shadow-lg"
          >
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {activityLogs.filter((log) => log.type === "created").length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Tasks Created</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 shadow-lg"
          >
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {activityLogs.filter((log) => log.type === "completed").length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Tasks Completed</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 shadow-lg"
          >
            <div className="text-2xl font-bold text-amber-600 mb-1">
              {activityLogs.filter((log) => log.type === "updated").length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Updates Made</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 shadow-lg"
          >
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {activityLogs.filter((log) => log.type === "moved").length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Tasks Moved</div>
          </motion.div>
        </div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Recent Activity</h2>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {activityLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors"
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${getActivityColor(log.type)} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                >
                  {getActivityIcon(log.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={log.user.avatar || "/placeholder.svg"} alt={log.user.name} />
                      <AvatarFallback className="text-xs">
                        {log.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{log.user.name}</span>
                    {getActivityBadge(log.type)}
                  </div>

                  <div className="text-slate-700 dark:text-slate-300 mb-1">
                    <span className="font-medium">{log.task}</span>
                  </div>

                  {log.details && <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">{log.details}</div>}

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(log.timestamp)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {activityLogs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400">No activity logs yet</p>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Start creating and managing tasks to see activity here
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
