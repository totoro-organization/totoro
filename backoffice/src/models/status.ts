export interface Status<T> {
    id: string,
    label: T,
    createdAt: string,
    updatedAt: string
}

export enum Statuses {
    "coming",
    "pending",
    "disabled",
    "actived", 
    "deleted",
    "denied",
    "accepted",
    "published",
    "closed",
    "freezed",
    "expired",
    "opened",
    "canceled"
}


