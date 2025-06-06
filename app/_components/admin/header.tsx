import { motion } from "motion/react"

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function Header() {
    return(
        <motion.div variants={itemVariants} className="mb-8 mt-15">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage custom development and prebuilt orders</p>
    </motion.div>
    )
}