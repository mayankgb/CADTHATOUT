"use server"

import { prisma } from "@/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"


interface customOrders {
    serviceName: string[], 
    description: string
}

export async function createCustomOrder ({serviceName, description}: customOrders) {
    try {

        const id = await getServerSession(authOptions)
        if (!id) {
            return {
                  status: 401,
                  message: "please login first"
            }
        }
        
        const createOrder = await prisma.customOrders.create({
            data: {
                userId: id.user.id,
                serviceName: serviceName,
                description: description
            },
            select: {
                id: true
            }
        })

        return {
            status: 200,
            message: "our team will contact you further",
            id: createOrder.id
        }

    }catch(e){
        console.log(e)
        return {
            status: 500,
            message: "something went wrong"
        }
    }

}

export async function prebuiltOrders(serviceName: string) {
    try {

        const userId = await getServerSession(authOptions)

        if (!userId?.user.id) {
            return {
                message: "please login first",
                status: 401
            }
        }

        const newOrder = await prisma.prebuiltOrders.create({
            data: {
                userId: userId.user.id,
                serviceName: serviceName
            }
        })

        return {
            message: "successfully placed a order",
            status: 200
        }

    }catch(e){
        console.log(e)
        return {
            message: "something went wrong",
            status: 500
        }
    }
}


export async function updateStatus(status: "DELIVERED" | "CANCELLED", orderType: "prebuilt" | "custom", orderId: string) {
    try {

        const userId  = await getServerSession(authOptions)
        if (!userId || userId.user.role === "USER") {
            return {
                message: "unauthenticate user",
                status: 401
            }
        }
        if (orderType === "custom") {
            const updateOrder = await prisma.customOrders.update({
                where: {
                    id: orderId
                },
                data: {
                    orderState: status
                }
            })            
        }else if (orderType === "prebuilt"){
            const updateOrder = await prisma.prebuiltOrders.update({
                where: {
                    id: orderId
                },
                data:{
                    orderState: status
                }
            })
        }

        return  {
            message: "order status updated successfully",
            status: 200
        }
        
    }catch(e){
        console.log(e)
        return {
            message: "something went wrong",
            status: 500
        }
    }
}

export async function getAllOrder() {
    try {

        const user = await getServerSession(authOptions)

        if (!(user?.user.role === "ADMIN")  ) {
            return {
                message: "unauthorised user",
                status: 401
            }
        }
        console.log(user?.user.role)

        const customOrder = await prisma.customOrders.findMany({
            select: {
                id: true, 
                serviceName: true, 
                date: true,
                description: true,
                orderState: true,
                user: {
                    select: {
                        id: true, 
                        email: true
                    }
                }
            }
        })

        const prebuiltOrder = await prisma.prebuiltOrders.findMany({
            select: {
                id: true, 
                serviceName: true, 
                date: true, 
                orderState: true,
                user: {
                    select: { 
                        id: true, 
                        email: true
                    }
                }
            }
        })

        return {
            message: "successfully fetched data",
            status: 200,
            customOrder: customOrder.length === 0 ? [] : customOrder,
            prebuiltOrder: prebuiltOrder.length === 0 ? [] : prebuiltOrder
        }



    }catch(e) {
        console.log(e)
        return {
            message: "something went wrong ",
            status: 400
        }
    }
}