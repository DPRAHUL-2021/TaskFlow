"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, MapPin, Phone, Edit3, Camera, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import toast from "react-hot-toast"

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@taskflow.com",
    bio: "Senior Product Manager passionate about creating amazing user experiences and leading high-performing teams.",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  })

  const [editForm, setEditForm] = useState(profile)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setProfile((prev) => ({ ...prev, name: user.name, email: user.email, avatar: user.avatar }))
      setEditForm((prev) => ({ ...prev, name: user.name, email: user.email, avatar: user.avatar }))
    }
  }, [])

  const handleSave = () => {
    setProfile(editForm)
    setIsEditing(false)
    toast.success("✅ Profile updated successfully!")

    // Update localStorage
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    localStorage.setItem("user", JSON.stringify({ ...userData, name: editForm.name, email: editForm.email }))
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
              Profile Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Manage your personal information and preferences</p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <Avatar className="w-32 h-32 ring-4 ring-white dark:ring-slate-700 shadow-2xl">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{profile.name}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{profile.email}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profile.joinDate}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                  <MapPin className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700 dark:text-slate-300">{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                  <Phone className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700 dark:text-slate-300">{profile.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Personal Information</h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="name"
                        value={isEditing ? editForm.name : profile.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm disabled:opacity-70"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="email"
                        value={isEditing ? editForm.email : profile.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm disabled:opacity-70"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="location"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block"
                    >
                      Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="location"
                        value={isEditing ? editForm.location : profile.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm disabled:opacity-70"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block"
                    >
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="phone"
                        value={isEditing ? editForm.phone : profile.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm disabled:opacity-70"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={isEditing ? editForm.bio : profile.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    disabled={!isEditing}
                    className="min-h-[120px] bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm disabled:opacity-70 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 h-12 bg-white/50 dark:bg-black/30 border-white/30 dark:border-white/20 rounded-2xl backdrop-blur-sm"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-2xl font-semibold"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
