"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Clock, Users, CheckCircle, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { Task } from "@/types/task"

interface ReportsPageProps {
  tasks: Task[]
}

export function ReportsPage({ tasks }: ReportsPageProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "done").length
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress").length
  const todoTasks = tasks.filter((task) => task.status === "todo").length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const highPriorityTasks = tasks.filter((task) => task.priority === "high").length
  const mediumPriorityTasks = tasks.filter((task) => task.priority === "medium").length
  const lowPriorityTasks = tasks.filter((task) => task.priority === "low").length

  const averageProgress =
    totalTasks > 0 ? Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / totalTasks) : 0

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: BarChart3,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      color: "from-emerald-500 to-green-600",
      bgColor: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20",
    },
    {
      title: "To Do",
      value: todoTasks,
      icon: AlertCircle,
      color: "from-slate-500 to-slate-600",
      bgColor: "from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700",
    },
  ]

  return (
    <div className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
            Reports & Insights
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Track your team's progress and productivity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`bg-gradient-to-br ${stat.bgColor} rounded-3xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.title}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Completion Rate */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Completion Rate</h2>
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-2">
                {completionRate}%
              </div>
              <p className="text-slate-600 dark:text-slate-400">of tasks completed</p>
            </div>

            <Progress value={completionRate} className="h-4 mb-4" />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">{todoTasks}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">To Do</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">{inProgressTasks}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">{completedTasks}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Completed</div>
              </div>
            </div>
          </motion.div>

          {/* Priority Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Priority Breakdown</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-red-600">🔴 High Priority</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{highPriorityTasks}</span>
                </div>
                <Progress value={totalTasks > 0 ? (highPriorityTasks / totalTasks) * 100 : 0} className="h-3" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-amber-600">🟡 Medium Priority</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{mediumPriorityTasks}</span>
                </div>
                <Progress value={totalTasks > 0 ? (mediumPriorityTasks / totalTasks) * 100 : 0} className="h-3" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-emerald-600">🟢 Low Priority</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{lowPriorityTasks}</span>
                </div>
                <Progress value={totalTasks > 0 ? (lowPriorityTasks / totalTasks) * 100 : 0} className="h-3" />
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-1">{averageProgress}%</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Average Progress</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Team Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalTasks}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Tasks Created</div>
            </div>
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{completedTasks}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Tasks Completed</div>
            </div>
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">{averageProgress}%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Average Progress</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
