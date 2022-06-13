import { Organization } from "./organization";
import { Role } from "./role";
import { Status, StatusEnum } from "./status";


export enum UserStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
    deleted = StatusEnum.deleted,
    freezed = StatusEnum.freezed
}

export type UserStatus = Status<keyof typeof UserStatusEnum>;

export interface User {
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    phone?: number,
    bio?: string,
    total_token: number,
    birthday?: Date,
    avatar: string,
    status: UserStatus,
    memberships: {
        organization: Organization,
        role: Role,
        createdAt: string,
        updatedAt: string
    },
    createdAt: string,
    updatedAt: string
}
