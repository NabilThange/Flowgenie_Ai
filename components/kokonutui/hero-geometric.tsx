"use client"

import { motion } from "framer-motion"
import { Pacifico, Space_Grotesk } from "next/font/google"
import Image from "next/image"
import { cn } from "@/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-[#ff9a9e]/[0.08] to-[#fad0c4]/[0.02]",
  shapeType = "pill",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
  shapeType?: "pill" | "person" | "flower" | "scalloped" | "teardrop"
}) {
  // Define clip paths for different shapes
  const clipPaths = {
    person: "ellipse(50% 33% at 50% 33%)",
    flower: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    scalloped:
      "polygon(50% 0%, 63% 13%, 80% 10%, 87% 25%, 100% 35%, 94% 50%, 100% 65%, 87% 75%, 80% 90%, 63% 87%, 50% 100%, 37% 87%, 20% 90%, 13% 75%, 0% 65%, 6% 50%, 0% 35%, 13% 25%, 20% 10%, 37% 13%)",
    teardrop: "polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 100% 100%, 0% 100%)",
    pill: "none", // Default pill shape uses border-radius
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
          clipPath: clipPaths[shapeType],
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0",
            shapeType === "pill" ? "rounded-full" : "",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0",
            shapeType === "pill" ? "after:rounded-full" : "",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function HeroGeometric({
  badge = "Kokonut UI",
  title1 = "Elevate Your",
  title2 = "Digital Vision",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff9a9e]/[0.08] to-[#fad0c4]/[0.02] blur-3xl" />

      <div className="fixed inset-0 overflow-hidden">
        {/* Original pill shapes */}
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-[#ff9a9e]/[0.08] to-[#fad0c4]/[0.02]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          shapeType="pill"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-[#ff9a9e]/[0.08] to-[#fad0c4]/[0.02]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          shapeType="pill"
        />

        {/* Shape 1: Rounded Person Silhouette */}
        <ElegantShape
          delay={0.7}
          width={120}
          height={150}
          rotate={-5}
          gradient="from-purple-700/20 to-purple-400/10"
          className="top-12 right-32 hidden md:block"
          shapeType="person"
        />

        <ElegantShape
          delay={0.9}
          width={100}
          height={130}
          rotate={8}
          gradient="from-purple-700/20 to-purple-400/10"
          className="left-[20%] top-[60%] hidden md:block"
          shapeType="person"
        />

        {/* Shape 2: 4-Petal Flower */}
        <ElegantShape
          delay={0.6}
          width={130}
          height={130}
          rotate={20}
          gradient="from-yellow-200/20 to-yellow-400/10"
          className="bottom-20 left-24 hidden md:block"
          shapeType="flower"
        />

        <ElegantShape
          delay={0.4}
          width={110}
          height={110}
          rotate={-10}
          gradient="from-yellow-200/20 to-yellow-400/10"
          className="top-[15%] left-[40%] hidden md:block"
          shapeType="flower"
        />

        {/* Shape 3: Scalloped Circle */}
        <ElegantShape
          delay={0.8}
          width={100}
          height={100}
          rotate={15}
          gradient="from-blue-300/20 to-indigo-300/10"
          className="top-1/2 right-28 hidden md:block"
          shapeType="scalloped"
        />

        {/* Shape 4: Reverse Teardrop + Flat Bottom */}
        <ElegantShape
          delay={0.6}
          width={90}
          height={110}
          rotate={-8}
          gradient="from-pink-500/20 to-pink-300/10"
          className="bottom-10 right-12 hidden md:block"
          shapeType="teardrop"
        />

        {/* Keep some original pill shapes for mobile */}
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-[#ff9a9e]/[0.08] to-[#fad0c4]/[0.02]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          shapeType="pill"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-[#ff9a9e]/[0.08] to-[#fad0c4]/[0.02]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          shapeType="pill"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-[#ff9a9e]/[0.08] to-[#fad0c4]/[0.02]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          shapeType="pill"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Image src="https://kokonutui.com/logo.svg" alt="Kokonut UI" width={20} height={20} />
            <span className="text-sm text-white/60 tracking-wide">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80",
                  spaceGrotesk.className,
                )}
              >
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-[#ff6a88] to-[#ffb86c] ",
                  pacifico.className,
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Automate your workflows with AI. Effortless. Powerful.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}
