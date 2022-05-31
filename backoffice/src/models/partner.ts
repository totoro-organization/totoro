import { Discount } from "./discount";
import { Status, StatusEnum } from "./status";

export type PartnerStatus = Status<StatusEnum.actived | StatusEnum.disabled | StatusEnum.freezed>;

export interface Partner {
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    logo: string,
    link: string,
    in_internet: boolean,
    in_store: boolean,
    discount: Discount[],
    status: PartnerStatus,
    createdAt: string,
    updatedAt: string
}
