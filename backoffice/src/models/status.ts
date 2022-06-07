export interface Status<T> {
    id: string,
    label: T,
    createdAt: string,
    updatedAt: string
}

export enum StatusEnum {
    coming = "coming",
    pending = "pending",
    disabled = "disabled",
    actived = "actived", 
    deleted = "deleted",
    denied = "denied",
    accepted = "accepted",
    published = "published",
    closed = "closed",
    freezed = "freezed",
    expired = "expired",
    opened = "opened",
    canceled = "canceled"
}
