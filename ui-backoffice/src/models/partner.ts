import { Discount } from "./discount";
import { Status } from "./status";

export type PartnerStatus = Status<'active' | 'inactive' | 'freezed' | 'outlawed'>;

export interface Partner {
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    discount: Discount[],
    status: PartnerStatus
}
