import { Status } from "./status";
import { Tag } from "./tag";

export type JobStatus = 'completed' | 'pending' | 'coming';

export interface Job {
    id: string,
    title: string,
    organization: string,
    participants: number,
    address: string,
    capacity: number,
    status:Status<JobStatus>,
    tokens: number,
    desc?: string,
    date: number,
    tags?: Tag[],
    banner?: string,
    logo?: string,
}
