import { Organization } from "./organization";
import { Pricing } from "./pricing";
import { Status, StatusEnum } from "./status";

enum SubscriptionStatusEnum {
    actived = StatusEnum.actived,
    expired = StatusEnum.expired,
    canceled = StatusEnum.canceled
}

export type SubscriptionStatus = Status<keyof typeof SubscriptionStatusEnum>;

export interface Subscription {
    id: string,
    type: Pricing,
    organization: Organization,
    expirate: string,
    status: SubscriptionStatus,
    createdAt: string,
    updatedAt: string
}
