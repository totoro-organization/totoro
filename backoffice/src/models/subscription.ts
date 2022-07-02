import { Organization } from "./organization";
import { Pricing } from "./pricing";
import { SubscriptionStatus } from "./status";

export interface Subscription {
    id: string,
    type: Pricing,
    organization: Organization,
    expirate: string,
    status: SubscriptionStatus,
    createdAt: string,
    updatedAt: string
}
