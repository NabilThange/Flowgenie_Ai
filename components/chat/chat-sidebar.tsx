"use client"

import { useState, useEffect } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import {
  Search,
  Plus,
  MessageSquare,
  Settings,
  User,
  HelpCircle,
  LogOut,
  SparklesIcon,
  MoreVertical,
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatSidebarProps {
  conversations: {
    id: string
    name: string
    active: boolean
  }[]
  onNewChat: () => void
  onSelectConversation: (id: string) => void
}

export default function ChatSidebar({ conversations, onNewChat, onSelectConversation }: ChatSidebarProps) {
  const [open, setOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredConversations, setFilteredConversations] = useState(conversations)

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Check on initial load

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filter conversations based on search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredConversations(
        conversations.filter((conv) => conv.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    } else {
      setFilteredConversations(conversations)
    }
  }, [searchQuery, conversations])

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-6">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {/* Logo and New Chat Button */}
          <div className="flex items-center justify-between">
            {open ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-[#7B61FF]" />
                <span className="font-medium text-white">FlowGenie</span>
              </motion.div>
            ) : (
              <SparklesIcon className="h-5 w-5 text-[#7B61FF]" />
            )}

            <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800" onClick={onNewChat}>
              <Plus className="h-5 w-5 text-white" />
              <span className="sr-only">New Chat</span>
            </Button>
          </div>

          {/* Search Input - Only visible when expanded */}
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-8 bg-zinc-900/80 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-[#7B61FF]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          )}

          {/* Conversations List */}
          <div className="mt-6">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="flex flex-col gap-1 pr-2">
                {filteredConversations.map((conversation) => (
                  <SidebarLink
                    key={conversation.id}
                    active={conversation.active}
                    link={{
                      label: conversation.name,
                      href: "#",
                      icon: (
                        <MessageSquare
                          className={cn("h-5 w-5 shrink-0", conversation.active ? "text-[#7B61FF]" : "text-white")}
                        />
                      ),
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      onSelectConversation(conversation.id)
                    }}
                  />
                ))}

                {filteredConversations.length === 0 && (
                  <div className="text-center py-4 text-zinc-500 text-sm">No conversations found</div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* User Profile Section */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 w-full hover:bg-zinc-800/50 p-2 rounded-md transition-colors">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="bg-zinc-700 text-white">NT</AvatarFallback>
                </Avatar>

                {open && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-1 items-center justify-between"
                  >
                    <span className="text-sm text-white">Nabil Thange</span>
                    <MoreVertical className="h-4 w-4 text-zinc-500" />
                  </motion.div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white">
              <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarBody>
    </Sidebar>
  )
}
