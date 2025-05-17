"use client"

import { useState, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pin, MoreHorizontal, Edit, Trash } from "lucide-react"

// Types for our chat items
interface ChatItem {
  id: string
  title: string
  pinned?: boolean
  unread?: number
  updatedAt: string
  link: string
}

interface ChatListProps {
  chats: ChatItem[]
  onPinChat?: (id: string, pinned: boolean) => void
  onDeleteChat?: (id: string) => void
  onRenameChat?: (id: string) => void
}

export function ChatList({ chats, onPinChat, onDeleteChat, onRenameChat }: ChatListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [hoveredChat, setHoveredChat] = useState<string | null>(null)

  // Sort chats with pinned items at the top
  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      // First sort by pinned status
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1

      // Then sort by updated date (most recent first)
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }, [chats])

  // Get initials from chat title
  const getInitials = (title: string) => {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Navigate to chat
  const handleChatClick = (chat: ChatItem) => {
    router.push(chat.link)
  }

  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="flex flex-col gap-1 px-2 py-2">
        {sortedChats.map((chat) => {
          const isActive = pathname === chat.link
          const showActions = hoveredChat === chat.id || isActive

          return (
            <div
              key={chat.id}
              className={cn(
                "group relative flex items-center h-12 rounded-md px-3 py-2 cursor-pointer transition-colors",
                isActive ? "bg-accent/30 text-accent-foreground" : "text-muted-foreground hover:bg-muted",
                chat.pinned && "border-l-2 border-yellow-500",
              )}
              onClick={() => handleChatClick(chat)}
              onMouseEnter={() => setHoveredChat(chat.id)}
              onMouseLeave={() => setHoveredChat(null)}
            >
              <div className="flex items-center gap-3 w-full overflow-hidden">
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarFallback
                    className={cn("text-xs", chat.pinned ? "bg-yellow-500/10 text-yellow-600" : "bg-muted")}
                  >
                    {getInitials(chat.title)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className={cn("text-sm truncate", isActive && "font-medium", chat.pinned && "font-medium")}>
                    {chat.title}
                  </span>

                  {chat.pinned && <Pin size={12} className="text-yellow-500 flex-shrink-0" />}

                  {chat.unread && chat.unread > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions dropdown */}
              {showActions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 absolute right-2 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        onPinChat?.(chat.id, !chat.pinned)
                      }}
                    >
                      {chat.pinned ? (
                        <>
                          <Pin className="mr-2 h-4 w-4" />
                          <span>Unpin</span>
                        </>
                      ) : (
                        <>
                          <Pin className="mr-2 h-4 w-4" />
                          <span>Pin</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        onRenameChat?.(chat.id)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteChat?.(chat.id)
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )
        })}

        {sortedChats.length === 0 && (
          <div className="px-3 py-6 text-center text-muted-foreground text-sm">No chats found</div>
        )}
      </div>
    </ScrollArea>
  )
}
