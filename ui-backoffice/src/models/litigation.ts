export type LitigationStatus = 'completed' | 'pending' | 'coming';

export interface Litigation {
    id: string,
    title: string,
    organization: string,
    participants: number,
    address: string,
    capacity: number,
    status:LitigationStatus,
    tokens: number,
    desc?: string,
    date: number,
    tags?: string[],
    banner?: string,
    logo?: string,
}
