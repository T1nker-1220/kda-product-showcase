"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Award, Heart, Users } from "lucide-react"
import Link from "next/link"

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

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="text-sm font-medium tracking-wider uppercase text-orange-400">
                Our Story
              </span>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
            >
              Bringing{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                Filipino Flavors
              </span>{" "}
              to Your Table
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-400 leading-relaxed mb-12"
            >
              Since 2020, Kusina de Amadeo has been serving authentic Filipino comfort food 
              in the heart of Amadeo, Cavite. Our mission is to preserve and share the rich 
              culinary traditions of Filipino cuisine while adding our own modern twist.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900 to-gray-900" />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="relative group"
              >
                <div className="absolute -inset-1">
                  <div className="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-orange-600 to-orange-400" />
                </div>
                <div className="relative p-8 bg-gray-900 rounded-2xl border border-gray-800">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative max-w-4xl mx-auto text-center"
          >
            <div className="absolute -inset-1">
              <div className="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-orange-600 to-orange-400" />
            </div>
            <div className="relative p-12 bg-gray-900 rounded-2xl border border-gray-800">
              <h2 className="text-3xl font-bold mb-6">Ready to Experience Our Flavors?</h2>
              <p className="text-gray-400 mb-8">
                Visit us today and discover why our customers keep coming back for more.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="group h-12 px-8" asChild>
                  <Link href="/menu">
                    View Menu
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const values = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every dish is prepared with care and attention to detail, using traditional recipes passed down through generations."
  },
  {
    icon: Award,
    title: "Quality First",
    description: "We use only the freshest, locally-sourced ingredients to ensure authentic flavors in every bite."
  },
  {
    icon: Users,
    title: "Family Values",
    description: "We treat our customers like family, creating a warm and welcoming atmosphere for everyone."
  }
]

const stats = [
  {
    value: "3+",
    label: "Years of Service"
  },
  {
    value: "1000+",
    label: "Happy Customers"
  },
  {
    value: "50+",
    label: "Menu Items"
  },
  {
    value: "4.8",
    label: "Average Rating"
  }
] 