"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, User, CheckCircle, Droplet, Leaf, Sun, Cloud } from 'lucide-react'
import Image from "next/image"
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

// Product type definition
type Product = {
  id: string;
  name: string;
  description: string;
  safeForPhase: string[];
  ingredients: string[];
  skinType: string[];
  price?: string;
  imageUrl: string;
}

// Sample products data
const products: Product[] = [
  {
    id: "p1",
    name: "Gentle Hydrating Cleanser",
    description: "A soothing cleanser perfect for sensitive and dry skin during any phase.",
    safeForPhase: ["Menstrual Phase", "Follicular Phase", "Ovulation Phase", "Luteal Phase"],
    ingredients: ["Hyaluronic Acid", "Glycerin", "Chamomile Extract"],
    skinType: ["Dry", "Sensitive", "Normal", "Combination"],
    price: "$24",
    imageUrl: "/face-cleanse.png"
  },
  {
    id: "p2",
    name: "Vitamin C Brightening Serum",
    description: "Boosts radiance and evens skin tone, ideal for follicular and ovulation phases.",
    safeForPhase: ["Follicular Phase", "Ovulation Phase"],
    ingredients: ["Ascorbic Acid", "Ferulic Acid", "Vitamin E"],
    skinType: ["Normal", "Combination", "Oily"],
    price: "$32",
    imageUrl: "/vitaminC.png"
  },
  {
    id: "p3",
    name: "Salicylic Acid Spot Treatment",
    description: "Targets breakouts and excess oil, a must-have for the luteal phase.",
    safeForPhase: ["Luteal Phase", "Menstrual Phase"],
    ingredients: ["Salicylic Acid", "Tea Tree Oil", "Niacinamide"],
    skinType: ["Oily", "Combination", "Acne-prone"],
    price: "$18",
    imageUrl: "/acne.png"
  },
  {
    id: "p4",
    name: "Hyaluronic Acid Moisturizer",
    description: "Deeply hydrates and plumps the skin, suitable for all phases and skin types.",
    safeForPhase: ["Menstrual Phase", "Follicular Phase", "Ovulation Phase", "Luteal Phase"],
    ingredients: ["Hyaluronic Acid", "Ceramides", "Squalane"],
    skinType: ["Dry", "Normal", "Combination", "Sensitive", "Oily"],
    price: "$28",
    imageUrl: "/hyaluronic.png"
  },
  {
    id: "p5",
    name: "Gentle Exfoliating Toner",
    description: "Lightly exfoliates to reveal smoother skin, great for follicular and ovulation.",
    safeForPhase: ["Follicular Phase", "Ovulation Phase"],
    ingredients: ["Lactic Acid", "Glycolic Acid (low concentration)", "Aloe Vera"],
    skinType: ["Normal", "Combination", "Oily"],
    price: "$22",
    imageUrl: "/toner.png"
  },
  {
    id: "p6",
    name: "Calming Clay Mask",
    description: "Detoxifies and soothes irritated skin, especially during luteal and menstrual phases.",
    safeForPhase: ["Luteal Phase", "Menstrual Phase"],
    ingredients: ["Kaolin Clay", "Bentonite Clay", "Centella Asiatica"],
    skinType: ["Oily", "Combination", "Acne-prone", "Sensitive"],
    price: "$26",
    imageUrl: "/cartoon.png"
  },
  {
    id: "p7",
    name: "Retinol Night Cream",
    description: "Promotes cell turnover and reduces fine lines, best for follicular and ovulation phases.",
    safeForPhase: ["Follicular Phase", "Ovulation Phase"],
    ingredients: ["Retinol", "Peptides", "Hyaluronic Acid"],
    skinType: ["Normal", "Dry", "Combination"],
    price: "$45",
    imageUrl: "/night.png"
  },
  {
    id: "p8",
    name: "Barrier Repair Balm",
    description: "Intensely nourishing for compromised skin barrier, ideal for dry or sensitive skin in any phase.",
    safeForPhase: ["Menstrual Phase", "Follicular Phase", "Ovulation Phase", "Luteal Phase"],
    ingredients: ["Ceramides", "Cholesterol", "Fatty Acids"],
    skinType: ["Dry", "Sensitive", "Normal"],
    price: "$35",
    imageUrl: "/lip-balm.png"
  }
]

export default function ProductRecommendationsPage() {
  const [selectedSkinType, setSelectedSkinType] = useState("")
  const [selectedCyclePhase, setSelectedCyclePhase] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [user, setUser] = useState<User | null>(null)
  const [isSkinTypePrePopulated, setIsSkinTypePrePopulated] = useState(false)
  const [isCyclePhasePrePopulated, setIsCyclePhasePrePopulated] = useState(false)
  const [currentCycleDay, setCurrentCycleDay] = useState<number | null>(null)

  // Function to calculate cycle phase from period date
  const calculateCyclePhase = (periodDate: string) => {
    const today = new Date()
    const start = new Date(periodDate)
    
    if (isNaN(start.getTime())) {
      return null
    }

    const diffTime = Math.abs(today.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const cycleDay = ((diffDays - 1) % 28) + 1 // Assuming 28-day cycle
    
    setCurrentCycleDay(cycleDay)

    if (cycleDay >= 1 && cycleDay <= 7) {
      return "Menstrual Phase"
    } else if (cycleDay > 7 && cycleDay <= 14) {
      return "Follicular Phase"
    } else if (cycleDay > 14 && cycleDay <= 17) {
      return "Ovulation Phase"
    } else if (cycleDay > 17 && cycleDay <= 28) {
      return "Luteal Phase"
    }
    
    return null
  }

  // Check for logged-in user and populate their data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // Auto-populate skin type from database
        if (userData.skinType) {
          setSelectedSkinType(userData.skinType);
          setIsSkinTypePrePopulated(true);
        }

        // Auto-calculate and populate cycle phase from period date
        if (userData.periodDate) {
          const calculatedPhase = calculateCyclePhase(userData.periodDate);
          if (calculatedPhase) {
            setSelectedCyclePhase(calculatedPhase);
            setIsCyclePhasePrePopulated(true);
          }
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  // Filter products based on selected criteria
  useEffect(() => {
    let filtered = products;

    if (selectedSkinType) {
      filtered = filtered.filter(product => 
        product.skinType.includes(selectedSkinType)
      );
    }

    if (selectedCyclePhase) {
      filtered = filtered.filter(product => 
        product.safeForPhase.includes(selectedCyclePhase)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedSkinType, selectedCyclePhase]);

  // Get phase icon
  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case "Menstrual Phase":
        return <Droplet className="h-4 w-4 text-red-500" />
      case "Follicular Phase":
        return <Leaf className="h-4 w-4 text-green-500" />
      case "Ovulation Phase":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "Luteal Phase":
        return <Cloud className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  // Animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
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
        className="w-full max-w-6xl bg-white rounded-lg shadow-xl p-8 relative z-10"
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
          Product Recommendations
        </h1>

        {/* User welcome message */}
        {user && user.isLoggedIn && (
          <div className="mb-8 p-4 bg-v0-pink-bg rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <User className="h-5 w-5 text-v0-primary-text" />
              <p className="text-v0-primary-text font-medium">Welcome back, {user.username}!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {isSkinTypePrePopulated && user.skinType && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-v0-secondary-text">
                    Skin type loaded from profile: <span className="font-medium text-v0-button-bg">{user.skinType}</span>
                  </span>
                </div>
              )}
              {isCyclePhasePrePopulated && selectedCyclePhase && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {getPhaseIcon(selectedCyclePhase)}
                  <span className="text-v0-secondary-text">
                    Current phase: <span className="font-medium text-v0-button-bg">{selectedCyclePhase}</span>
                    {currentCycleDay && <span className="ml-1">(Day {currentCycleDay})</span>}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-v0-secondary-text text-lg mb-2">
              Skin Type
              {isSkinTypePrePopulated && (
                <span className="ml-2 text-sm text-v0-button-bg font-medium">(From your profile)</span>
              )}
            </label>
            <Select 
              value={selectedSkinType} 
              onValueChange={(value) => {
                setSelectedSkinType(value)
                setIsSkinTypePrePopulated(false)
              }}
            >
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-v0-button-bg focus:border-v0-button-bg">
                <SelectValue placeholder="Select your skin type" />
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
            <label className="block text-v0-secondary-text text-lg mb-2">
              Cycle Phase
              {isCyclePhasePrePopulated && (
                <span className="ml-2 text-sm text-v0-button-bg font-medium">(Calculated from your profile)</span>
              )}
            </label>
            <Select 
              value={selectedCyclePhase} 
              onValueChange={(value) => {
                setSelectedCyclePhase(value)
                setIsCyclePhasePrePopulated(false)
              }}
            >
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:ring-v0-button-bg focus:border-v0-button-bg">
                <SelectValue placeholder="Select your current phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Menstrual Phase">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-red-500" />
                    Menstrual Phase
                  </div>
                </SelectItem>
                <SelectItem value="Follicular Phase">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-500" />
                    Follicular Phase
                  </div>
                </SelectItem>
                <SelectItem value="Ovulation Phase">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    Ovulation Phase
                  </div>
                </SelectItem>
                <SelectItem value="Luteal Phase">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-blue-500" />
                    Luteal Phase
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <p className="text-v0-secondary-text">
            Showing <span className="font-bold text-v0-primary-text">{filteredProducts.length}</span> products
            {selectedSkinType && <span> for <span className="font-medium text-v0-button-bg">{selectedSkinType}</span> skin</span>}
            {selectedCyclePhase && <span> during <span className="font-medium text-v0-button-bg">{selectedCyclePhase}</span></span>}
          </p>
        </div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-v0-button-bg">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="font-serif text-xl font-bold text-v0-primary-text">
                      {product.name}
                    </CardTitle>
                    {product.price && (
                      <Badge variant="secondary" className="bg-v0-pink-bg text-v0-primary-text">
                        {product.price}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Product Image */}
                  <div className="relative w-32 h-32 mb-4 mx-auto">
                    {/* Pink blob background - more prominent and organic */}
                    <div className="absolute inset-0 bg-v0-pink-bg rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] w-[calc(100%+40px)] h-[calc(100%+40px)] transform -translate-x-5 -translate-y-5"></div>
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="relative z-10 rounded-full object-cover w-full h-full border border-v0-button-bg/30"
                    />
                  </div>

                  <p className="text-v0-secondary-text mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-v0-primary-text mb-2">Key Ingredients:</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.ingredients.map((ingredient, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-v0-primary-text mb-2">Safe for Phases:</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.safeForPhase.map((phase, index) => (
                          <Badge 
                            key={index} 
                            variant={selectedCyclePhase === phase ? "default" : "secondary"}
                            className={`text-xs flex items-center gap-1 ${
                              selectedCyclePhase === phase 
                                ? "bg-v0-button-bg text-white" 
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {getPhaseIcon(phase)}
                            {phase.replace(" Phase", "")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-v0-primary-text mb-2">Skin Types:</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.skinType.map((type, index) => (
                          <Badge 
                            key={index} 
                            variant={selectedSkinType === type ? "default" : "secondary"}
                            className={`text-xs ${
                              selectedSkinType === type 
                                ? "bg-v0-button-bg text-white" 
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
{/*                   
                  <Button className="w-full mt-4 bg-v0-button-bg text-white hover:bg-v0-dark-pink transition-colors">
                    Add to Routine
                  </Button> */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-v0-secondary-text text-lg">
              No products found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
