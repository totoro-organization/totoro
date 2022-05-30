import { DiscountType } from "./discount_type";
import { Partner } from "./partner";
import { Status, StatusEnum } from "./status";

export type DiscountStatus = Status<StatusEnum.actived | StatusEnum.disabled | StatusEnum.deleted>;

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
