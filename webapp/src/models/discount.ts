import { Partner } from "./partner";
import { DiscountStatus } from "./status";
import { User } from "./user";


export interface Discount {
    id: string,
    name: string,
    type: DiscountType,
    description: string,
    condition: string,
    duration: number,
    partner: Partner,
    cost: number,
    status: DiscountStatus
    createdAt: string,
    updatedAt: string
}

export interface DiscountTransaction {
    id: string,
    user: User,
    discount: Discount,
    qrCode: string,
    code: string,
    createdAt: string,
    updatedAt: string
}

export interface DiscountType {
    id: string,
    name: string, 
    type: string,
    createdAt: string,
    updatedAt: string
}
