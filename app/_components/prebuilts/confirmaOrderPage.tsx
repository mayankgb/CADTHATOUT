import { prebuiltOrders } from "@/app/lib/server-actions/actions"
import { newServiceName, popUp } from "@/app/store/order"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function ConfirmationOrder() {
    const { setIsOpen } = popUp()
    const { setServiceName, serviceName } = newServiceName()
    const [isDisable, setIsDisable] = useState<boolean>(false)

    const createOrder = async () => {
        if (isDisable) {
            toast.error("Please wait, order is being processed...")
            return
        }

        setIsDisable(true)
        
        const loading = toast.loading("Processing your order...")
        
        try {
            const response = await prebuiltOrders(serviceName)

            if (response.status >= 400) {
                toast.error(response.message || "Failed to place order")
                toast.dismiss(loading)
                setIsOpen(false)
                setServiceName("")
                return
            }

            toast.success("Order placed successfully! Our expert team will reach out to you.")
            toast.dismiss(loading)
            setIsOpen(false)
            setServiceName("")

        } catch (error) {
            console.error("Order creation failed:", error)
            toast.error("Something went wrong. Please try again.")
            toast.dismiss(loading)
        } finally {
            setIsDisable(false)
        }
    }

    const handleCancel = () => {
        if (!isDisable) {
            setIsOpen(false)
            setServiceName("")
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
                onClick={(e) => e.target === e.currentTarget && !isDisable && handleCancel()}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    transition={{ 
                        
                        duration: 0.3 
                    }}
                    className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20"
                    style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                >
                    {/* Decorative elements */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-gray-800 to-black rounded-full opacity-60"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full opacity-40"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-gray-800 to-black rounded-full opacity-40"></div>
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl flex items-center justify-center shadow-lg"
                        >
                            <svg 
                                className="w-8 h-8 text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                />
                            </svg>
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-2"
                        >
                            Confirm Your Order
                        </motion.h2>
                        
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="w-12 h-0.5 bg-gradient-to-r from-gray-800 to-black mx-auto rounded-full"
                        ></motion.div>
                    </div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <div className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-xl p-4 border border-gray-200/50">
                            <p className="text-gray-700 text-center leading-relaxed">
                                Are you ready to proceed with your order for{' '}
                                <span className="font-semibold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                                    {serviceName}
                                </span>
                                ?
                            </p>
                            <p className="text-sm text-gray-500 text-center mt-2">
                                Our expert team will review your request and contact you shortly.
                            </p>
                        </div>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-3"
                    >
                        <motion.button
                            whileHover={!isDisable ? { 
                                scale: 1.02, 
                                boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.2)" 
                            } : {}}
                            whileTap={!isDisable ? { scale: 0.98 } : {}}
                            onClick={handleCancel}
                            disabled={isDisable}
                            className={`flex-1 px-6 py-3 rounded-xl font-medium  border-2 ${
                                isDisable 
                                    ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' 
                                    : 'border-gray-200 text-gray-600 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            Cancel
                        </motion.button>
                        
                        <motion.button
                            whileHover={!isDisable ? { 
                                scale: 1.02,
                                boxShadow: "0 8px 25px -8px rgba(59, 130, 246, 0.5)"
                            } : {}}
                            whileTap={!isDisable ? { scale: 0.98 } : {}}
                            onClick={createOrder}
                            disabled={isDisable}
                            className={`flex-1 px-6 py-3 rounded-xl font-medium relative overflow-hidden ${
                                isDisable
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white hover:from-gray-900 hover:via-black hover:to-gray-900 shadow-lg'
                            }`}
                        >
                            {!isDisable && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ 
                                        repeat: Infinity, 
                                        duration: 2, 
                                        ease: "linear",
                                        repeatDelay: 1
                                    }}
                                />
                            )}
                            
                            <span className="relative flex items-center justify-center gap-2">
                                {isDisable && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                )}
                                {isDisable ? 'Processing...' : 'Confirm Order'}
                            </span>
                        </motion.button>
                    </motion.div>

                    {/* Bottom decoration */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                    >
                        <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                    className="w-1 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}