import { Partner } from "./partner";
import { Status } from "./status";

export type MembershipRequestStatus = Status<'open' | 'accepted' | 'declined' | 'expired'>;

export interface MembershipRequest {
    id: string,
    partner: Partner,
    date: number,
    status: MembershipRequestStatus
}
