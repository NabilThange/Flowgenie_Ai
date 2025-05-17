"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { SparklesIcon, MailIcon, UsersIcon, YoutubeIcon, DollarSignIcon, BrainIcon } from "lucide-react"
import ChatInput from "./input"

interface WelcomeScreenProps {
  onSendMessage: (content: string) => void
}

export default function WelcomeScreen({ onSendMessage }: WelcomeScreenProps) {
  const [selectedPrompt, setSelectedPrompt] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Action pills with icons and text
  const actionPills = [
    { icon: <MailIcon size={16} />, text: "Email Scraper" },
    { icon: <UsersIcon size={16} />, text: "Generate Leads from Clients" },
    { icon: <YoutubeIcon size={16} />, text: "YouTube Automation" },
    { icon: <DollarSignIcon size={16} />, text: "A Million Dollar Automation Idea" },
    { icon: <BrainIcon size={16} />, text: "Explain Concept" },
    { icon: <SparklesIcon size={16} />, text: "Workflow Ideas" },
  ]

  // Set input value when a prompt is selected
  useEffect(() => {
    if (selectedPrompt && inputRef.current) {
      inputRef.current.value = selectedPrompt
      inputRef.current.focus()
    }
  }, [selectedPrompt])

  const handlePromptClick = (promptText: string) => {
    setSelectedPrompt(promptText)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <SparklesIcon className="w-6 h-6 text-indigo-400" />
          <h1 className="text-2xl font-bold">Welcome to FlowGenie</h1>
        </div>
        <p className="text-zinc-400 text-center">Your AI assistant for building powerful automations</p>
      </motion.div>

      {/* Input Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-xl mx-auto"
      >
        <ChatInput onSendMessage={onSendMessage} isEmpty={true} />
      </motion.div>

      {/* Prompt Pills */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 w-full max-w-2xl"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {actionPills.map((pill, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              onClick={() => handlePromptClick(pill.text)}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-full hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all group shadow-md hover:shadow-lg"
            >
              <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">{pill.icon}</span>
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                {pill.text}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
