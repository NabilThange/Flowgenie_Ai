"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Mail, Edit, ArrowLeft, Save } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "Nabil Thange",
    email: "nabil@example.com",
    joinedDate: "March 15, 2023",
    totalChats: 24,
    lastActive: "Today at 10:45 AM",
    role: "Pro Member",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real app, you would save the data to your backend here
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()} aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Your Profile</h1>
        </div>

        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>View and manage your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
                  <AvatarFallback className="text-xl bg-primary/10">NT</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm" className="text-xs">
                    Change Avatar
                  </Button>
                )}
              </div>

              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="max-w-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="max-w-md"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{userData.name}</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="text-sm">{userData.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>Joined {userData.joinedDate}</span>
                    </div>

                    <Badge variant="secondary" className="mt-2">
                      {userData.role}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)} className="ml-auto">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle>Activity</CardTitle>
            <CardDescription>Your usage statistics and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 border">
                <div className="text-sm text-muted-foreground mb-1">Total Chats</div>
                <div className="text-2xl font-bold">{userData.totalChats}</div>
              </div>
              <div className="bg-card rounded-lg p-4 border">
                <div className="text-sm text-muted-foreground mb-1">Last Active</div>
                <div className="text-md font-medium">{userData.lastActive}</div>
              </div>
              <div className="bg-card rounded-lg p-4 border">
                <div className="text-sm text-muted-foreground mb-1">Membership</div>
                <div className="text-md font-medium">{userData.role}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
