import { Job } from "./job";
import { Role } from "./role";
import { MembershipStatus, OrganizationStatus } from "./status";
import { User } from "./user";


export interface Organization {
    id: string,
    name: string,
    email?: string,
    address?: string,
    cp?: number,
    commune?: string,
    logo?: string,
    banner?: string,
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

export interface OrganizationMember {
    id: string,
    assos_id: string,
    user: User,
    role: Role,
    status: MembershipStatus,
    createdAt: string,
    updatedAt: string,
}

export interface OrganizationFavorite {
    id: string,
    assos_id: string,
    user: User,
    createdAt: string,
    updatedAt: string,
}