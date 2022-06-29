import { Organization } from "./organization";
import { Role } from "./role";
import { Status, StatusEnum } from "./status";

export type MembershipStatus = Status<StatusEnum.actived | StatusEnum.disabled>;

export interface Membership {
    id: string,
    organization: Organization,
    role: Role,
    status: MembershipStatus,
    createdAt: string,
    updatedAt: string
}