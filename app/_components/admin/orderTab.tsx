import { prebuiltOrders } from "@/app/lib/server-actions/actions"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FileText, Package } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { OrderRow } from "./orderRow"
import { useCustomOrders, useFilterCustomOrderData, useFilterPrebuiltOrders, usePrebuiltOrders } from "@/app/store/order"

export function OrderTab() {

    const { customOrders} = useCustomOrders()
    const { prebuiltOrders} = usePrebuiltOrders()
    const {filterPrebuiltOrders} = useFilterPrebuiltOrders()
    const { filterCustomOrders } = useFilterCustomOrderData()

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div variants={itemVariants}>
        <Tabs defaultValue="custom" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="custom" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Custom Orders ({filterCustomOrders.length})
                </TabsTrigger>
                <TabsTrigger value="prebuilt" className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Prebuilt Orders ({filterPrebuiltOrders.length})
                </TabsTrigger>
            </TabsList>

            <TabsContent value="custom">
                <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence>
                        {filterCustomOrders.map((order, index) => (
                            <OrderRow
                                orderId={order.orderId}
                                key={order.orderId}
                                order={order}
                                orderType="custom"
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                    {filterCustomOrders.length === 0 && (
                        <motion.div
                            variants={itemVariants}
                            className="text-center py-12 text-gray-500"
                        >
                            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No custom orders found matching your criteria</p>
                        </motion.div>
                    )}
                </motion.div>
            </TabsContent>

            <TabsContent value="prebuilt">
                <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence>
                        {filterPrebuiltOrders.map((order, index) => (
                            <OrderRow
                                orderId={order.orderId}
                                key={order.orderId}
                                order={order}
                                index={index}
                                orderType="prebuilt"
                            />
                        ))}
                    </AnimatePresence>
                    {filterPrebuiltOrders.length === 0 && (
                        <motion.div
                            variants={itemVariants}
                            className="text-center py-12 text-gray-500"
                        >
                            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No prebuilt orders found matching your criteria</p>
                        </motion.div>
                    )}
                </motion.div>
            </TabsContent>
        </Tabs>
    </motion.div>

    )
}