"use client"

import { motion } from "framer-motion"
import type { Message } from "@/types/chat"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SparklesIcon } from "lucide-react"

interface ChatMessageProps {
  message: Message & { isTyping?: boolean }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-3"
    >
      <Avatar className={isUser ? "bg-zinc-700" : "bg-indigo-600"}>
        <AvatarFallback>{isUser ? "U" : <SparklesIcon className="h-4 w-4" />}</AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "max-w-[85%]",
          isUser ? "p-4 bg-zinc-800 rounded-lg shadow-md" : "pt-1", // Only user messages have container styling
        )}
      >
        {message.isTyping ? (
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        ) : (
          <div
            className={cn(
              "prose prose-invert prose-sm",
              !isUser && "prose-p:text-zinc-300", // Lighter text for AI responses
            )}
          >
            {message.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className={cn(
                  "mb-4 last:mb-0",
                  !isUser && "text-zinc-300", // Lighter text for AI responses
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Helper function for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}
