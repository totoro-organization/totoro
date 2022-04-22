import { Organization } from "./organization";
import { Status } from "./status";
import { Tag } from "./tag";

export type JobStatus = Status<'completed' | 'pending' | 'coming'>;

export interface Job {
    id: string,
    title: string,
    organization: string,
    participants: number,
    address: string,
    capacity: number,
    status:JobStatus,
    tokens: number,
    desc?: string,
    date: number,
    tags?: Tag[],
    banner?: string,
    logo?: string,
}
