import { Discount } from "./discount";
import { Status, StatusEnum } from "./status";



export enum PartnerStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
    deleted = StatusEnum.deleted,
    freezed = StatusEnum.freezed
}

export type PartnerStatus = Status<PartnerStatusEnum>;

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
