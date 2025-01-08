"use client"

import { CartSheet } from "@/components/cart-sheet"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MobileMenu } from "./mobile-menu"

export function Navbar() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 0.95)"]
  )

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{ backgroundColor }}
      className="fixed top-0 w-full z-50 backdrop-blur-sm supports-[backdrop-filter]:bg-gray-900/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full opacity-70 blur-lg filter group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-orange-600 to-orange-400" />
                <motion.img
                  src="/images/logo.png"
                  alt="Logo"
                  className="relative h-10 w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              </div>
              <motion.span
                className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:to-orange-400 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Kusina de Amadeo
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <motion.div className="flex items-center space-x-8">
              {[
                { href: "/menu", label: "Menu" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    href={link.href}
                    className={`relative py-2 text-sm font-medium transition-colors group`}
                  >
                    <span className={`relative z-10 ${
                      pathname === link.href
                        ? "text-white"
                        : "text-gray-300 group-hover:text-white"
                    }`}>
                      {link.label}
                    </span>
                    {pathname === link.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 to-orange-600"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    <div className="absolute inset-0 -z-10 rounded-lg transition-colors duration-300 group-hover:bg-gray-800/50" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex items-center space-x-4">
              <CartSheet>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-gray-800"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full gradient-primary text-[10px] font-medium flex items-center justify-center">
                    0
                  </span>
                </Button>
              </CartSheet>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="gradient-primary gradient-primary-hover text-white border-0 h-10 px-6"
                >
                  Login
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 md:hidden">
            <CartSheet>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-800"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full gradient-primary text-[10px] font-medium flex items-center justify-center">
                  0
                </span>
              </Button>
            </CartSheet>
            <MobileMenu />
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 