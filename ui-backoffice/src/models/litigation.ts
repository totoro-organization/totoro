// export type LitigationStatus = 'completed' | 'pending' | 'coming';

import { Job } from "./job";
import { LitigationObject } from "./litigation_object";
import { Status } from "./status";
import { User } from "./user";

export type LitigationStatus = Status<'opened' | 'closed'>;

export interface Litigation {
    id: string,
    litigation_object: LitigationObject,
    author: User | Job,
    target: User | Job,
    date: string,
    message?: string,
    status: LitigationStatus
    createdAt: string,
    updatedAt: string
}

