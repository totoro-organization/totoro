import { Status, StatusEnum } from "./status";

enum PricingStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
}

export type PricingStatus = Status<keyof typeof PricingStatusEnum>;


export interface Pricing {
    id: string, 
    description: string,
    label: string,
    price: number,
    duration: number,
    nb_account: number,
    nb_jobs_by_month: number,
    status: PricingStatus,
    createdAt: string,
    updatedAt: string
}