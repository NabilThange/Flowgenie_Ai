"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, RefreshCw, Download, Copy, Check, Sparkles, Zap, Database, Globe } from "lucide-react"
import type { Message } from "@/types/chat"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface ChatWindowProps {
  messages: Message[]
  isTyping: boolean
  onSendMessage: (content: string) => void
}

const examplePrompts = [
  {
    icon: <Sparkles className="h-5 w-5 text-amber-400" />,
    text: "How do I create a workflow that posts to Twitter when I publish a blog?",
  },
  {
    icon: <Zap className="h-5 w-5 text-indigo-400" />,
    text: "Create an automation that sends welcome emails to new customers",
  },
  {
    icon: <Database className="h-5 w-5 text-emerald-400" />,
    text: "How can I sync data between Airtable and Google Sheets automatically?",
  },
  {
    icon: <Globe className="h-5 w-5 text-blue-400" />,
    text: "Build a workflow that monitors website uptime and sends alerts",
  },
]

export default function ChatWindow({ messages, isTyping, onSendMessage }: ChatWindowProps) {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState<Record<string, boolean>>({})
  const [hasSentMessage, setHasSentMessage] = useState(messages.length > 1)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "56px"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isTyping) {
      onSendMessage(input)
      setInput("")
      setHasSentMessage(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied({ ...copied, [id]: true })
    setTimeout(() => {
      setCopied({ ...copied, [id]: false })
    }, 2000)
  }

  const downloadJson = (json: any, filename = "workflow.json") => {
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatMessageContent = (content: string) => {
    // Format numbered lists
    const formattedContent = content.replace(/(\d+\.\s.*?)(?=\n\d+\.|\n\n|$)/gs, '<div class="mb-2">$1</div>')

    // Split by double newlines to create paragraphs
    return formattedContent.split(/\n\n+/).map((paragraph, i) => (
      <p key={i} className="mb-4">
        {paragraph}
      </p>
    ))
  }

  const handlePromptClick = (promptText: string) => {
    setInput(promptText)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 text-zinc-300">
      {/* Messages */}
      <AnimatePresence>
        {messages.length <= 1 && !hasSentMessage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-4 md:p-6"
          >
            <div className="max-w-2xl w-full text-center space-y-6">
              <h1 className="text-3xl font-bold text-white">Welcome to FlowGenie</h1>
              <p className="text-zinc-400 text-lg">Your AI assistant for building n8n automations</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="flex items-start gap-3 p-4 text-left rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
                    onClick={() => handlePromptClick(prompt.text)}
                  >
                    <div className="mt-0.5">{prompt.icon}</div>
                    <span className="text-zinc-300">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("mb-6", message.role === "user" ? "flex justify-end" : "flex justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] md:max-w-[75%] rounded-lg p-4",
                      message.role === "user"
                        ? "bg-[#7B61FF] text-white"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-300",
                    )}
                  >
                    <div className="prose prose-sm dark:prose-invert">{formatMessageContent(message.content)}</div>

                    {message.jsonWorkflow && (
                      <div className="mt-4">
                        <div className="bg-zinc-950 text-zinc-300 rounded-md overflow-hidden border border-zinc-800">
                          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                            <span className="text-xs font-mono">workflow.json</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  copyToClipboard(JSON.stringify(message.jsonWorkflow, null, 2), message.id)
                                }
                                className="text-zinc-400 hover:text-white transition-colors"
                                aria-label="Copy JSON"
                              >
                                {copied[message.id] ? <Check size={16} /> : <Copy size={16} />}
                              </button>
                              <button
                                onClick={() => downloadJson(message.jsonWorkflow)}
                                className="text-zinc-400 hover:text-white transition-colors"
                                aria-label="Download JSON"
                              >
                                <Download size={16} />
                              </button>
                            </div>
                          </div>
                          <pre className="p-4 text-xs overflow-x-auto">
                            {JSON.stringify(message.jsonWorkflow, null, 2).substring(0, 300)}...
                          </pre>
                        </div>
                        <div className="flex mt-3 space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            onClick={() => copyToClipboard(JSON.stringify(message.jsonWorkflow, null, 2), message.id)}
                          >
                            {copied[message.id] ? (
                              <>
                                <Check className="mr-1 h-3 w-3" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="mr-1 h-3 w-3" />
                                Copy JSON
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            onClick={() => downloadJson(message.jsonWorkflow)}
                          >
                            <Download className="mr-1 h-3 w-3" />
                            Download JSON
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                          >
                            <RefreshCw className="mr-1 h-3 w-3" />
                            Regenerate
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start mb-6">
                  <div className="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg p-4 max-w-[85%] md:max-w-[75%]">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <motion.div
        ref={inputContainerRef}
        initial={false}
        animate={{
          y: hasSentMessage ? 0 : messages.length <= 1 ? -200 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "border-t border-zinc-800 p-4 bg-zinc-950",
          hasSentMessage || messages.length > 1 ? "mt-auto" : "mt-auto absolute bottom-0 left-0 right-0",
        )}
      >
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask FlowGenie something..."
              className="pr-12 min-h-[56px] max-h-[200px] resize-none bg-zinc-900 border-zinc-800 focus:border-[#7B61FF] focus:ring-[#7B61FF]/20 text-zinc-300 placeholder:text-zinc-500 rounded-lg"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              className={cn(
                "absolute right-2 bottom-2 h-8 w-8 bg-[#7B61FF] hover:bg-[#6A50E0] text-white rounded-full",
                (!input.trim() || isTyping) && "opacity-50 cursor-not-allowed",
              )}
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
