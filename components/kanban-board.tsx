"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanColumn } from "@/components/kanban-column"
import { TaskCard } from "@/components/task-card"
import { FloatingActionButton } from "@/components/floating-action-button"
import { Header } from "@/components/header"
import { TaskModal } from "@/components/task-modal"
import { Sidebar } from "@/components/sidebar"
import { ProfilePage } from "@/components/profile-page"
import { SettingsPage } from "@/components/settings-page"
import { ReportsPage } from "@/components/reports-page"
import { AnalyticsPage } from "@/components/analytics-page"
import { ActivityLogsPage } from "@/components/activity-logs-page"
import { ColumnModal } from "@/components/column-modal"
import type { Task, TaskStatus, Column } from "@/types/task"
import { generateId } from "@/lib/utils"
import toast from "react-hot-toast"

interface KanbanBoardProps {
  onSignOut: () => void
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "from-slate-500 to-slate-600",
    gradient: "from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700",
    order: 0,
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "from-blue-500 to-indigo-600",
    gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    order: 1,
  },
  {
    id: "done",
    title: "Done",
    color: "from-emerald-500 to-green-600",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    order: 2,
  },
]

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design Premium Landing Page",
    description: "Create a stunning, modern landing page with hero section, features showcase, and testimonials",
    status: "todo",
    priority: "high",
    assignee: {
      name: "Alice Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    },
    progress: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Implement Advanced Authentication",
    description: "Set up secure login, registration, 2FA, and password reset with OAuth integration",
    status: "in-progress",
    priority: "high",
    assignee: {
      name: "Bob Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    },
    progress: 75,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "API Documentation & Testing",
    description: "Complete API documentation with interactive examples and comprehensive test coverage",
    status: "done",
    priority: "medium",
    assignee: {
      name: "Carol Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
    },
    progress: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export function KanbanBoard({ onSignOut }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [currentPage, setCurrentPage] = useState("board")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  )

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id)
    setActiveTask(task || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as TaskStatus

    if (columns.some((col) => col.id === newStatus)) {
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date() } : task)),
      )

      toast.success(`✨ Task moved to ${columns.find((col) => col.id === newStatus)?.title}!`)
    }
  }

  const handleCreateTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: generateId(),
      title: taskData.title || "",
      description: taskData.description || "",
      status: "todo",
      priority: taskData.priority || "medium",
      assignee: taskData.assignee || {
        name: "Unassigned",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=unassigned",
      },
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setTasks((prev) => [...prev, newTask])
    toast.success("🎉 Task created successfully!")
  }

  const handleUpdateTask = (taskData: Partial<Task>) => {
    if (!editingTask) return

    setTasks((prev) =>
      prev.map((task) => (task.id === editingTask.id ? { ...task, ...taskData, updatedAt: new Date() } : task)),
    )

    toast.success("✅ Task updated successfully!")
    setEditingTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    toast.success("🗑️ Task deleted successfully!")
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const handleCreateColumn = (columnData: { title: string; color: string }) => {
    const newColumn: Column = {
      id: generateId(),
      title: columnData.title,
      color: columnData.color,
      gradient: `from-${columnData.color.split("-")[1]}-50 to-${columnData.color.split("-")[1]}-100 dark:from-${columnData.color.split("-")[1]}-900/20 dark:to-${columnData.color.split("-")[1]}-900/20`,
      order: columns.length,
    }

    setColumns((prev) => [...prev, newColumn])
    toast.success("🎉 New column created successfully!")
  }

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <ProfilePage />
      case "settings":
        return <SettingsPage />
      case "reports":
        return <ReportsPage tasks={tasks} />
      case "analytics":
        return <AnalyticsPage tasks={tasks} />
      case "activity":
        return <ActivityLogsPage tasks={tasks} />
      default:
        return (
          <main className="flex-1 p-8 overflow-hidden">
            {/* Clean Header Section */}
            <div className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                  Project Dashboard
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Manage your tasks with extraordinary style and unmatched efficiency
                </p>
              </motion.div>
            </div>

            {/* Kanban Board */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="flex gap-8 overflow-x-auto pb-6 min-h-[calc(100vh-320px)]">
                <SortableContext items={columns.map((col) => col.id)} strategy={horizontalListSortingStrategy}>
                  {columns
                    .sort((a, b) => a.order - b.order)
                    .map((column, index) => (
                      <motion.div
                        key={column.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="flex-shrink-0 w-96"
                      >
                        <KanbanColumn
                          id={column.id}
                          title={column.title}
                          color={column.color}
                          gradient={column.gradient}
                          tasks={getTasksByStatus(column.id as TaskStatus)}
                          onEditTask={handleEditTask}
                          onDeleteTask={handleDeleteTask}
                        />
                      </motion.div>
                    ))}
                </SortableContext>

                {/* Add Column Button - Clean Design */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex-shrink-0 w-80"
                >
                  <button
                    onClick={() => setIsColumnModalOpen(true)}
                    className="w-full h-40 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <span className="text-white text-2xl font-bold">+</span>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">Add New Column</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Create a custom workflow stage</p>
                    </div>
                  </button>
                </motion.div>
              </div>

              <DragOverlay>
                {activeTask && (
                  <div className="rotate-6 scale-110 opacity-95">
                    <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} isDragging />
                  </div>
                )}
              </DragOverlay>
            </DndContext>
          </main>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        tasks={tasks}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onSignOut={onSignOut} />
        {renderPage()}
      </div>

      {currentPage === "board" && <FloatingActionButton onClick={() => setIsTaskModalOpen(true)} />}

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false)
          setEditingTask(null)
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />

      <ColumnModal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        onSubmit={handleCreateColumn}
      />
    </div>
  )
}
