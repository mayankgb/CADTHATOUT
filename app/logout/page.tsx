"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { signOut } from "next-auth/react";
import { LogOut, Heart, ArrowLeft } from 'lucide-react';

const Logout: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            rotate: [-5, 5, -5],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
            
            {/* Floating Emojis */}
            <motion.div
                className="absolute top-20 left-20 text-4xl"
                variants={floatingVariants}
                animate="animate"
            >
                👋
            </motion.div>
            <motion.div
                className="absolute top-32 right-32 text-3xl"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.5 }}
            >
                😢
            </motion.div>
            <motion.div
                className="absolute bottom-32 left-32 text-3xl"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1 }}
            >
                💜
            </motion.div>
            <motion.div
                className="absolute bottom-20 right-20 text-4xl"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1.5 }}
            >
                ⭐
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 max-w-md w-full mx-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Card */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-2xl">
                    {/* Emoji Header */}
                    <motion.div 
                        variants={itemVariants}
                        className="text-center mb-6"
                    >
                        <motion.div
                            className="text-6xl mb-4"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, -10, 10, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            🥺
                        </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 via-purple-800 to-violet-800 bg-clip-text text-transparent"
                    >
                        Wait, Don't Go! 😭
                    </motion.h1>

                    {/* Message */}
                    <motion.div 
                        variants={itemVariants}
                        className="text-center mb-8 space-y-3"
                    >
                        <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
                            We'll miss you! 💔
                        </p>
                        <p className="text-gray-600">
                            Are you sure you want to leave? Your amazing projects are waiting for you! ✨
                        </p>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div 
                        variants={itemVariants}
                        className="space-y-4"
                    >
                        {/* Logout Button */}
                        <motion.button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                            whileHover={{ 
                                scale: 1.02,
                                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <LogOut className="w-5 h-5" />
                            Yes, Logout 😔
                        </motion.button>

                        {/* Stay Button */}
                        <motion.button
                            onClick={() => window.history.back()}
                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                            whileHover={{ 
                                scale: 1.02,
                                boxShadow: "0 10px 30px rgba(234, 179, 8, 0.3)"
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Heart className="w-5 h-5" />
                            Stay With Us! 🥰
                        </motion.button>

                        {/* Back Button */}
                        <motion.button
                            onClick={() => window.history.back()}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                            whileHover={{ 
                                scale: 1.01,
                                backgroundColor: "rgb(243, 244, 246)"
                            }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back 🔙
                        </motion.button>
                    </motion.div>

                    {/* Footer Message */}
                    <motion.div 
                        variants={itemVariants}
                        className="mt-6 text-center"
                    >
                        <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                            Made with <span className="text-red-500">❤️</span> for amazing users like you! 🌟
                        </p>
                    </motion.div>
                </div>

                {/* Floating Message */}
                <motion.div
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ 
                        opacity: [0, 1, 0],
                        y: [10, -10, -20],
                        scale: [0.8, 1, 0.9]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        Please don't logout! 🙏✨
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Logout;