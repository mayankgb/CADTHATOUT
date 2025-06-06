import { $Enums } from "@prisma/client";
import { create} from "zustand"

export interface CustomOrderData {
    orderDate: Date ;
    orderId: string;
    email: string;
    serviceName: string[];
    description: string;
    status: $Enums.OrderState 
    // setCustomOrders: <K extends keyof CustomOrderData>(key: K, value: CustomOrderData[K]) => void
}

export interface PrebuiltOrderData {
    orderDate: Date;
    orderId: string;
    email: string;
    serviceName: string;
    status: $Enums.OrderState
    // PrebuiltOrderData: <K extends keyof PrebuiltOrderData>(key: K, value: PrebuiltOrderData[K]) => void
}

interface filtersPrebuiltOrders {
    filterPrebuiltOrders: PrebuiltOrderData[]
    setPrebultOrderData: (orders: PrebuiltOrderData[]) => void
    updateFilterPrebuiltOrders: (
        index: number, 
        key: keyof PrebuiltOrderData,
        value: PrebuiltOrderData[keyof PrebuiltOrderData]
    ) => void
}

interface filtersCustomOrder {
    filterCustomOrders: CustomOrderData[]
    setCustomOrderData: (orders: CustomOrderData[]) => void
    updateFilterCustomtOrders: (
        index: number, 
        key: keyof CustomOrderData,
        value: CustomOrderData[keyof CustomOrderData]
    ) => void

}

interface PrebuiltOrderStore {
    prebuiltOrders: PrebuiltOrderData[],
    setPrebuiltOrders: (orders: PrebuiltOrderData[]) => void
    updatePrebuiltOrders: (
        index: string, 
        key: keyof PrebuiltOrderData,
        value: PrebuiltOrderData[keyof PrebuiltOrderData]
    ) => void
}


interface CustomOrderStore {
    customOrders: CustomOrderData[];
    setCustomOrders: (orders: CustomOrderData[]) => void;
    updateCustomOrder: (
      index: string,
      key: keyof CustomOrderData,
      value: CustomOrderData[keyof CustomOrderData]
    ) => void;
  }
  
  export const useCustomOrders = create<CustomOrderStore>((set) => ({
    customOrders: [],
    setCustomOrders: (orders) => set({ customOrders: orders }),
    updateCustomOrder: (orderId, key, value) =>
      set((state) => {
        const updatedOrders = [...state.customOrders];
        let existingOrder = updatedOrders.map((v) => {
            if (v.orderId === orderId) {
                return {
                    ...v,
                    [key]: value
                }
            }
            return v
        })
        return { customOrders: existingOrder };
      }),
  }));
  

export const usePrebuiltOrders = create<PrebuiltOrderStore>((set) => ({
    prebuiltOrders: [],
    setPrebuiltOrders : (orders) => set({ prebuiltOrders: orders}),
    updatePrebuiltOrders: (orderId, key, value) => 
        set((state) => {
            const updateOrders = [...state.prebuiltOrders]
            let existingOrder = updateOrders.map((v) => {
                if (v.orderId === orderId) {
                    return {
                        ...v,
                        [key]: value
                    }
                }
                return v
            })

            return { prebuiltOrders: existingOrder}
        })
}))

export const useFilterPrebuiltOrders = create<filtersPrebuiltOrders>((set) => ({
    filterPrebuiltOrders: [],
    setPrebultOrderData: (orders) => set({filterPrebuiltOrders: orders}),
    updateFilterPrebuiltOrders: (index, key, value) => 
        set((state) => {
            const updateOrders = [...state.filterPrebuiltOrders]
            updateOrders[index] = {
                ...updateOrders[index],
                [key]: value
            }

            return { filterPrebuiltOrders: updateOrders}
        })
}))

export const useFilterCustomOrderData = create<filtersCustomOrder>((set) => ({
    filterCustomOrders: [],
    setCustomOrderData: (orders) => set({filterCustomOrders: orders}),
    updateFilterCustomtOrders: (index, key, value) => 
        set((state) => {
            const updateOrders = [...state.filterCustomOrders]
            updateOrders[index] = {
                ...updateOrders[index],
                [key]: value
            }

            return { filterCustomOrders: updateOrders}
        })
}))