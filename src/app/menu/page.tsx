"use client"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { categories, products } from "@/lib/data"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Suspense, useCallback, useMemo, useState } from "react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => 
    selectedCategory
      ? { [selectedCategory]: products[selectedCategory as keyof typeof products] }
      : products,
    [selectedCategory]
  )

  // Memoize category selection handler
  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category)
  }, [])

  return (
    <div className="min-h-screen animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[30vh] sm:h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/menu-hero.jpg"
            alt="Menu"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-gray-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-200"
          >
            Discover our delicious selection of Filipino comfort food
          </motion.p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          {/* Category Navigation - Horizontally scrollable on mobile */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex overflow-x-auto pb-4 sm:pb-0 sm:flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12 no-scrollbar"
          >
            <motion.div variants={item}>
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="default"
                className="relative group whitespace-nowrap text-sm sm:text-base h-10 sm:h-11"
                onClick={() => handleCategorySelect(null)}
              >
                <span>All Categories</span>
                <div className="absolute inset-x-0 h-0.5 bottom-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Button>
            </motion.div>
            {Object.entries(categories).map(([key, category]) => (
              <motion.div key={key} variants={item}>
                <Button
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="default"
                  className="relative group whitespace-nowrap text-sm sm:text-base h-10 sm:h-11"
                  onClick={() => handleCategorySelect(key)}
                >
                  <span>{category.name}</span>
                  <div className="absolute inset-x-0 h-0.5 bottom-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory || 'all'}
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-1 gap-8 sm:gap-12"
            >
              {Object.entries(filteredProducts).map(([categoryKey, categoryProducts]) => (
                <motion.div key={categoryKey} variants={item} className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden">
                      <Image
                        src={categories[categoryKey as keyof typeof categories].image}
                        alt={categories[categoryKey as keyof typeof categories].name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 48px, 64px"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold">
                        {categories[categoryKey as keyof typeof categories].name}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-400">
                        {categories[categoryKey as keyof typeof categories].description}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    <Suspense fallback={<ProductCardSkeleton count={4} />}>
                      {Object.entries(categoryProducts).map(([productKey, product]) => (
                        <motion.div key={productKey} variants={item}>
                          <ProductCard
                            name={product.name as string}
                            description={product.description as string}
                            basePrice={product.base_price as number || (product.variants && Object.values(product.variants as Record<string, {base_price: number}>)[0].base_price)}
                            image={(product.image as string) || "/images/placeholder.jpg"}
                            category={product.category as string}
                            allowsAddons={product.allows_addons as boolean}
                            requiredAddons={product.required_addons as boolean}
                            availableAddons={product.available_addons}
                            variants={product.variants}
                          />
                        </motion.div>
                      ))}
                    </Suspense>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

// Skeleton loader component for product cards
function ProductCardSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative rounded-xl overflow-hidden">
          <div className="aspect-square bg-gray-800 animate-pulse" />
          <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
            <div className="space-y-3">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-2/3" />
              <div className="h-4 bg-gray-700 rounded animate-pulse w-1/3" />
              <div className="h-10 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
} 