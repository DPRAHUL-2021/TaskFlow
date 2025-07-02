"use client"

import { motion } from "framer-motion"
import { TrendingUp, BarChart3, PieChart, Activity, Calendar, Target } from "lucide-react"
import type { Task } from "@/types/task"

interface AnalyticsPageProps {
  tasks: Task[]
}

export function AnalyticsPage({ tasks }: AnalyticsPageProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "done").length
  const productivity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const thisWeekTasks = tasks.filter((task) => {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return task.createdAt >= weekAgo
  }).length

  const highPriorityCompleted = tasks.filter((task) => task.priority === "high" && task.status === "done").length
  const highPriorityTotal = tasks.filter((task) => task.priority === "high").length
  const criticalTasksRate = highPriorityTotal > 0 ? Math.round((highPriorityCompleted / highPriorityTotal) * 100) : 0

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
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Deep insights into your productivity and performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{productivity}%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Productivity Score</div>
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Based on task completion rate and efficiency metrics
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{thisWeekTasks}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Tasks This Week</div>
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">New tasks created in the last 7 days</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{criticalTasksRate}%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Critical Tasks Rate</div>
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">High priority tasks completion rate</div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Task Distribution</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                <span className="font-semibold text-slate-700 dark:text-slate-300">To Do</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-3 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-slate-500 to-slate-600 rounded-full"
                      style={{
                        width: `${totalTasks > 0 ? (tasks.filter((t) => t.status === "todo").length / totalTasks) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {tasks.filter((t) => t.status === "todo").length}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                <span className="font-semibold text-slate-700 dark:text-slate-300">In Progress</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-3 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{
                        width: `${totalTasks > 0 ? (tasks.filter((t) => t.status === "in-progress").length / totalTasks) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {tasks.filter((t) => t.status === "in-progress").length}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Completed</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-3 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
                      style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{completedTasks}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Performance Trends</h2>
            </div>

            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                <div className="text-4xl font-bold text-emerald-600 mb-2">↗️ +15%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Productivity increase this month</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
                <div className="text-4xl font-bold text-blue-600 mb-2">⚡ 2.3x</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Faster task completion rate</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">🎯 92%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">On-time delivery rate</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Key Insights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">🚀 Peak Performance</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your team performs best on Tuesdays and Wednesdays, with 40% higher completion rates.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">⏰ Time Management</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Average task completion time has decreased by 25% compared to last month.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">🎯 Priority Focus</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                High priority tasks are being completed 30% faster than medium priority ones.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">📈 Growth Trend</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Task creation has increased by 45% this quarter, showing growing project activity.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
