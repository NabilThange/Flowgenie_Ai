"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "FlowGenie saved me hours of work. I was able to create a complex email automation workflow in minutes!",
      author: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "As a non-technical founder, I never thought I could build automations myself. FlowGenie changed that completely.",
      author: "Michael Chen",
      role: "Startup Founder",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "The JSON export feature is a game-changer. I can now create and share workflows with my team effortlessly.",
      author: "Alex Rodriguez",
      role: "Operations Director",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [current, testimonials.length])

  return (
    <section className="py-20 relative z-10">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold mb-4 text-[#E0E0E0]"
        >
          What Our Users Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[#BBBBBB] max-w-2xl mx-auto"
        >
          Join thousands of satisfied users who have transformed their workflow automation.
        </motion.p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <Card className="flex-shrink-0 w-full bg-[#1A1A1A] border-[#333] shadow-lg shadow-black/20">
              <CardContent className="flex flex-col items-center text-center p-6">
                <Quote className="h-10 w-10 text-indigo-500 mb-6" />
                <motion.p
                  className="text-lg mb-6 italic text-[#E0E0E0]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {testimonials[current].quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ filter: "blur(5px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.02 * i }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Avatar className="h-10 w-10 mr-4 border border-[#333]">
                    <AvatarImage
                      src={testimonials[current].avatar || "/placeholder.svg"}
                      alt={testimonials[current].author}
                    />
                    <AvatarFallback className="bg-[#252525] text-[#E0E0E0]">
                      {testimonials[current].author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold text-[#E0E0E0]">{testimonials[current].author}</p>
                    <p className="text-sm text-[#999999]">{testimonials[current].role}</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#252525" }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#1A1A1A] rounded-full p-2 shadow-md hover:bg-[#252525] border border-[#333] text-[#E0E0E0]"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#252525" }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#1A1A1A] rounded-full p-2 shadow-md hover:bg-[#252525] border border-[#333] text-[#E0E0E0]"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>

        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrent(index)}
              className={`h-2 w-2 rounded-full ${current === index ? "bg-indigo-500" : "bg-[#333]"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
