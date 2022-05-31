import { Organization } from "./organization";
import { Pricing } from "./pricing";
import { Status, StatusEnum } from "./status";

export type SubscriptionStatus = Status<StatusEnum.actived | StatusEnum.expired | StatusEnum.canceled>;

export interface Subscription {
    id: string,
    type: Pricing,
    organization: Organization,
    expirate: string,
    status: SubscriptionStatus,
    createdAt: string,
    updatedAt: string
}
