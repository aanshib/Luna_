"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Droplet, Leaf, Sun, Cloud, CircleHelp, User } from 'lucide-react'
import { motion } from "framer-motion"

// Define a type for the user object stored in localStorage
type User = {
  id: string;
  email: string;
  username: string;
  skinType?: string;
  periodDate?: string;
  isLoggedIn: boolean;
}

export default function CycleGeneratorPage() {
  const [startDate, setStartDate] = useState("")
  const [cycleLength, setCycleLength] = useState(28)
  const [symptoms, setSymptoms] = useState("")
  const [routine, setRoutine] = useState<{ phase: string; description: string } | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isDataPrePopulated, setIsDataPrePopulated] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  // Check for logged-in user and populate their data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // If user has period date from database, populate it and calculate current phase
        if (userData.periodDate) {
          setStartDate(userData.periodDate);
          setIsDataPrePopulated(true);
          
          // Automatically calculate routine with user's data
          setTimeout(() => {
            calculateRoutineWithUserData(userData.periodDate, 28);
          }, 100);
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  // Auto-regenerate routine when symptoms change (with debounce)
  useEffect(() => {
    if (startDate && routine) {
      const timeoutId = setTimeout(() => {
        calculateRoutine();
      }, 800); // 800ms debounce for better UX

      return () => clearTimeout(timeoutId);
    }
  }, [symptoms]);

  // Auto-regenerate routine when start date or cycle length changes
  useEffect(() => {
    if (startDate) {
      const timeoutId = setTimeout(() => {
        calculateRoutine();
      }, 300); // Shorter delay for date/length changes

      return () => clearTimeout(timeoutId);
    }
  }, [startDate, cycleLength]);

  const calculateRoutineWithUserData = (userStartDate: string, userCycleLength: number) => {
    setIsCalculating(true);
    
    const today = new Date()
    const start = new Date(userStartDate)

    if (isNaN(start.getTime())) {
      setRoutine({ phase: "Error", description: "Please enter a valid start date." })
      setIsCalculating(false);
      return
    }

    const diffTime = Math.abs(today.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const cycleDay = ((diffDays - 1) % userCycleLength) + 1

    let currentPhase = ""
    let description = ""

    // Calculate phase based on cycle day
    if (cycleDay >= 1 && cycleDay <= 7) {
      currentPhase = "Menstrual Phase"
      description = `You're currently on day ${cycleDay} of your cycle. Focus on gentle hydration and soothing skincare. Avoid harsh exfoliants. Use a calming cleanser and a rich moisturizer.`
    } else if (cycleDay > 7 && cycleDay <= 14) {
      currentPhase = "Follicular Phase"
      description = `You're currently on day ${cycleDay} of your cycle. Your skin might feel more balanced. Incorporate active serums like Vitamin C for brightness. Maintain good hydration.`
    } else if (cycleDay > 14 && cycleDay <= 17) {
      currentPhase = "Ovulation Phase"
      description = `You're currently on day ${cycleDay} of your cycle. Skin is often at its best. Light exfoliation can be beneficial. Keep your routine consistent and hydrating.`
    } else if (cycleDay > 17 && cycleDay <= userCycleLength) {
      currentPhase = "Luteal Phase"
      description = `You're currently on day ${cycleDay} of your cycle. Prepare for potential breakouts. Focus on calming and anti-acne ingredients like salicylic acid or niacinamide. Avoid heavy oils.`
    } else {
      currentPhase = "Unknown Phase"
      description = "Please adjust your start date or cycle length for a more accurate routine."
    }

    // Add symptom-specific recommendations
    if (symptoms.trim()) {
      description += getSymptomRecommendations(symptoms, currentPhase);
    }

    setRoutine({ phase: currentPhase, description })
    setIsCalculating(false);
  }

  const handleDemoData = (phase: "menstrual" | "follicular" | "ovulation" | "luteal") => {
    const today = new Date()
    let demoStartDate = new Date()
    const demoCycleLength = 28

    switch (phase) {
      case "menstrual":
        demoStartDate = today
        break
      case "follicular":
        demoStartDate.setDate(today.getDate() - 9)
        break
      case "ovulation":
        demoStartDate.setDate(today.getDate() - 14)
        break
      case "luteal":
        demoStartDate.setDate(today.getDate() - 19)
        break
    }

    setStartDate(demoStartDate.toISOString().split("T")[0])
    setCycleLength(demoCycleLength)
    setIsDataPrePopulated(false)
    setTimeout(() => calculateRoutine(), 0)
  }

  const getSymptomRecommendations = (symptoms: string, phase: string) => {
    const symptomsLower = symptoms.toLowerCase();
    let additionalRecs = "\n\n🎯 Based on your symptoms:\n";

    if (symptomsLower.includes('oily') || symptomsLower.includes('greasy')) {
      additionalRecs += "• Use oil-free, non-comedogenic products\n• Consider a gentle clay mask 1-2x per week\n• Look for niacinamide to control oil production\n";
    }

    if (symptomsLower.includes('dry') || symptomsLower.includes('flaky')) {
      additionalRecs += "• Focus on hydrating ingredients like hyaluronic acid\n• Use a richer moisturizer, especially at night\n• Avoid over-cleansing or harsh scrubs\n";
    }

    if (symptomsLower.includes('breakout') || symptomsLower.includes('acne') || symptomsLower.includes('pimple')) {
      additionalRecs += "• Spot treat with salicylic acid or benzoyl peroxide\n• Avoid touching or picking at breakouts\n• Use gentle, non-irritating products\n";
    }

    if (symptomsLower.includes('sensitive') || symptomsLower.includes('irritated') || symptomsLower.includes('red')) {
      additionalRecs += "• Stick to fragrance-free, gentle formulations\n• Look for soothing ingredients like aloe or chamomile\n• Avoid active ingredients until sensitivity subsides\n";
    }

    if (symptomsLower.includes('dull') || symptomsLower.includes('tired')) {
      additionalRecs += "• Incorporate gentle exfoliation (AHA/BHA)\n• Use vitamin C serum for brightness\n• Ensure you're getting enough sleep and hydration\n";
    }

    if (symptomsLower.includes('puffy') || symptomsLower.includes('swollen')) {
      additionalRecs += "• Use cooling products or tools (jade roller, cold compress)\n• Look for caffeine-infused eye creams\n• Reduce sodium intake and stay hydrated\n";
    }

    if (symptomsLower.includes('tight') || symptomsLower.includes('uncomfortable')) {
      additionalRecs += "• Apply a hydrating serum before moisturizer\n• Use a humidifier in your room\n• Avoid hot water when cleansing\n";
    }

    return additionalRecs === "\n\n🎯 Based on your symptoms:\n" ? "" : additionalRecs;
  }

  const calculateRoutine = () => {
    setIsCalculating(true);
    
    const today = new Date()
    const start = new Date(startDate)

    if (isNaN(start.getTime())) {
      setRoutine({ phase: "Error", description: "Please enter a valid start date." })
      setIsCalculating(false);
      return
    }

    const diffTime = Math.abs(today.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const cycleDay = ((diffDays - 1) % cycleLength) + 1

    let currentPhase = ""
    let description = ""

    if (cycleDay >= 1 && cycleDay <= 7) {
      currentPhase = "Menstrual Phase"
      description = `You're currently on day ${cycleDay} of your cycle. Focus on gentle hydration and soothing skincare. Avoid harsh exfoliants. Use a calming cleanser and a rich moisturizer.`
    } else if (cycleDay > 7 && cycleDay <= 14) {
      currentPhase = "Follicular Phase"
      description = `You're currently on day ${cycleDay} of your cycle. Your skin might feel more balanced. Incorporate active serums like Vitamin C for brightness. Maintain good hydration.`
    } else if (cycleDay > 14 && cycleDay <= 17) {
      currentPhase = "Ovulation Phase"
      description = `You're currently on day ${cycleDay} of your cycle. Skin is often at its best. Light exfoliation can be beneficial. Keep your routine consistent and hydrating.`
    } else if (cycleDay > 17 && cycleDay <= cycleLength) {
      currentPhase = "Luteal Phase"
      description = `You're currently on day ${cycleDay} of your cycle. Prepare for potential breakouts. Focus on calming and anti-acne ingredients like salicylic acid or niacinamide. Avoid heavy oils.`
    } else {
      currentPhase = "Unknown Phase"
      description = "Please adjust your start date or cycle length for a more accurate routine."
    }

    // Add symptom-specific recommendations
    if (symptoms.trim()) {
      description += getSymptomRecommendations(symptoms, currentPhase);
    }

    setRoutine({ phase: currentPhase, description })
    setIsCalculating(false);
  }

  // Manual recalculate function for the button
  const handleManualRecalculate = () => {
    if (!startDate) {
      alert("Please enter a start date first.");
      return;
    }
    calculateRoutine();
  }

  // Function to get icon based on phase
  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case "Menstrual Phase":
        return <Droplet className="h-6 w-6 text-v0-dark-red" />
      case "Follicular Phase":
        return <Leaf className="h-6 w-6 text-v0-button-bg" />
      case "Ovulation Phase":
        return <Sun className="h-6 w-6 text-v0-dark-pink" />
      case "Luteal Phase":
        return <Cloud className="h-6 w-6 text-v0-secondary-text" />
      default:
        return <CircleHelp className="h-6 w-6 text-gray-500" />
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

  const routineVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <div className="min-h-screen bg-v0-background font-sans flex flex-col items-center py-12 px-4 relative overflow-hidden">
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
        className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8 relative z-10"
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
        
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-v0-primary-text mb-4 text-center">
          Cycle-Aware Routine Generator
        </h1>

        {/* User welcome message */}
        {user && user.isLoggedIn && (
          <div className="mb-6 p-4 bg-v0-pink-bg rounded-lg flex items-center gap-3">
            <User className="h-5 w-5 text-v0-primary-text" />
            <div>
              <p className="text-v0-primary-text font-medium">Welcome back, {user.username}!</p>
              {isDataPrePopulated && (
                <p className="text-v0-secondary-text text-sm">
                  We've automatically loaded your cycle data from your profile and calculated your current phase.
                </p>
              )}
              {user.skinType && (
                <p className="text-v0-secondary-text text-sm">
                  Your skin type: <span className="font-medium text-v0-button-bg">{user.skinType}</span>
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => handleDemoData("menstrual")}
            className="bg-v0-dark-pink text-white px-6 py-2 rounded-full hover:bg-v0-button-bg transition-colors shadow-md"
          >
            Demo Menstrual
          </Button>
          <Button
            onClick={() => handleDemoData("follicular")}
            className="bg-v0-dark-pink text-white px-6 py-2 rounded-full hover:bg-v0-button-bg transition-colors shadow-md"
          >
            Demo Follicular
          </Button>
          <Button
            onClick={() => handleDemoData("ovulation")}
            className="bg-v0-dark-pink text-white px-6 py-2 rounded-full hover:bg-v0-button-bg transition-colors shadow-md"
          >
            Demo Ovulation
          </Button>
          <Button
            onClick={() => handleDemoData("luteal")}
            className="bg-v0-dark-pink text-white px-6 py-2 rounded-full hover:bg-v0-button-bg transition-colors shadow-md"
          >
            Demo Luteal
          </Button>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <Label htmlFor="startDate" className="block text-v0-secondary-text text-lg mb-2">
              Last Period Start Date
              {isDataPrePopulated && (
                <span className="ml-2 text-sm text-v0-button-bg font-medium">(From your profile)</span>
              )}
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
                setIsDataPrePopulated(false)
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-v0-button-bg focus:border-v0-button-bg"
            />
          </div>
          <div>
            <Label htmlFor="cycleLength" className="block text-v0-secondary-text text-lg mb-2">
              Average Cycle Length (days)
            </Label>
            <Input
              id="cycleLength"
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              min="20"
              max="45"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-v0-button-bg focus:border-v0-button-bg"
            />
          </div>
          <div>
            <Label htmlFor="symptoms" className="block text-v0-secondary-text text-lg mb-2">
              Current Symptoms (optional)
              <span className="ml-2 text-sm text-gray-500">Routine updates automatically as you type</span>
            </Label>
            <Textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., oily skin, breakouts, dryness, sensitive, dull skin, puffy, tight"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-v0-button-bg focus:border-v0-button-bg min-h-[100px]"
            />
            {symptoms.trim() && (
              <p className="text-sm text-v0-button-bg mt-1 animate-pulse">
                ✨ Updating routine based on your symptoms...
              </p>
            )}
          </div>
          <Button
            onClick={handleManualRecalculate}
            disabled={isCalculating || !startDate}
            className="w-full bg-v0-button-bg text-white px-8 py-4 rounded-full text-lg hover:bg-v0-dark-pink transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Calculating...
              </>
            ) : routine ? (
              "Recalculate Routine"
            ) : (
              "Generate Routine"
            )}
          </Button>
        </div>

        {routine && (
          <motion.div className="mt-8" variants={routineVariants} initial="hidden" animate="visible">
            <Card className="bg-v0-pink-bg border-v0-button-bg shadow-lg">
              <CardHeader className="flex flex-row items-center gap-3">
                {getPhaseIcon(routine.phase)}
                <CardTitle className="font-serif text-2xl font-bold text-v0-primary-text">
                  Current Phase: {routine.phase}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-base leading-relaxed text-v0-primary-text whitespace-pre-line">
                  {routine.description}
                </div>
                {isDataPrePopulated && (
                  <div className="mt-4 p-3 bg-white/50 rounded-md">
                    <p className="text-sm text-v0-secondary-text">
                      💡 This calculation is based on your profile data from when you signed up. Update your period date anytime to get more accurate recommendations.
                    </p>
                  </div>
                )}
                {symptoms.trim() && (
                  <div className="mt-4 p-3 bg-white/70 rounded-md border-l-4 border-v0-button-bg">
                    <p className="text-sm text-v0-secondary-text">
                      🎯 Personalized recommendations added based on your current symptoms
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
