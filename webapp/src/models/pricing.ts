import { PricingStatus } from "./status";

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