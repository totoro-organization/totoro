import { Status, StatusEnum } from "./status";

export type LitigationObjectStatus = Status<StatusEnum.actived | StatusEnum.deleted>;

export interface LitigationObject {
    id: string,
    label: string,
    description: string,
    status: LitigationObjectStatus,
    createdAt: string,
    updatedAt: string
}
