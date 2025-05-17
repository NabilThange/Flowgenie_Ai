"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("up")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if we're at the top of the page
      setIsAtTop(currentScrollY < 10)

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current + 5) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY.current - 5) {
        setScrollDirection("up")
      }

      // Update scroll position for potential opacity/blur effects
      setScrollPosition(currentScrollY)

      // Update reference
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate opacity and blur based on scroll position
  const opacity = Math.min(1, Math.max(0.8, scrollPosition / 200))
  const blurValue = Math.min(12, scrollPosition / 20)

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: scrollDirection === "down" && !isAtTop && !isMenuOpen ? -100 : 0,
        transition: {
          duration: 0.3,
          ease: scrollDirection === "down" ? "easeIn" : "easeOut",
        },
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Navbar Container */}
      <div
        className="mx-4 my-4 md:mx-8 rounded-2xl border border-zinc-800/60"
        style={{
          backgroundColor: `rgba(10,10,10,${opacity})`,
          backdropFilter: `blur(${blurValue}px)`,
          boxShadow: isAtTop ? "none" : "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.span
                className="text-xl font-bold text-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                FlowGenie
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>

              <div className="ml-4 flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-white/10 font-medium rounded-xl"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-[#7B61FF] to-[#A47CF3] hover:from-[#6A50E0] hover:to-[#9369E4] text-white rounded-xl px-6 shadow-md shadow-[#7B61FF]/20 hover:shadow-lg hover:shadow-[#7B61FF]/30 hover:scale-105 transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden mx-4 mt-2 rounded-2xl bg-[rgba(10,10,10,0.95)] backdrop-blur-md border border-zinc-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <MobileNavLink href="#features" onClick={() => setIsMenuOpen(false)}>
                Features
              </MobileNavLink>
              <MobileNavLink href="#pricing" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </MobileNavLink>

              <div className="pt-2 grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-center text-white border-zinc-700 hover:bg-white/10 hover:border-zinc-600 font-medium rounded-xl"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[#7B61FF] to-[#A47CF3] hover:from-[#6A50E0] hover:to-[#9369E4] text-white rounded-xl shadow-md shadow-[#7B61FF]/20">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// Desktop Nav Link component with hover effects
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors rounded-xl hover:bg-white/5 group"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#7B61FF] to-[#A47CF3] transform -translate-x-1/2"
        initial={{ width: 0 }}
        whileHover={{ width: "80%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}

// Mobile Nav Link component
function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white/90 hover:text-white py-3 px-4 font-medium rounded-xl hover:bg-white/5 block transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
