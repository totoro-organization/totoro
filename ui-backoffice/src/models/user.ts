import { Job } from "./job";
import { Organization } from "./organization";
import { Status } from "./status";

export type UserStatus = Status<'outlawed' | 'freezed' | 'active' | 'inactive'>;

export interface User {
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    phone?: number,
    longitude: number,
    latitude: number,
    bio?: string,
    total_token: number,
    birthday?: Date,
    avatar: string,
    status: UserStatus,
    organizations: Organization[],
    favorites: {
        jobs: Job[],
        organizations: Organization[]
    },
    createdAt: string,
    updatedAt: string
}
