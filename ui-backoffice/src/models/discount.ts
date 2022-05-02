import { DiscountType } from "./discount_type";
import { Partner } from "./partner";
import { Status } from "./status";

export type DiscountStatus = Status<'active' | 'inactive' | 'unavailable'>;

export interface Discount {
    id: string,
    name: string,
    type: DiscountType,
    description: string,
    condition: string,
    partner: Partner,
    cost: number,
    status: DiscountStatus
    createdAt: string,
    updatedAt: string
}
