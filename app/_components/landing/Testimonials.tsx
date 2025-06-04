"use client"
import { motion, useAnimation, useInView, Variants } from "motion/react"
import React, { useEffect } from "react";

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
}
interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    company: string;
    rating: number;
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
  

const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};


export default function TestimonialSection() {
    return (
        <AnimatedSection className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once : true}}
          >
            <TestimonialCard
              quote="Got my robot gripper in 2 days, with perfect CAD design!"
              author="Aayush S."
              role="CAD Designer"
              company="CADTHATOUT"
              rating={5}
            />
            <TestimonialCard
              quote="Pre-built code saved my college project deadline."
              author="Aman S."
              role="CAD Engineer"
              company="University of XYZ"
              rating={4.5}
            />
          </motion.div>
        </div>
      </AnimatedSection>

    )
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "" }) => {
    const controls = useAnimation();
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={fadeInUpVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, company }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <div className="mb-6">
          <div className="text-4xl mb-4" style={{ color: 'var(--secondary-primary)' }}>"</div>
          <p className="text-gray-700 text-lg leading-relaxed">{quote}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold" style={{ color: 'var(--dark-primary)' }}>— {author}, {role} at {company}</p>
        </div>
      </motion.div>
    );
  };