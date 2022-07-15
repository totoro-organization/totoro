import { Discount } from "./discount";
import { PartnerStatus } from "./status";
import { User } from "./user";

export interface Partner {
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    logo: string,
    link: string,
    user: User,
    description?: string,
    in_internet: boolean,
    in_store: boolean,
    discount: Discount[],
    status: PartnerStatus,
    createdAt: string,
    updatedAt: string
}
