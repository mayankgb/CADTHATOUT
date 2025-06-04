"use client"
import { Square } from "lucide-react"
import {motion, Variants} from "motion/react"
import { useState, useEffect } from "react";


const headerVariants: Variants = {
    hidden: { y: -100, opacity: 0 , filter: "blur(10px)"},
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

  
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navItems: string[] = ['Home', 'Services', 'Pre-Built Shop', 'Request Custom', 'About Us', 'Contact'];

    return(
        <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--cta-primary)' }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Square className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-2xl font-bold" style={{ color: 'var(--dark-primary)' }}>CADTHATOUT</span>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item: string, index: number) => (
                <motion.a
                  key={item}
                  href="#"
                  variants={navItemVariants}
                  whileHover={{ 
                    y: -2, 
                    color: 'var(--cta-primary)',
                    transition: { duration: 0.2 }
                  }}
                  className="text-gray-700 font-medium transition-colors duration-200"
                  style={{ '--hover-color': 'var(--cta-primary)' } as React.CSSProperties}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </nav>
      </motion.header>
    )
}