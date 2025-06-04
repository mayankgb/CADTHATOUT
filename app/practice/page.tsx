"use client"
import { motion, Variants } from "motion/react"
import { Play, Square, Layers, Clock, Zap, Code, FileCode, Settings, Shield, Users, ArrowRight, CheckCircle2, Star, Download, Rocket } from 'lucide-react';


interface FeatureCardProps {
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    title: string;
    description: string;
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
            type: "spring",
            stiffness: 1000,
            // duration: 0.8,
            // ease: [0.33, 1, 0.68, 1], 
        },
    },
};

const hoverVariants: Variants = {
    hover: {
        y: -8,
        transition: {
            duration: 0.3,
            // ease: [0.22, 1, 0.36, 1],
        },
    },
};
const staggerContainer: Variants = {
    // hidden: { opacity: 0 },
    visible: {
        // opacity: 1,
        transition: {
            // staggerChildren: 0.2,
            // delayChildren: 0.3,
            // ease: "easeInOut"
        },
    },
};


const features = [
    {
        icon: Rocket,
        title: 'Fast Delivery',
        description: 'Get your CAD models and designs delivered within 48 hours',
    },
    {
        icon: Code,
        title: 'Ready-to-Use Code',
        description: 'Pre-tested Arduino and embedded code for your projects',
    },
    {
        icon: Settings,
        title: 'Custom Solutions',
        description: 'Tailored CAD designs and solutions for your specific needs',
    },
    {
        icon: Shield,
        title: 'Quality Assurance',
        description: 'Every design undergoes rigorous testing and validation',
    },
    {
        icon: Users,
        title: 'Expert Team',
        description: 'Experienced CAD engineers and designers at your service',
    },
    {
        icon: FileCode,
        title: 'Documentation',
        description: 'Comprehensive documentation and support materials',
    },
];


export default function () {
    return (
        <div className="bg-gray-300 h-screen flex items-center justify-center">

            <div
                className="flex items-center justify-center"
                // variants={staggerContainer}
                // initial="hidden"
                // whileInView={"visible"}
                // viewport={{ once: true }}
            >
                {/* {features.map((feature, index) => ( */}
                    <FeatureCard {...features[0]} />
                {/* ))} */}
            </div>

        </div>
    )
}



const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                filter: "blur(10px)",
                // scale: 0.5
                y: 100
            }}
            animate={{
                opacity: 1,
                filter: "blur(0px)",
                // scale: 1,
                y: 0,
                transition: { duration: 1, ease: "easeInOut"}
            }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl"
        >
            <motion.div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                // style={{ backgroundColor: 'var(--light-accent)' }}
                // whileHover={{ scale: 1.1 }}
                // transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                <Icon className="w-6 h-6" style={{ color: 'var(--cta-primary)' }} />
            </motion.div>
            <motion.h3
                className="text-lg font-semibold mb-2"
                // style={{ color: 'var(--dark-primary)' }}
                // variants={hoverVariants}
            >
                {title}
            </motion.h3>
            <motion.p
                className="text-gray-600 text-sm"
                // variants={hoverVariants}
            >
                {description}
            </motion.p>
        </motion.div>
    );
};