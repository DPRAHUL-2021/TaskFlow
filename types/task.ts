export type TaskStatus = "todo" | "in-progress" | "done" | string
export type TaskPriority = "low" | "medium" | "high"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: {
    name: string
    avatar: string
  }
  progress: number
  createdAt: Date
  updatedAt: Date
}

export interface Column {
  id: string
  title: string
  color: string
  gradient: string
  order: number
}
