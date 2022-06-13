import { CommonStatusEnum } from "./commons";
import { DiscountType } from "./discount_type";
import { Partner } from "./partner";
import { Status } from "./status";

export type DiscountStatus = Status<keyof typeof CommonStatusEnum>;

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
