import { Status, StatusEnum } from "./status";

export type PricingStatus = Status<StatusEnum.actived | StatusEnum.disabled>;


export interface Pricing {
    id: string, 
    description: string,
    label: string,
    price: number,
    duration: number,
    nb_account: number,
    nb_ads_by_month: number,
    status: PricingStatus,
    createdAt: string,
    updatedAt: string
}