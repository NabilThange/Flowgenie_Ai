import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[rgba(10,10,10,0.9)] backdrop-blur-md text-white py-12 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold mb-4 block">
              FlowGenie
            </Link>
            <p className="text-[#BBBBBB] max-w-md">
              Build complex n8n automations with AI. Type what you want to automate — get step-by-step guidance and a
              ready-to-use JSON file.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-[#999999] hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-[#999999] hover:text-white transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-[#999999] hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-[#999999] hover:text-white transition-colors">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#E0E0E0]">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-[#BBBBBB] hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-[#BBBBBB] hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#BBBBBB] hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#BBBBBB] hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#E0E0E0]">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#BBBBBB] hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#BBBBBB] hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#BBBBBB] hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#BBBBBB] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#333] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#999999] text-sm">&copy; {new Date().getFullYear()} FlowGenie. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-[#999999] hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#999999] hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-[#999999] hover:text-white transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
