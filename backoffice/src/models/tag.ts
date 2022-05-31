import { Status, StatusEnum } from "./status";

export type SubscriptionStatus = Status<StatusEnum.actived | StatusEnum.deleted>;


export interface Tag {
    id: string,
    label: string,
    status: SubscriptionStatus,
    createdAt: string,
    updatedAt: string,
}
