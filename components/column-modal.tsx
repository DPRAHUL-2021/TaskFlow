"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Palette, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColumnModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { title: string; color: string }) => void
}

const colorOptions = [
  { name: "Blue", value: "from-blue-500 to-blue-600", preview: "bg-gradient-to-r from-blue-500 to-blue-600" },
  { name: "Purple", value: "from-purple-500 to-purple-600", preview: "bg-gradient-to-r from-purple-500 to-purple-600" },
  { name: "Green", value: "from-green-500 to-green-600", preview: "bg-gradient-to-r from-green-500 to-green-600" },
  { name: "Red", value: "from-red-500 to-red-600", preview: "bg-gradient-to-r from-red-500 to-red-600" },
  { name: "Orange", value: "from-orange-500 to-orange-600", preview: "bg-gradient-to-r from-orange-500 to-orange-600" },
  { name: "Pink", value: "from-pink-500 to-pink-600", preview: "bg-gradient-to-r from-pink-500 to-pink-600" },
  { name: "Indigo", value: "from-indigo-500 to-indigo-600", preview: "bg-gradient-to-r from-indigo-500 to-indigo-600" },
  { name: "Teal", value: "from-teal-500 to-teal-600", preview: "bg-gradient-to-r from-teal-500 to-teal-600" },
]

export function ColumnModal({ isOpen, onClose, onSubmit }: ColumnModalProps) {
  const [title, setTitle] = useState("")
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSubmit({ title, color: selectedColor })
    setTitle("")
    setSelectedColor(colorOptions[0].value)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/50"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>

            <div className="relative">
              <div className="flex items-center justify-between p-8 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Create New Column
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-10 w-10 p-0 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block"
                  >
                    Column Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter column name..."
                    className="h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl text-lg backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 block flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Choose Color Theme
                  </Label>
                  <div className="grid grid-cols-4 gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setSelectedColor(color.value)}
                        className={`relative w-full h-12 rounded-2xl ${color.preview} transition-all duration-300 ${
                          selectedColor === color.value
                            ? "ring-4 ring-blue-400/50 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 scale-110"
                            : "hover:scale-105"
                        }`}
                      >
                        {selectedColor === color.value && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/70 dark:hover:bg-black/50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Create Column
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
