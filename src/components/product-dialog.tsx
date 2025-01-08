"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { globalAddons } from "@/lib/data"
import { useCartStore } from "@/lib/store"
import { cn, getPlaceholderImage } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Minus, Plus, ShoppingBag, Sparkles } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface ProductDialogProps {
  isOpen: boolean
  onClose: () => void
  product: {
    name: string
    description: string
    basePrice: number
    image: string
    category: string
    allowsAddons?: boolean
    requiredAddons?: boolean
    availableAddons?: string[]
    variants?: {
      [key: string]: {
        basePrice: number
        image?: string
        flavors?: {
          [key: string]: {
            name: string
            image?: string
          }
        }
      }
    }
  }
}

export function ProductDialog({ isOpen, onClose, product }: ProductDialogProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product.variants ? Object.keys(product.variants)[0] : null
  )
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(
    product.variants && selectedVariant && product.variants[selectedVariant].flavors
      ? Object.keys(product.variants[selectedVariant].flavors!)[0]
      : null
  )
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  // Reset flavor when variant changes
  useEffect(() => {
    if (selectedVariant && product.variants?.[selectedVariant].flavors) {
      setSelectedFlavor(Object.keys(product.variants[selectedVariant].flavors!)[0])
    } else {
      setSelectedFlavor(null)
    }
  }, [selectedVariant, product.variants])

  // Get current image based on selections
  const getCurrentImage = () => {
    // Try to get flavor image first
    if (
      selectedFlavor &&
      selectedVariant &&
      product.variants?.[selectedVariant].flavors?.[selectedFlavor]?.image
    ) {
      const flavorImage = product.variants[selectedVariant].flavors![selectedFlavor].image
      if (flavorImage && flavorImage.trim() !== "") {
        return flavorImage
      }
    }

    // Try to get variant image next
    if (selectedVariant && product.variants?.[selectedVariant]?.image) {
      const variantImage = product.variants[selectedVariant].image
      if (variantImage && variantImage.trim() !== "") {
        return variantImage
      }
    }

    // Finally, try the main product image
    if (product.image && product.image.trim() !== "") {
      return product.image
    }

    // If all else fails, return placeholder
    return getPlaceholderImage()
  }

  // Calculate total price
  const calculateTotal = () => {
    let total = product.basePrice
    
    // Add variant price
    if (selectedVariant && product.variants) {
      total = product.variants[selectedVariant].basePrice
    }

    // Add addons price
    selectedAddons.forEach((addon) => {
      total += globalAddons[addon as keyof typeof globalAddons].price
    })

    // Multiply by quantity
    total *= quantity

    return total
  }

  const handleAddToCart = () => {
    // Validate required add-ons
    if (product.requiredAddons && selectedAddons.length === 0) {
      toast.error("Please select at least one add-on")
      return
    }

    // Add item to cart
    addItem({
      id: Math.random().toString(),
      name: product.name,
      price: calculateTotal() / quantity,
      quantity,
      image: getCurrentImage() || product.image,
      variant: selectedVariant || "",
      flavor: selectedFlavor || "",
      addons: selectedAddons,
      totalPrice: calculateTotal(),
    })

    // Show success message
    toast.success("Added to cart!")

    // Reset state and close dialog
    setSelectedAddons([])
    setQuantity(1)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-y-auto max-h-[90vh] border-gray-800">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        <motion.div 
          className="grid gap-8 py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Product Image */}
          <motion.div 
            className="aspect-video relative rounded-xl overflow-hidden bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-[1px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full h-full">
              <Image
                src={getCurrentImage()}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </motion.div>

          {/* Variants Selection */}
          <AnimatePresence mode="wait">
            {product.variants && (
              <motion.div 
                key="variants"
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Label className="text-lg font-medium">Choose Size</Label>
                <RadioGroup
                  value={selectedVariant || ""}
                  onValueChange={setSelectedVariant}
                  className="grid grid-cols-2 gap-4"
                >
                  {Object.entries(product.variants).map(([size, variant]) => (
                    <Label
                      key={size}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                        selectedVariant === size
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-gray-800 hover:border-gray-700 hover:bg-gray-800/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={size} id={size} />
                        <span className="font-medium">{size}</span>
                      </div>
                      <span className="text-orange-400">₱{variant.basePrice}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </motion.div>
            )}

            {/* Flavors Selection */}
            {product.variants && selectedVariant && product.variants[selectedVariant].flavors && (
              <motion.div 
                key="flavors"
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Label className="text-lg font-medium">Select Flavor</Label>
                <RadioGroup
                  value={selectedFlavor || ""}
                  onValueChange={setSelectedFlavor}
                  className="grid grid-cols-2 gap-4"
                >
                  {Object.entries(product.variants[selectedVariant].flavors!).map(
                    ([key, flavor]) => (
                      <Label
                        key={key}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                          selectedFlavor === key
                            ? "border-orange-500 bg-orange-500/10"
                            : "border-gray-800 hover:border-gray-700 hover:bg-gray-800/50"
                        )}
                      >
                        <RadioGroupItem value={key} id={key} />
                        <span className="font-medium">{flavor.name}</span>
                      </Label>
                    )
                  )}
                </RadioGroup>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add-ons Selection */}
          {product.allowsAddons && product.availableAddons && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <Label className="text-lg font-medium">
                  Customize Your Order
                  {product.requiredAddons && (
                    <span className="text-red-400 ml-1">*</span>
                  )}
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {product.availableAddons.map((addon) => {
                  const addonDetails = globalAddons[addon as keyof typeof globalAddons]
                  return (
                    <Label
                      key={addon}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                        selectedAddons.includes(addon)
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-gray-800 hover:border-gray-700 hover:bg-gray-800/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedAddons.includes(addon)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAddons([...selectedAddons, addon])
                            } else {
                              setSelectedAddons(
                                selectedAddons.filter((a) => a !== addon)
                              )
                            }
                          }}
                        />
                        <span className="font-medium">{addonDetails.name}</span>
                      </div>
                      <span className="text-orange-400">+₱{addonDetails.price}</span>
                    </Label>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Quantity and Total */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-800">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Total Amount</div>
              <div className="text-2xl font-bold gradient-text-primary">
                ₱{calculateTotal()}
              </div>
            </div>
          </div>
        </motion.div>

        <DialogFooter>
          <Button
            className="w-full gradient-primary gradient-primary-hover text-white border-0"
            size="lg"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 