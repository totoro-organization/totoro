import { Job } from "./job";
import { Status } from "./status";

export type OrganizationStatus = Status<'active' | 'inactive' | 'freezed' | 'outlawed'>;

export interface Organization {
    id: string,
    name: string,
    email: string,
    address: string,
    jobs: Job[],
    phone: string,
    status: OrganizationStatus
}
