import { Job } from "./job";
import { Role } from "./role";
import { OrganizationStatus, Status } from "./status";
import { User } from "./user";

interface Member {
    id: string,
    user: User,
    role: Role,
    status: Status<any>
    createdAt: string,
    updatedAt: string
}

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
    members: Member[],
    jobs: Job[],
    createdAt: string,
    updatedAt: string
}
