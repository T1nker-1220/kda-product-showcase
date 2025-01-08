"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/lib/store"
import { AnimatePresence, motion } from "framer-motion"
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface CartSheetProps {
  children?: React.ReactNode
}

export function CartSheet({ children }: CartSheetProps) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  // Hydration fix
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {getTotalItems() > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full gradient-primary text-white text-xs font-medium flex items-center justify-center shadow-lg shadow-orange-900/20"
              >
                {getTotalItems()}
              </motion.span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-b from-gray-900 to-gray-950 text-white border-gray-800">
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-3">
            <ShoppingBag className="w-7 h-7" />
            Your Cart
          </SheetTitle>
          <SheetDescription className="text-gray-300 text-base">
            {items.length === 0
              ? "Your cart is empty"
              : `You have ${getTotalItems()} items in your cart`}
          </SheetDescription>
        </SheetHeader>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 flex-1 overflow-y-auto pr-4 -mr-4"
          style={{ maxHeight: "calc(100vh - 300px)" }}
        >
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
                className="group relative mb-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-[1px] shadow-lg"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex gap-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-[1px]">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {item.variant && (
                      <p className="text-sm text-orange-400/80">Size: {item.variant}</p>
                    )}
                    {item.flavor && (
                      <p className="text-sm text-orange-400/80">Flavor: {item.flavor}</p>
                    )}
                    {item.addons && item.addons.length > 0 && (
                      <p className="text-sm text-orange-400/80">
                        Add-ons: {item.addons.join(", ")}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-lg border-gray-700 hover:border-gray-600"
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-lg border-gray-700 hover:border-gray-600"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-bold text-lg gradient-text-primary">
                        ₱{item.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length > 0 && (
          <SheetFooter className="mt-auto border-t border-gray-800 pt-6">
            <div className="w-full space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-400">Total Amount</p>
                  <p className="text-2xl font-bold gradient-text-primary">
                    ₱{getTotalPrice()}
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </p>
              </div>
              <Button
                className="w-full gradient-primary gradient-primary-hover text-white border-0 h-12 text-lg font-medium shadow-lg shadow-orange-900/20"
                onClick={() => {
                  setIsOpen(false)
                  router.push("/checkout")
                }}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
} 