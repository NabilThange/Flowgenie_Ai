"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, Download, Globe } from "lucide-react"

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-indigo-400" />,
      title: "Step-by-step automation instructions",
      description: "Get detailed, easy-to-follow instructions for creating your automation workflows.",
    },
    {
      icon: <Download className="h-10 w-10 text-violet-400" />,
      title: "Downloadable JSON workflows",
      description: "Download ready-to-use JSON files that you can import directly into n8n.",
    },
    {
      icon: <Globe className="h-10 w-10 text-blue-400" />,
      title: "Integrates with 1000+ tools",
      description: "Connect with all the tools you already use through n8n's extensive integration library.",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  // Floating shapes animation
  const FloatingShape = ({
    className,
    delay = 0,
    duration = 20,
  }: { className: string; delay?: number; duration?: number }) => (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br opacity-20 blur-xl ${className}`}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    />
  )

  return (
    <section ref={sectionRef} id="features" className="py-32 relative z-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#030303] opacity-90 z-[-2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#0a0a0a] to-[#030303] z-[-1]" />

      {/* Floating background shapes */}
      <FloatingShape className="w-96 h-96 left-[-10%] top-[20%] from-indigo-600/10 to-transparent" delay={0} />
      <FloatingShape className="w-80 h-80 right-[-5%] top-[60%] from-violet-600/10 to-transparent" delay={3} />
      <FloatingShape
        className="w-64 h-64 left-[30%] bottom-[5%] from-blue-600/10 to-transparent"
        delay={1.5}
        duration={15}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
              What FlowGenie Can Do
            </span>
          </h2>
          <p className="text-[#BBBBBB] max-w-2xl mx-auto text-lg">
            FlowGenie makes automation effortless with powerful, AI-driven features designed to save you time.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                y: -4,
                transition: { duration: 0.2 },
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-violet-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

              <div className="relative h-full bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg transition-all duration-300 group-hover:border-purple-400/40 group-hover:shadow-purple-600/20">
                {/* Icon container with glow effect */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-violet-500/20 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-16 h-16 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:border-purple-400/40 transition-all duration-300">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-[#BBBBBB] group-hover:text-[#DDDDDD] transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
