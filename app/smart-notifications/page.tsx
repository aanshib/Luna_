// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import Link from "next/link"
// import { ArrowLeft, Mail, CheckCircle, Bell, Calendar } from 'lucide-react'

// interface User {
//   id: string
//   name: string
//   email: string
//   skinType: string
//   periodDate: string
//   isLoggedIn: boolean
// }

// export default function SmartNotificationsPage() {
//   const [user, setUser] = useState<User | null>(null)
//   const [email, setEmail] = useState("")
//   const [isSubscribing, setIsSubscribing] = useState(false)
//   const [subscriptionStatus, setSubscriptionStatus] = useState<'none' | 'subscribed' | 'error'>('none')
//   const [isCheckingSubscription, setIsCheckingSubscription] = useState(true)

//   useEffect(() => {
//     // Get user data from localStorage
//     const userData = localStorage.getItem('user')
//     console.log('User data from localStorage:', userData) // Debug log
    
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData)
//         console.log('Parsed user:', parsedUser) // Debug log
//         setUser(parsedUser)
//         setEmail(parsedUser.email) // Auto-populate email from logged-in user
        
//         // Check if user is already subscribed
//         checkSubscriptionStatus(parsedUser.email)
//       } catch (error) {
//         console.error('Error parsing user data:', error)
//         setIsCheckingSubscription(false)
//       }
//     } else {
//       console.log('No user data found in localStorage') // Debug log
//       setIsCheckingSubscription(false)
//     }
//   }, [])

//   const checkSubscriptionStatus = async (userEmail: string) => {
//     try {
//       const response = await fetch('/api/notifications/check-subscription', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: userEmail }),
//       })

//       const data = await response.json()
//       console.log('Subscription check response:', data) // Debug log
      
//       if (response.ok) {
//         setSubscriptionStatus(data.isSubscribed ? 'subscribed' : 'none')
//       } else {
//         console.error('Error checking subscription:', data.message)
//       }
//     } catch (error) {
//       console.error('Error checking subscription status:', error)
//     } finally {
//       setIsCheckingSubscription(false)
//     }
//   }

//   const handleSubscribe = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!user) {
//       console.error('No user data available for subscription')
//       return
//     }

//     setIsSubscribing(true)

//     try {
//       console.log('Subscribing with data:', {
//         email: user.email,
//         name: user.name,
//         skinType: user.skinType,
//         periodDate: user.periodDate,
//       })

//       const response = await fetch('/api/notifications/subscribe', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: user.email,
//           name: user.name,
//           skinType: user.skinType,
//           periodDate: user.periodDate,
//         }),
//       })

//       const data = await response.json()
//       console.log('Subscribe response:', data) // Debug log

//       if (response.ok) {
//         setSubscriptionStatus('subscribed')
//         // Send immediate confirmation email
//         await sendConfirmationEmail()
//       } else {
//         setSubscriptionStatus('error')
//         console.error('Subscription failed:', data.message)
//       }
//     } catch (error) {
//       console.error('Error subscribing:', error)
//       setSubscriptionStatus('error')
//     } finally {
//       setIsSubscribing(false)
//     }
//   }

//   const sendConfirmationEmail = async () => {
//     try {
//       const response = await fetch('/api/notifications/send-confirmation', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: user?.email,
//           name: user?.name,
//         }),
//       })

//       const data = await response.json()
//       console.log('Confirmation email response:', data)
//     } catch (error) {
//       console.error('Error sending confirmation email:', error)
//     }
//   }

//   const getCurrentPhase = () => {
//     if (!user?.periodDate) return 'Unknown Phase'

//     const startDate = new Date(user.periodDate)
//     const currentDate = new Date()
//     const msPerDay = 1000 * 60 * 60 * 24
//     const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
//     const daysIntoCycle = Math.floor(diffTime / msPerDay) % 28

//     if (daysIntoCycle >= 0 && daysIntoCycle < 7) return 'Menstrual Phase'
//     if (daysIntoCycle >= 7 && daysIntoCycle < 14) return 'Follicular Phase'
//     if (daysIntoCycle >= 14 && daysIntoCycle < 17) return 'Ovulation Phase'
//     if (daysIntoCycle >= 17 && daysIntoCycle < 28) return 'Luteal Phase'
//     return 'Unknown Phase'
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-v0-background font-sans flex flex-col items-center justify-center py-12 px-4">
//         <Card className="w-full max-w-md">
//           <CardHeader className="text-center">
//             <CardTitle className="font-serif text-2xl text-v0-primary-text">Login Required</CardTitle>
//             <CardDescription>
//               Please log in to access smart notifications and cycle tips.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="text-center">
//             <Link href="/login">
//               <Button className="bg-v0-button-bg text-white hover:bg-v0-dark-pink">
//                 Go to Login
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-v0-background font-sans flex flex-col items-center py-12 px-4">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 relative">
//         <Link href="/" className="absolute top-4 left-4 text-v0-secondary-text hover:text-v0-primary-text">
//           <Button variant="ghost" size="icon">
//             <ArrowLeft className="h-6 w-6" />
//             <span className="sr-only">Back to Home</span>
//           </Button>
//         </Link>

//         <div className="text-center mb-8">
//           <h1 className="font-serif text-4xl md:text-5xl font-bold text-v0-primary-text mb-4">
//             Smart Notifications + Cycle Tips
//           </h1>
//           <p className="text-v0-secondary-text text-lg max-w-2xl mx-auto">
//             Receive personalized skincare tips and reminders directly to your inbox, tailored to your menstrual
//             cycle phase. Stay ahead of your skin's needs!
//           </p>
//         </div>

//         {/* User Info Card */}
//         <Card className="mb-8 bg-v0-pink-bg border-v0-button-bg">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-v0-primary-text">
//               <Mail className="h-5 w-5" />
//               Your Profile
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <p className="text-sm text-v0-secondary-text">Name</p>
//                 <p className="font-semibold text-v0-primary-text">{user.name}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-v0-secondary-text">Skin Type</p>
//                 <Badge variant="secondary">{user.skinType}</Badge>
//               </div>
//               <div>
//                 <p className="text-sm text-v0-secondary-text">Current Phase</p>
//                 <Badge variant="outline" className="border-v0-button-bg text-v0-button-bg">
//                   {getCurrentPhase()}
//                 </Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {isCheckingSubscription ? (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-v0-button-bg mx-auto mb-4"></div>
//             <p className="text-v0-secondary-text">Checking subscription status...</p>
//           </div>
//         ) : subscriptionStatus === 'subscribed' ? (
//           <Card className="bg-green-50 border-green-200">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-green-800">
//                 <CheckCircle className="h-6 w-6" />
//                 You're Already Subscribed!
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <p className="text-green-700">
//                   You're receiving daily personalized cycle tips at <span className="font-semibold">{user.email}</span>
//                 </p>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
//                     <Bell className="h-5 w-5 text-green-600" />
//                     <div>
//                       <p className="font-semibold text-green-800">Daily Notifications</p>
//                       <p className="text-sm text-green-600">Personalized tips based on your cycle</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
//                     <Calendar className="h-5 w-5 text-green-600" />
//                     <div>
//                       <p className="font-semibold text-green-800">Phase Tracking</p>
//                       <p className="text-sm text-green-600">Currently in {getCurrentPhase()}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-4 rounded-lg border border-green-200">
//                   <h4 className="font-semibold text-green-800 mb-2">What to expect:</h4>
//                   <ul className="text-sm text-green-700 space-y-1">
//                     <li>• Daily skincare tips tailored to your current cycle phase</li>
//                     <li>• Product recommendations based on your {user.skinType} skin type</li>
//                     <li>• Reminders for phase transitions and skin changes</li>
//                     <li>• Personalized routine adjustments</li>
//                   </ul>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           <form onSubmit={handleSubscribe} className="space-y-6 max-w-md mx-auto">
//             <div>
//               <Label htmlFor="email" className="block text-v0-secondary-text text-lg mb-2">
//                 Email Address
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 disabled={true} // Disabled since it's auto-populated from logged-in user
//                 className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
//               />
//               <p className="text-sm text-v0-secondary-text mt-1">
//                 ✓ Auto-filled from your profile
//               </p>
//             </div>

//             <div className="bg-v0-pink-bg p-4 rounded-lg">
//               <h3 className="font-semibold text-v0-primary-text mb-2">You'll receive:</h3>
//               <ul className="text-sm text-v0-secondary-text space-y-1">
//                 <li>• Daily personalized skincare tips</li>
//                 <li>• Cycle phase notifications</li>
//                 <li>• Product recommendations for your {user.skinType} skin</li>
//                 <li>• Routine adjustments based on your current phase</li>
//               </ul>
//             </div>

//             <Button
//               type="submit"
//               disabled={isSubscribing}
//               className="w-full bg-v0-button-bg text-white px-8 py-4 rounded-full text-lg hover:bg-v0-dark-pink transition-colors shadow-md disabled:opacity-50"
//             >
//               {isSubscribing ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Subscribing...
//                 </>
//               ) : (
//                 'Subscribe Now'
//               )}
//             </Button>

//             {subscriptionStatus === 'error' && (
//               <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-600">
//                   Something went wrong. Please try again or contact support.
//                 </p>
//               </div>
//             )}
//           </form>
//         )}
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle, Bell, Calendar } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  skinType: string
  periodDate: string
  isLoggedIn: boolean
}

export default function SmartNotificationsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'none' | 'subscribed' | 'error'>('none')
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    console.log('User data from localStorage:', userData) // Debug log
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        console.log('Parsed user:', parsedUser) // Debug log
        setUser(parsedUser)
        setEmail(parsedUser.email) // Auto-populate email from logged-in user
        
        // Check if user is already subscribed
        checkSubscriptionStatus(parsedUser.email)
      } catch (error) {
        console.error('Error parsing user data:', error)
        setIsCheckingSubscription(false)
      }
    } else {
      console.log('No user data found in localStorage') // Debug log
      setIsCheckingSubscription(false)
    }
  }, [])

  const checkSubscriptionStatus = async (userEmail: string) => {
    try {
      const response = await fetch('/api/notifications/check-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      })

      const data = await response.json()
      console.log('Subscription check response:', data) // Debug log
      
      if (response.ok) {
        setSubscriptionStatus(data.isSubscribed ? 'subscribed' : 'none')
      } else {
        console.error('Error checking subscription:', data.message)
      }
    } catch (error) {
      console.error('Error checking subscription status:', error)
    } finally {
      setIsCheckingSubscription(false)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      console.error('No user data available for subscription')
      return
    }

    setIsSubscribing(true)

    try {
      console.log('Subscribing with data:', {
        email: user.email,
        name: user.name,
        skinType: user.skinType,
        periodDate: user.periodDate,
      })

      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          skinType: user.skinType,
          periodDate: user.periodDate,
        }),
      })

      const data = await response.json()
      console.log('Subscribe response:', data) // Debug log

      if (response.ok) {
        setSubscriptionStatus('subscribed')
        // Send immediate confirmation email
        await sendConfirmationEmail()
      } else {
        setSubscriptionStatus('error')
        console.error('Subscription failed:', data.message)
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      setSubscriptionStatus('error')
    } finally {
      setIsSubscribing(false)
    }
  }

  const sendConfirmationEmail = async () => {
    try {
      const response = await fetch('/api/notifications/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          name: user?.name,
        }),
      })

      const data = await response.json()
      console.log('Confirmation email response:', data)
    } catch (error) {
      console.error('Error sending confirmation email:', error)
    }
  }

  const getCurrentPhase = () => {
    if (!user?.periodDate) return 'Unknown Phase'

    const startDate = new Date(user.periodDate)
    const currentDate = new Date()
    const msPerDay = 1000 * 60 * 60 * 24
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
    const daysIntoCycle = Math.floor(diffTime / msPerDay) % 28

    if (daysIntoCycle >= 0 && daysIntoCycle < 7) return 'Menstrual Phase'
    if (daysIntoCycle >= 7 && daysIntoCycle < 14) return 'Follicular Phase'
    if (daysIntoCycle >= 14 && daysIntoCycle < 17) return 'Ovulation Phase'
    if (daysIntoCycle >= 17 && daysIntoCycle < 28) return 'Luteal Phase'
    return 'Unknown Phase'
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-v0-background font-sans flex flex-col items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl text-v0-primary-text">Login Required</CardTitle>
            <CardDescription>
              Please log in to access smart notifications and cycle tips.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/login">
              <Button className="bg-v0-button-bg text-white hover:bg-v0-dark-pink">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-v0-background font-sans flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 relative">
        <Link href="/" className="absolute top-4 left-4 text-v0-secondary-text hover:text-v0-primary-text">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to Home</span>
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-v0-primary-text mb-4">
            Smart Notifications + Cycle Tips
          </h1>
          <p className="text-v0-secondary-text text-lg max-w-2xl mx-auto">
            Receive personalized skincare tips and reminders directly to your inbox, tailored to your menstrual
            cycle phase. Stay ahead of your skin's needs!
          </p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8 bg-v0-pink-bg border-v0-button-bg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-v0-primary-text">
              <Mail className="h-5 w-5" />
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-v0-secondary-text">Name</p>
                <p className="font-semibold text-v0-primary-text">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-v0-secondary-text">Skin Type</p>
                <Badge variant="secondary">{user.skinType}</Badge>
              </div>
              <div>
                <p className="text-sm text-v0-secondary-text">Current Phase</p>
                <Badge variant="outline" className="border-v0-button-bg text-v0-button-bg">
                  {getCurrentPhase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {isCheckingSubscription ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-v0-button-bg mx-auto mb-4"></div>
            <p className="text-v0-secondary-text">Checking subscription status...</p>
          </div>
        ) : subscriptionStatus === 'subscribed' ? (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-6 w-6" />
                You're Already Subscribed!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-green-700">
                  You're receiving daily personalized cycle tips at <span className="font-semibold">{user.email}</span>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                    <Bell className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Daily Notifications</p>
                      <p className="text-sm text-green-600">Personalized tips based on your cycle</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Phase Tracking</p>
                      <p className="text-sm text-green-600">Currently in {getCurrentPhase()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">What to expect:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Daily skincare tips tailored to your current cycle phase</li>
                    <li>• Product recommendations based on your {user.skinType} skin type</li>
                    <li>• Reminders for phase transitions and skin changes</li>
                    <li>• Personalized routine adjustments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-6 max-w-md mx-auto">
            <div>
              <Label htmlFor="email" className="block text-v0-secondary-text text-lg mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={true} // Disabled since it's auto-populated from logged-in user
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
              />
              <p className="text-sm text-v0-secondary-text mt-1">
                ✓ Auto-filled from your profile
              </p>
            </div>

            <div className="bg-v0-pink-bg p-4 rounded-lg">
              <h3 className="font-semibold text-v0-primary-text mb-2">You'll receive:</h3>
              <ul className="text-sm text-v0-secondary-text space-y-1">
                <li>• Daily personalized skincare tips</li>
                <li>• Cycle phase notifications</li>
                <li>• Product recommendations for your {user.skinType} skin</li>
                <li>• Routine adjustments based on your current phase</li>
              </ul>
            </div>

            <Button
              type="submit"
              disabled={isSubscribing}
              className="w-full bg-v0-button-bg text-white px-8 py-4 rounded-full text-lg hover:bg-v0-dark-pink transition-colors shadow-md disabled:opacity-50"
            >
              {isSubscribing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Subscribing...
                </>
              ) : (
                'Subscribe Now'
              )}
            </Button>

            {subscriptionStatus === 'error' && (
              <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">
                  Something went wrong. Please try again or contact support.
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
