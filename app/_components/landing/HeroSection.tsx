"use client"
import {motion, Variants } from "motion/react"
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100','200', '400', '500', '600', '700', '800', '900']
})


const buttonVariants: Variants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(99, 21, 227, 0.3)",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };
  
  const secondaryButtonVariants: Variants = {
    hover: {
      scale: 1.05,
      borderColor: 'var(--cta-primary)',
      color: 'var(--cta-primary)',
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };
  
export function Hero() {
    return (

        <section className={`pt-32 pb-20 px-6 h-screen relative overflow-hidden ${inter.className} `}>
        <div className="absolute h-screen inset-0 bg-gradient-to-br from-[var(--gradient-start)]/10 to-[var(--gradient-end)]/10" />
        <div className="container mx-auto flex flex-col h-full items-center justify-center text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight"
            style={{ color: 'var(--dark-primary)' }}
          >
            Your Ideas, Our CAD.
            <br />
            <span className="text-[var(--cta-primary)]">Design & Electronic routing</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Expert CAD services for drones, robotics, and custom products — with advanced electronic routing, circuit design, and ready-to-use models.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              style={{ backgroundColor: 'var(--cta-primary)' }}
            >
              Get Started
            </motion.button>
            
            <motion.button
              variants={secondaryButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              View Pre-Built Models
            </motion.button>
          </motion.div>
        </div>
      </section>


    )
}