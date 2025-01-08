"use client"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { Home, MenuIcon, Store, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: Store },
  { href: "/about", label: "About", icon: User },
]

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
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

export function MobileMenu() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-white md:hidden hover:bg-gray-800"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full max-w-xs bg-gradient-to-b from-gray-900 to-gray-950 text-white p-0 border-r border-gray-800"
      >
        <SheetHeader className="border-b border-gray-800 p-6">
          <SheetTitle>
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <motion.img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-10 w-auto relative"
                />
              </motion.div>
              <motion.span
                className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:to-orange-400 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Kusina de Amadeo
              </motion.span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2 p-6"
        >
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <motion.div key={link.href} variants={item}>
                <Link
                  href={link.href}
                  className="group relative flex items-center gap-3 px-4 py-3 text-lg rounded-xl transition-all duration-300"
                >
                  <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'gradient-primary'
                      : 'opacity-0 group-hover:opacity-100 bg-gray-800/50'
                  }`} />
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isActive ? 'blur-xl' : ''
                  }`} />
                  <Icon className={`relative h-5 w-5 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`} />
                  <span className={`relative font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`}>
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            )
          })}
          <motion.div variants={item} className="mt-6">
            <Button
              className="w-full gradient-primary gradient-primary-hover text-white border-0 h-12 text-lg font-medium shadow-lg shadow-orange-900/20"
            >
              Login
            </Button>
          </motion.div>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
} 