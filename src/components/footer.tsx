import { getPlaceholderImage } from "@/lib/utils"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Image
              src={getPlaceholderImage("Kusina de Amadeo Logo")}
              alt="Kusina de Amadeo"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Kusina de Amadeo
            </span>
            <p className="text-gray-400 text-sm">
              Your favorite Filipino restaurant in Amadeo, Cavite. Serving authentic comfort food made with love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/menu", label: "Menu" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span className="text-sm">123 Main St, Amadeo, Cavite</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span className="text-sm">+63 912 345 6789</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span className="text-sm">hello@kusinadeamadeo.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram size={18} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Kusina de Amadeo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 