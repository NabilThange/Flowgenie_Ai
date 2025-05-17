"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Globe, Lock, Moon, Sun, Laptop } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    theme: "system",
    language: "english",
    emailAlerts: true,
    productUpdates: true,
    inAppMessages: true,
    twoFactorEnabled: false,
  })

  const handleSwitchChange = (field: string) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()} aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Account Preferences</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label className="text-base">Theme</Label>
                      <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                    </div>
                    <Select value={settings.theme} onValueChange={(value) => handleSelectChange("theme", value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <Sun className="h-4 w-4 mr-2" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <Moon className="h-4 w-4 mr-2" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center">
                            <Laptop className="h-4 w-4 mr-2" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label className="text-base">Language</Label>
                      <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                    </div>
                    <Select value={settings.language} onValueChange={(value) => handleSelectChange("language", value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            English
                          </div>
                        </SelectItem>
                        <SelectItem value="spanish">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            Spanish
                          </div>
                        </SelectItem>
                        <SelectItem value="french">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            French
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive important alerts via email</p>
                    </div>
                    <Switch checked={settings.emailAlerts} onCheckedChange={() => handleSwitchChange("emailAlerts")} />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label className="text-base">Product Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about new features and updates</p>
                    </div>
                    <Switch
                      checked={settings.productUpdates}
                      onCheckedChange={() => handleSwitchChange("productUpdates")}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label className="text-base">In-App Messages</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications within the app</p>
                    </div>
                    <Switch
                      checked={settings.inAppMessages}
                      onCheckedChange={() => handleSwitchChange("inAppMessages")}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorEnabled}
                      onCheckedChange={() => handleSwitchChange("twoFactorEnabled")}
                    />
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      Reset Password
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
