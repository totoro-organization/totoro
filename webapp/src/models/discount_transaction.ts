import { Discount } from "./discount";
import { User } from "./user";

export interface DiscountTransaction {
    id: string,
    user: User,
    discount: Discount,
    qrCode: string,
    code: string,
    createdAt: string,
    updatedAt: string
}