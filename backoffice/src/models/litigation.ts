import { Job } from "./job";
import { LitigationObjectStatus, LitigationStatus } from "./status";
import { User } from "./user";


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

export interface LitigationObject {
    id: string,
    label: string,
    description: string,
    status: LitigationObjectStatus,
    createdAt: string,
    updatedAt: string
}


