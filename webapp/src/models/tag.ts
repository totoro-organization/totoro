import { Status, StatusEnum } from "./status";

export type SubscriptionStatus = Status<StatusEnum.actived | StatusEnum.deleted>;


export interface Tag {
    id: string,
    label: string,
    type: 'mission' | 'category'
    status: SubscriptionStatus,
    createdAt: string,
    updatedAt: string,
}
