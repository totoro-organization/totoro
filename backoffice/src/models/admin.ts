import { Role } from "./role";
import { Status, StatusEnum } from "./status";

export enum AdminStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
    deleted = StatusEnum.deleted,
    freezed = StatusEnum.freezed,
}

export type AdminStatus = Status<keyof typeof AdminStatusEnum>;

export interface Admin {
    id: string,
    status: AdminStatus,
    role: Role,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string
}


