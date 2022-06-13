import { Job } from "./job";
import { Status, StatusEnum } from "./status";
import { User } from "./user";

export enum OrganizationStatusEnum {
    actived = StatusEnum.actived,
    disabled = StatusEnum.disabled,
    deleted = StatusEnum.deleted,
    freezed = StatusEnum.freezed
}

export type OrganizationStatus = Status<keyof typeof OrganizationStatusEnum>;

export interface Organization {
    id: string,
    name: string,
    email?: string,
    address?: string,
    cp?: number,
    commune?: string,
    logo: string,
    description?: string,
    link?: string,
    phone?: string,
    siren: number,
    siret: number,
    longitude: number,
    latitude: number,
    status: OrganizationStatus,
    creation_date?: string,
    activity?: string,
    users: User[],
    jobs: Job[],
    createdAt: string,
    updatedAt: string
}
