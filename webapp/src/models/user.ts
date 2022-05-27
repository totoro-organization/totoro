import { Job } from "./job";
import { Organization } from "./organization";
import { Role } from "./role";
import { Status } from "./status";

export type UserStatus = Status<'actived' | 'freezed' | 'disabled'>;

export interface User {
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    phone?: number,
    adress?: any,  // FIXME
    latitude: any, // REMOVE ME => see with backend guys
    longitude: any, // REMOVE ME => see with backend guys
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
