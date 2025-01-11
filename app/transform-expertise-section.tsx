// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Lightbulb, Heart, TrendingUp, Briefcase, Search } from "lucide-react"
// import { motion } from "framer-motion"

// export default function TransformExpertiseSection() {
//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, delay: 0.2 }}
//       className="relative z-10 px-8 py-16 md:py-24 max-w-7xl mx-auto bg-v0-background"
//     >
//       {/* Top Sub-section: We Can Help Transform You */}
//       <div className="text-center mb-16">
//         <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-v0-primary-text mb-12">
//           We Can Help Transform You
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Card 1: Cycle-Aware Routine Generator */}
//           <Link href="/cycle-generator" className="block">
//             <div className="bg-white rounded-[2.5rem_1.5rem_2.5rem_1.5rem] p-6 flex flex-col items-center text-center shadow-md relative group hover:bg-v0-button-bg hover:text-white transition-all duration-300 hover:rounded-[1.5rem_2.5rem_1.5rem_2.5rem] cursor-pointer h-full">
//               <Lightbulb className="h-10 w-10 text-v0-primary-text mb-4 group-hover:text-white transition-colors" />
//               <h3 className="font-serif text-xl font-bold text-v0-primary-text mb-2 group-hover:text-white transition-colors">
//                 Cycle-Aware Routine Generator
//               </h3>
//               <p className="text-v0-secondary-text text-sm mb-4 group-hover:text-white group-hover:opacity-90 transition-colors">
//                 Dynamically adjusts skincare routines based on your menstrual cycle.
//               </p>
//               <span className="text-v0-button-bg text-sm hover:underline group-hover:text-white transition-colors">
//                 Learn here
//               </span>
//               {/* Decorative stars - visible only on hover */}
//               <div className="absolute -bottom-4 -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="relative w-8 h-8">
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 left-0 transform rotate-45"></div>
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 right-0 transform -rotate-45"></div>
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 left-0 transform -rotate-45"></div>
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 right-0 transform rotate-45"></div>
//                   <div className="absolute w-1.5 h-1.5 bg-v0-dark-red rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
//                 </div>
//               </div>
//             </div>
//           </Link>

//           {/* Card 2: Smart Notifications + Cycle Tips */}
//           <Link href="/smart-notifications" className="block">
//             <div className="bg-white rounded-[2.5rem_1.5rem_2.5rem_1.5rem] p-6 flex flex-col items-center text-center shadow-md relative group hover:bg-v0-button-bg hover:text-white transition-all duration-300 hover:rounded-[1.5rem_2.5rem_1.5rem_2.5rem] cursor-pointer h-full">
//               <Heart className="h-10 w-10 text-v0-primary-text mb-4 group-hover:text-white transition-colors" />
//               <h3 className="font-serif text-xl font-bold text-v0-primary-text mb-2 group-hover:text-white transition-colors">
//                 Smart Notifications + Cycle Tips
//               </h3>
//               <p className="text-v0-secondary-text text-sm mb-4 group-hover:text-white group-hover:opacity-90 transition-colors">
//                 Receive personalized tips and reminders based on your cycle phase.
//               </p>
//               <span className="text-v0-button-bg text-sm hover:underline group-hover:text-white transition-colors">
//                 Learn here
//               </span>
//               {/* Decorative stars - visible only on hover */}
//               <div className="absolute -bottom-4 -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="relative w-8 h-8">
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 left-0 transform rotate-45"></div>
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 right-0 transform -rotate-45"></div>
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 left-0 transform -rotate-45"></div>
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 right-0 transform rotate-45"></div>
//                   <div className="absolute w-1.5 h-1.5 bg-v0-dark-red rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
//                 </div>
//               </div>
//             </div>
//           </Link>

//           {/* Card 3: Cycle-Phase Product Recommendation Engine */}
//           <Link href="/product-recommendations" className="block">
//             <div className="bg-white rounded-[2.5rem_1.5rem_2.5rem_1.5rem] p-6 flex flex-col items-center text-center shadow-md relative group hover:bg-v0-button-bg hover:text-white transition-all duration-300 hover:rounded-[1.5rem_2.5rem_1.5rem_2.5rem] cursor-pointer h-full">
//               <TrendingUp className="h-10 w-10 text-v0-primary-text mb-4 group-hover:text-white transition-colors" />
//               <h3 className="font-serif text-xl font-bold text-v0-primary-text mb-2 group-hover:text-white transition-colors">
//                 Cycle-Phase Product Recommendation Engine
//               </h3>
//               <p className="text-v0-secondary-text text-sm mb-4 group-hover:text-white group-hover:opacity-90 transition-colors">
//                 Suggests skincare products based on your skin type and cycle phase.
//               </p>
//               <span className="text-v0-button-bg text-sm hover:underline group-hover:text-white transition-colors">
//                 Learn here
//               </span>
//               {/* Decorative stars - visible only on hover */}
//               <div className="absolute -bottom-4 -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="relative w-8 h-8">
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 left-0 transform rotate-45"></div>
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 right-0 transform -rotate-45"></div>
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 left-0 transform -rotate-45"></div>
//                   <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 right-0 transform rotate-45"></div>
//                   <div className="absolute w-1.5 h-1.5 bg-v0-dark-red rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
//                 </div>
//               </div>
//             </div>
//           </Link>

//           {/* Card 4: Growth Career */}
//           <div className="bg-white rounded-[2.5rem_1.5rem_2.5rem_1.5rem] p-6 flex flex-col items-center text-center shadow-md relative group hover:bg-v0-button-bg hover:text-white transition-all duration-300 hover:rounded-[1.5rem_2.5rem_1.5rem_2.5rem]">
//             <Briefcase className="h-10 w-10 text-v0-primary-text mb-4 group-hover:text-white transition-colors" />
//             <h3 className="font-serif text-xl font-bold text-v0-primary-text mb-2 group-hover:text-white transition-colors">
//               Growth Career
//             </h3>
//             <p className="text-v0-secondary-text text-sm mb-4 group-hover:text-white group-hover:opacity-90 transition-colors">
//               Lorem ipsum dolor sit amet, consectetur adipiscing.
//             </p>
//             <Link
//               href="#"
//               className="text-v0-button-bg text-sm hover:underline group-hover:text-white transition-colors"
//             >
//               Learn here
//             </Link>
//             {/* Decorative stars - visible only on hover */}
//             <div className="absolute -bottom-4 -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <div className="relative w-8 h-8">
//                 <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 left-0 transform rotate-45"></div>
//                 <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 right-0 transform -rotate-45"></div>
//                 <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 left-0 transform -rotate-45"></div>
//                 <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 right-0 transform rotate-45"></div>
//                 <div className="absolute w-1.5 h-1.5 bg-v0-dark-red rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
// {/* Bottom Sub-section: Proving Our Expertise */}
// <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-24">
//   {/* Left Content */}
//   <div className="flex-1 text-center md:text-left">
//     <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-v0-primary-text mb-6">
//       Proving Our Expertise
//     </h2>
//     <p className="text-v0-secondary-text text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
//       At Feminine, we blend science, care, and community to deliver beauty solutions that truly work. From expert-backed skincare routines to real-time product personalization — everything we create is for the empowered you.
//     </p>
//     <div className="space-y-6 mb-8">
//       {/* Progress Bar 1 */}
//       <div>
//         <div className="flex justify-between text-v0-secondary-text text-sm mb-1">
//           <span>Personalized Beauty Routines</span>
//           <span>75%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div className="bg-v0-button-bg h-2.5 rounded-full" style={{ width: "75%" }}></div>
//         </div>
//       </div>
//       {/* Progress Bar 2 */}
//       <div>
//         <div className="flex justify-between text-v0-secondary-text text-sm mb-1">
//           <span>Customer Skin Satisfaction</span>
//           <span>60%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div className="bg-v0-dark-pink h-2.5 rounded-full" style={{ width: "60%" }}></div>
//         </div>
//       </div>
//       {/* Progress Bar 3 */}
//       <div>
//         <div className="flex justify-between text-v0-secondary-text text-sm mb-1">
//           <span>Expert-Recommended Products</span>
//           <span>90%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div className="bg-v0-dark-red h-2.5 rounded-full" style={{ width: "90%" }}></div>
//         </div>
//       </div>
//     </div>
//     <Button className="bg-v0-button-bg text-white px-8 py-3 rounded-full hover:bg-v0-dark-pink transition-colors shadow-md">
//       Visit Our Blog
//     </Button>
//   </div>

//   {/* Right Image Area */}
//   <div className="flex-1 relative mt-12 md:mt-0 flex justify-center md:justify-end">
//     <div className="relative w-[200px] h-[280px] md:w-[240px] md:h-[320px] group">
//       {/* Pink blob background */}
//       <div className="absolute inset-0 bg-v0-pink-bg rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] w-[calc(100% + 100px)] h-[calc(100% + 100px)] transform translate-x-12 translate-y-12"></div>
//       <Image
//         src="/hii3.png"
//         alt="Confident woman smiling"
//         width={240}
//         height={320}
//         className="absolute inset-0 object-cover w-full h-full rounded-2xl z-10"
//       />
//     </div>
//   </div>
// </div>

//     </motion.section>
//   )
// }
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lightbulb, Heart, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function TransformExpertiseSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10 px-8 py-16 md:py-24 max-w-7xl mx-auto bg-v0-background"
    >
      {/* Top Sub-section: We Can Help Transform You */}
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-v0-primary-text mb-12">
          We Can Help Transform You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Cycle-Aware Routine Generator */}
          <Link href="/cycle-generator" className="block">
            <div className="bg-white rounded-[2.5rem_1.5rem_2.5rem_1.5rem] p-6 flex flex-col items-center text-center shadow-md relative group hover:bg-v0-button-bg hover:text-white transition-all duration-300 hover:rounded-[1.5rem_2.5rem_1.5rem_2.5rem] cursor-pointer h-full">
              <Lightbulb className="h-10 w-10 text-v0-primary-text mb-4 group-hover:text-white transition-colors" />
              <h3 className="font-serif text-xl font-bold text-v0-primary-text mb-2 group-hover:text-white transition-colors">
                Cycle-Aware Routine Generator
              </h3>
              <p className="text-v0-secondary-text text-sm mb-4 group-hover:text-white group-hover:opacity-90 transition-colors">
                Dynamically adjusts skincare routines based on your menstrual cycle.
              </p>
              <span className="text-v0-button-bg text-sm hover:underline group-hover:text-white transition-colors">
                Learn here
              </span>
              {/* Decorative stars */}
              <div className="absolute -bottom-4 -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="relative w-8 h-8">
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 left-0 transform rotate-45"></div>
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 right-0 transform -rotate-45"></div>
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 left-0 transform -rotate-45"></div>
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 right-0 transform rotate-45"></div>
                  <div className="absolute w-1.5 h-1.5 bg-v0-dark-red rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Smart Notifications + Cycle Tips */}
          <Link href="/smart-notifications" className="block">
            <div className="bg-white rounded-[2.5rem_1.5rem_2.5rem_1.5rem] p-6 flex flex-col items-center text-center shadow-md relative group hover:bg-v0-button-bg hover:text-white transition-all duration-300 hover:rounded-[1.5rem_2.5rem_1.5rem_2.5rem] cursor-pointer h-full">
              <Heart className="h-10 w-10 text-v0-primary-text mb-4 group-hover:text-white transition-colors" />
              <h3 className="font-serif text-xl font-bold text-v0-primary-text mb-2 group-hover:text-white transition-colors">
                Smart Notifications + Cycle Tips
              </h3>
              <p className="text-v0-secondary-text text-sm mb-4 group-hover:text-white group-hover:opacity-90 transition-colors">
                Receive personalized tips and reminders based on your cycle phase.
              </p>
              <span className="text-v0-button-bg text-sm hover:underline group-hover:text-white transition-colors">
                Learn here
              </span>
              <div className="absolute -bottom-4 -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="relative w-8 h-8">
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 left-0 transform rotate-45"></div>
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 right-0 transform -rotate-45"></div>
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 left-0 transform -rotate-45"></div>
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 right-0 transform rotate-45"></div>
                  <div className="absolute w-1.5 h-1.5 bg-v0-dark-red rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: Cycle-Phase Product Recommendation Engine */}
          <Link href="/product-recommendations" className="block">
            <div className="bg-white rounded-[2.5rem_1.5rem_2.5rem_1.5rem] p-6 flex flex-col items-center text-center shadow-md relative group hover:bg-v0-button-bg hover:text-white transition-all duration-300 hover:rounded-[1.5rem_2.5rem_1.5rem_2.5rem] cursor-pointer h-full">
              <TrendingUp className="h-10 w-10 text-v0-primary-text mb-4 group-hover:text-white transition-colors" />
              <h3 className="font-serif text-xl font-bold text-v0-primary-text mb-2 group-hover:text-white transition-colors">
                Cycle-Phase Product Recommendation Engine
              </h3>
              <p className="text-v0-secondary-text text-sm mb-4 group-hover:text-white group-hover:opacity-90 transition-colors">
                Suggests skincare products based on your skin type and cycle phase.
              </p>
              <span className="text-v0-button-bg text-sm hover:underline group-hover:text-white transition-colors">
                Learn here
              </span>
              <div className="absolute -bottom-4 -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="relative w-8 h-8">
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 left-0 transform rotate-45"></div>
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full top-0 right-0 transform -rotate-45"></div>
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 left-0 transform -rotate-45"></div>
                  <div className="absolute w-2 h-2 bg-v0-dark-pink rounded-full bottom-0 right-0 transform rotate-45"></div>
                  <div className="absolute w-1.5 h-1.5 bg-v0-dark-red rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Sub-section: Proving Our Expertise */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-24">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-v0-primary-text mb-6">
            Proving Our Expertise
          </h2>
          <p className="text-v0-secondary-text text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
            At Feminine, we blend science, care, and community to deliver beauty solutions that truly work. From expert-backed skincare routines to real-time product personalization — everything we create is for the empowered you.
          </p>
          <div className="space-y-6 mb-8">
            {/* Progress Bars */}
            <div>
              <div className="flex justify-between text-v0-secondary-text text-sm mb-1">
                <span>Personalized Beauty Routines</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-v0-button-bg h-2.5 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-v0-secondary-text text-sm mb-1">
                <span>Customer Skin Satisfaction</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-v0-dark-pink h-2.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-v0-secondary-text text-sm mb-1">
                <span>Expert-Recommended Products</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-v0-dark-red h-2.5 rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>
          </div>
          <Button className="bg-v0-button-bg text-white px-8 py-3 rounded-full hover:bg-v0-dark-pink transition-colors shadow-md">
            Visit Our Blog
          </Button>
        </div>

        {/* Right Image Area */}
        <div className="flex-1 relative mt-12 md:mt-0 flex justify-center md:justify-end">
          <div className="relative w-[200px] h-[280px] md:w-[240px] md:h-[320px] group">
            {/* Pink blob background */}
            <div className="absolute inset-0 bg-v0-pink-bg rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] w-[calc(100% + 100px)] h-[calc(100% + 100px)] transform translate-x-12 translate-y-12"></div>
            <Image
              src="/hii3.png"
              alt="Confident woman smiling"
              width={240}
              height={320}
              className="absolute inset-0 object-cover w-full h-full rounded-2xl z-10"
            />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
