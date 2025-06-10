import { prebuiltOrders } from "@/app/lib/server-actions/actions"
import { newServiceName, popUp } from "@/app/store/order"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

export function ConfirmationOrder() {
    const { setIsOpen } = popUp()
    const { setServiceName, serviceName } = newServiceName()

    const createOrder = async () => {

        const loading = toast.loading("loading ...")
        const response = await prebuiltOrders(serviceName)

        if (response.status > 400) {
            toast.error(response.message)
            toast.dismiss(loading)
            return
        }
        toast.success("order placed successfully our expert team will reach out you")
        toast.dismiss(loading)
        setIsOpen(false)
        setServiceName("")
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Your Order</h2>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to proceed with the order for {serviceName}? Our expert team will review your request and get back to you shortly.
                    </p>
                    <div className="flex gap-4 justify-end">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={createOrder}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                        >
                            Confirm Order
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}