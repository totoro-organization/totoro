import { Status } from "./status";

export type DiscountStatus = Status<'active' | 'inactive' | 'unavailable'>;

export interface Discount {
    id: string,
    label: string,
    status: DiscountStatus
}
