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

export type StatusOptions = {
    id: keyof typeof StatusEnum | 'all',
    name: string
}[]

export enum AdminStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
    deleted = StatusEnum.deleted,
    freezed = StatusEnum.freezed,
}

export enum UserStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
    deleted = StatusEnum.deleted,
    freezed = StatusEnum.freezed
}

export enum SubscriptionStatusEnum {
    actived = StatusEnum.actived,
    expired = StatusEnum.expired,
    canceled = StatusEnum.canceled
}

export enum CommonStatusEnum {
    actived = StatusEnum.actived,
    deleted = StatusEnum.deleted
}

enum PricingStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
}

export enum PartnerStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
    deleted = StatusEnum.deleted,
    freezed = StatusEnum.freezed
}

export enum LitigationObjectStatusEnum {
    actived = StatusEnum.opened,
    closed = StatusEnum.closed,
}

export enum JobStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
    deleted = StatusEnum.deleted,
    coming = StatusEnum.coming,
}

export enum OrganizationStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
    deleted = StatusEnum.deleted,
    freezed = StatusEnum.freezed
}

export enum LitigationStatusEnum {
    opened = StatusEnum.opened,
    closed = StatusEnum.closed,
}

export enum MembershipStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled
}

export type LitigationObjectStatus = Status<keyof typeof LitigationObjectStatusEnum>;

export type JobStatus = Status<keyof typeof JobStatusEnum>;

export type JobDifficultyStatus = Status<keyof typeof CommonStatusEnum>;

export type LitigationStatus = Status<keyof typeof LitigationStatusEnum>;

export type OrganizationStatus = Status<keyof typeof OrganizationStatusEnum>;

export type AdminStatus = Status<keyof typeof AdminStatusEnum>;

export type MembershipStatus = Status<keyof typeof MembershipStatusEnum>;

export type UserStatus = Status<keyof typeof UserStatusEnum>;

export type SubscriptionStatus = Status<keyof typeof SubscriptionStatusEnum>;

export type DiscountStatus = Status<keyof typeof CommonStatusEnum>;

export type PricingStatus = Status<keyof typeof PricingStatusEnum>;

export type PartnerStatus = Status<keyof typeof PartnerStatusEnum>;