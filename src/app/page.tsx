"use client"

import { Button } from "@/components/ui/button"
import { getPlaceholderImage } from "@/lib/utils"
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
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-gray-900/90" />
        </div>
        <motion.div 
          initial="initial"
          animate="animate"
          variants={stagger}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <UtensilsCrossed size={24} className="text-white" />
              </div>
              <span className="text-sm font-medium tracking-wider uppercase text-orange-400">
                Authentic Filipino Cuisine
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeIn}
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              Experience the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                Taste of Home
              </span>
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              Discover the rich flavors of Filipino comfort food at Kusina de Amadeo. 
              Made with love, served with pride.
            </motion.p>
            <motion.div variants={fadeIn} className="flex gap-6 justify-center">
              <Button size="lg" className="group h-14 px-8 text-lg" asChild>
                <Link href="/menu">
                  View Menu
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group h-14 px-8 text-lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
    </div>
  )
}
