"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowRightIcon, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react"
import Link from "next/link"
import { Space_Grotesk, Inter } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"

// Add font definitions
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
})

// Example automation scenarios - shortened JSON for better display
const automationExamples = [
  {
    id: "twitter-spreadsheet",
    userQuestion: "How do I post Tweets from a spreadsheet every hour?",
    aiResponse: "Here's how to automate posting tweets from a spreadsheet every hour:",
    steps: [
      { title: "Schedule Trigger:", description: "Set up a Schedule node to run every hour" },
      { title: "Google Sheets:", description: "Connect to your spreadsheet and read rows" },
      { title: "Twitter:", description: "Configure the Twitter node to post tweets" },
      { title: "Filter:", description: "Add a filter to avoid reposting the same content" },
    ],
    jsonPreview: `{
  "nodes": [
    {
      "parameters": {
        "rule": { "interval": [{ "field": "hours", "minuteInterval": 1 }] }
      },
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger"
    },
    {
      "parameters": {
        "operation": "read",
        "sheetName": "Tweets"
      },
      "name": "Google Sheets"
    }
    // More nodes configured for your workflow...
  ]
}`,
  },
  {
    id: "email-leads",
    userQuestion: "Can you create a workflow that sends personalized emails to new leads from my CRM?",
    aiResponse: "Here's how to set up automated personalized emails for new leads:",
    steps: [
      { title: "Webhook Trigger:", description: "Create a webhook to receive new lead notifications from your CRM" },
      { title: "HTTP Request:", description: "Fetch additional lead data from your CRM API if needed" },
      { title: "Function Node:", description: "Personalize email content based on lead information" },
      { title: "Email Send:", description: "Configure SMTP settings and send the personalized email" },
    ],
    jsonPreview: `{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "new-lead",
        "responseMode": "onReceived"
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook"
    },
    {
      "parameters": {
        "functionCode": "// Personalize email content"
      },
      "name": "Personalize Email"
    }
    // More nodes configured for your workflow...
  ]
}`,
  },
  {
    id: "data-sync",
    userQuestion: "How can I sync customer data between Shopify and my Airtable database?",
    aiResponse: "Here's a workflow to synchronize customer data between Shopify and Airtable:",
    steps: [
      { title: "Shopify Trigger:", description: "Set up a webhook for new/updated customer events" },
      { title: "Airtable Search:", description: "Check if the customer already exists in Airtable" },
      { title: "IF Node:", description: "Create conditional paths for new vs. existing customers" },
      { title: "Airtable Create/Update:", description: "Add new records or update existing ones" },
    ],
    jsonPreview: `{
  "nodes": [
    {
      "parameters": {
        "authentication": "oAuth2",
        "resource": "customer",
        "operation": "getAll"
      },
      "name": "Shopify",
      "type": "n8n-nodes-base.shopify"
    },
    {
      "parameters": {
        "application": "airtable",
        "operation": "upsert",
        "baseId": "appXXXXXXXXXXXXXX"
      },
      "name": "Airtable"
    }
    // More nodes configured for your workflow...
  ]
}`,
  },
  {
    id: "support-ticket",
    userQuestion: "I need a workflow that creates Jira tickets from customer support emails",
    aiResponse: "Here's how to automate creating Jira tickets from support emails:",
    steps: [
      { title: "IMAP Email:", description: "Monitor a support email inbox for new messages" },
      { title: "Text Analysis:", description: "Extract key information and categorize the issue" },
      { title: "Jira Create:", description: "Create a new ticket with appropriate priority and details" },
      { title: "Email Reply:", description: "Send an automated acknowledgment to the customer" },
    ],
    jsonPreview: `{
  "nodes": [
    {
      "parameters": {
        "authentication": "basicAuth",
        "mailbox": "INBOX",
        "action": "getAll"
      },
      "name": "IMAP Email",
      "type": "n8n-nodes-base.imapEmail"
    },
    {
      "parameters": {
        "authentication": "basicAuth",
        "projectKey": "SUPPORT",
        "issueTypeId": 10001
      },
      "name": "Jira",
      "type": "n8n-nodes-base.jira"
    }
    // More nodes configured for your workflow...
  ]
}`,
  },
]

// Component for the blinking cursor
const BlinkingCursor = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(interval)
  }, [])

  return <span className={`${visible ? "opacity-100" : "opacity-0"} transition-opacity`}>_</span>
}

// Component for the terminal traffic lights
const TrafficLights = () => (
  <div className="flex space-x-2">
    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
  </div>
)

export default function UseCaseSection() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0)
  const currentExample = automationExamples[currentExampleIndex]
  const [typedQuestion, setTypedQuestion] = useState("")
  const [typedSteps, setTypedSteps] = useState<string[]>([])
  const [showJson, setShowJson] = useState(false)
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Reset animations when example changes
  useEffect(() => {
    setTypedQuestion("")
    setTypedSteps([])
    setShowJson(false)
    setCopied(false)

    // Type out the question
    const questionChars = currentExample.userQuestion.split("")
    let questionTimer: NodeJS.Timeout

    const typeQuestion = (index: number) => {
      if (index < questionChars.length) {
        setTypedQuestion((prev) => prev + questionChars[index])
        questionTimer = setTimeout(() => typeQuestion(index + 1), 30 + Math.random() * 50)
      } else {
        // Start typing steps after question is complete
        setTimeout(() => {
          typeSteps(0)
        }, 500)
      }
    }

    const typeSteps = (stepIndex: number) => {
      if (stepIndex < currentExample.steps.length) {
        setTypedSteps((prev) => [
          ...prev,
          `${stepIndex + 1}. ${currentExample.steps[stepIndex].title} ${currentExample.steps[stepIndex].description}`,
        ])

        setTimeout(() => {
          typeSteps(stepIndex + 1)
        }, 300)
      } else {
        // Show JSON after steps are complete
        setTimeout(() => {
          setShowJson(true)
        }, 500)
      }
    }

    // Start typing
    setTimeout(() => {
      typeQuestion(0)
    }, 500)

    return () => {
      clearTimeout(questionTimer)
    }
  }, [currentExampleIndex, currentExample])

  const nextExample = () => {
    setCurrentExampleIndex((prev) => (prev + 1) % automationExamples.length)
  }

  const prevExample = () => {
    setCurrentExampleIndex((prev) => (prev - 1 + automationExamples.length) % automationExamples.length)
  }

  const copyJson = () => {
    navigator.clipboard.writeText(currentExample.jsonPreview)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden bg-transparent mt-[-10vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/95 via-[#030303]/90 to-[#030303]/95 backdrop-blur-sm" />

      {/* Floating gradient shapes - with variety of styles */}
      {/* Original pill shape */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7B61FF]/20 rounded-full filter blur-3xl animate-pulse"></div>

      {/* Shape 1: Rounded Person Silhouette */}
      <div
        className="absolute top-12 right-32 w-28 h-36 bg-gradient-to-br from-purple-700/20 to-purple-400/10 opacity-50 mix-blend-lighten backdrop-blur-xl animate-pulse"
        style={{
          clipPath: "ellipse(50% 33% at 50% 33%)",
          animationDelay: "0.7s",
        }}
      ></div>

      {/* Shape 2: 4-Petal Flower */}
      <div
        className="absolute bottom-20 left-24 w-32 h-32 bg-gradient-to-br from-[#FFD580]/20 to-[#FFB347]/10 opacity-40 mix-blend-lighten backdrop-blur-xl animate-pulse"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          animationDelay: "1.2s",
        }}
      ></div>

      {/* Shape 3: Scalloped Circle */}
      <div
        className="absolute top-1/2 right-28 w-24 h-24 bg-gradient-to-br from-[#A47CF3]/20 to-[#7B61FF]/10 opacity-40 mix-blend-lighten backdrop-blur-xl animate-pulse"
        style={{
          clipPath:
            "polygon(50% 0%, 63% 13%, 80% 10%, 87% 25%, 100% 35%, 94% 50%, 100% 65%, 87% 75%, 80% 90%, 63% 87%, 50% 100%, 37% 87%, 20% 90%, 13% 75%, 0% 65%, 6% 50%, 0% 35%, 13% 25%, 20% 10%, 37% 13%)",
          animationDelay: "0.5s",
        }}
      ></div>

      {/* Shape 4: Reverse Teardrop + Flat Bottom */}
      <div
        className="absolute bottom-10 right-12 w-24 h-28 bg-gradient-to-tr from-[#FF61DC]/20 to-[#FF61DC]/10 opacity-50 mix-blend-lighten backdrop-blur-xl animate-pulse"
        style={{
          clipPath: "polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 100% 100%, 0% 100%)",
          animationDelay: "1.8s",
        }}
      ></div>

      {/* Keep one original pill shape */}
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A47CF3]/15 rounded-full filter blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 min-h-[90vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content - Redesigned */}
          <div className="space-y-8">
            <div>
              <h2 className={`text-3xl sm:text-4xl font-bold text-[#E0E0E0] mb-3 ${spaceGrotesk.className}`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7B61FF] to-[#A47CF3]">
                  Step-by-Step Automation
                </span>
              </h2>
              <p className={`text-xl text-[#CCCCCC] font-light leading-relaxed ${inter.className}`}>
                Build powerful workflows with AI guidance, ready-to-use JSONs, and interactive examples.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7B61FF]/20 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-[#7B61FF]" />
                </div>
                <p className={`text-[#BBBBBB] ${inter.className}`}>Learn n8n visually with interactive examples</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7B61FF]/20 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-[#7B61FF]" />
                </div>
                <p className={`text-[#BBBBBB] ${inter.className}`}>Download complete workflows in 1 click</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7B61FF]/20 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-[#7B61FF]" />
                </div>
                <p className={`text-[#BBBBBB] ${inter.className}`}>No coding needed - just describe what you want</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-[#7B61FF] to-[#A47CF3] hover:from-[#6A50E0] hover:to-[#9369E4] text-white px-6 py-6 rounded-full shadow-lg shadow-[#7B61FF]/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#7B61FF]/30 text-base">
                  Try FlowGenie Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  variant="outline"
                  className="border-[#444] text-[#BBB] hover:bg-[#222] hover:text-white px-6 py-6 rounded-full transition-all hover:scale-105 hover:shadow-md hover:shadow-[#333]/20 text-base"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Example navigation - Redesigned with modern controls */}
            <div className="pt-6">
              <p className={`text-[#999999] mb-4 ${inter.className}`}>Explore automation examples:</p>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 rounded-full border-[#444] text-[#BBB] hover:bg-[#222] hover:text-white transition-all hover:scale-105 flex items-center justify-center hover:border-[#7B61FF]/50 hover:shadow-md hover:shadow-[#7B61FF]/10"
                  onClick={prevExample}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1 flex justify-center">
                  {automationExamples.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2.5 h-2.5 mx-1.5 rounded-full transition-all ${
                        index === currentExampleIndex
                          ? "bg-gradient-to-r from-[#7B61FF] to-[#A47CF3] scale-125 shadow-md shadow-[#7B61FF]/30"
                          : "bg-[#444] hover:bg-[#666]"
                      }`}
                      onClick={() => setCurrentExampleIndex(index)}
                      aria-label={`Example ${index + 1}`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 rounded-full border-[#444] text-[#BBB] hover:bg-[#222] hover:text-white transition-all hover:scale-105 flex items-center justify-center hover:border-[#7B61FF]/50 hover:shadow-md hover:shadow-[#7B61FF]/10"
                  onClick={nextExample}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Terminal UI - Redesigned with glassmorphism */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentExample.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-[#121212]/80 backdrop-blur-lg border border-[#333]/80 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {/* Terminal header with traffic lights */}
                <div className="bg-[#1A1A1A]/90 backdrop-blur-md px-4 py-3 border-b border-[#333] flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="text-[#BBBBBB] text-sm font-medium">FlowGenie Terminal</div>
                  <div className="w-12"></div> {/* Spacer for alignment */}
                </div>

                {/* Terminal content */}
                <div className="p-5 font-mono text-sm max-h-[60vh] overflow-y-auto bg-gradient-to-b from-[#121212]/90 to-[#0D0D0D]/95">
                  {/* User input with prompt */}
                  <div className="mb-4">
                    <span className="text-[#7B61FF] mr-2">user@flowgenie:~$</span>
                    <span className="text-[#CCCCCC]">{typedQuestion}</span>
                    {typedQuestion.length < currentExample.userQuestion.length && (
                      <span className={`${typedQuestion ? "ml-0.5" : ""} animate-pulse text-[#CCCCCC]`}>_</span>
                    )}
                  </div>

                  {/* AI response */}
                  {typedQuestion === currentExample.userQuestion && (
                    <div className="text-[#CCCCCC] mb-4">
                      <div className="text-[#7B61FF] mb-2">flowgenie@ai:~$</div>
                      <div className="pl-4 mb-2 text-[#E0E0E0]">{currentExample.aiResponse}</div>

                      {/* Steps */}
                      <div className="pl-4 space-y-1">
                        {typedSteps.map((step, index) => (
                          <div key={index} className="text-[#CCCCCC]">
                            {step}
                          </div>
                        ))}
                        {typedSteps.length === currentExample.steps.length && !showJson && (
                          <span className="animate-pulse text-[#CCCCCC]">_</span>
                        )}
                      </div>

                      {/* JSON preview */}
                      {showJson && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-4"
                        >
                          <div className="text-[#7B61FF] mb-2">flowgenie@ai:~$ cat workflow.json</div>
                          <div className="bg-[#0D1117] p-3 rounded-xl border border-[#30363D]/80 overflow-x-auto shadow-inner">
                            <pre className="text-[#E0E0E0] text-xs">{currentExample.jsonPreview}</pre>
                          </div>
                          <div className="mt-3 flex justify-end space-x-3">
                            <button
                              onClick={copyJson}
                              className="text-[#7B61FF] text-xs hover:text-[#A47CF3] flex items-center transition-colors group"
                            >
                              {copied ? (
                                <>
                                  <Check className="mr-1 h-3 w-3 group-hover:scale-110 transition-transform" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-1 h-3 w-3 group-hover:scale-110 transition-transform" />
                                  Copy JSON
                                </>
                              )}
                            </button>
                            <a
                              href="#"
                              className="text-[#7B61FF] text-xs hover:text-[#A47CF3] flex items-center transition-colors group"
                            >
                              Download JSON
                              <ArrowRightIcon className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <a
                              href="https://n8n.io"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#7B61FF] text-xs hover:text-[#A47CF3] flex items-center transition-colors group"
                            >
                              Open in n8n
                              <ArrowRightIcon className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Blinking cursor at the end if everything is typed */}
                  {typedQuestion === currentExample.userQuestion &&
                    typedSteps.length === currentExample.steps.length &&
                    showJson && (
                      <div>
                        <span className="text-[#7B61FF] mr-2">user@flowgenie:~$</span>
                        <span className="animate-pulse text-[#CCCCCC]">_</span>
                      </div>
                    )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
