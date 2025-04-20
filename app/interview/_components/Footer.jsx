"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'GitHub', icon: Github, url: 'https://github.com' },
  { name: 'Email', icon: Mail, url: 'mailto:contact@example.com' },
]

const footerLinks = [
  { name: 'About Us', url: '/about' },
  { name: 'Our Services', url: '/services' },
  { name: 'Contact Us', url: '/contact' },
  { name: 'Privacy Policy', url: '/privacy' },
  { name: 'Terms of Service', url: '/terms' },
]

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-purple-100 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/">
              <span className="text-3xl font-bold text-purple-600">
                prept.
              </span>
            </Link>
            <p className="text-gray-600 mt-2">Empowering your career journey with AI-driven interview preparation.</p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-6 w-6 text-purple-500 hover:text-purple-700 transition-colors duration-300" />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0, 3).map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link href={link.url} className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.slice(3).map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link href={link.url} className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Newsletter</h3>
            <p className="text-gray-600 mb-4">Stay updated with our latest features and tips.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white border border-purple-200 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        
        <hr className="my-8 border-purple-200" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {new Date().getFullYear()} prept. All rights reserved.
          </motion.p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-300 mr-4">
              Cookie Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
