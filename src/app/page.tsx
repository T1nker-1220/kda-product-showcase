"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, UtensilsCrossed } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Hero"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={85}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-gray-900/90" />
        </div>
        <motion.div 
          initial="initial"
          animate="animate"
          variants={stagger}
          className="container mx-auto px-4 relative z-10 text-center"
          layout
        >
          <div className="max-w-3xl mx-auto">
            <motion.div 
              variants={fadeIn} 
              className="flex items-center justify-center gap-2 mb-4 sm:mb-6"
              layout
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full gradient-primary flex items-center justify-center">
                <UtensilsCrossed size={20} className="text-white sm:size-6" />
              </div>
              <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-orange-400">
                Authentic Filipino Cuisine
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeIn}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-8 leading-tight"
              layout
            >
              Experience the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                Taste of Home
              </span>
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto"
              layout
            >
              Discover the rich flavors of Filipino comfort food at Kusina de Amadeo. 
              Made with love, served with pride.
            </motion.p>
            <motion.div 
              variants={fadeIn} 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center"
              layout
            >
              <Button 
                size="lg" 
                className="group h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg w-full sm:w-auto" 
                asChild
              >
                <Link href="/menu">
                  View Menu
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="group h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg w-full sm:w-auto" 
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
    </div>
  )
}
