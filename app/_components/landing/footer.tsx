"use client"

import { motion } from "motion/react"
import React from "react"

export default function Footer() {
    return (
        <footer className="text-white py-12 px-6" style={{ backgroundColor: 'var(--dark-primary)' }}>
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center space-x-8 mb-4 md:mb-0">
                {['About US', 'Terms & conditions!', 'Privacy Policy', 'Contact'].map((item: string) => (
                  <motion.a
                    key={item}
                    href="#"
                    whileHover={{ color: 'var(--secondary-primary)' }}
                    className="text-gray-300 transition-colors duration-200"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                {['Instagram', 'GitHub'].map((social: string, index: number) => (
                  <React.Fragment key={social}>
                    <motion.span 
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      whileHover={{ color: 'var(--secondary-primary)' }}
                    >
                      {social}
                    </motion.span>
                    {index < 2 && <span className="text-gray-400">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>© 2025 CAD thatout.com | Made with ❤️ for Makers</p>
            </div>
          </div>
        </footer>
    )
}