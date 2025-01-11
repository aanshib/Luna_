"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Play, Search } from 'lucide-react'
import { useState, useEffect } from "react"

import { motion } from "framer-motion"

// Define a type for the user object stored in localStorage
type User = {
  email: string;
  username: string; // This will now store the user's name
  isLoggedIn: boolean;
}

export default function HeroSection() {
  const toRotate = [
    "Radiate confidence through your unique style",
    "Glow with natural beauty and charm",
    "Celebrate the power of femininity",
  ]
  const [loopNum, setLoopNum] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState("")
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [user, setUser] = useState<User | null>(null); // State to hold user info

  useEffect(() => {
    // Check for user in localStorage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }

    const ticker = setInterval(() => {
      tick()
    }, typingSpeed)
    return () => clearInterval(ticker)
  }, [text, typingSpeed, loopNum]); // Added loopNum to dependency array for tick function

  const tick = () => {
    const i = loopNum % toRotate.length
    const fullText = toRotate[i]
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1)

    setText(updatedText)

    if (isDeleting) {
      setTypingSpeed(prev => prev / 2)
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setTypingSpeed(1000)
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setTypingSpeed(150)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    setUser(null); // Clear user state
    alert("Logged out successfully!");
  };

  return (
    <div className="min-h-[70vh] bg-v0-background font-sans overflow-hidden relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/hii.png?height=1080&width=1920&query=subtle abstract background pattern)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        }}
      ></div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 flex items-center px-8 py-6 max-w-7xl mx-auto"
      >
        <div className="text-v0-primary-text text-4xl font-serif font-extrabold tracking-tight">LunaSkin</div>
        <div className="flex items-center ml-auto">
          <nav className="hidden md:flex items-center space-x-8 text-v0-secondary-text text-sm">
            <Link href="#" className="hover:text-v0-primary-text hover:underline underline-offset-4 transition-colors">Home</Link>
            <Link href="#" className="hover:text-v0-primary-text hover:underline underline-offset-4 transition-colors">About Us</Link>
            <Link href="#" className="hover:text-v0-primary-text hover:underline underline-offset-4 transition-colors">Services</Link>
            {user && user.isLoggedIn ? (
              <>
                <span className="text-v0-primary-text font-semibold">Welcome back, {user.username}!</span>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="hover:text-v0-primary-text hover:underline underline-offset-4 transition-colors"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-v0-primary-text hover:underline underline-offset-4 transition-colors">Login</Link>
                <Link href="/signup" className="hover:text-v0-primary-text hover:underline underline-offset-4 transition-colors">Sign Up</Link>
              </>
            )}
          </nav>
          <div className="flex items-center space-x-4 ml-8">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full object-cover border border-v0-button-bg w-8 h-8 shadow-sm"
            />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-8 py-12 md:py-16 overflow-hidden">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 text-center md:text-left relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 md:-top-10"
          >
            <div className="relative w-10 h-10">
              <div className="absolute w-3 h-3 bg-v0-button-bg rounded-full top-0 left-0 transform rotate-45"></div>
              <div className="absolute w-3 h-3 bg-v0-button-bg rounded-full top-0 right-0 transform -rotate-45"></div>
              <div className="absolute w-3 h-3 bg-v0-button-bg rounded-full bottom-0 left-0 transform -rotate-45"></div>
              <div className="absolute w-3 h-3 bg-v0-button-bg rounded-full bottom-0 right-0 transform rotate-45"></div>
              <div className="absolute w-2 h-2 bg-v0-dark-red rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif text-5xl md:text-6xl font-bold leading-tight text-v0-primary-text mb-6 max-w-lg min-h-[180px] md:min-h-[120px]"
          >
            {text}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-v0-secondary-text text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0"
          >
            Discover personalized beauty and wellness insights tailored to empower your natural glow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center md:justify-start items-center space-x-4"
          >
            <Button className="bg-v0-button-bg text-white px-8 py-3 rounded-full hover:bg-v0-dark-pink transition-colors shadow-md">
              Explore Now
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <Play className="h-6 w-6 text-v0-primary-text fill-v0-primary-text" />
              <span className="sr-only">Play video</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex-1 relative mt-12 md:mt-0 flex justify-center md:justify-end group"
        >
          <div className="relative w-[180px] h-[250px] md:w-[220px] md:h-[290px] lg:w-[250px] lg:h-[320px] group">
            <div className="absolute inset-0 bg-v0-pink-bg rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] w-[calc(100% + 80px)] h-[calc(100% + 80px)] transform translate-x-10 translate-y-10"></div>
            <Image
              src="/hii.png"
              alt="Confident woman expressing femininity"
              width={250}
              height={320}
              className="absolute inset-0 object-cover w-full h-full rounded-2xl z-10 group-hover:scale-[1.02] transition-transform duration-300 translate-x-[-30px]"
            />
          </div>
          <div className="absolute right-0 md:-right-10 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-20">
            <div className="w-8 h-8 rounded-full bg-v0-pink-bg shadow-md"></div>
            <div className="w-8 h-8 rounded-full bg-v0-dark-pink shadow-md"></div>
            <div className="w-8 h-8 rounded-full bg-v0-dark-red shadow-md"></div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
