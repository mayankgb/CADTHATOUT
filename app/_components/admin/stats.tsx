"use client"

import { useCustomOrders, usePrebuiltOrders } from "@/app/store/order"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "motion/react"
import { useMemo } from "react"

export function Stats () {

    const { customOrders }  = useCustomOrders()
    const { prebuiltOrders  } = usePrebuiltOrders()

    const totalOrders = customOrders.length + prebuiltOrders.length;
    const pendingOrders = useMemo(() => { return [...customOrders, ...prebuiltOrders].filter(order => order.status === 'PENDING').length}, [customOrders, prebuiltOrders]);
    const deliveredOrders = useMemo(() => { return [...customOrders, ...prebuiltOrders].filter(order => order.status === "DELIVERED").length}, [customOrders, prebuiltOrders]);


    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };
    
    return (

        <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Delivered Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-600">{deliveredOrders}</div>
            </CardContent>
        </Card>
    </motion.div>

    )
}