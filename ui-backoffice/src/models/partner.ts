import { Status } from "./status";

export type PartnerStatus = Status<'completed' | 'pending' | 'coming'>;

export interface Partner {
    id: string,
    title: string,
    organization: string,
    participants: number,
    address: string,
    capacity: number,
    status: PartnerStatus,
    tokens: number,
    desc?: string,
    date: number,
    tags?: string[],
    banner?: string,
    logo?: string,
}
