"use client"

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Mail, MapPin, Linkedin, Twitter, Github, Star, Zap } from 'lucide-react';
import anshika from "@/public/anshika.jpeg"
import Image, { StaticImageData } from 'next/image';
import mradul from "@/public/mradul.jpeg"

interface Founder {
    name: string;
    tag: 'founder' | 'co-founder';
    imageUrl: StaticImageData;
    email: string;
}

const data: Founder[] = [{
    name: "Mradul Bisen",
    tag: "founder",
    imageUrl: mradul,
    email: "mradulbisen@gmail.com",
}, {
    name: "Anshika Agarwal",
    tag: "co-founder",
    imageUrl:anshika ,
    email: "anshik@gmail.com"
}];

const About: React.FC = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            rotateY: 5,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const glowVariants: Variants = {
        initial: { opacity: 0.2, scale: 1 },
        animate: {
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.02, 1],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const backgroundPattern = `data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
            {/* Background Elements */}
            <div 
                className="absolute inset-0 opacity-40"
                style={{ backgroundImage: `url("${backgroundPattern}")` }}
            />
            
            {/* Floating Elements */}
            <motion.div
                className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full blur-xl opacity-20"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-xl opacity-20"
                animate={{
                    y: [0, 15, 0],
                    x: [0, -15, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full blur-lg opacity-15"
                animate={{
                    y: [0, -25, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <motion.div 
                className="relative z-10 max-w-6xl mx-auto px-6 py-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center mb-20">
                    <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-violet-100 px-6 py-3 rounded-full text-purple-700 font-medium mb-8"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Star className="w-4 h-4" />
                        Meet Our Founders
                        <Zap className="w-4 h-4" />
                    </motion.div>
                    
                    <motion.h1 
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-violet-800 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Visionaries Behind Innovation
                    </motion.h1>
                    
                    <motion.p 
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Transforming ideas into cutting-edge CAD solutions, electronic designs, and revolutionary products that shape the future of technology
                    </motion.p>
                </motion.div>

                {/* Founders Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
                    variants={containerVariants}
                >
                    {data.map((founder, index) => (
                        <motion.div
                            key={founder.email}
                            variants={cardVariants}
                            whileHover="hover"
                            className="relative group"
                        >
                            {/* Glow Effect */}
                            <motion.div
                                variants={glowVariants}
                                initial="initial"
                                animate="animate"
                                className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-3xl blur-sm opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                            />
                            
                            {/* Card */}
                            <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl">
                                {/* Profile Image Placeholder */}
                                <motion.div 
                                    className="relative mb-6 mx-auto"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image src={founder.imageUrl} alt='icon' className="w-32 h-32 mx-auto bg-gradient-to-br  from-purple-400 via-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                                        {/* <span className="text-4xl font-bold text-white">
                                            {founder.name.split(' ').map(n => n[0]).join('')}
                                        </span> */}
                                    </Image>
                                    
                                    {/* Role Badge */}
                                    <motion.div
                                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.6 + index * 0.2, duration: 0.4 }}
                                    >
                                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                            {founder.tag.toUpperCase()}
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Content */}
                                <motion.div 
                                    className="text-center space-y-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {founder.name}
                                    </h3>
                                    
                                    <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
                                        <Mail className="w-4 h-4 text-purple-500" />
                                        <span className="text-sm">{founder.email}</span>
                                    </div>

                                    {/* Bio placeholder */}
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {founder.tag === 'founder' 
                                            ? "Passionate about revolutionizing CAD design and electronic innovations. Leading the vision to create cutting-edge solutions that empower creators and engineers worldwide."
                                            : "Driving strategic growth and operational excellence. Focused on building sustainable partnerships and scaling innovative technologies to reach global markets."
                                        }
                                    </p>

                                    {/* Social Links Placeholder */}
                                    <div className="flex justify-center gap-4">
                                        <motion.a
                                            href="#"
                                            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-violet-600 "
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </motion.a>
                                        <motion.a
                                            href="#"
                                            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-violet-600 "
                                            whileHover={{ scale: 1.1, rotate: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Twitter className="w-4 h-4" />
                                        </motion.a>
                                        <motion.a
                                            href="#"
                                            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-violet-600 "
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Github className="w-4 h-4" />
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mission Statement */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-20 text-center"
                >
                    <motion.div
                        className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-3xl p-12 border border-purple-100 shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.h2 
                            className="text-3xl font-bold text-gray-900 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            Our Mission
                        </motion.h2>
                        <motion.p 
                            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.6 }}
                        >
                            We're dedicated to democratizing advanced design and engineering tools, making cutting-edge CAD solutions, circuit design, and custom development accessible to innovators, startups, and established companies alike. Our goal is to accelerate the journey from concept to creation.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Contact CTA */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-16 text-center"
                >
                    <motion.button
                        className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold py-4 px-8 rounded-full shadow-lg  flex items-center gap-2 mx-auto"
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.6 }}
                    >
                        <Mail className="w-5 h-5" />
                        Get In Touch
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default About;