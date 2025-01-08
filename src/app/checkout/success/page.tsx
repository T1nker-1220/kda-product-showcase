"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle2, MapPin, Receipt, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-primary mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2
              }}
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold">Order Confirmed!</h1>
            <p className="text-gray-400 text-lg">
              Thank you for your order. We&apos;ll start preparing your food right away!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid gap-6"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Order Number</h3>
                  <p className="text-gray-400">#KDA-2024-0001</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Estimated Delivery Time</h3>
                    <p className="text-gray-400">30-45 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Delivery Address</h3>
                    <p className="text-gray-400">123 Main St, Amadeo, Cavite</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                asChild
              >
                <Link href="/orders">View Order Status</Link>
              </Button>
              <Button
                size="lg"
                className="flex-1 gradient-primary gradient-primary-hover"
                asChild
              >
                <Link href="/menu">Order More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 