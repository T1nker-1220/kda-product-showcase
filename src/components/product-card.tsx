"use client"

import { ProductDialog } from "@/components/product-dialog"
import { Button } from "@/components/ui/button"
import { getPlaceholderImage } from "@/lib/utils"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Plus, Sparkles } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductCardProps {
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

export function ProductCard(props: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mouse position for gradient effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const background = useMotionTemplate`radial-gradient(
    400px circle at ${mouseX}px ${mouseY}px,
    rgba(234, 88, 12, 0.15),
    transparent 80%
  )`

  // Get current image based on selections
  const getDisplayImage = () => {
    // If no image provided or image is missing, return placeholder
    if (!props.image || props.image === "") {
      return getPlaceholderImage()
    }

    // Check if variant has image
    if (props.variants) {
      const firstVariant = Object.keys(props.variants)[0]
      if (props.variants[firstVariant].image) {
        return props.variants[firstVariant].image || getPlaceholderImage()
      }
      // Check if variant has flavors with images
      if (props.variants[firstVariant].flavors) {
        const firstFlavor = Object.keys(props.variants[firstVariant].flavors!)[0]
        if (props.variants[firstVariant].flavors![firstFlavor].image) {
          return props.variants[firstVariant].flavors![firstFlavor].image || getPlaceholderImage()
        }
      }
    }

    return props.image
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="group relative rounded-xl overflow-hidden"
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl" />
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background }}
        />

        {/* Border Gradient */}
        <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-[1px]">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="relative">
          {/* Image Container */}
          <div className="aspect-square overflow-hidden">
            <motion.div className="relative w-full h-full">
              <Image
                src={getDisplayImage()}
                alt={props.name}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.8 : 0.6 }}
            />
          </div>

          {/* Product Info */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="space-y-4">
              {/* Title and Price */}
              <div className="flex justify-between items-start">
                <motion.h3
                  className="text-xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {props.name}
                </motion.h3>
                <motion.div
                  className="text-right"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-lg font-bold gradient-text-primary">
                    ₱{props.basePrice}
                  </span>
                  {props.variants && (
                    <span className="block text-xs text-orange-400/80">Multiple options</span>
                  )}
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                className="text-sm text-gray-300 line-clamp-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {props.description}
              </motion.p>

              {/* Add-ons Badge */}
              {props.allowsAddons && (
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/20">
                    <Sparkles className="w-3 h-3" />
                    {props.requiredAddons ? "Add-ons Required" : "Customizable"}
                  </span>
                </motion.div>
              )}

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  className="w-full gradient-primary gradient-primary-hover text-white border-0"
                  size="lg"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <span>Add to Cart</span>
                  <Plus className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Dialog */}
      <ProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        product={props}
      />
    </>
  )
} 