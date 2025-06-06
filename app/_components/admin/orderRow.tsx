import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, Package, FileText, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { CustomOrderData, PrebuiltOrderData, useCustomOrders, useFilterCustomOrderData, useFilterPrebuiltOrders, usePrebuiltOrders} from "@/app/store/order"
import { updateStatus } from "@/app/lib/server-actions/actions";
import { toast } from "sonner";

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function OrderRow({ orderId,index, order, orderType }: {orderId: string,index: number ,order: CustomOrderData | PrebuiltOrderData ,orderType: 'custom' | 'prebuilt'}) {

    const { updateCustomOrder } = useCustomOrders()
    const { updatePrebuiltOrders}  = usePrebuiltOrders()
    const { updateFilterCustomtOrders } = useFilterCustomOrderData()
    const { updateFilterPrebuiltOrders }=  useFilterPrebuiltOrders()

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
            updateCustomOrder(orderId, "status", newStatus)
            updateFilterCustomtOrders(index, "status", newStatus)
        } else {
            updatePrebuiltOrders(orderId, "status", newStatus)
            updateFilterPrebuiltOrders(index, "status", newStatus)
        }
        return
    };


    return (
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
    )
}