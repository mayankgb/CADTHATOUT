"use client"
import { CheckCircle2 } from "lucide-react";
import { motion, Variants } from "motion/react"

interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
  }

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

export function PricingSection() {
    return (

        <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true}}
            className="text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--dark-primary)' }}
          >
            Popular Solutions
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
          >
            <PricingCard
              title="Drone Frame Design"
              price="₹249"
              features={[
                "High precision CAD model",
                "3D printing ready",
                "Assembly instructions",
                "Technical documentation"
              ]}
              isPopular
              buttonText="Buy now"
            />
            <PricingCard
              title="Arduino Code Pack"
              price="₹149"
              features={[
                "Ready-to-run code",
                "Multiple board support",
                "Documentation",
                "Basic support"
              ]}
              buttonText="Buy Now"
            />
            <PricingCard
              title="CAE Analysis"
              price="₹299"
              features={[
                "Stress analysis",
                "Thermal analysis",
                "Detailed report",
                "Expert consultation"
              ]}
              buttonText="Learn More"
            />
          </motion.div>
        </div>
      </section>

    )
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, isPopular = false, buttonText }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`p-8 rounded-xl border-2 ${
          isPopular 
            ? 'bg-gradient-to-br from-[var(--light-accent)] to-white' 
            : 'border-gray-200 bg-white'
        } hover:shadow-lg relative`}
        style={isPopular ? { borderColor: 'var(--cta-primary)' } : {}}
      >
        {isPopular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span 
              className="inline-block px-4 py-1 text-sm font-medium rounded-full"
              style={{ 
                color: 'var(--cta-primary)', 
                backgroundColor: 'var(--light-accent)' 
              }}
            >
              Most Popular
            </span>
          </div>
        )}
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--dark-primary)' }}>{title}</h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold" style={{ color: 'var(--cta-primary)' }}>{price}</span>
            {price !== 'Custom' && <span className="text-gray-500">/project</span>}
          </div>
        </div>
  
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
  
        <motion.button
          variants={isPopular ? buttonVariants : secondaryButtonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
            isPopular 
              ? 'bg-[var(--cta-primary)] text-white' 
              : 'border-2 border-[var(--cta-primary)] text-[var(--cta-primary)]'
          }`}
        >
          {buttonText}
        </motion.button>
      </motion.div>
    );
  };