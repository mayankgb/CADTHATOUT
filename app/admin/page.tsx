"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle,
    XCircle,
    Calendar,
    Mail,
    Package,
    FileText,
    Filter,
    Search,
    Eye,
    Clock,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllOrder, updateStatus } from '../lib/server-actions/actions';
import { toast } from 'sonner';
import { $Enums } from '@/generated/prisma';

interface CustomOrderData {
    orderDate: Date;
    orderId: string;
    email: string;
    serviceName: string[];
    description: string;
    status: $Enums.OrderState
}

interface PrebuiltOrderData {
    orderDate: Date;
    orderId: string;
    email: string;
    serviceName: string;
    status: $Enums.OrderState
}

const Admin: React.FC = () => {
    // Dummy data for testing
    const [customOrders, setCustomOrders] = useState<CustomOrderData[]>([]);

    const [prebuiltOrders, setPrebuiltOrders] = useState<PrebuiltOrderData[]>([ ]);

    useEffect(() => {

        async function fetchData() {
            const toastId = toast.loading("")
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

            setCustomOrders((prev) => (
                data?.length ? data : []
            ))
            setPrebuiltOrders((prev) => (
                prebuiltOrderData?.length ? prebuiltOrderData : []
            ))

            return
        }
        fetchData()

    }, [])
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'delivered' | 'cancelled'>('all');

    const updateOrderStatus = async (
        orderId: string,
        newStatus: 'DELIVERED' | 'CANCELLED',
        orderType: 'custom' | 'prebuilt'
    ) => {

        const toastId = toast.loading("...loading")
        const response  = await updateStatus(newStatus , orderType, orderId)

        if (response.status >= 400) {
            toast.dismiss(toastId)
            toast.error(response.message)
            return
        }

        toast.dismiss(toastId)
        toast.success(response.message)

        if (orderType === 'custom') {
            setCustomOrders(prev =>
                prev.map(order =>
                    order.orderId === orderId ? { ...order, status: newStatus } : order
                )
            );
        } else {
            setPrebuiltOrders(prev =>
                prev.map(order =>
                    order.orderId === orderId ? { ...order, status: newStatus } : order
                )
            );
        }

        
        return
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
            case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING': return <Clock className="w-3 h-3" />;
            case 'DELIVERED': return <CheckCircle className="w-3 h-3" />;
            case 'CANCELLED': return <XCircle className="w-3 h-3" />;
            default: return <AlertCircle className="w-3 h-3" />;
        }
    };

    const filterOrders = <T extends { email: string; orderId: string; status: string }>(orders: T[]) => {
        return orders.filter(order => {
            const matchesSearch = order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const OrderRow: React.FC<{
        order: CustomOrderData | PrebuiltOrderData;
        orderType: 'custom' | 'prebuilt';
    }> = ({ order, orderType }) => (
        <motion.div
            variants={itemVariants}
            layout
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md"
        >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="outline" className="font-mono text-sm">
                            {order.orderId}
                        </Badge>
                        <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-purple-500" />
                            <span>{order.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-500" />
                            <div>{order.orderDate.toLocaleDateString("en")}</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium">Services:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {orderType === 'custom'
                                ? (order as CustomOrderData).serviceName.map((service, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {service}
                                    </Badge>
                                ))
                                : <Badge variant="secondary" className="text-xs">
                                    {(order as PrebuiltOrderData).serviceName}
                                </Badge>
                            }
                        </div>
                    </div>

                    {orderType === 'custom' && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-medium">Description:</span>
                            </div>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {(order as CustomOrderData).description}
                            </p>
                        </div>
                    )}
                </div>

                {order.status === "PENDING" && (
                    <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                        <Button
                            onClick={() => updateOrderStatus(order.orderId, 'DELIVERED', orderType)}
                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white flex items-center gap-2"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Deliver
                        </Button>
                        <Button
                            onClick={() => updateOrderStatus(order.orderId, 'CANCELLED', orderType)}
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                            <XCircle className="w-4 h-4" />
                            Cancel
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    );

    const totalOrders = customOrders.length + prebuiltOrders.length;
    const pendingOrders = [...customOrders, ...prebuiltOrders].filter(order => order.status === 'PENDING').length;
    const deliveredOrders = [...customOrders, ...prebuiltOrders].filter(order => order.status === "DELIVERED").length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.div
                className="max-w-7xl mx-auto p-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="mb-8 mt-15">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage custom development and prebuilt orders</p>
                </motion.div>

                {/* Stats Cards */}
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

                {/* Filters */}
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
                                        <option value="pending">Pending</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Orders Tabs */}
                <motion.div variants={itemVariants}>
                    <Tabs defaultValue="custom" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="custom" className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Custom Orders ({customOrders.length})
                            </TabsTrigger>
                            <TabsTrigger value="prebuilt" className="flex items-center gap-2">
                                <Package className="w-4 h-4" />
                                Prebuilt Orders ({prebuiltOrders.length})
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
                                    {filterOrders(customOrders).map((order) => (
                                        <OrderRow
                                            key={order.orderId}
                                            order={order}
                                            orderType="custom"
                                        />
                                    ))}
                                </AnimatePresence>
                                {filterOrders(customOrders).length === 0 && (
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
                                    {filterOrders(prebuiltOrders).map((order) => (
                                        <OrderRow
                                            key={order.orderId}
                                            order={order}
                                            orderType="prebuilt"
                                        />
                                    ))}
                                </AnimatePresence>
                                {filterOrders(prebuiltOrders).length === 0 && (
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
            </motion.div>
        </div>
    );
};

export default Admin;