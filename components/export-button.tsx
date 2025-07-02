"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Check, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Task } from "@/types/task"
import toast from "react-hot-toast"
import confetti from "canvas-confetti"

interface ExportButtonProps {
  tasks: Task[]
  onExport?: () => void
}

export function ExportButton({ tasks, onExport }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const generatePDF = () => {
    // Create a comprehensive HTML report
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>TaskFlow Project Report</title>
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                margin: 0; 
                padding: 40px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #333;
            }
            .container { 
                max-width: 800px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 20px; 
                padding: 40px; 
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .header { 
                text-align: center; 
                margin-bottom: 40px; 
                border-bottom: 3px solid #667eea; 
                padding-bottom: 20px;
            }
            .header h1 { 
                color: #667eea; 
                font-size: 2.5em; 
                margin: 0; 
                font-weight: 700;
            }
            .header p { 
                color: #666; 
                font-size: 1.1em; 
                margin: 10px 0 0 0;
            }
            .stats { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
                gap: 20px; 
                margin-bottom: 40px;
            }
            .stat-card { 
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); 
                color: white; 
                padding: 20px; 
                border-radius: 15px; 
                text-align: center;
            }
            .stat-number { 
                font-size: 2.5em; 
                font-weight: bold; 
                margin-bottom: 5px;
            }
            .stat-label { 
                font-size: 0.9em; 
                opacity: 0.9;
            }
            .section { 
                margin-bottom: 40px;
            }
            .section h2 { 
                color: #667eea; 
                border-bottom: 2px solid #eee; 
                padding-bottom: 10px; 
                font-size: 1.5em;
            }
            .task { 
                background: #f8f9ff; 
                border: 1px solid #e1e5f2; 
                border-radius: 12px; 
                padding: 20px; 
                margin-bottom: 15px;
            }
            .task-header { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                margin-bottom: 10px;
            }
            .task-title { 
                font-weight: 600; 
                font-size: 1.1em; 
                color: #333;
            }
            .priority { 
                padding: 4px 12px; 
                border-radius: 20px; 
                font-size: 0.8em; 
                font-weight: 600; 
                text-transform: uppercase;
            }
            .priority.high { 
                background: #fee2e2; 
                color: #dc2626;
            }
            .priority.medium { 
                background: #fef3c7; 
                color: #d97706;
            }
            .priority.low { 
                background: #d1fae5; 
                color: #059669;
            }
            .task-description { 
                color: #666; 
                margin-bottom: 15px; 
                line-height: 1.5;
            }
            .task-meta { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                font-size: 0.9em; 
                color: #888;
            }
            .progress-bar { 
                width: 100px; 
                height: 8px; 
                background: #e5e7eb; 
                border-radius: 4px; 
                overflow: hidden;
            }
            .progress-fill { 
                height: 100%; 
                background: linear-gradient(90deg, #10b981, #059669); 
                transition: width 0.3s ease;
            }
            .footer { 
                text-align: center; 
                margin-top: 40px; 
                padding-top: 20px; 
                border-top: 1px solid #eee; 
                color: #888; 
                font-size: 0.9em;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>⚡ TaskFlow Project Report</h1>
                <p>Generated on ${new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
            </div>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number">${tasks.length}</div>
                    <div class="stat-label">Total Tasks</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${tasks.filter((t) => t.status === "done").length}</div>
                    <div class="stat-label">Completed</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${tasks.filter((t) => t.status === "in-progress").length}</div>
                    <div class="stat-label">In Progress</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${Math.round(tasks.length > 0 ? (tasks.filter((t) => t.status === "done").length / tasks.length) * 100 : 0)}%</div>
                    <div class="stat-label">Completion Rate</div>
                </div>
            </div>

            <div class="section">
                <h2>📋 All Tasks</h2>
                ${tasks
                  .map(
                    (task) => `
                    <div class="task">
                        <div class="task-header">
                            <div class="task-title">${task.title}</div>
                            <div class="priority ${task.priority}">${task.priority}</div>
                        </div>
                        <div class="task-description">${task.description}</div>
                        <div class="task-meta">
                            <span>👤 ${task.assignee.name}</span>
                            <span>📅 ${task.createdAt.toLocaleDateString()}</span>
                            <span>📊 Status: ${task.status.replace("-", " ").toUpperCase()}</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${task.progress}%"></div>
                            </div>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>

            <div class="footer">
                <p>📊 This report was generated by TaskFlow - Premium Project Management</p>
                <p>🚀 Manage your tasks with extraordinary style and unmatched efficiency</p>
            </div>
        </div>
    </body>
    </html>
    `

    // Create and download the HTML file (which can be printed as PDF)
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `TaskFlow-Report-${new Date().toISOString().split("T")[0]}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Also create a simple text summary
    const textSummary = `
TASKFLOW PROJECT REPORT
Generated: ${new Date().toLocaleDateString()}

SUMMARY:
- Total Tasks: ${tasks.length}
- Completed: ${tasks.filter((t) => t.status === "done").length}
- In Progress: ${tasks.filter((t) => t.status === "in-progress").length}
- To Do: ${tasks.filter((t) => t.status === "todo").length}
- Completion Rate: ${Math.round(tasks.length > 0 ? (tasks.filter((t) => t.status === "done").length / tasks.length) * 100 : 0)}%

TASK DETAILS:
${tasks
  .map(
    (task) => `
• ${task.title}
  Priority: ${task.priority.toUpperCase()}
  Status: ${task.status.replace("-", " ").toUpperCase()}
  Assignee: ${task.assignee.name}
  Progress: ${task.progress}%
  Description: ${task.description}
  Created: ${task.createdAt.toLocaleDateString()}
`,
  )
  .join("\n")}

Generated by TaskFlow - Premium Project Management
    `

    const textBlob = new Blob([textSummary], { type: "text/plain" })
    const textUrl = URL.createObjectURL(textBlob)
    const textLink = document.createElement("a")
    textLink.href = textUrl
    textLink.download = `TaskFlow-Summary-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(textLink)
    textLink.click()
    document.body.removeChild(textLink)
    URL.revokeObjectURL(textUrl)
  }

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    generatePDF()

    setIsExporting(false)
    setIsComplete(true)

    // Epic confetti celebration
    const duration = 2000
    const animationEnd = Date.now() + duration

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        origin: { x: 0.1, y: 0.7 },
        zIndex: 1000,
      })
    }, 250)

    toast.success("🎉 Report exported successfully! Check your downloads.")

    // Reset after animation
    setTimeout(() => setIsComplete(false), 3000)

    if (onExport) onExport()
  }

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="w-full h-12 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl font-semibold group"
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        animate={isExporting ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.6, repeat: isExporting ? Number.POSITIVE_INFINITY : 0 }}
      >
        {isComplete ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Exported!</span>
          </motion.div>
        ) : (
          <div className="flex items-center gap-2">
            <motion.div
              animate={isExporting ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isExporting ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
            >
              {isExporting ? <FileText className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            </motion.div>
            <span>{isExporting ? "Exporting..." : "Export PDF"}</span>
          </div>
        )}
      </motion.div>
    </Button>
  )
}
