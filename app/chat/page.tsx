"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation" // Add this import
import { motion, AnimatePresence } from "framer-motion"
import ChatSidebar from "@/components/chat/sidebar"
import ChatInput from "@/components/chat/input"
import ChatMessage from "@/components/chat/message"
import WelcomeScreen from "@/components/chat/welcome-screen"
import type { Message } from "@/types/chat"
import { cn } from "@/lib/utils"

export default function ChatPage() {
  const searchParams = useSearchParams() // Add this line
  const chatId = searchParams.get("id") // Get the chat ID from URL

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Reset messages when chat ID changes
  useEffect(() => {
    // Reset messages when navigating to a new chat
    setMessages([])
    setIsTyping(false)
  }, [chatId])

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Check on initial load

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (content: string) => {
    if (!content.trim() || isTyping) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Simple AI response generator
  const getAIResponse = (userInput: string): string => {
    const responses = [
      "I can help you create a workflow for that. Here's how you can approach it:\n\n1. First, you'll need to set up a trigger for your automation\n2. Then, connect to the relevant services\n3. Process the data using n8n's built-in functions\n4. Finally, set up the desired output action",
      "That's an interesting automation idea. Let me walk you through the steps:\n\n1. Start by choosing the right trigger event\n2. Connect to your data source\n3. Add transformation steps as needed\n4. Configure the final action to complete your workflow",
      "I'd be happy to help with that automation. Here's a step-by-step approach:\n\n1. Set up your initial trigger condition\n2. Connect to the necessary APIs or services\n3. Add logic nodes to handle your specific requirements\n4. Configure the output actions to complete your workflow",
      "Here's how you can build that automation in n8n:\n\n1. Begin with the appropriate trigger node\n2. Add HTTP Request nodes to connect to external services\n3. Use Function nodes to transform your data\n4. Finish with action nodes to execute the final steps",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Chat Area */}
      <motion.main
        className="relative flex-1 flex flex-col overflow-hidden"
        animate={{
          marginLeft: sidebarOpen ? "0" : "0",
          width: "100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isEmpty ? (
          <WelcomeScreen onSendMessage={handleSendMessage} />
        ) : (
          <>
            {/* Messages Area */}
            <div
              className={cn(
                "flex-1 overflow-y-auto p-4 md:p-6",
                "scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent",
              )}
            >
              <div className="max-w-3xl mx-auto w-full space-y-6">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}

                  {isTyping && (
                    <ChatMessage
                      message={{
                        id: "typing",
                        content: "",
                        role: "assistant",
                        timestamp: new Date(),
                        isTyping: true,
                      }}
                    />
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
              <div className="max-w-3xl mx-auto">
                <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} isEmpty={messages.length === 0} />
              </div>
            </div>
          </>
        )}
      </motion.main>
    </div>
  )
}
