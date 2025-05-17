"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, PaperclipIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
  onSendMessage: (content: string) => void
  isTyping?: boolean
  isEmpty?: boolean
}

export default function ChatInput({ onSendMessage, isTyping = false, isEmpty = true }: ChatInputProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isTyping) {
      onSendMessage(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={cn(
          "flex items-center w-full px-4 bg-zinc-900 border border-zinc-800 rounded-full shadow-sm hover:border-zinc-700 transition-all duration-300",
          isEmpty ? "py-4" : "py-2",
        )}
      >
        <button
          type="button"
          className="p-1 rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <PaperclipIcon className="w-5 h-5" />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isEmpty ? "Ask FlowGenie something..." : "Type your message..."}
          className={cn(
            "flex-1 bg-transparent border-none outline-none px-3 py-1 text-zinc-200 placeholder-zinc-500",
            isEmpty ? "text-lg" : "text-base",
          )}
          disabled={isTyping}
        />

        <Button
          type="submit"
          size="icon"
          className={cn(
            "rounded-full w-8 h-8 flex items-center justify-center transition-all",
            input.trim() && !isTyping
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed",
          )}
          disabled={!input.trim() || isTyping}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
