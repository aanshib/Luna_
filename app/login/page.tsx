"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email || !password) {
      alert("Please enter both email and password.");
      setIsLoading(false)
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store complete user data from database in localStorage
        localStorage.setItem('user', JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          skinType: data.user.skinType,
          periodDate: data.user.periodDate,
          isLoggedIn: true
        }));
        alert("Login successful! Redirecting to home page.");
        router.push('/');
      } else {
        alert(`Login failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Network or server error during login:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false)
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
              Welcome Back!
            </CardTitle>
            <p className="text-v0-secondary-text text-lg">Sign in to your LunaSkin account.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-v0-button-bg text-white px-8 py-4 rounded-full text-lg hover:bg-v0-dark-pink transition-colors shadow-md disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Login"}
              </Button>
            </form>
            <p className="mt-6 text-center text-v0-secondary-text text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-v0-button-bg hover:underline font-semibold">
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
