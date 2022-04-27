import { Status } from "./status";
import { User } from "./user";

export type SubscriptionStatus = Status<'active' | 'canceled' | 'expired'>;

export interface Subscription {
    id: string,
    type: 'Free' | 'Premium',
    user: User,
    expiry_date: number,
    status: SubscriptionStatus
}
