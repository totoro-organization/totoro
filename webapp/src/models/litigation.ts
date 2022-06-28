// export type LitigationStatus = 'completed' | 'pending' | 'coming';

import { Job } from "./job";
import { LitigationObject } from "./litigation_object";
import { Status, StatusEnum } from "./status";
import { User } from "./user";

export type LitigationStatus = Status<StatusEnum.opened | StatusEnum.closed>;

export interface Litigation {
    id: string,
    litigation_object: LitigationObject,
    author: User | Job,
    target: User | Job,
    message?: string,
    mission: {
        id: string,
        createdAt: string,
        updatedAt: string,
        job: Job
    },
    type: boolean,
    status: LitigationStatus
    createdAt: string,
    updatedAt: string
}

