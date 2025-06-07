"use client"

import { motion } from "motion/react"
import Link from "next/link"
import React from "react"

const footerItems = [
  { title: "About Us", href: "/about" },
  { title: "Terms & conditions!", href: "#" }
];

export default function Footer() {
  return (
    <footer className="text-white py-12 px-6 bg-[#1f1926]">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          {/* Navigation Links */}
          <div className="flex items-center space-x-8 mb-4 md:mb-0">
            {footerItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <motion.div
                  whileHover={{ color: '#a855f7' }}
                  className="text-gray-300 transition-colors duration-200 cursor-pointer"
                >
                  {item.title}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            {['Linkedin', 'Instagram'].map((social, index) => (
              <React.Fragment key={social}>
                <Link
                  href={
                    social === "Linkedin"
                      ? "https://www.linkedin.com/in/mradul-bisen-008147289/"
                      : "https://www.instagram.com/chai_with_wifi/profilecard/"
                  }
                  target="_blank"
                >
                  <motion.span
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    whileHover={{ color: '#a855f7' }}
                  >
                    {social}
                  </motion.span>
                </Link>
                {index < 1 && <span className="text-gray-400">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© 2025 CADthatout.com | Made with ❤️ for Makers</p>
        </div>
      </div>
    </footer>
  );
}
