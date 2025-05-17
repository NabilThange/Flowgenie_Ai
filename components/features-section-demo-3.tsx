"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Youtube } from "lucide-react"

export default function FeaturesSectionDemo() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">FlowGenie Key Features</h2>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          FlowGenie blends intelligent automation with seamless design to help you build, fix, and scale workflows
          effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <FeatureCard className="lg:col-span-3">
          <SkeletonOne />
        </FeatureCard>
        <FeatureCard className="lg:col-span-3">
          <SkeletonTwo />
        </FeatureCard>
        <FeatureCard className="lg:col-span-2">
          <SkeletonThree />
        </FeatureCard>
        <FeatureCard className="lg:col-span-4">
          <SkeletonFour />
        </FeatureCard>
      </div>
    </div>
  )
}

function FeatureCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("rounded-xl border border-neutral-800 bg-neutral-950 p-4 shadow-xl", className)}>{children}</div>
  )
}

function FeatureTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xl font-semibold text-white mb-2">{children}</h3>
}

function FeatureDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-neutral-500">{children}</p>
}

function SkeletonOne() {
  return (
    <div className="flex flex-col space-y-4">
      <FeatureTitle>Fix My Flow</FeatureTitle>
      <FeatureDescription>
        Instantly diagnose and repair broken automations. FlowGenie's AI identifies issues and suggests accurate fixes
        with context-aware explanations.
      </FeatureDescription>
      <div className="h-64 w-full rounded-xl bg-neutral-900 relative overflow-hidden">
        <img
          src="https://imgs.search.brave.com/TRY5l9QYI9PE9B_888E9hPDiYmTEl7_3Zf0TWO0kGso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9uOG5p/b3N0b3JhZ2VhY2Nv/dW50LmJsb2IuY29y/ZS53aW5kb3dzLm5l/dC9uOG5pby1zdHJh/cGktYmxvYnMtcHJv/ZC9hc3NldHMvTWVy/Z2VfTG9vcF9GaWx0/ZXJfNjY2YjcxYmVl/NS53ZWJw?height=400&width=800"
          alt="Fix My Flow Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-2 w-3/4 rounded-full bg-neutral-700 mb-2"></div>
          <div className="h-2 w-1/2 rounded-full bg-neutral-700"></div>
        </div>
      </div>
    </div>
  )
}

function SkeletonTwo() {
  return (
    <div className="flex flex-col space-y-4">
      <FeatureTitle>Workflow Snapshot Vision</FeatureTitle>
      <FeatureDescription>
        Upload a screenshot of any n8n automation and let FlowGenie reverse-engineer it. Instantly get a step-by-step
        breakdown with node configs.
      </FeatureDescription>
      <div className="grid grid-cols-2 gap-2">
        <motion.div
          whileHover={{ rotate: "-5deg", scale: 0.95 }}
          className="aspect-square bg-neutral-900 rounded-lg overflow-hidden"
        >
          <img
            src="https://imgs.search.brave.com/O2B91gf_Ef5rWv-al_XeXmfduFXkzupeDMotcaLYQbY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmNv/bS90dXRvcmlhbHMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzIvMjAyNS8wMy91/cGxvYWRfdG9fYXBw/cm9wcmlhdGVfZm9s/ZGVyLTEtMTAyNHg0/OTIucG5n?height=300&width=300"
            alt="Vision feature 1"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          whileHover={{ rotate: "5deg", scale: 0.95 }}
          className="aspect-square bg-neutral-900 rounded-lg overflow-hidden"
        >
          <img
            src="https://imgs.search.brave.com/yqap5kaYoTpsN-uCx2cF93rHp_3VDnBR3OOCBzu4FEM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9uOG4u/aW8vaW1hZ2VzL2Vt/YmVkLWF1dG9tYXRp/b24ud2VicA?height=300&width=300"
            alt="Vision feature 2"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          whileHover={{ rotate: "5deg", scale: 0.95 }}
          className="aspect-square bg-neutral-900 rounded-lg overflow-hidden"
        >
          <img
            src="https://imgs.search.brave.com/psom8jqePdpK04LCW3U6vOicJcDlJ9l9wkgd3dz-ywQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9uOG5p/b3N0b3JhZ2VhY2Nv/dW50LmJsb2IuY29y/ZS53aW5kb3dzLm5l/dC9uOG5pby1zdHJh/cGktYmxvYnMtcHJv/ZC9hc3NldHMvRmVh/dHVyZXNfZmFsbF9i/YWNrX2NvZGVfem9v/bV9hNjI1NTA2MzRl/LndlYnA?height=300&width=300"
            alt="Vision feature 3"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          whileHover={{ rotate: "-5deg", scale: 0.95 }}
          className="aspect-square bg-neutral-900 rounded-lg overflow-hidden"
        >
          <img
            src="https://imgs.search.brave.com/1MqJUWHBh365RXiBLrv0PUXl2KfY4rPy_hznG3VDj_8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdXRv/Z3B0Lm5ldC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8wNC9T/Y3JlZW5zaG90LTIw/MjUtMDQtMDMtYXQt/My4xNS4zNC1QTS0x/MDI0eDU3NC5qcGc?height=300&width=300"
            alt="Vision feature 4"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  )
}

function SkeletonThree() {
  return (
    <div className="flex flex-col space-y-4">
      <FeatureTitle>Video Guides & Walkthroughs</FeatureTitle>
      <FeatureDescription>
        Follow hands-on tutorials to master FlowGenie—from building your first workflow to advanced automations.
      </FeatureDescription>
      <motion.div
        whileHover={{ scale: 0.98 }}
        className="h-40 rounded-xl bg-neutral-900 flex items-center justify-center relative overflow-hidden group"
      >
        <img
          src="https://imgs.search.brave.com/hiSKlVmuHbGWqv4CTPiuqB0WxgEmD_Gsa7o_28dBYvI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/Lm44bi5pby9jb250/ZW50L2ltYWdlcy9z/aXplL3c2MDAvMjAy/NS8wMi9yZWJ1aWxk/aW5nLWFpLWFzc2lz/dGFudDEucG5n?height=300&width=500"
          alt="Video tutorial thumbnail"
          className="w-full h-full object-cover absolute inset-0 group-hover:blur-sm transition-all duration-300"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300"></div>
        <Youtube className="w-12 h-12 text-white relative z-10 group-hover:scale-110 transition-all duration-300" />
      </motion.div>
    </div>
  )
}

function SkeletonFour() {
  return (
    <div className="flex flex-col space-y-4">
      <FeatureTitle>Worldwide Automation Network</FeatureTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureDescription>
          FlowGenie empowers creators in over 150+ countries to automate smarter. Share templates, discover workflows,
          and grow together.
        </FeatureDescription>
        <div className="h-[250px] flex items-center justify-center">
          <Globe />
        </div>
      </div>
    </div>
  )
}

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !canvasRef.current) return

    let phi = 0
    let width = 0
    let globe: any = null

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    // Dynamically import cobe only on client-side
    const initGlobe = async () => {
      try {
        const cobe = await import("cobe")
        const createGlobe = cobe.default

        window.addEventListener("resize", onResize)
        onResize()

        globe = createGlobe(canvasRef.current!, {
          devicePixelRatio: 2,
          width: width * 2,
          height: width * 2,
          phi: 0,
          theta: 0.3,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [0.1, 0.1, 0.1],
          markerColor: [0.6, 0.3, 0.9],
          glowColor: [0.2, 0.2, 0.2],
          markers: [
            { location: [37.7595, -122.4367], size: 0.05 },
            { location: [40.7128, -74.006], size: 0.05 },
            { location: [51.5074, -0.1278], size: 0.05 },
            { location: [48.8566, 2.3522], size: 0.05 },
            { location: [35.6762, 139.6503], size: 0.05 },
            { location: [-33.8688, 151.2093], size: 0.05 },
            { location: [22.3193, 114.1694], size: 0.05 },
            { location: [1.3521, 103.8198], size: 0.05 },
          ],
          onRender: (state) => {
            state.phi = phi
            phi += 0.005
            state.width = width * 2
            state.height = width * 2
          },
        })

        setTimeout(() => {
          if (canvasRef.current) {
            canvasRef.current.style.opacity = "1"
          }
        })
      } catch (error) {
        console.error("Failed to load globe:", error)
      }
    }

    initGlobe()

    return () => {
      if (globe) {
        globe.destroy()
      }
      window.removeEventListener("resize", onResize)
    }
  }, [isClient])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isClient ? (
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            contain: "layout paint size",
            opacity: 0,
            transition: "opacity 1s ease",
          }}
        />
      ) : (
        <div className="w-full h-full bg-neutral-900 rounded-lg flex items-center justify-center">
          <p className="text-neutral-500">Loading globe visualization...</p>
        </div>
      )}
    </div>
  )
}
