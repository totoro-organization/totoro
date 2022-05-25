import { Role } from "./role";
import { Status } from "./status";

export type AdminStatus = Status<'actived' | 'disabled' | 'freezed'>;

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


