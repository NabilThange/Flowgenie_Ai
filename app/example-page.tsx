"use client"

import { useState } from "react"
import { ChatList } from "@/components/sidebar/chat-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export default function ExamplePage() {
  const [chats, setChats] = useState([
    {
      id: "1",
      title: "Project Discussion",
      pinned: true,
      updatedAt: "2023-05-15T10:30:00Z",
      link: "/chats/chat/1",
    },
    {
      id: "2",
      title: "Weekly Team Meeting",
      unread: 3,
      updatedAt: "2023-05-16T14:20:00Z",
      link: "/chats/chat/2",
    },
    {
      id: "3",
      title: "Customer Support",
      updatedAt: "2023-05-14T09:15:00Z",
      link: "/chats/chat/3",
    },
    {
      id: "4",
      title: "Product Development",
      pinned: true,
      updatedAt: "2023-05-13T16:45:00Z",
      link: "/chats/chat/4",
    },
    {
      id: "5",
      title: "Marketing Strategy",
      updatedAt: "2023-05-12T11:10:00Z",
      link: "/chats/chat/5",
    },
  ])

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [newChatTitle, setNewChatTitle] = useState("")

  // Handle pinning/unpinning a chat
  const handlePinChat = (id: string, pinned: boolean) => {
    setChats((prevChats) => prevChats.map((chat) => (chat.id === id ? { ...chat, pinned } : chat)))

    toast({
      title: pinned ? "Chat pinned" : "Chat unpinned",
      description: `The chat has been ${pinned ? "pinned" : "unpinned"} successfully.`,
    })

    // In a real app, you would update this in Supabase
    // Example:
    // const { error } = await supabase
    //   .from('chats')
    //   .update({ pinned })
    //   .eq('id', id)
  }

  // Handle deleting a chat
  const handleDeleteChat = (id: string) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id))

    toast({
      title: "Chat deleted",
      description: "The chat has been deleted successfully.",
    })

    // In a real app, you would delete this from Supabase
    // Example:
    // const { error } = await supabase
    //   .from('chats')
    //   .delete()
    //   .eq('id', id)
  }

  // Handle opening the rename dialog
  const handleRenameChat = (id: string) => {
    const chat = chats.find((c) => c.id === id)
    if (chat) {
      setSelectedChatId(id)
      setNewChatTitle(chat.title)
      setIsRenameDialogOpen(true)
    }
  }

  // Handle saving the new chat title
  const handleSaveRename = () => {
    if (!selectedChatId || !newChatTitle.trim()) return

    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === selectedChatId ? { ...chat, title: newChatTitle } : chat)),
    )

    setIsRenameDialogOpen(false)

    toast({
      title: "Chat renamed",
      description: "The chat has been renamed successfully.",
    })

    // In a real app, you would update this in Supabase
    // Example:
    // const { error } = await supabase
    //   .from('chats')
    //   .update({ title: newChatTitle })
    //   .eq('id', selectedChatId)
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-background">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Chats</h2>
        </div>

        <ChatList
          chats={chats}
          onPinChat={handlePinChat}
          onDeleteChat={handleDeleteChat}
          onRenameChat={handleRenameChat}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Chat Application</h1>
        <p className="text-muted-foreground">Select a chat from the sidebar to start messaging.</p>
      </div>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
            <DialogDescription>Enter a new name for this chat.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newChatTitle}
                onChange={(e) => setNewChatTitle(e.target.value)}
                placeholder="Enter chat name"
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
    </div>
  )
}
