// export type LitigationStatus = 'completed' | 'pending' | 'coming';

import { Job } from "./job";
import { LitigationObject } from "./litigation_object";
import { Status } from "./status";
import { User } from "./user";

export type LitigationStatus = Status<'open' | 'close'>;

export interface Litigation {
    id: string,
    litigation_object: LitigationObject,
    job: Job,
    author: User,
    target: User,
    date: number,
    message: string,
    status: LitigationStatus
}

