"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [name, setName] = useState("") // New state for name
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [skinType, setSkinType] = useState<string | null>(null)
 const [periodDate, setPeriodDate] = useState<string>("")


  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    if (!name || !email || !password || !skinType || !periodDate) {
  alert("Please fill in all required fields.");
  return;
}

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, skinType, periodDate })


      });

      const data = await response.json();

      if (response.ok) {
        // Store user data including the name as username in localStorage
        localStorage.setItem('user', JSON.stringify({
          email: email,
          username: name, // Use the provided name as username
          isLoggedIn: true
        }));
        alert("Signup successful! Redirecting to home page.");
        router.push('/');
      } else {
        alert(`Signup failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Network or server error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  }

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-v0-background font-sans flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 left-0 w-48 h-48 bg-v0-pink-bg rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-1/4 right-0 w-48 h-48 bg-v0-dark-pink rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"
      ></motion.div>

      <motion.div
        className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Link href="/" className="absolute top-4 left-4 text-v0-secondary-text hover:text-v0-primary-text">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to Home</span>
          </Button>
        </Link>
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-4xl md:text-5xl font-bold text-v0-primary-text mb-4">
              Join LunaSkin
            </CardTitle>
            <p className="text-v0-secondary-text text-lg">Create your account to get personalized beauty insights.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-v0-secondary-text text-lg mb-2">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-v0-button-bg focus:border-v0-button-bg"
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-v0-secondary-text text-lg mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-v0-button-bg focus:border-v0-button-bg"
                />
              </div>
              <div>
                <Label htmlFor="password" className="block text-v0-secondary-text text-lg mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-v0-button-bg focus:border-v0-button-bg"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="block text-v0-secondary-text text-lg mb-2">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-v0-button-bg focus:border-v0-button-bg"
                />
              </div>
              <div>
                <Label htmlFor="skinType" className="block text-v0-secondary-text text-lg mb-2">
                  Your Skin Type
                </Label>
                <Select onValueChange={setSkinType} value={skinType || ""}>
                  <SelectTrigger id="skinType" className="w-full p-3 border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select Skin Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Dry">Dry</SelectItem>
                    <SelectItem value="Oily">Oily</SelectItem>
                    <SelectItem value="Combination">Combination</SelectItem>
                    <SelectItem value="Sensitive">Sensitive</SelectItem>
                    <SelectItem value="Acne-prone">Acne-prone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
  <Label htmlFor="periodDate" className="block text-v0-secondary-text text-lg mb-2">
    Last Period Date
  </Label>
  <Input
    id="periodDate"
    type="date"
    value={periodDate}
    onChange={(e) => setPeriodDate(e.target.value)}
    required
    className="w-full p-3 border border-gray-300 rounded-md focus:ring-v0-button-bg focus:border-v0-button-bg"
  />
</div>

              <Button
                type="submit"
                className="w-full bg-v0-button-bg text-white px-8 py-4 rounded-full text-lg hover:bg-v0-dark-pink transition-colors shadow-md"
              >
                Sign Up
              </Button>
            </form>
            <p className="mt-6 text-center text-v0-secondary-text text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-v0-button-bg hover:underline font-semibold">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
