"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react"
import { useState } from "react"

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions about our menu or services? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-1">
                  <div className="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-orange-600 to-orange-400" />
                </div>
                <div className="relative p-8 bg-gray-900 rounded-2xl border border-gray-800">
                  <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                        <MapPin size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Location</h3>
                        <p className="text-gray-400 text-sm">123 Main St, Amadeo, Cavite</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Phone</h3>
                        <p className="text-gray-400 text-sm">+63 912 345 6789</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                        <Mail size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <p className="text-gray-400 text-sm">hello@kusinadeamadeo.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.0888323086647!2d120.92748661482958!3d14.170999990088047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7c2c3e4489ed%3A0x9b2c8e8c7c0e9d9a!2sAmadeo%2C%20Cavite!5e0!3m2!1sen!2sph!4v1620812345678!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="absolute -inset-1">
                <div className="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-orange-600 to-orange-400" />
              </div>
              <form onSubmit={handleSubmit} className="relative p-8 bg-gray-900 rounded-2xl border border-gray-800 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full rounded-md border border-gray-800 bg-gray-950/50 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    placeholder="Enter your message"
                  />
                </div>
                <Button type="submit" className="w-full h-12">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 