import { Job } from "./job";
import { Status } from "./status";

export type OrganizationStatus = Status<'active' | 'inactive' | 'freezed' | 'outlawed'>;

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
    createdAt: string,
    updatedAt: string
}
