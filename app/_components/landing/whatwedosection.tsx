"use client"
import { Square, Layers, Zap, Clock } from "lucide-react";
import { motion, useAnimation, useInView, Variants } from "motion/react"
import React, { useEffect } from "react";

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

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
}

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 100,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.3,
            // delay: 0.4
            // ease: [0,1,0.3,0.4]
            // ease: "backIn",
        },
    },
};

interface ServiceCardProps {
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    title: string;
    description: string;
    delay?: number;
}

export function WhatWeDo() {
    return (

        <AnimatedSection className="py-20 px-6 bg-white">
            <div className="container mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true}}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-16"
                    style={{ color: 'var(--dark-primary)' }}
                >
                    What We Do
                </motion.h2>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true}}
                >
                    <ServiceCard
                        icon={Square}
                        title="Custom CAD Models"
                        description="High precision CAD models for your projects"
                        delay={0}
                    />
                    <ServiceCard
                        icon={Layers}
                        title="Custom PCB Designs"
                        description="Reliable boards with advanced routing solutions"
                        delay={0.1}
                    />
                    <ServiceCard
                        icon={Zap}
                        title="CAE Analysis"
                        description="Comprehensive stress testing and analysis"
                        delay={0.2}
                    />
                    <ServiceCard
                        icon={Clock}
                        title="Pre-Arduino Sketches"
                        description="Ready-to-run code for your projects"
                        delay={0.3}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                    viewport={{ once: true}}
                >
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: 'var(--cta-primary)',
                            color: 'white'
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 px-8 py-3 rounded-full font-semibold "
                        style={{
                            borderColor: 'var(--cta-primary)',
                            color: 'var(--cta-primary)'
                        }}
                    >
                        Learn More
                    </motion.button>
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
            viewport={{ once: true}}
        >
            {children}
        </motion.div>
    );
};


const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description }) => {
    return (
        <motion.div
            variants={itemVariants}
            whileHover={{
                y: -8,
                transition: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                }
            }}
            viewport={{once: true}}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl "
        >
            <motion.div
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--light-accent)' }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
            >
                <Icon className="w-8 h-8" style={{ color: 'var(--secondary-primary)' }} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--dark-primary)' }}>{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
    );
};
