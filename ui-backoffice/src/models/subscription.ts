import { Organization } from "./organization";
import { Pricing } from "./pricing";
import { Status } from "./status";

export type SubscriptionStatus = Status<'active' | 'canceled' | 'expired'>;

export interface Subscription {
    id: string,
    type: Pricing,
    organization: Organization,
    expirate: string,
    status: SubscriptionStatus,
    createdAt: string,
    updatedAt: string
}
