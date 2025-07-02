"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Shield, Palette, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"

export function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      desktop: false,
      taskUpdates: true,
      weeklyDigest: true,
    },
    privacy: {
      profileVisibility: "team",
      activityStatus: true,
      dataCollection: false,
    },
    preferences: {
      theme: "system",
      language: "en",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
    },
  })

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
    toast.success("✅ Setting updated!")
  }

  const handleExportData = () => {
    toast.success("📦 Data export started! You'll receive an email when ready.")
  }

  const handleDeleteAccount = () => {
    toast.error("⚠️ Account deletion requires email confirmation.")
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
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Customize your TaskFlow experience</p>
        </div>

        <div className="space-y-8">
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Notifications</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold text-slate-700 dark:text-slate-300">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "email", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold text-slate-700 dark:text-slate-300">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Get notified on your devices</p>
                </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "push", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold text-slate-700 dark:text-slate-300">
                    Desktop Notifications
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Show notifications on desktop</p>
                </div>
                <Switch
                  checked={settings.notifications.desktop}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "desktop", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold text-slate-700 dark:text-slate-300">Task Updates</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Notify when tasks are updated</p>
                </div>
                <Switch
                  checked={settings.notifications.taskUpdates}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "taskUpdates", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold text-slate-700 dark:text-slate-300">Weekly Digest</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Weekly summary of your activity</p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyDigest}
                  onCheckedChange={(checked) => handleSettingChange("notifications", "weeklyDigest", checked)}
                />
              </div>
            </div>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Privacy & Security</h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  Profile Visibility
                </Label>
                <Select
                  value={settings.privacy.profileVisibility}
                  onValueChange={(value) => handleSettingChange("privacy", "profileVisibility", value)}
                >
                  <SelectTrigger className="h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="team">Team Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold text-slate-700 dark:text-slate-300">
                    Show Activity Status
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Let others see when you're online</p>
                </div>
                <Switch
                  checked={settings.privacy.activityStatus}
                  onCheckedChange={(checked) => handleSettingChange("privacy", "activityStatus", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold text-slate-700 dark:text-slate-300">Data Collection</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Allow analytics data collection</p>
                </div>
                <Switch
                  checked={settings.privacy.dataCollection}
                  onCheckedChange={(checked) => handleSettingChange("privacy", "dataCollection", checked)}
                />
              </div>
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Preferences</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Theme</Label>
                <Select
                  value={settings.preferences.theme}
                  onValueChange={(value) => handleSettingChange("preferences", "theme", value)}
                >
                  <SelectTrigger className="h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  Language
                </Label>
                <Select
                  value={settings.preferences.language}
                  onValueChange={(value) => handleSettingChange("preferences", "language", value)}
                >
                  <SelectTrigger className="h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  Timezone
                </Label>
                <Select
                  value={settings.preferences.timezone}
                  onValueChange={(value) => handleSettingChange("preferences", "timezone", value)}
                >
                  <SelectTrigger className="h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  Date Format
                </Label>
                <Select
                  value={settings.preferences.dateFormat}
                  onValueChange={(value) => handleSettingChange("preferences", "dateFormat", value)}
                >
                  <SelectTrigger className="h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Data Management</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                <div>
                  <Label className="text-base font-semibold text-slate-700 dark:text-slate-300">Export Data</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Download all your data</p>
                </div>
                <Button
                  onClick={handleExportData}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
                <div>
                  <Label className="text-base font-semibold text-red-700 dark:text-red-300">Delete Account</Label>
                  <p className="text-sm text-red-500 dark:text-red-400">Permanently delete your account and all data</p>
                </div>
                <Button
                  onClick={handleDeleteAccount}
                  variant="destructive"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-2 rounded-xl"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
