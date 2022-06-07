import { Status, StatusEnum } from "./status";

export enum LitigationObjectStatusEnum {
    actived = StatusEnum.opened,
    closed = StatusEnum.closed,
}

export type LitigationObjectStatus = Status<keyof typeof LitigationObjectStatusEnum>;

export interface LitigationObject {
    id: string,
    label: string,
    description: string,
    status: LitigationObjectStatus,
    createdAt: string,
    updatedAt: string
}
