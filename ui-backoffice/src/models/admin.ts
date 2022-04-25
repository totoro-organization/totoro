import { Status } from "./status";
import { Tag } from "./tag";

export type AdminStatus = Status<'completed' | 'pending' | 'coming'>;

export interface Admin {
    id: string,
    title: string,
    organization: string,
    participants: number,
    address: string,
    capacity: number,
    status:AdminStatus,
    tokens: number,
    desc?: string,
    date: number,
    tags?: Tag[],
    banner?: string,
    logo?: string,
}


