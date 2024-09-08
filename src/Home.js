import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Twitter, Mail, Github, Menu, X } from 'lucide-react'

import { Button } from "@/components/ui/button"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      <header className="py-4 px-6 md:px-12 lg:px-24">
        <nav className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#ff6b6b] text-2xl font-bold flex items-center"
          >
            <ChevronRight className="w-8 h-8 mr-2" />
            PetCare
          </motion.div>
          <div className="hidden md:flex space-x-6">
            {['Bot', 'Servers', 'Discord', 'Commands', 'Help', 'Status'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="hover:text-[#ff6b6b] transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <div className="hidden md:flex space-x-4">
            <Button className="bg-[#ff6b6b] hover:bg-[#ff8c8c] text-white">Get Premium</Button>
            <Button variant="outline" className="text-[#ff6b6b] border-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white">
              Add To Server
            </Button>
          </div>
          <button className="md:hidden text-[#ff6b6b]" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-gray-800 p-4"
        >
          {['Bot', 'Servers', 'Discord', 'Commands', 'Help', 'Status'].map((item) => (
            <a key={item} href="#" className="block py-2 hover:text-[#ff6b6b] transition-colors">
              {item}
            </a>
          ))}
          <Button className="w-full mt-4 bg-[#ff6b6b] hover:bg-[#ff8c8c] text-white">Get Premium</Button>
          <Button variant="outline" className="w-full mt-2 text-[#ff6b6b] border-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white">
            Add To Server
          </Button>
        </motion.div>
      )}

      <main className="flex-grow container mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-12 md:mb-0"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Unleash the Power of <span className="text-[#ff6b6b]">Virtual Pets</span> in Your Discord
            </h1>
            <p className="text-gray-300 mb-8 text-lg">
              PetCare Bot brings fun, engagement, and community-building to your Discord server through interactive virtual pets. Automate moderation, boost activity, and create unforgettable experiences!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-[#ff6b6b] hover:bg-[#ff8c8c] text-white text-lg py-6 px-8">
                Add To Server
              </Button>
              <Button variant="outline" className="text-[#ff6b6b] border-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white text-lg py-6 px-8">
                Try Demo
              </Button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <img 
                src="/placeholder.svg?height=400&width=600" 
                alt="PetCare Bot Dashboard" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#ff6b6b] text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">Used by</p>
                <p className="text-2xl font-bold">2.5M+</p>
                <p>Discord Servers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-gray-900 py-12 px-6 md:px-24">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-[#ff6b6b] mb-4">PetCare</h3>
            <ul className="space-y-2">
              {['Bot', 'Public Servers', 'Commands', 'Help', 'Premium', 'Discord Server'].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#ff6b6b] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#ff6b6b] mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#ff6b6b] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#ff6b6b] mb-4">Community</h3>
            <ul className="space-y-2">
              {['Twitter', 'GitHub', 'Discord'].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#ff6b6b] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#ff6b6b] mb-4">Contact</h3>
            <p className="mb-4">Get in touch with us for any inquiries or support.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-400">
          <p>&copy; 2024 PetCare Bot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}