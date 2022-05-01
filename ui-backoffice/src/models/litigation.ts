// export type LitigationStatus = 'completed' | 'pending' | 'coming';

import { Job } from "./job";
import { LitigationObject } from "./litigation_object";
import { Status } from "./status";
import { User } from "./user";

// export interface Litigation {
//     id: string,
//     title: string,
//     organization: string,
//     participants: number,
//     address: string,
//     capacity: number,
//     status:LitigationStatus,
//     tokens: number,
//     desc?: string,
//     date: number,
//     tags?: string[],
//     banner?: string,
//     logo?: string,
// }

export type LitigationStatus = Status<'completed' | 'pending' | 'coming'>;

export interface Litigation {
    id: string,
    litigation_object: LitigationObject,
    job: Job,
    user: User,
    status: LitigationStatus
}

