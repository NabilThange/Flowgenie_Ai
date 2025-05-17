"use client"

import { useRef } from "react"
import { MessageSquare, FileJson, Play } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const steps = [
    {
      icon: <MessageSquare className="h-10 w-10 text-indigo-500" />,
      title: "Ask your automation question",
      description: "Describe what you want to automate in plain language. No technical jargon needed.",
    },
    {
      icon: <FileJson className="h-10 w-10 text-violet-500" />,
      title: "Get guided steps and a JSON file",
      description: "Receive step-by-step instructions and a ready-to-use JSON workflow file.",
    },
    {
      icon: <Play className="h-10 w-10 text-blue-500" />,
      title: "Import JSON into n8n and run",
      description: "Simply import the JSON file into n8n and your automation is ready to go.",
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 1.2, ease: "easeInOut", delay: 0.6 } },
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 my-16 relative z-10 overflow-hidden">
      {/* Background with gradient and blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] rounded-3xl -z-10" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-[0.02] -z-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
              How It Works
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Creating powerful automations has never been easier.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-0.5 -z-10">
            <motion.div
              variants={lineVariants}
              className="h-full bg-gradient-to-r from-indigo-500/40 to-violet-500/40 rounded-full"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              {/* Step number badge */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20 z-10">
                {index + 1}
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 h-full hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 group">
                <div className="bg-zinc-800/50 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    {step.icon}
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl -z-10" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-white text-center group-hover:text-indigo-300 transition-colors duration-300">
                  {step.title}
                </h3>

                <p className="text-zinc-400 text-center">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full text-white font-medium hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  )
}
