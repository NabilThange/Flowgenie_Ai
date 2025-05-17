"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Menu,
  ChevronLeft,
  Plus,
  Settings,
  LogOut,
  User,
  HelpCircle,
  SparklesIcon,
  MoreVertical,
  MoreHorizontal,
  Edit,
  Trash,
  Pin,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface ChatSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function ChatSidebar({ open, setOpen }: ChatSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [conversations, setConversations] = useState([
    { id: "1", name: "Email Automation", active: true, pinned: true },
    { id: "2", name: "Twitter Integration", active: false, pinned: false },
    { id: "3", name: "CRM Data Sync", active: false, pinned: false },
    { id: "4", name: "Website Monitoring", active: false, pinned: false },
    { id: "5", name: "Lead Generation", active: false, pinned: true },
  ])

  const [selectedChat, setSelectedChat] = useState<{
    id: string
    name: string
    pinned?: boolean
  } | null>(null)
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newChatName, setNewChatName] = useState("")
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null)

  // Sort conversations with pinned at top
  const sortedConversations = useMemo(() => {
    return [...conversations.filter((c) => c.pinned), ...conversations.filter((c) => !c.pinned)]
  }, [conversations])

  // Filter conversations based on search query
  const filteredConversations = useMemo(() => {
    if (!searchQuery) return sortedConversations
    return sortedConversations.filter((conv) => conv.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, sortedConversations])

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Check on initial load

    return () => window.removeEventListener("resize", handleResize)
  }, [setOpen])

  const selectConversation = (id: string) => {
    setConversations((prev) =>
      prev.map((conv) => ({
        ...conv,
        active: conv.id === id,
      })),
    )

    // Navigate to the chat
    router.push(`/chat?id=${id}`)

    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      setOpen(false)
    }
  }

  const startNewChat = () => {
    const newId = Date.now().toString()
    setConversations((prev) => [
      { id: newId, name: "New Chat", active: true },
      ...prev.map((conv) => ({ ...conv, active: false })),
    ])

    // Navigate to the new chat
    router.push(`/chat?id=${newId}`)

    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      setOpen(false)
    }
  }

  const handleRenameChat = (chat: { id: string; name: string }) => {
    setSelectedChat(chat)
    setNewChatName(chat.name)
    setIsRenameDialogOpen(true)
  }

  const handleDeleteChat = (chat: { id: string; name: string }) => {
    setSelectedChat(chat)
    setIsDeleteDialogOpen(true)
  }

  const handleTogglePinChat = (chat: { id: string; name: string; pinned?: boolean }) => {
    // Toggle pinned status
    const newPinnedState = !chat.pinned

    // Update local state
    setConversations((prev) => prev.map((conv) => (conv.id === chat.id ? { ...conv, pinned: newPinnedState } : conv)))

    // Show success toast
    toast({
      title: newPinnedState ? "Chat pinned" : "Chat unpinned",
      description: `"${chat.name}" has been ${newPinnedState ? "pinned to" : "unpinned from"} the top.`,
    })

    // In a real app with Supabase:
    // const { error } = await supabase
    //   .from('chats')
    //   .update({ pinned: newPinnedState })
    //   .eq('id', chat.id)
  }

  const handleSaveRename = () => {
    if (!selectedChat) return

    // Validate input
    if (!newChatName.trim()) {
      toast({
        title: "Error",
        description: "Chat name cannot be empty.",
        variant: "destructive",
        variant: "destructive",
      })
      return
    }

    // Update local state
    setConversations((prev) =>
      prev.map((conv) => (conv.id === selectedChat.id ? { ...conv, name: newChatName } : conv)),
    )

    // Close dialog
    setIsRenameDialogOpen(false)

    // Show success toast
    toast({
      title: "Chat renamed",
      description: `Chat has been renamed to "${newChatName}".`,
    })

    // In a real app with Supabase:
    // const { error } = await supabase
    //   .from('chats')
    //   .update({ name: newChatName })
    //   .eq('id', selectedChat.id)
  }

  const handleConfirmDelete = () => {
    if (!selectedChat) return

    // Update local state
    setConversations((prev) => prev.filter((conv) => conv.id !== selectedChat.id))

    // Close dialog
    setIsDeleteDialogOpen(false)

    // Show success toast
    toast({
      title: "Chat deleted",
      description: `"${selectedChat.name}" has been deleted.`,
    })

    // In a real app with Supabase:
    // const { error } = await supabase
    //   .from('chats')
    //   .delete()
    //   .eq('id', selectedChat.id)
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Render a chat row
  const ChatRow = ({
    conversation,
    isCollapsed = false,
  }: {
    conversation: { id: string; name: string; active: boolean; pinned?: boolean }
    isCollapsed?: boolean
  }) => {
    const isHovered = hoveredChatId === conversation.id
    const isActive = conversation.active
    const showActions = isHovered || isActive

    return (
      <div
        className={cn(
          "group relative flex items-center h-12 rounded-md cursor-pointer transition-colors",
          isActive ? "bg-accent/30 text-accent-foreground" : "text-muted-foreground hover:bg-muted",
          conversation.pinned && "border-l-2 border-yellow-500",
          isCollapsed ? "justify-center px-2" : "px-3 py-2",
        )}
        onClick={() => selectConversation(conversation.id)}
        onMouseEnter={() => setHoveredChatId(conversation.id)}
        onMouseLeave={() => setHoveredChatId(null)}
      >
        <div className={cn("flex items-center gap-3 w-full overflow-hidden", isCollapsed && "justify-center")}>
          <Avatar className="h-7 w-7 flex-shrink-0">
            <AvatarFallback
              className={cn("text-xs", conversation.pinned ? "bg-yellow-500/10 text-yellow-600" : "bg-muted")}
            >
              {getInitials(conversation.name)}
            </AvatarFallback>
          </Avatar>

          {!isCollapsed && (
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <span className={cn("text-sm truncate", isActive && "font-medium", conversation.pinned && "font-medium")}>
                {conversation.name}
              </span>

              {conversation.pinned && <Pin size={12} className="text-yellow-500 flex-shrink-0" />}
            </div>
          )}
        </div>

        {/* Actions dropdown - only show when not collapsed */}
        {!isCollapsed && showActions && (
          <div
            className="absolute right-2"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem
                  onSelect={(e) => {
                    handleTogglePinChat(conversation)
                  }}
                >
                  <Pin className="mr-2 h-4 w-4" />
                  <span>{conversation.pinned ? "Unpin" : "Pin"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(e) => {
                    handleRenameChat(conversation)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onSelect={(e) => {
                    handleDeleteChat(conversation)
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:flex flex-col h-full border-r border-zinc-800 bg-zinc-900"
        animate={{
          width: open ? "16rem" : "4rem",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
      >
        {/* Sidebar Header */}
        <div className="p-3 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? <ChevronLeft size={18} /> : <Menu size={18} />}
            </Button>

            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2 flex items-center"
              >
                <SparklesIcon className="h-4 w-4 text-indigo-400 mr-1.5" />
                <span className="font-medium text-sm">FlowGenie</span>
              </motion.div>
            )}
          </div>

          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white"
                onClick={startNewChat}
              >
                <Plus size={18} />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Chats Header */}
        {open && (
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-sm font-semibold text-muted-foreground">Chats</h2>
          </div>
        )}

        {/* Search Input - Only visible when expanded */}
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search chats..."
                className="pl-8 bg-zinc-800 border-zinc-700 text-zinc-300 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        )}

        {/* Conversations List */}
        <ScrollArea className="flex-1 px-2 py-2">
          <TooltipProvider delayDuration={300}>
            <div className="space-y-1">
              {!open && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full h-9 flex justify-center text-zinc-400 hover:text-white hover:bg-zinc-800"
                      onClick={startNewChat}
                    >
                      <Plus size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">New Chat</TooltipContent>
                </Tooltip>
              )}

              {filteredConversations.map((conversation) => (
                <div key={conversation.id}>
                  {!open ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <ChatRow conversation={conversation} isCollapsed={true} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">{conversation.name}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <ChatRow conversation={conversation} />
                  )}
                </div>
              ))}

              {filteredConversations.length === 0 && open && (
                <div className="text-center py-4 text-zinc-500 text-sm">No conversations found</div>
              )}
            </div>
          </TooltipProvider>
        </ScrollArea>

        {/* User Profile Section */}
        <div className="p-3 border-t border-zinc-800">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start px-2 text-zinc-400 hover:text-white hover:bg-zinc-800",
                  !open && "justify-center",
                )}
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-indigo-600 text-xs">NT</AvatarFallback>
                </Avatar>

                {open && (
                  <div className="ml-2 flex flex-1 items-center justify-between">
                    <span className="text-sm">Nabil Thange</span>
                    <MoreVertical size={16} />
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden absolute top-3 left-3 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-zinc-400 hover:text-white bg-zinc-900/50 backdrop-blur-sm"
          onClick={() => setOpen(!open)}
        >
          <Menu size={18} />
        </Button>
      </div>

      {/* Mobile Sidebar (Slide-in) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="relative w-64 max-w-[80%] bg-zinc-900 h-full flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Close Button */}
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <X size={18} />
                </Button>
              </div>

              {/* Header */}
              <div className="p-4 flex items-center border-b border-zinc-800">
                <SparklesIcon className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="font-medium">FlowGenie</span>
              </div>

              {/* Chats Header */}
              <div className="flex items-center justify-between px-4 py-2">
                <h2 className="text-sm font-semibold text-muted-foreground">Chats</h2>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={startNewChat}>
                  <Plus size={14} className="mr-1" />
                  New
                </Button>
              </div>

              {/* Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input
                    placeholder="Search chats..."
                    className="pl-8 bg-zinc-800 border-zinc-700 text-zinc-300 h-9 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Conversations */}
              <ScrollArea className="flex-1 px-2 py-2">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <ChatRow key={conversation.id} conversation={conversation} />
                  ))}

                  {filteredConversations.length === 0 && (
                    <div className="text-center py-4 text-zinc-500 text-sm">No conversations found</div>
                  )}
                </div>
              </ScrollArea>

              {/* User Profile */}
              <div className="p-3 border-t border-zinc-800">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-indigo-600 text-xs">NT</AvatarFallback>
                      </Avatar>
                      <div className="ml-2 flex flex-1 items-center justify-between">
                        <span className="text-sm">Nabil Thange</span>
                        <MoreVertical size={16} />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
            <DialogDescription>Enter a new name for this chat.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Chat name</Label>
              <Input
                id="name"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="Enter chat name"
                className="bg-zinc-800 border-zinc-700 text-zinc-300"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRename}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
