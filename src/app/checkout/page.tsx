"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCartStore } from "@/lib/store"
import { getPlaceholderImage } from "@/lib/utils"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle2, CreditCard, MapPin, ShoppingBag, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const steps = [
  { id: "cart", label: "Cart", icon: ShoppingBag },
  { id: "details", label: "Details", icon: MapPin },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirmation", label: "Confirmation", icon: CheckCircle2 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState("details")
  const { items, getTotalPrice } = useCartStore()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "gcash",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep === "details") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      setCurrentStep("confirmation")
    }
  }

  const handleBack = () => {
    if (currentStep === "payment") {
      setCurrentStep("details")
    } else if (currentStep === "confirmation") {
      setCurrentStep("payment")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push("/checkout/success")
  }

  return (
    <div className="min-h-screen py-20">
      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = steps.findIndex((s) => s.id === currentStep) >= index
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isActive
                        ? "gradient-primary"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-gray-200" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-[2px] mx-2 transition-colors duration-300 ${
                      isActive ? "bg-orange-600" : "bg-gray-800"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl"
              >
                {currentStep === "details" && (
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="bg-gray-900 border-gray-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+63 XXX XXX XXXX"
                            className="bg-gray-900 border-gray-800"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="bg-gray-900 border-gray-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Delivery Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter your complete address"
                          className="bg-gray-900 border-gray-800"
                        />
                      </div>
                    </div>
                  </form>
                )}

                {currentStep === "payment" && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg mb-4 block">Select Payment Method</Label>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, paymentMethod: value }))
                        }
                        className="grid grid-cols-1 gap-4"
                      >
                        <Label
                          htmlFor="gcash"
                          className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <RadioGroupItem value="gcash" id="gcash" />
                            <div>
                              <img
                                src="/images/payment/gcash-logo.png"
                                alt="GCash"
                                className="h-8 w-auto"
                              />
                              <p className="text-sm text-gray-400 mt-1">
                                Pay with GCash
                              </p>
                            </div>
                          </div>
                          <span className="text-orange-400">Recommended</span>
                        </Label>
                        <Label
                          htmlFor="cod"
                          className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <RadioGroupItem value="cod" id="cod" />
                            <div>
                              <p className="font-medium">Cash on Delivery</p>
                              <p className="text-sm text-gray-400 mt-1">
                                Pay when you receive
                              </p>
                            </div>
                          </div>
                        </Label>
                      </RadioGroup>
                    </div>

                    {formData.paymentMethod === "gcash" && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                          <h4 className="font-medium text-orange-400 mb-2">
                            GCash Payment Instructions
                          </h4>
                          <ol className="list-decimal list-inside text-sm text-gray-300 space-y-2">
                            <li>Open your GCash app</li>
                            <li>Scan the QR code or enter the number below</li>
                            <li>Enter the exact amount: ₱{getTotalPrice()}</li>
                            <li>Complete the payment in the GCash app</li>
                            <li>
                              Take a screenshot of the receipt and upload it below
                            </li>
                          </ol>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="p-4 bg-white rounded-xl">
                            <div className="relative w-48 h-48">
                              <Image
                                src={getPlaceholderImage("GCash QR Code")}
                                alt="GCash QR"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-gray-400 text-sm mb-2">
                            GCash Number
                          </p>
                          <p className="text-xl font-mono font-bold text-orange-400">
                            0917 123 4567
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="receipt">Upload Payment Receipt</Label>
                          <Input
                            id="receipt"
                            type="file"
                            accept="image/*"
                            className="bg-gray-900 border-gray-800"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === "confirmation" && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Confirm Your Order
                      </h3>
                      <p className="text-gray-400">
                        Please review your order details before proceeding
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-gray-800/50">
                        <h4 className="font-medium mb-2">Delivery Details</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                          <p>
                            <span className="text-gray-500">Name:</span>{" "}
                            {formData.name}
                          </p>
                          <p>
                            <span className="text-gray-500">Phone:</span>{" "}
                            {formData.phone}
                          </p>
                          <p>
                            <span className="text-gray-500">Email:</span>{" "}
                            {formData.email}
                          </p>
                          <p>
                            <span className="text-gray-500">Address:</span>{" "}
                            {formData.address}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gray-800/50">
                        <h4 className="font-medium mb-2">Payment Method</h4>
                        <p className="text-sm text-gray-400">
                          {formData.paymentMethod === "gcash"
                            ? "GCash Payment"
                            : "Cash on Delivery"}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-gray-800/50">
                        <h4 className="font-medium mb-4">Order Summary</h4>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between text-sm"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div>
                                  <p>{item.name}</p>
                                  <p className="text-gray-500">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <p className="font-medium">₱{item.totalPrice}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
                  {currentStep !== "details" ? (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  ) : (
                    <Button variant="outline" asChild>
                      <Link href="/cart" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Cart
                      </Link>
                    </Button>
                  )}
                  {currentStep === "confirmation" ? (
                    <Button
                      onClick={handleSubmit}
                      className="gradient-primary gradient-primary-hover gap-2"
                    >
                      Place Order
                      <Truck className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="gradient-primary gradient-primary-hover gap-2"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl sticky top-24"
              >
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm text-gray-400"
                      >
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span>₱{item.totalPrice}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Subtotal</span>
                      <span>₱{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Delivery Fee</span>
                      <span>₱50</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <span>Total</span>
                      <span className="gradient-text-primary">
                        ₱{getTotalPrice() + 50}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 