"use client"
import { motion, Variants } from "motion/react"

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
  

export function CTA() {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true}}
            className="text-4xl font-bold mb-8 text-white"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once : true}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
          >
            Get professional CAD services, drone designs, and custom solutions for your next project.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once : true}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-white text-[var(--cta-primary)] px-8 py-4 rounded-full font-semibold text-lg"
            >
              Get Started Now
            </motion.button>
            <motion.button
              variants={secondaryButtonVariants}
              whileHover="hover"
              whileTap="tap"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg"
            >
              Get professionals advice
            </motion.button>
          </motion.div>
        </div>
      </section>

    )
}