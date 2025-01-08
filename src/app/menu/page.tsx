"use client"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { categories, products } from "@/lib/data"
import { motion } from "framer-motion"
import { useState } from "react"

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

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? { [selectedCategory]: products[selectedCategory as keyof typeof products] }
    : products

  return (
    <div className="min-h-screen animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/menu-hero.jpg"
            alt="Menu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-gray-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-200"
          >
            Discover our delicious selection of Filipino comfort food
          </motion.p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Navigation */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-4 mb-12"
          >
            <motion.div variants={item}>
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="lg"
                className="relative group"
                onClick={() => setSelectedCategory(null)}
              >
                <span>All Categories</span>
                <div className="absolute inset-x-0 h-0.5 bottom-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Button>
            </motion.div>
            {Object.entries(categories).map(([key, category]) => (
              <motion.div key={key} variants={item}>
                <Button
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="lg"
                  className="relative group"
                  onClick={() => setSelectedCategory(key)}
                >
                  <span>{category.name}</span>
                  <div className="absolute inset-x-0 h-0.5 bottom-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Products Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-12"
          >
            {Object.entries(filteredProducts).map(([categoryKey, categoryProducts]) => (
              <motion.div key={categoryKey} variants={item} className="space-y-8">
                <div className="flex items-center gap-4">
                  <img
                    src={categories[categoryKey as keyof typeof categories].image}
                    alt={categories[categoryKey as keyof typeof categories].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {categories[categoryKey as keyof typeof categories].name}
                    </h2>
                    <p className="text-gray-400">
                      {categories[categoryKey as keyof typeof categories].description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
} 