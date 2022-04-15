export type JobStatus = 'completed' | 'pending' | 'coming';

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
    tags?: string[],
    banner?: string,
    logo?: string,
}
