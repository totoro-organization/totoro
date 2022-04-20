import { Status } from "./status";

export type OrganizationStatus = 'completed' | 'pending' | 'coming';

export interface Organization {
    id: string,
    title: string,
    organization: string,
    participants: number,
    address: string,
    capacity: number,
    status: Status<OrganizationStatus>,
    tokens: number,
    desc?: string,
    date: number,
    tags?: string[],
    banner?: string,
    logo?: string,
}
