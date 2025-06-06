"use client"

import { useCustomOrders, useFilterCustomOrderData, useFilterPrebuiltOrders, usePrebuiltOrders } from "@/app/store/order";
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react";

export function Filters () {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'PENDING' | 'DELIVERED' | 'CANCELLED'>('all');
    const { customOrders } = useCustomOrders()
    const { prebuiltOrders } = usePrebuiltOrders()
    const { setPrebultOrderData} = useFilterPrebuiltOrders()
    const {  setCustomOrderData } = useFilterCustomOrderData()


    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {

        const filterOrders = () => {
            const newFilterCusomtOrder = customOrders.filter(order => {
                const matchesSearch = order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
                return matchesSearch && matchesStatus;
            });

            const newFilterPrebuiltOrders = prebuiltOrders.filter(order => {
                const matchesSearch = order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
                return matchesSearch && matchesStatus;
            });

            setPrebultOrderData(newFilterPrebuiltOrders)
            setCustomOrderData(newFilterCusomtOrder)
        };

        filterOrders()

    }, [searchTerm, statusFilter])

    return (
        <motion.div variants={itemVariants} className="mb-6">
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by email or order ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
    )
    
}