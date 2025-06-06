"use client"

import { Stats } from "./stats";
import { motion } from "motion/react";
import { Filters } from "./filters";
import { Header } from "./header";
import { OrderTab } from "./orderTab";
import { getAllOrder } from "@/app/lib/server-actions/actions";
import { CustomOrderData, PrebuiltOrderData, useCustomOrders, useFilterCustomOrderData, useFilterPrebuiltOrders, usePrebuiltOrders } from "@/app/store/order";
import { useEffect } from "react";
import { toast } from "sonner";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export function AdminPage() {


    const { setCustomOrders }  = useCustomOrders()
    const { setPrebuiltOrders } = usePrebuiltOrders()
    const { setCustomOrderData } = useFilterCustomOrderData()
    const { setPrebultOrderData } = useFilterPrebuiltOrders()


    useEffect(() => {

        async function fetchData() {
            const toastId = toast.loading("...loading")
            const response = await getAllOrder()

            if (response.status > 400) {
                toast.dismiss(toastId)
                toast.error(response.message)
                return
            }

            const data = response.customOrder?.map((v) => {
                const order: CustomOrderData = {
                    orderDate: v.date,
                    orderId: v.id,
                    email: v.user.email,
                    serviceName: v.serviceName,
                    description: v.description,
                    status: v.orderState
                }
                return order
            })
            const prebuiltOrderData = response.prebuiltOrder?.map((v) => {
                const order: PrebuiltOrderData = {
                    orderDate: v.date,
                    orderId: v.id,
                    email: v.user.email,
                    serviceName: v.serviceName,
                    status: v.orderState
                }
                return order
            })

            setCustomOrders(data || [])
            setPrebuiltOrders(prebuiltOrderData || [])
            setCustomOrderData(data || [])
            setPrebultOrderData(prebuiltOrderData || [])
            toast.dismiss(toastId)
            toast.success("success")

            return
        }
        fetchData()

    }, [])

    return(
        <motion.div
                className="max-w-7xl mx-auto p-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <Header/>

                {/* Stats Cards */}
                <Stats/>

                {/* Filters */}
                <Filters/>

                {/* Orders Tabs */}
                <OrderTab/>
          </motion.div>
    )
}