"use client"
import { Square, Menu, X } from "lucide-react"
import { motion, Variants, AnimatePresence } from "motion/react"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";


const headerVariants: Variants = {
  hidden: { y: -100, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer: Variants = {
  // hidden: { opacity: 0 },
  visible: {
    // opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      ease: "easeInOut"
    },
  },
};



export function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const session = useSession()

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Request Custom', href: '/request-custom' },
    { name: 'Pre-Built Shop', href: '/pre-built-shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Logout', href: '/logout' }
  ];

  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 w-full z-50 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            className="flex items-center space-x-2"
            href={"/"}
          >
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#6315e3]"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Square className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-2xl select-none font-bold">CADTHATOUT</span>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item, index) => (
              <Link href={(item.name === "Logout" && session.status === "unauthenticated") ? "/signin" : item.href} key={index}>
                <motion.div
                  variants={navItemVariants}
                  whileHover={{
                    y: -2,
                    color: 'var(--cta-primary)',
                    transition: { duration: 0.2 }
                  }}
                  className="text-gray-700 font-medium transition-colors duration-200"
                  style={{ '--hover-color': 'var(--cta-primary)' } as React.CSSProperties}
                >
                  {(item.name === "Logout" && session.status === "unauthenticated") ? "Login" : item.name}
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <Link
                      href={(item.name === "Logout" && session.status === "unauthenticated") ? "/signin" : item.href}
                      key={index}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.15,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="text-gray-700 font-medium py-2 hover:text-[#6315e3]"
                      >
                        {(item.name === "Logout" && session.status === "unauthenticated") ? "Login" : item.name}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}