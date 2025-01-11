"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10 px-8 py-16 md:py-24 max-w-7xl mx-auto bg-v0-background"
    >
      <div className="flex flex-col md:flex-row items-center justify-start md:pl-16 gap-10 md:gap-20">
        {/* Left Image Area */}
        <div className="relative w-[200px] h-[280px] md:w-[240px] md:h-[320px] group">
         {/* Pink blob background */}
<div className="absolute inset-0 bg-v0-pink-bg rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] w-[calc(70%+100px)] h-[calc(78%+100px)] transform -translate-x- -4rem translate-y- -39px"></div>

          <Image
            src="/hii2.png"
            alt="Girl doing makeup"
            width={240}
            height={320}
            className="absolute inset-0 object-cover w-full h-full rounded-2xl z-10"
          />

          {/* Color Swatches */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-20">
            <div className="w-8 h-8 rounded-full bg-v0-pink-bg shadow-md"></div>
            <div className="w-8 h-8 rounded-full bg-v0-dark-pink shadow-md"></div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 text-center md:text-left md:pl-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-v0-primary-text mb-6">
            Welcome To LunaSkin
          </h2>
          <p className="text-v0-secondary-text text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
            Discover your true beauty with our curated styles, empowering tips, and vibrant community. Step into a world where elegance meets confidence.
          </p>

          {/* Statistics Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
  <div className="group bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-md hover:bg-v0-button-bg hover:text-white transition-colors">
    <div className="text-5xl font-bold mb-2 text-v0-primary-text group-hover:text-white transition-colors">100+</div>
    <div className="text-sm uppercase tracking-wider text-v0-primary-text group-hover:text-white transition-colors">
      Skincare Routines Shared
    </div>
  </div>
  <div className="group bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-md hover:bg-v0-button-bg hover:text-white transition-colors">
    <div className="text-5xl font-bold mb-2 text-v0-primary-text group-hover:text-white transition-colors">98%</div>
    <div className="text-sm uppercase tracking-wider text-v0-primary-text group-hover:text-white transition-colors">
      Accurate skin measure
    </div>
  </div>
  <div className="group bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-md hover:bg-v0-button-bg hover:text-white transition-colors">
    <div className="text-5xl font-bold mb-2 text-v0-primary-text group-hover:text-white transition-colors">50+</div>
    <div className="text-sm uppercase tracking-wider text-v0-primary-text group-hover:text-white transition-colors">
      Product recommendations
    </div>
  </div>
</div>

        </div>
      </div>
    </motion.section>
  )
}
